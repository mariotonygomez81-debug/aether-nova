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

    # Reference silhouette: broad stealth lifting-body, needle nose and swept manta wings.
    # Nose points +Y; top is +Z.
    rings=[(-4.35,.32,.30),(-3.65,.68,.43),(-2.5,1.05,.58),(-1.0,1.22,.67),
           (.25,1.12,.72),(1.55,.82,.67),(2.75,.53,.48),(3.75,.26,.28),(4.25,.035,.08)]
    profile=[(0,1),(.5,.88),(.88,.55),(1,0),(.88,-.55),(.5,-.88),(0,-1),
             (-.5,-.88),(-.88,-.55),(-1,0),(-.88,.55),(-.5,.88)]
    verts=[(x*rx,y,z*rz) for y,rx,rz in rings for x,z in profile]
    faces=[]
    for r in range(len(rings)-1):
        for i in range(len(profile)):
            a=r*len(profile)+i; b=r*len(profile)+(i+1)%len(profile)
            faces.append((a,b,b+len(profile),a+len(profile)))
    faces.extend([tuple(range(len(profile)-1,-1,-1)),
                  tuple(range((len(rings)-1)*len(profile),len(rings)*len(profile)))])
    me=bpy.data.meshes.new("Valkyrie_LiftingBody_Mesh"); me.from_pydata(verts,[],faces)
    me.materials.append(hull); me.update()
    body=bpy.data.objects.new("01_STEALTH_LIFTING_BODY",me); bpy.context.collection.objects.link(body)
    body.modifiers.new("Precision hull normals","WEIGHTED_NORMAL")

    # Wide, integrated swept wings; their silhouette is deliberately close to the supplied reference.
    wing=[(.58,2.15),(1.18,2.55),(2.45,2.12),(4.55,1.05),(5.35,-.55),
          (5.05,-1.85),(4.35,-2.12),(2.45,-1.55),(1.20,-1.12),(.62,-.25)]
    for s,label in [(-1,"PORT"),(1,"STARBOARD")]:
        pts=[(s*x,y) for x,y in wing]
        prism(label+"_MONOWING_AEROFOIL",pts,-.10,.22,armor,.11)
        # Dark upper wing panels and stepped silver leading-edge armor.
        panel=[(.88,1.78),(1.42,2.12),(4.72,.75),(5.02,-.58),(4.40,-.40),(2.10,.68),(1.05,.32)]
        prism(label+"_GRAPHITE_TOP_PANEL",[(s*x,y) for x,y in panel],.225,.29,dark,.065)
        beam_between(label+"_SILVER_LEADING_EDGE",(s*.86,2.18,.27),(s*4.95,-.55,.30),.14,.10,edge)
        beam_between(label+"_OUTER_WING_RIB",(s*2.0,1.45,.31),(s*4.78,-1.25,.31),.075,.045,armor)
        # Blue recessed ion window on the shoulder, matching the luminous flank in the reference.
        cube(label+"_BLUE_ION_RECESS",(s*1.18,-.12,.22),(.12,1.42,.30),dark,.13)
        cube(label+"_BLUE_ION_CORE",(s*1.255,-.12,.235),(.045,1.12,.16),cyan,.075)
        # Small blue edge markers.
        beam_between(label+"_WINGTIP_LIGHT",(s*4.86,-1.35,.32),(s*5.03,-1.68,.30),.055,.05,cyan)
        # Surface panel seams.
        for j in range(3):
            beam_between(label+"_PANEL_SEAM_"+str(j),(s*(2.0+j*.58),.95-j*.35,.305),
                         (s*(2.65+j*.58),.35-j*.38,.305),.025,.018,dark)
        # Integrated side weapon hardpoint and slim cannon.
        cube(label+"_FLUSH_WEAPON_BAY",(s*2.55,-.75,-.19),(.38,1.05,.18),dark,.09)
        cylinder(label+"_WING_CANNON",(s*2.65,-.02,-.23),.075,.82,edge)
        sphere(label+"_WING_MUZZLE",(s*2.65,.40,-.23),(.085,.08,.085),cyan)

    # Raised dorsal spine with layered ceramic armor.
    prism("DORSAL_CERAMIC_SPINE",[(-.36,-2.55),(.36,-2.55),(.55,-.55),(.43,1.45),
          (.28,2.55),(-.28,2.55),(-.43,1.45),(-.55,-.55)],.60,.79,edge,.075)
    prism("DORSAL_GRAPHITE_INLAY",[(-.22,-2.15),(.22,-2.15),(.30,-.25),(.22,1.72),
          (-.22,1.72),(-.30,-.25)],.79,.84,dark,.035)
    for i in range(6):
        cube("SPINE_HEAT_EXTRACTOR_"+str(i),((i-2.5)*.105,-1.65,.87),(.045,.48,.035),edge,.012)

    # Forward cockpit: long yellow-tinted panoramic canopy with deep dark cockpit well.
    sphere("COCKPIT_RECESSED_WELL",(0,2.12,.58),(.52,1.18,.36),dark)
    sphere("PANORAMIC_GOLD_SAPPHIRE_CANOPY",(0,2.28,.77),(.405,.98,.285),glass)
    beam_between("CANOPY_LEFT_GOLD_SEAL",(-.37,1.42,.77),(-.20,3.05,.88),.045,.035,amber)
    beam_between("CANOPY_RIGHT_GOLD_SEAL",(.37,1.42,.77),(.20,3.05,.88),.045,.035,amber)
    beam_between("CANOPY_CENTER_RIDGE",(0,1.48,1.02),(0,3.05,.99),.035,.025,edge)
    # Nose armor and sensor details.
    prism("NOSE_LOWER_ARMOR",[(-.25,3.05),(.25,3.05),(.16,4.12),(-.16,4.12)],-.02,.16,dark,.035)
    sphere("NOSE_TARGETING_SENSOR",(0,3.72,.22),(.11,.20,.09),amber)

    # Distinctive high shoulder pods / engine shoulders and rear twin propulsion units.
    for s,label in [(-1,"PORT"),(1,"STARBOARD")]:
        x=s*.78
        # Raised side shoulder fairing.
        prism(label+"_SHOULDER_FAIRING",[(s*.48,1.35),(s*1.08,.95),(s*1.48,-.65),
              (s*1.12,-2.25),(s*.62,-2.55),(s*.82,-.65)],.25,.58,hull,.08)
        # Twin turbine housing, metallic rim, recessed dark nozzle and luminous core.
        cone(label+"_ENGINE_COWL",(x,-2.78,-.12),.46,.34,1.48,dark)
        cylinder(label+"_ENGINE_REAR_RING",(x,-3.55,-.12),.37,.20,edge)
        cylinder(label+"_ENGINE_NOZZLE_DARK",(x,-3.68,-.12),.285,.12,dark)
        cylinder(label+"_ENGINE_PLASMA_CORE",(x,-3.77,-.12),.205,.10,glow)
        sphere(label+"_ENGINE_ION_GLOW",(x,-3.83,-.12),(.19,.06,.19),cyan)
        # Intake mouths and layered lips.
        cylinder(label+"_FORWARD_INTAKE_RIM",(s*.91,1.12,-.08),.245,.15,edge)
        sphere(label+"_INTAKE_BLACK_CORE",(s*.91,1.20,-.08),(.18,.055,.18),dark)
        # Small landing gear: articulated strut and twin wheel.
        beam_between(label+"_LANDING_STRUT",(s*.70,-.35,-.48),(s*.82,-.48,-1.05),.12,.12,edge)
        cylinder(label+"_LANDING_WHEEL",(s*.82,-.48,-1.08),.17,.13,dark,axis="X")
        cylinder(label+"_WHEEL_HUB",(s*.82,-.48,-1.08),.075,.145,edge,axis="X")

    # Ventral stabilizers and rear canted fins.
    for s,label in [(-1,"PORT"),(1,"STARBOARD")]:
        prism(label+"_VENTRAL_STABILIZER",[(s*.62,-1.55),(s*1.20,-2.05),(s*1.02,-3.45),(s*.55,-3.10)],-.62,-.20,dark,.055)
        prism(label+"_REAR_CANTED_FIN",[(s*.62,-2.15),(s*1.25,-3.45),(s*.83,-3.18),(s*.48,-2.55)],.10,.82,hull,.055)
        beam_between(label+"_FIN_CYAN_EDGE",(s*.72,-2.55,.83),(s*1.08,-3.18,.58),.045,.035,cyan)

    # Underside armor and two small forward pulse emitters.
    prism("VENTRAL_CENTER_ARMOR",[(-.48,-2.55),(.48,-2.55),(.36,1.1),(-.36,1.1)],-.72,-.48,dark,.05)
    for s,label in [(-1,"PORT"),(1,"STARBOARD")]:
        cylinder(label+"_NOSE_PULSE_EMITTER",(s*.40,2.80,-.18),.095,.72,dark)
        cylinder(label+"_NOSE_EMITTER_RIM",(s*.40,3.17,-.18),.12,.10,edge)
        sphere(label+"_NOSE_EMITTER_CORE",(s*.40,3.23,-.18),(.07,.06,.07),cyan)

    # Small white unit markings on wing top (kept as geometry, not texture text).
    for s,label in [(-1,"PORT"),(1,"STARBOARD")]:
        for k in range(3):
            cube(label+"_IDENT_MARK_"+str(k),(s*(3.75+k*.16),-.10-k*.20,.315),(.07,.34,.025),edge,.012)

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
    cam.data.type="ORTHO"; cam.data.ortho_scale=12.8; bpy.context.scene.camera=cam
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
    active_body = bpy.data.objects.get("01_STEALTH_LIFTING_BODY")
    if active_body is None:
        raise RuntimeError("Expected Valkyrie body mesh was not created")
    bpy.context.view_layer.objects.active = active_body
    bpy.ops.wm.save_as_mainfile(filepath=os.path.join(out,"aether-nova-interceptor.blend"))
    bpy.ops.export_scene.gltf(filepath=os.path.join(out,"aether-nova-interceptor.glb"),export_format="GLB",use_selection=True,export_apply=True)
    bpy.ops.render.render(write_still=True)

if __name__=="__main__":
    a=arguments(); setup(os.path.abspath(a.output_dir)); print("Valkyrie refined asset generated")
