"""AETHER NOVA — Valkyrie interceptor, refined production-style prototype.
Blender background generator. Outputs editable .blend, .glb and preview .png.
"""
import argparse, math, os, sys
import bpy
from mathutils import Vector

def arguments():
    argv=sys.argv[sys.argv.index("--")+1:] if "--" in sys.argv else []
    p=argparse.ArgumentParser(); p.add_argument("--output-dir",default="dist"); p.add_argument("--hdri",default="")
    return p.parse_args(argv)

def mat(name,color,metal=0.0,rough=.35,emission=None,strength=0):
    m=bpy.data.materials.new(name); m.diffuse_color=(*color,1); m.use_nodes=True
    b=m.node_tree.nodes.get("Principled BSDF")
    b.inputs["Base Color"].default_value=(*color,1); b.inputs["Metallic"].default_value=metal
    b.inputs["Roughness"].default_value=rough
    if emission:
        b.inputs["Emission Color"].default_value=(*emission,1); b.inputs["Emission Strength"].default_value=strength
    # Subtle procedural micro-roughness and normal breakup for close-up aerospace surfaces.
    # Keep glass and emissive materials clean; only apply to metallic hull/armor families.
    if metal >= 0.70 and rough <= 0.30:
        nodes=m.node_tree.nodes; links=m.node_tree.links
        noise=nodes.new("ShaderNodeTexNoise"); noise.name="AETHER Micro Surface Grain"
        noise.inputs["Scale"].default_value=185.0
        noise.inputs["Detail"].default_value=2.0
        noise.inputs["Roughness"].default_value=0.72
        bump=nodes.new("ShaderNodeBump"); bump.name="AETHER Subtle Machined Texture"
        bump.inputs["Strength"].default_value=0.12
        bump.inputs["Distance"].default_value=0.012
        links.new(noise.outputs["Fac"],bump.inputs["Height"])
        links.new(bump.outputs["Normal"],b.inputs["Normal"])
        noise.location=(-420,-180); bump.location=(-180,-180); b.location=(80,80)
    return m

def finish(obj,name,material,bevel=0.04,smooth=False):
    obj.name=name
    if material: obj.data.materials.append(material)
    if bevel:
        mod=obj.modifiers.new("Precision edge radii","BEVEL"); mod.width=bevel; mod.segments=3
        obj.modifiers.new("Machined normals","WEIGHTED_NORMAL")
    if smooth:
        for p in obj.data.polygons: p.use_smooth=True
    return obj

def cube(name,loc,scale,m,bevel=.05):
    bpy.ops.mesh.primitive_cube_add(size=1,location=loc); o=bpy.context.object; o.dimensions=scale
    bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
    return finish(o,name,m,bevel)

def sphere(name,loc,scale,m):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=32,ring_count=16,location=loc)
    o=bpy.context.object; o.scale=scale
    return finish(o,name,m,0,True)

def cylinder(name,loc,radius,depth,m,axis="Y",vertices=32):
    rot=(math.pi/2,0,0) if axis=="Y" else ((0,math.pi/2,0) if axis=="X" else (0,0,0))
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices,radius=radius,depth=depth,location=loc,rotation=rot)
    return finish(bpy.context.object,name,m,.025,True)

def cone(name,loc,r1,r2,depth,m,axis="Y"):
    rot=(math.pi/2,0,0) if axis=="Y" else (0,0,0)
    bpy.ops.mesh.primitive_cone_add(vertices=32,radius1=r1,radius2=r2,depth=depth,location=loc,rotation=rot)
    return finish(bpy.context.object,name,m,.025,True)

