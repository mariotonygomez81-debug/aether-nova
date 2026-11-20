"""AETHER NOVA — Valkyrie interceptor, refined production-style prototype.
Blender background generator. Outputs editable .blend, .glb and preview .png.
"""
import argparse, math, os, sys
import bpy
from mathutils import Vector

def arguments():
    argv=sys.argv[sys.argv.index("--")+1:] if "--" in sys.argv else []
    p=argparse.ArgumentParser(); p.add_argument("--output-dir",default="dist")
    return p.parse_args(argv)

def mat(name,color,metal=0.0,rough=.35,emission=None,strength=0):
    m=bpy.data.materials.new(name); m.diffuse_color=(*color,1); m.use_nodes=True
    b=m.node_tree.nodes.get("Principled BSDF")
    b.inputs["Base Color"].default_value=(*color,1); b.inputs["Metallic"].default_value=metal
    b.inputs["Roughness"].default_value=rough
    if emission:
        b.inputs["Emission Color"].default_value=(*emission,1); b.inputs["Emission Strength"].default_value=strength
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
    rot=(math.pi/2,0,0) if axis=="Y" else (0,0,0)
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
    # Long, sculpted central fuselage: nose points +Y.
    rings=[(-4.0,.42,.38),(-3.1,.67,.52),(-1.5,.82,.62),(0.4,.76,.57),(2.1,.53,.42),(3.7,.20,.22),(4.25,.035,.06)]
    profile=[(0,1),(.72,.58),(1,0),(.72,-.58),(0,-1),(-.72,-.58),(-1,0),(-.72,.58)]
    v=[(x*rx,y,z*rz) for y,rx,rz in rings for x,z in profile]
    f=[]
    for r in range(len(rings)-1):
        for i in range(8): f.append((r*8+i,r*8+(i+1)%8,(r+1)*8+(i+1)%8,(r+1)*8+i))
    f.extend([tuple(range(7,-1,-1)),tuple(range((len(rings)-1)*8,len(rings)*8))])
    me=bpy.data.meshes.new("ValkyrieFuselageMesh"); me.from_pydata(v,[],f); me.materials.append(hull); me.update()
    ob=bpy.data.objects.new("01_MONOCOQUE_TITANIUM_FUSELAGE",me); bpy.context.collection.objects.link(ob)
    bevel=ob.modifiers.new("Hull edge glints","BEVEL"); bevel.width=.035; bevel.segments=3
    ob.modifiers.new("Hull weighted normals","WEIGHTED_NORMAL")

    # Swept, sharply tapered wings with real thickness and layered armor.
    wing=[(.48,2.35),(1.0,1.75),(4.65,-1.45),(4.95,-2.55),(4.35,-2.45),(1.15,-1.45),(.62,-.55)]
    for s,label in [(-1,"PORT"),(1,"STARBOARD")]:
        prism(label+"_DELTA_AEROFOIL",[(s*x,y) for x,y in wing],-.16,.16,armor,.075)
        # Root shoulder and segmented upper armor.
        prism(label+"_SHOULDER_PLATE",[(s*x,y) for x,y in [(.65,1.45),(1.45,.9),(2.45,-.1),(1.35,-.65),(.72,.05)]],.17,.25,hull,.045)
        # Outer swept leading-edge rail.
        beam_between(label+"_LEADING_EDGE_RAIL",(s*.78,1.95,.20),(s*4.7,-1.55,.18),.11,.09,edge)
        # Weapon pod, flush-mounted, not oversized bricks.
        podx=s*2.25
        cube(label+"_UNDERWING_WEAPON_POD",(podx,-.92,-.28),(.38,1.5,.30),dark,.13)
        cone(label+"_POD_NOSE",(podx,-.10,-.28),.16,.02,.28,edge)
        # Fine illuminated wing strip and wingtip position lights.
        beam_between(label+"_ION_INLAY",(s*1.55,-.28,.265),(s*3.75,-1.95,.235),.035,.025,cyan)
        sphere(label+"_NAV_LIGHT",(s*4.42,-2.18,.22),(.12,.16,.075),amber)
        # Small control-surface segmentation.
        beam_between(label+"_AILERON_SEAM",(s*2.55,-1.18,.19),(s*4.2,-2.12,.19),.025,.018,dark)

    # Raised dorsal spine and cockpit with angular armored surround.
    prism("DORSAL_SPINE", [(-.32,-2.05),(.32,-2.05),(.42,.72),(.28,1.8),(-.28,1.8),(-.42,.72)],.48,.68,edge,.06)
    sphere("COCKPIT_ARMORED_COLLAR",(0,1.12,.62),(.56,1.12,.35),dark)
    sphere("PANORAMIC_POLARIZED_CANOPY",(0,1.22,.73),(.46,.91,.285),glass)
    # Canopy center divider and forward sensor.
    cube("CANOPY_SPINE",(0,1.22,1.005),(.035,1.42,.025),cyan,.012)
    sphere("NOSE_SENSOR",(0,3.52,.20),(.13,.19,.12),amber)
    # Twin side intakes, turbine rings and deep luminous exhausts.
    for s,label in [(-1,"PORT"),(1,"STARBOARD")]:
        x=s*.62
        # tapered engine nacelles
        cone(label+"_ENGINE_NACELLE",(x,-2.65,-.12),.38,.29,1.8,dark)
        cylinder(label+"_EXHAUST_OUTER_RIM",(x,-3.62,-.12),. thirty if False else . thirty, .1, edge)
        cylinder(label+"_EXHAUST_RIM",(x,-3.66,-.12),.30,.16,edge)
        cylinder(label+"_THRUSTER_CORE",(x,-3.77,-.12),.205,.10,glow)
        sphere(label+"_PLASMA_GLOW",(x,-3.84,-.12),(.19,.07,.19),cyan)
        # Intake lips toward the nose.
        cylinder(label+"_SIDE_INTAKE",(s*.83,1.25,-.02),.22,.12,edge)
        sphere(label+"_INTAKE_DARK",(s*.83,1.32,-.02),(.15,.055,.15),dark)
        # Ventral landing/armor fins.
        prism(label+"_VENTRAL_FIN",[(s*.72,-2.0),(s*1.05,-2.55),(s*.92,-3.35),(s*.65,-3.05)],-.58,-.20,hull,.04)

    # Twin forward pulse cannons integrated into the nose shoulders.
    for s,label in [(-1,"PORT"),(1,"STARBOARD")]:
        x=s*. forty if False else s*.43
        cylinder(label+"_PULSE_CANNON",(x,2.0,-.20),.105,.95,dark)
        cylinder(label+"_MUZZLE_RING",(x,2.49,-.20),.13,.12,edge)
        sphere(label+"_MUZZLE_ENERGY",(x,2.57,-.20),(.085,.07,.085),cyan)

    # Tail fins and dorsal engine vents.
    for s,label in [(-1,"PORT"),(1,"STARBOARD")]:
        prism(label+"_TAIL_FIN",[(s*.48,-2.0),(s*1.12,-3.35),(s*.72,-3.05),(s*.40,-2.35)],.12,.82,hull,.045)
        beam_between(label+"_FIN_LIGHT",(s*.62,-2.45,.72),(s*.88,-3.03,.52),.035,.03,cyan)
    for i in range(5):
        cube("DORSAL_HEAT_VENT_%02d"%i,((i-2)*.115,-1.75,.70),(.055,.46,.035),dark,.012)

