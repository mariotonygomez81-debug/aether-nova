"""
AETHER NOVA — Valkyrie-class interceptor prototype.
Run:
  blender --background --python tools/blender/generate_interceptor.py -- --output-dir dist
Creates .blend, .glb and .png files without external Python packages.
"""
import argparse
import math
import os
import sys

import bpy
from mathutils import Vector


def arguments():
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    parser = argparse.ArgumentParser()
    parser.add_argument("--output-dir", default="dist")
    return parser.parse_args(argv)


def material(name, color, metallic=0.0, roughness=0.4, emission=None, strength=0.0):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = (*color, 1.0)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (*color, 1.0)
    bsdf.inputs["Metallic"].default_value = metallic
    bsdf.inputs["Roughness"].default_value = roughness
    if emission:
        bsdf.inputs["Emission Color"].default_value = (*emission, 1.0)
        bsdf.inputs["Emission Strength"].default_value = strength
    return mat


def mesh_object(name, vertices, faces, mat, bevel=0.0):
    mesh = bpy.data.meshes.new(name + "Mesh")
    mesh.from_pydata(vertices, [], faces)
    mesh.materials.append(mat)
    mesh.update()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    if bevel:
        mod = obj.modifiers.new("Edge highlights", "BEVEL")
        mod.width = bevel
        mod.segments = 2
        obj.modifiers.new("Weighted normals", "WEIGHTED_NORMAL")
    return obj


def cube(name, location, scale, mat, bevel=0.08):
    bpy.ops.mesh.primitive_cube_add(size=1, location=location)
    obj = bpy.context.object
    obj.name = name
    obj.dimensions = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.data.materials.append(mat)
    if bevel:
        mod = obj.modifiers.new("Machined edges", "BEVEL")
        mod.width = bevel
        mod.segments = 3
        obj.modifiers.new("Weighted normals", "WEIGHTED_NORMAL")
    return obj


def uv_sphere(name, location, scale, mat):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=24, ring_count=12, location=location)
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    obj.data.materials.append(mat)
    bpy.ops.object.shade_smooth()
    return obj


def cylinder_y(name, location, radius, depth, mat):
    bpy.ops.mesh.primitive_cylinder_add(vertices=24, radius=radius, depth=depth,
                                        location=location, rotation=(math.pi / 2, 0, 0))
    obj = bpy.context.object
    obj.name = name
    obj.data.materials.append(mat)
    bevel = obj.modifiers.new("Rim bevel", "BEVEL")
    bevel.width = 0.06
    bevel.segments = 2
    obj.modifiers.new("Weighted normals", "WEIGHTED_NORMAL")
    return obj


def create_ship(mats):
    hull, armor, dark, canopy, cyan, gold, engine = mats

    # Faceted central hull, pointed toward +Y.
    rings = [
        (-3.55, 0.38, 0.34), (-2.65, 0.72, 0.48),
        (-0.80, 0.92, 0.55), (1.45, 0.72, 0.48),
        (3.65, 0.035, 0.045)
    ]
    vertices = []
    profile = [(0, 1), (0.72, 0.55), (1, 0), (0.72, -0.55),
               (0, -1), (-0.72, -0.55), (-1, 0), (-0.72, 0.55)]
    for y, rx, rz in rings:
        for px, pz in profile:
            vertices.append((px * rx, y, pz * rz))
    faces = []
    for r in range(len(rings) - 1):
        for i in range(8):
            a = r * 8 + i
            b = r * 8 + (i + 1) % 8
            faces.append((a, b, b + 8, a + 8))
    faces.append(tuple(range(7, -1, -1)))
    faces.append(tuple(range((len(rings) - 1) * 8, len(rings) * 8)))
    mesh_object("01_Central_Armored_Hull", vertices, faces, hull, 0.035)

    # Swept delta wings, mirrored.
    wing_outline = [(0.48, 1.65), (4.45, -1.55), (4.05, -2.75),
                    (1.05, -1.95), (0.55, -0.85)]
    for side in (-1, 1):
        verts = []
        for z in (-0.12, 0.12):
            verts.extend([(side * x, y, z) for x, y in wing_outline])
        faces = [(0, 1, 2, 3, 4), (9, 8, 7, 6, 5)]
        for i in range(5):
            faces.append((i, (i + 1) % 5, (i + 1) % 5 + 5, i + 5))
        mesh_object(("Port" if side < 0 else "Starboard") + "_Delta_Wing",
                    verts, faces, armor, 0.055)

        # Wing armor panels and cyan edge strips.
        cube("Wing_Root_Armor", (side * 1.45, -0.75, 0.20), (0.42, 2.15, 0.20), dark, 0.05)
        cube("Wing_Emitter", (side * 2.85, -1.48, 0.17), (0.055, 1.25, 0.045), cyan, 0.015)

        # Missile/energy hardpoint.
        cube("Wing_Weapon_Pylon", (side * 2.25, -0.85, -0.02), (0.38, 1.10, 0.28), dark, 0.07)
        uv_sphere("Wing_Status_Lamp", (side * 3.65, -1.75, 0.22), (0.11, 0.20, 0.07), gold)

    # Cockpit and dorsal spine.
    uv_sphere("Armored_Canopy_Frame", (0, 0.72, 0.48), (0.54, 1.15, 0.34), dark)
    uv_sphere("Polarized_Cockpit_Glass", (0, 0.78, 0.57), (0.43, 0.94, 0.28), canopy)
    cube("Dorsal_Spine", (0, -1.25, 0.43), (0.32, 1.75, 0.20), armor, 0.07)
    cube("Dorsal_Light", (0, -1.15, 0.55), (0.07, 1.10, 0.035), cyan, 0.015)

    # Twin engine nacelles, exhausts point toward -Y.
    for side in (-1, 1):
        x = side * 0.62
        cube("Engine_Nacelle", (x, -2.65, -0.12), (0.62, 1.55, 0.58), dark, 0.13)
        cylinder_y("Engine_Exhaust_Rim", (x, -3.48, -0.12), 0.27, 0.22, armor)
        cylinder_y("Engine_Core", (x, -3.62, -0.12), 0.17, 0.12, engine)
        uv_sphere("Engine_Glow", (x, -3.70, -0.12), (0.16, 0.10, 0.16), cyan)

    # Nose sensor and subtle identification marks.
    uv_sphere("Nose_Targeting_Sensor", (0, 2.70, 0.17), (0.12, 0.18, 0.10), gold)
    for side in (-1, 1):
        cube("Forward_Weapon_Barrel", (side * 0.42, 1.45, -0.22), (0.14, 1.15, 0.14), dark, 0.035)
        uv_sphere("Muzzle_Emitter", (side * 0.42, 2.05, -0.22), (0.09, 0.10, 0.09), cyan)