def prism(name,outline,z0,z1,m,bevel=.06):
    n=len(outline); verts=[(x,y,z) for z in (z0,z1) for x,y in outline]
    faces=[tuple(range(n-1,-1,-1)),tuple(range(n,2*n))]
    for i in range(n): faces.append((i,(i+1)%n,(i+1)%n+n,i+n))
    me=bpy.data.meshes.new(name+"Mesh"); me.from_pydata(verts,[],faces); me.materials.append(m); me.update()
    ob=bpy.data.objects.new(name,me); bpy.context.collection.objects.link(ob)
    if bevel:
        b=ob.modifiers.new("Aerodynamic softened edges","BEVEL"); b.width=bevel; b.segments=4
        ob.modifiers.new("Weighted normals","WEIGHTED_NORMAL")
    return ob

def beam_between(name,a,b,width,depth,m):
    mid=(Vector(a)+Vector(b))/2; vec=Vector(b)-Vector(a)
    bpy.ops.mesh.primitive_cube_add(size=1,location=mid); o=bpy.context.object
    o.dimensions=(width,vec.length,depth); o.rotation_euler=vec.to_track_quat("Y","Z").to_euler()
    bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
    return finish(o,name,m,.025)

def create_ship(M):
    hull,armor,edge,dark,glass,cyan,amber,glow=M

    # Valkyrie redesign v2: one coherent, wide stealth interceptor.
    # Nose points +Y; X is span; Z is vertical.
    def solid(name, outline, z0, z1, material, bevel=.08):
        n=len(outline)
        verts=[(x,y,z0) for x,y in outline]+[(x,y,z1) for x,y in outline]
        faces=[tuple(range(n-1,-1,-1)),tuple(range(n,2*n))]
        for i in range(n):
            faces.append((i,(i+1)%n,(i+1)%n+n,i+n))
        me=bpy.data.meshes.new(name+"_mesh")
        me.from_pydata(verts,[],faces); me.materials.append(material); me.update()
        ob=bpy.data.objects.new(name,me); bpy.context.collection.objects.link(ob)
        if bevel:
            mod=ob.modifiers.new("Sculpted aerospace edge radii","BEVEL")
            mod.width=bevel; mod.segments=5
            ob.modifiers.new("Weighted aerospace normals","WEIGHTED_NORMAL")
        return ob

    def loft(name, sections, material, sides=32):
        # Smooth elliptical loft; each section is (y, half_width, half_height, z_center).
        verts=[]; faces=[]
        for y,rx,rz,zc in sections:
            for i in range(sides):
                a=2*math.pi*i/sides
                verts.append((rx*math.cos(a),y,zc+rz*math.sin(a)))
        for j in range(len(sections)-1):
            for i in range(sides):
                a=j*sides+i; b=j*sides+(i+1)%sides
                faces.append((a,b,b+sides,a+sides))
        faces.extend([tuple(range(sides-1,-1,-1)),
                      tuple(range((len(sections)-1)*sides,len(sections)*sides))])
        mesh=bpy.data.meshes.new(name+"_mesh")
        mesh.from_pydata(verts,[],faces); mesh.materials.append(material); mesh.update()
        ob=bpy.data.objects.new(name,mesh); bpy.context.collection.objects.link(ob)
        for poly in mesh.polygons: poly.use_smooth=True
        ob.modifiers.new("Precision weighted normals","WEIGHTED_NORMAL")
        return ob

    def panel_pair(name, outline, z0, z1, material, bevel=.06):
        solid(name+"_PORT",[(-x,y) for x,y in outline],z0,z1,material,bevel)
        solid(name+"_STARBOARD",outline,z0,z1,material,bevel)

    # Broad, continuous center hull: wider shoulders and a long tapered nose.
    loft("01_WIDE_CONTINUOUS_ARMORED_FUSELAGE",[
        (-4.55,.22,.20,.04),(-4.15,.62,.38,.06),(-3.35,1.02,.53,.08),
        (-2.35,1.36,.64,.10),(-1.15,1.52,.70,.12),(.15,1.48,.72,.15),
        (1.25,1.27,.68,.18),(2.25,.98,.58,.20),(3.25,.66,.43,.18),
        (4.15,.30,.22,.12),(4.48,.035,.055,.10)],hull)

    # The signature manta / delta wing is a thick structural lifting surface.
    wing=[(-.72,2.62),(.72,2.62),(1.42,1.82),(2.42,.96),
          (5.18,-1.18),(5.52,-1.88),(5.30,-2.54),(4.66,-2.48),
          (3.22,-1.92),(1.78,-1.43),(.78,-1.18),(-.78,-1.18),
          (-1.78,-1.43),(-3.22,-1.92),(-4.66,-2.48),(-5.30,-2.54),
          (-5.52,-1.88),(-5.18,-1.18),(-2.42,.96),(-1.42,1.82)]
    solid("02_SINGLE_SCULPTED_MANTA_DELTA_WING",wing,-.22,.28,armor,.16)

    # Wide graphite armor shoulders merge the wing into the fuselage.
    shoulder=[(.82,1.82),(1.48,1.32),(4.88,-1.28),(5.02,-1.86),
              (4.42,-2.02),(3.18,-1.48),(1.68,-.72),(.88,-.42)]
    panel_pair("03_INTEGRATED_GRAPHITE_SHOULDER_ARMOR",shoulder,.30,.43,dark,.075)

    # Central upper deck: layered, but deliberately uncluttered.
    solid("04_DORSAL_PLATINUM_SPINE",
          [(-.76,-2.82),(.76,-2.82),(.65,.72),(.43,2.70),
           (-.43,2.70),(-.65,.72)],.48,.67,edge,.09)
    solid("05_DORSAL_CARBON_INLAY",
          [(-.47,-2.48),(.47,-2.48),(.36,.76),(.24,2.40),
           (-.24,2.40),(-.36,.76)],.66,.73,dark,.045)

    # Long faceted cockpit canopy; no spherical bubble.
    loft("06_LONG_GOLD_TINTED_COCKPIT_CANOPY",[
        (1.55,.20,.10,.70),(1.82,.40,.20,.76),(2.25,.49,.25,.79),
        (3.05,.43,.23,.76),(3.72,.27,.16,.68),(4.02,.045,.055,.61)],glass,24)
    beam_between("CANOPY_GOLD_PORT",(-.34,1.82,.78),(-.11,3.88,.68),.065,.055,amber)
    beam_between("CANOPY_GOLD_STARBOARD",(.34,1.82,.78),(.11,3.88,.68),.065,.055,amber)
    beam_between("CANOPY_REAR_ARMOR_BROW",(-.40,1.75,.82),(.40,1.75,.82),.075,.065,edge)
    beam_between("CANOPY_FRONT_NOSE_RIDGE",(-.10,3.82,.69),(.10,3.82,.69),.045,.04,edge)

    # Blue recessed ion apertures along each side of the central wing.
    for s,side in [(-1,"PORT"),(1,"STARBOARD")]:
        solid(side+"_ION_APERTURE_BEZEL",
              [(s*1.30,.48),(s*1.64,.23),(s*2.72,-.58),(s*2.94,-.92),
               (s*2.62,-.98),(s*1.48,-.27)],.36,.48,dark,.07)
        beam_between(side+"_ION_BLUE_LIGHT",(s*1.55,.13,.49),(s*2.70,-.76,.49),.12,.075,cyan)
        # Restrained silver leading edge and two panel breaks.
        beam_between(side+"_SILVER_LEADING_EDGE",(s*.88,2.38,.34),(s*5.12,-1.95,.30),.16,.11,edge)
        beam_between(side+"_OUTER_ARMOR_RIDGE",(s*2.15,.72,.38),(s*4.75,-1.95,.37),.11,.075,dark)
        beam_between(side+"_WINGTIP_CYAN_MARK",(s*5.10,-2.04,.30),(s*5.36,-2.34,.27),.075,.05,cyan)
        for k in range(2):
            beam_between(side+"_PANEL_SEAM_"+str(k),
                         (s*(2.35+k*.55),-.12-k*.24,.31),
                         (s*(2.82+k*.55),-.56-k*.27,.31),.025,.018,edge)

    # Geometry Nodes: small machined cooling ribs on the aft deck, not across the silhouette.
    group=bpy.data.node_groups.new("AETHER | Valkyrie cooling ribs","GeometryNodeTree")
    group.interface.new_socket(name="Geometry",in_out="INPUT",socket_type="NodeSocketGeometry")
    group.interface.new_socket(name="Geometry",in_out="OUTPUT",socket_type="NodeSocketGeometry")
    nodes=group.nodes; links=group.links
    gi=nodes.new("NodeGroupInput"); gi.location=(-500,100)
    go=nodes.new("NodeGroupOutput"); go.location=(420,100)
    line=nodes.new("GeometryNodeMeshLine"); line.location=(-500,-100)
    line.inputs["Count"].default_value=5
    line.inputs["Start Location"].default_value=(-.34,0,0)
    line.inputs["Offset"].default_value=(.17,0,0)
    block=nodes.new("GeometryNodeMeshCube"); block.location=(-500,-300)
    block.inputs["Size"].default_value=(.045,.34,.018)
    inst=nodes.new("GeometryNodeInstanceOnPoints"); inst.location=(-220,-100)
    realize=nodes.new("GeometryNodeRealizeInstances"); realize.location=(-20,-100)
    setmat=nodes.new("GeometryNodeSetMaterial"); setmat.location=(180,-100)
    setmat.inputs["Material"].default_value=edge
    join=nodes.new("GeometryNodeJoinGeometry"); join.location=(220,100)
    links.new(line.outputs["Mesh"],inst.inputs["Points"])
    links.new(block.outputs["Mesh"],inst.inputs["Instance"])
    links.new(inst.outputs["Instances"],realize.inputs["Geometry"])
    links.new(realize.outputs["Geometry"],setmat.inputs["Geometry"])
    links.new(setmat.outputs["Geometry"],join.inputs["Geometry"])
    links.new(gi.outputs["Geometry"],join.inputs["Geometry"])
    links.new(join.outputs["Geometry"],go.inputs["Geometry"])
    ribmesh=bpy.data.meshes.new("VALKYRIE_COOLING_RIBS_EMPTY")
    ribs=bpy.data.objects.new("07_PROCEDURAL_AFT_COOLING_RIBS",ribmesh)
    bpy.context.collection.objects.link(ribs); ribs.location=(0,-2.15,.72)
    mod=ribs.modifiers.new("Geometry Nodes | Cooling ribs","NODES"); mod.node_group=group

    # Twin integrated engine nacelles, nozzles and luminous reactor cores.
    for s,side in [(-1,"PORT"),(1,"STARBOARD")]:
        x=s*1.03
        loft(side+"_ARMORED_ENGINE_NACELLE",[
            (-4.28,.36,.30,-.03),(-3.92,.53,.40,-.02),
            (-3.18,.57,.43,.00),(-2.30,.48,.36,.02),
            (-1.78,.32,.25,.04)],hull,24)
        cylinder(side+"_PLATINUM_NOZZLE_RIM",(x,-4.18,-.03),.36,.16,edge,axis="Y")
        cylinder(side+"_CARBON_NOZZLE",(x,-4.29,-.03),.275,.12,dark,axis="Y")
        cylinder(side+"_BLUE_REACTOR_CORE",(x,-4.37,-.03),.18,.10,glow,axis="Y")
        sphere(side+"_ENGINE_ION_AURA",(x,-4.43,-.03),(.17,.06,.17),cyan)
        # Raised engine shoulders flow into the wing roots.
        solid(side+"_ENGINE_SHOULDER_ARMOR",
              [(s*.70,-3.35),(s*1.58,-3.08),(s*1.74,-1.45),
               (s*1.38,-.52),(s*.82,-.18)],.30,.52,armor,.09)
        # Retractable articulated landing gear.
        beam_between(side+"_GEAR_MAIN_STRUT",(s*.88,-1.10,-.48),(s*.98,-1.20,-1.10),.15,.14,edge)
        beam_between(side+"_GEAR_FORK",(s*.98,-1.20,-1.06),(s*.98,-1.35,-1.22),.09,.09,dark)
        cylinder(side+"_LANDING_WHEEL",(s*.98,-1.31,-1.20),.19,.16,dark,axis="X")
        cylinder(side+"_WHEEL_HUB",(s*.98,-1.31,-1.20),.085,.18,edge,axis="X")

    # Nose landing gear and chin armor.
    beam_between("NOSE_GEAR_STRUT",(0,2.42,-.30),(0,2.55,-.92),.14,.14,edge)
    cylinder("NOSE_LANDING_WHEEL",(0,2.58,-1.00),.16,.13,dark,axis="X")
    solid("08_ARMORED_CHIN",[(-.40,2.20),(.40,2.20),(.25,4.18),(-.25,4.18)],
          -.31,-.12,dark,.06)
    sphere("NOSE_RANGE_SENSOR",(0,4.02,.18),(.12,.18,.10),amber)

    # Recessed side cannons, mounted flush beneath the wing shoulders.
    for s,side in [(-1,"PORT"),(1,"STARBOARD")]:
        beam_between(side+"_INTEGRATED_CANNON",(s*2.55,-.76,-.02),(s*2.90,-1.72,-.02),.13,.12,dark)
        cylinder(side+"_CANNON_MUZZLE",(s*2.90,-1.75,-.02),.105,.18,edge,axis="Y")
        beam_between(side+"_CANNON_ARMOR_FAIRING",(s*2.40,-.64,.10),(s*2.78,-1.60,.10),.25,.20,armor)

    # Small canted rear stabilizers, subordinate to the main manta wing.
    for s,side in [(-1,"PORT"),(1,"STARBOARD")]:
        solid(side+"_REAR_CANTED_FIN",
              [(s*.72,-2.20),(s*1.52,-3.58),(s*1.18,-3.82),(s*.56,-2.82)],
              .18,.70,dark,.06)
        beam_between(side+"_FIN_CYAN_EDGE",(s*.86,-2.56,.73),(s*1.38,-3.48,.70),.055,.045,cyan)

    # Clean underside center armor and subtle unit marking.
    solid("09_VENTRAL_CENTER_ARMOR",[(-.70,-3.05),(.70,-3.05),(.55,1.72),(-.55,1.72)],
          -.66,-.43,dark,.08)
    mark_curve=bpy.data.curves.new("VALKYRIE_UNIT_MARKING_FONT","FONT")
    mark_curve.body="05"; mark_curve.size=.68; mark_curve.extrude=.003
    mark_curve.align_x="CENTER"; mark_curve.align_y="CENTER"
    mark=bpy.data.objects.new("STARBOARD_WING_UNIT_MARKING_05",mark_curve)
    bpy.context.collection.objects.link(mark)
    mark.location=(4.05,-1.04,.36); mark.rotation_euler[2]=math.radians(72)
    mark.data.materials.append(edge)