def setup(out):
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
    world.use_nodes=True; world.node_tree.nodes["Background"].inputs[0].default_value=(.006,.014,.032,1)
    world.node_tree.nodes["Background"].inputs[1].default_value=.35
    # Camera now looks toward the nose, showing the cockpit and forward silhouette.
    bpy.ops.object.camera_add(location=(10,12,9))
    cam=bpy.context.object; cam.name="VALKYRIE_HERO_CAMERA"
    cam.rotation_euler=(Vector((0,0,0))-cam.location).to_track_quat("-Z","Y").to_euler()
    cam.data.type="ORTHO"; cam.data.ortho_scale=11.8; bpy.context.scene.camera=cam
    def light(name,loc,power,size,color):
        bpy.ops.object.light_add(type="AREA",location=loc); o=bpy.context.object; o.name=name
        o.data.energy=power; o.data.shape="DISK"; o.data.size=size; o.data.color=color
        o.rotation_euler=(Vector((0,0,0))-o.location).to_track_quat("-Z","Y").to_euler()
    light("Cool key",(1,4,10),1700,8,(.55,.76,1))
    light("Cyan rim",(-7,1,4),1300,6,(.08,.48,1))
    light("Warm edge",(5,-5,3),950,5,(1,.38,.16))
    scene=bpy.context.scene; scene.render.engine="BLENDER_WORKBENCH"
    scene.display.shading.light="STUDIO"; scene.display.shading.studio_light="paint.sl"
    scene.display.shading.color_type="MATERIAL"; scene.display.shading.show_shadows=True
    scene.display.shading.show_cavity=True; scene.display.shading.cavity_type="BOTH"
    scene.display.shading.show_specular_highlight=True
    scene.render.resolution_x=1400; scene.render.resolution_y=1050; scene.render.resolution_percentage=100
    scene.render.image_settings.file_format="PNG"; scene.render.film_transparent=False
    os.makedirs(out,exist_ok=True)
    scene.render.filepath=os.path.join(out,"aether-nova-interceptor-preview.png")
    bpy.ops.object.select_all(action="DESELECT")
    for o in scene.objects:
        if o.type=="MESH": o.select_set(True)
    bpy.context.view_layer.objects.active=next(o for o in scene.objects if o.name=="01_MONOCOQUE_TITANIUM_FUSELAGE")
    bpy.ops.wm.save_as_mainfile(filepath=os.path.join(out,"aether-nova-interceptor.blend"))
    bpy.ops.export_scene.gltf(filepath=os.path.join(out,"aether-nova-interceptor.glb"),export_format="GLB",use_selection=True,export_apply=True)
    bpy.ops.render.render(write_still=True)

if __name__=="__main__":
    a=arguments(); setup(os.path.abspath(a.output_dir)); print("Valkyrie refined asset generated")