def setup_scene(output_dir):
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for datablocks in (bpy.data.materials, bpy.data.cameras, bpy.data.lights):
        for block in list(datablocks):
            if block.users == 0:
                datablocks.remove(block)

    hull = material("AN_Hull_Titanium", (0.12, 0.19, 0.28), 0.78, 0.27)
    armor = material("AN_Armor_Pearl", (0.48, 0.62, 0.72), 0.72, 0.30)
    dark = material("AN_Graphite", (0.018, 0.035, 0.055), 0.55, 0.32)
    canopy = material("AN_Canopy_Blue", (0.015, 0.18, 0.28), 0.72, 0.16, (0.01, 0.12, 0.22), 0.45)
    cyan = material("AN_Cyan_Energy", (0.01, 0.55, 0.82), 0.35, 0.22, (0.0, 0.65, 1.0), 3.0)
    gold = material("AN_Gold_Identification", (0.95, 0.48, 0.08), 0.65, 0.28, (0.8, 0.22, 0.015), 0.8)
    engine = material("AN_Engine_Core", (0.05, 0.32, 0.55), 0.25, 0.25, (0.0, 0.35, 1.0), 2.5)
    create_ship((hull, armor, dark, canopy, cyan, gold, engine))

    # Ground-free presentation setup.
    world = bpy.context.scene.world or bpy.data.worlds.new("AETHER_NOVA_World")
    bpy.context.scene.world = world
    world.color = (0.012, 0.02, 0.04)

    bpy.ops.object.camera_add(location=(9.5, -12.5, 8.0))
    camera = bpy.context.object
    camera.name = "AETHER_NOVA_Preview_Camera"
    target = Vector((0, 0, 0))
    direction = target - camera.location
    camera.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()
    camera.data.type = "ORTHO"
    camera.data.ortho_scale = 12.5
    bpy.context.scene.camera = camera

    def area_light(name, location, energy, size, color):
        bpy.ops.object.light_add(type="AREA", location=location)
        light = bpy.context.object
        light.name = name
        light.data.energy = energy
        light.data.shape = "DISK"
        light.data.size = size
        light.data.color = color
        light.rotation_euler = (Vector((0, 0, 0)) - light.location).to_track_quat("-Z", "Y").to_euler()

    area_light("Key_Cool", (2, -4, 9), 1500, 7, (0.58, 0.78, 1.0))
    area_light("Rim_Cyan", (-7, 1, 3), 1100, 6, (0.08, 0.55, 1.0))
    area_light("Warm_Fill", (5, 5, 4), 900, 5, (1.0, 0.52, 0.22))

    scene = bpy.context.scene
    scene.render.engine = "BLENDER_WORKBENCH"
    scene.display.shading.light = "STUDIO"
    scene.display.shading.studio_light = "paint.sl"
    scene.display.shading.color_type = "MATERIAL"
    scene.display.shading.show_shadows = True
    scene.display.shading.show_cavity = True
    scene.display.shading.cavity_type = "BOTH"
    scene.display.shading.show_specular_highlight = True
    scene.render.resolution_x = 1200
    scene.render.resolution_y = 900
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = "PNG"
    scene.render.film_transparent = False
    scene.render.filepath = os.path.join(output_dir, "aether-nova-interceptor-preview.png")

    # Select ship meshes only before export; camera/lights are not part of the GLB.
    bpy.ops.object.select_all(action="DESELECT")
    for obj in scene.objects:
        if obj.type == "MESH":
            obj.select_set(True)
    bpy.context.view_layer.objects.active = next(obj for obj in scene.objects if obj.name == "01_Central_Armored_Hull")

    os.makedirs(output_dir, exist_ok=True)
    bpy.ops.wm.save_as_mainfile(filepath=os.path.join(output_dir, "aether-nova-interceptor.blend"))
    bpy.ops.export_scene.gltf(filepath=os.path.join(output_dir, "aether-nova-interceptor.glb"),
                              export_format="GLB", use_selection=True, export_apply=True)
    scene.render.filepath = os.path.join(output_dir, "aether-nova-interceptor-preview.png")
    bpy.ops.render.render(write_still=True)


def main():
    args = arguments()
    output_dir = os.path.abspath(args.output_dir)
    setup_scene(output_dir)
    print("AETHER NOVA asset generation completed:", output_dir)


if __name__ == "__main__":
    main()