def setup(out, hdri_path=""):
    bpy.ops.object.select_all(action="SELECT"); bpy.ops.object.delete(use_global=False)
    hull=mat("01 Deep aerospace titanium",(0.055,.095,.15),.82,.25)
    armor=mat("02 Ceramic silver armor",(.34,.46,.57),.78,.27)
    edge=mat("03 Brushed platinum",(.62,.73,.80),.84,.22)
    dark=mat("04 Carbon graphite",(.009,.018,.03),.52,.31)
    glass=mat("05 Sapphire canopy",(.006,.12,.20),.78,.12,(.0,.18,.32),.35)
    cyan=mat("06 Ion cyan",(.005,.48,.72),.35,.2,(.0,.55,1),3.2)
    amber=mat("07 Amber identifiers",(.95,.31,.035),.58,.24,(1,.19,.015),1.4)
    glow=mat("08 Reactor plasma",(.02,.35,.8),.2,.2,(.0,.38,1),4.0)
    create_ship((hull,armor,edge,dark,glass,cyan,amber,glow))

    world=bpy.data.worlds.new("AETHER NOVA | Deep space studio"); bpy.context.scene.world=world
    world.use_nodes=True
    world_nodes=world.node_tree.nodes; world_links=world.node_tree.links
    background=world_nodes.get("Background")
    background.inputs[0].default_value=(.006,.014,.032,1)
    background.inputs[1].default_value=.35
    if hdri_path and os.path.isfile(hdri_path):
        env=world_nodes.new("ShaderNodeTexEnvironment"); env.name="Poly Haven Studio Small 03 HDRI"
        env.image=bpy.data.images.load(hdri_path,check_existing=True)
        env.interpolation="Linear"
        env.image.pack()
        world_links.new(env.outputs["Color"],background.inputs["Color"])
        background.inputs["Strength"].default_value=.28
    # Camera now looks toward the nose, showing the cockpit and forward silhouette.
    bpy.ops.object.camera_add(location=(10,12,9))
    cam=bpy.context.object; cam.name="VALKYRIE_HERO_CAMERA"
    cam.rotation_euler=(Vector((0,0,0))-cam.location).to_track_quat("-Z","Y").to_euler()
    cam.data.type="ORTHO"; cam.data.ortho_scale=12.8; bpy.context.scene.camera=cam
    def light(name,loc,power,size,color):
        bpy.ops.object.light_add(type="AREA",location=loc); o=bpy.context.object; o.name=name
        o.data.energy=power; o.data.shape="DISK"; o.data.size=size; o.data.color=color
        o.rotation_euler=(Vector((0,0,0))-o.location).to_track_quat("-Z","Y").to_euler()
    light("Cool key",(1,4,10),1700,8,(.55,.76,1))
    light("Cyan rim",(-7,1,4),1300,6,(.08,.48,1))
    light("Warm edge",(5,-5,3),950,5,(1,.38,.16))
    scene=bpy.context.scene
    # Studio floor and physically lit presentation render, matching the cool blue reference studio.
    floor_mat=mat("09 Studio blue-grey floor",(.105,.19,.29),.18,.48)
    bpy.ops.mesh.primitive_plane_add(size=200,location=(0,0,-1.42))
    floor=bpy.context.object; floor.name="STUDIO_GROUND"; floor.data.materials.append(floor_mat)
    scene.render.engine="BLENDER_EEVEE"
    scene.render.resolution_x=1600; scene.render.resolution_y=1200; scene.render.resolution_percentage=100
    scene.render.image_settings.file_format="PNG"; scene.render.film_transparent=False
    scene.render.image_settings.color_mode="RGBA"
    scene.view_settings.view_transform="AgX"
    scene.view_settings.look="AgX - Medium High Contrast"
    scene.render.image_settings.file_format="PNG"; scene.render.film_transparent=False
    os.makedirs(out,exist_ok=True)
    scene.render.filepath=os.path.join(out,"aether-nova-interceptor-preview.png")
    bpy.ops.object.select_all(action="DESELECT")
    for o in scene.objects:
        if o.type=="MESH" and o.name!="STUDIO_GROUND": o.select_set(True)
    active_body = bpy.data.objects.get("01_CONTINUOUS_STEALTH_FUSELAGE")
    if active_body is None:
        raise RuntimeError("Expected Valkyrie body mesh was not created")
    bpy.context.view_layer.objects.active = active_body
    bpy.ops.wm.save_as_mainfile(filepath=os.path.join(out,"aether-nova-interceptor.blend"))
    bpy.ops.export_scene.gltf(filepath=os.path.join(out,"aether-nova-interceptor.glb"),export_format="GLB",use_selection=True,export_apply=True)
    bpy.ops.render.render(write_still=True)

if __name__=="__main__":
    a=arguments(); setup(os.path.abspath(a.output_dir),os.path.abspath(a.hdri) if a.hdri else ""); print("Valkyrie refined asset generated")
