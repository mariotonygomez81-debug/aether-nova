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

    # Reference-matched silhouette: compact forward cockpit, broad swept manta wing,
    # raised graphite dorsal wing, twin rear nacelles and visible landing gear.
    # Nose points +Y; X is span; Z is vertical.
    def loft_body():
        # Elliptical cross-sections create a continuous, tapered lifting fuselage.
        sections=[
            (-4.45,.18,.22,.02),(-4.05,.42,.34,.04),(-3.25,.66,.43,.06),
            (-2.25,.88,.52,.08),(-1.0,1.02,.60,.10),(.35,.92,.62,.12),
            (1.55,.70,.52,.12),(2.65,.48,.38,.10),(3.55,.27,.24,.08),
            (4.05,.035,.08,.04)]
        verts=[]; faces=[]; n=24
        for y,rx,rz,zc in sections:
            for i in range(n):
                a=2*math.pi*i/n
                verts.append((rx*math.cos(a),y,zc+rz*math.sin(a)))
        for j in range(len(sections)-1):
            for i in range(n):
                a=j*n+i; b=j*n+(i+1)%n
                faces.append((a,b,b+n,a+n))
        faces += [tuple(range(n-1,-1,-1)),tuple(range((len(sections)-1)*n,len(sections)*n))]
        mesh=bpy.data.meshes.new("Valkyrie_Continuous_Fuselage")
        mesh.from_pydata(verts,[],faces); mesh.materials.append(hull); mesh.update()
        obj=bpy.data.objects.new("01_CONTINUOUS_STEALTH_FUSELAGE",mesh); bpy.context.collection.objects.link(obj)
        for p in mesh.polygons: p.use_smooth=True
        obj.modifiers.new("Hull weighted normals","WEIGHTED_NORMAL")
        return obj

    def aerofoil(name, outline, zbase, thickness, material, bevel=.08):
        # A real closed solid with beveled leading/trailing edges, not a flat plate.
        n=len(outline)
        verts=[(x,y,zbase) for x,y in outline]+[(x,y,zbase+thickness) for x,y in outline]
        faces=[tuple(range(n-1,-1,-1)),tuple(range(n,2*n))]
        for i in range(n): faces.append((i,(i+1)%n,(i+1)%n+n,i+n))
        me=bpy.data.meshes.new(name+"_mesh"); me.from_pydata(verts,[],faces)
        me.materials.append(material); me.update()
        ob=bpy.data.objects.new(name,me); bpy.context.collection.objects.link(ob)
        if bevel:
            mod=ob.modifiers.new("Sculpted aerofoil edges","BEVEL"); mod.width=bevel; mod.segments=5
            ob.modifiers.new("Aerofoil weighted normals","WEIGHTED_NORMAL")
        return ob

    loft_body()

    # Main broad swept wing. The outer tips sweep aft like the supplied craft.
    wing=[(-.62,2.38),(.62,2.38),(1.08,1.72),(2.35,.98),(4.85,-.72),
          (5.45,-1.62),(5.28,-2.28),(4.58,-2.12),(2.72,-1.52),
          (1.35,-1.05),(.70,-.82),(-.70,-.82),(-1.35,-1.05),
          (-2.72,-1.52),(-4.58,-2.12),(-5.28,-2.28),(-5.45,-1.62),
          (-4.85,-.72),(-2.35,.98),(-1.08,1.72)]
    aerofoil("02_FULL_SPAN_MANTA_WING",wing,-.16,.42,armor,.12)

    # Dark, raised upper wing panels, leaving silver leading edges visible.
    panel=[(.72,1.72),(1.42,1.40),(4.92,-.72),(5.18,-1.58),
           (4.72,-1.88),(3.92,-1.55),(2.62,-.98),(1.42,-.35)]
    for s,side in [(-1,"PORT"),(1,"STARBOARD")]:
        aerofoil(side+"_GRAPHITE_STEALTH_PANEL",[(s*x,y) for x,y in panel],.275,.075,dark,.045)
        beam_between(side+"_SILVER_LEADING_EDGE",(s*.82,2.22,.31),(s*5.12,-1.55,.31),.20,.12,edge)
        beam_between(side+"_OUTER_ARMOR_RIB",(s*1.75,.88,.34),(s*4.75,-1.82,.34),.10,.07,armor)
        # Distinctive recessed blue flank light seen in the reference.
        cube(side+"_ION_LIGHT_RECESS",(s*1.12,-.15,.20),(.18,1.60,.30),dark,.14)
        cube(side+"_ION_BLUE_CORE",(s*1.22,-.15,.225),(.065,1.28,.17),cyan,.075)
        beam_between(side+"_TIP_CYAN_MARK",(s*5.12,-1.66,.30),(s*5.34,-1.98,.28),.07,.06,cyan)
        # Layered armor islands and recessed service channels, following the reference silhouette.
        aerofoil(side+"_OUTER_SHOULDER_ARMOR",[(s*1.48,1.10),(s*2.08,.68),(s*4.70,-.98),
                 (s*4.86,-1.42),(s*4.28,-1.28),(s*2.35,-.42)],.355,.075,armor,.045)
        beam_between(side+"_UPPER_GRAPHITE_RIDGE",(s*1.30,1.34,.43),(s*4.52,-.83,.43),.105,.065,dark)
        beam_between(side+"_INNER_SILVER_RAIL",(s*.86,1.85,.40),(s*2.20,.48,.40),.13,.07,edge)
        # Blue recessed energy aperture with a dark mechanical bezel.
        cube(side+"_ENERGY_APERTURE_BEZEL",(s*1.38,-.02,.40),(.34,1.52,.20),dark,.15)
        cube(side+"_ENERGY_APERTURE_LENS",(s*1.40,-.02,.425),(.12,1.22,.105),cyan,.095)
        # Wingtip upturned endplate.
        aerofoil(side+"_UPTURNED_WINGTIP",[(s*4.82,-1.34),(s*5.42,-1.70),
                 (s*5.48,-2.24),(s*5.13,-2.04)],.20,.46,dark,.055)
        beam_between(side+"_WINGTIP_LIGHT",(s*5.18,-1.83,.68),(s*5.40,-2.08,.68),.055,.045,cyan)
        # Three subtle surface panel seams.
        for k in range(3):
            beam_between(side+"_PANEL_SEAM_"+str(k),(s*(2.0+k*.52),.30-k*.25,.36),
                         (s*(2.55+k*.52),-.22-k*.28,.36),.026,.018,edge)

    # Dorsal spine, layered aerodynamic ridges and aft heat vents.
    aerofoil("03_RAISED_DORSAL_SPINE",[(-.52,-2.65),(.52,-2.65),(.43,.85),(.30,2.60),
             (-.30,2.60),(-.43,.85)],.56,.22,edge,.08)
    aerofoil("DORSAL_GRAPHITE_INLAY",[(-.34,-2.35),(.34,-2.35),(.25,.95),(.19,2.28),
             (-.19,2.28),(-.25,.95)],.78,.055,dark,.035)
    for i in range(7):
        cube("DORSAL_HEAT_EXTRACTOR_"+str(i),((i-3)*.105,-1.72,.85),(.045,.48,.035),edge,.012)

    # Long armored cockpit canopy at the forward end, gold rim and deep interior.
    sphere("COCKPIT_BLACK_RECESS",(0,2.55,.48),(.48,1.18,.34),dark)
    sphere("ONE_PIECE_TINTED_CANOPY",(0,2.62,.68),(.405,1.02,.285),glass)
    beam_between("CANOPY_GOLD_PORT",(-.37,1.72,.69),(-.22,3.48,.77),.055,.045,amber)
    beam_between("CANOPY_GOLD_STARBOARD",(.37,1.72,.69),(.22,3.48,.77),.055,.045,amber)
    beam_between("CANOPY_CENTER_ARMOR_RIDGE",(0,1.70,.91),(0,3.45,.91),.045,.035,edge)
    # Pointed nose chin and sensor.
    aerofoil("ARMORED_NOSE_CHIN",[(-.27,2.75),(.27,2.75),(.17,4.12),(-.17,4.12)],-.20,.22,dark,.05)
    sphere("NOSE_LASER_RANGE_SENSOR",(0,3.78,.24),(.105,.19,.09),amber)

    # Twin rear propulsion pods, with layered metallic rings and blue reactor cores.
    for s,side in [(-1,"PORT"),(1,"STARBOARD")]:
        x=s*.78
        aerofoil(side+"_ENGINE_SHOULDER",[(s*.48,.20),(s*1.12,-.05),(s*1.52,-2.18),
                 (s*1.10,-3.42),(s*.52,-3.05)],.18,.48,hull,.09)
        cone(side+"_ENGINE_COWL",(x,-2.83,-.12),.49,.36,1.42,dark)
        cylinder(side+"_ENGINE_PLATINUM_RIM",(x,-3.56,-.12),.39,.18,edge)
        cylinder(side+"_ENGINE_NOZZLE",(x,-3.68,-.12),.30,.13,dark)
        cylinder(side+"_REACTOR_CORE",(x,-3.77,-.12),.205,.10,glow)
        sphere(side+"_ENGINE_ION_AURA",(x,-3.84,-.12),(.19,.055,.19),cyan)
        # Side intake, recessed black core and rim.
        cylinder(side+"_FORWARD_INTAKE_RIM",(s*.98,.92,-.04),.25,.15,edge)
        sphere(side+"_INTAKE_DARK_CORE",(s*.98,1.01,-.04),(.18,.055,.18),dark)
        # Retractable landing gear: articulated fork, wheel and hub.
        beam_between(side+"_GEAR_MAIN_STRUT",(s*.72,-.28,-.48),(s*.82,-.48,-1.05),.14,.14,edge)
        beam_between(side+"_GEAR_FORK",(s*.82,-.48,-1.02),(s*.82,-.62,-1.15),.09,.09,dark)
        cylinder(side+"_LANDING_WHEEL",(s*.82,-.55,-1.13),.18,.14,dark,axis="X")
        cylinder(side+"_WHEEL_HUB",(s*.82,-.55,-1.13),.082,.155,edge,axis="X")

    # Twin exposed precision cannons mounted beneath the wing shoulders.
    for s,side in [(-1,"PORT"),(1,"STARBOARD")]:
        beam_between(side+"_WING_CANNON_BARREL",(s*2.02,-.60,.02),(s*2.48,-1.62,.02),.105,.105,dark)
        cylinder(side+"_CANNON_MUZZLE",(s*2.48,-1.62,.02),.105,.16,edge,axis="Y")
        beam_between(side+"_CANNON_HOUSING",(s*1.92,-.42,.13),(s*2.22,-.98,.13),.24,.20,armor)

    # Raised dorsal blade panels and fine parallel grooves.
    for s,side in [(-1,"PORT"),(1,"STARBOARD")]:
        beam_between(side+"_DORSAL_BLADE",(s*.22,-1.82,.94),(s*.34,1.72,.94),.105,.09,edge)
        for k in range(3):
            beam_between(side+"_DORSAL_MICRO_GROOVE_"+str(k),
                         (s*(.38+k*.07),-.90,.91),(s*(.38+k*.07),1.15,.91),.018,.016,dark)

    # Large restrained aircraft identification marking on the starboard wing.
    mark_curve=bpy.data.curves.new("VALKYRIE_UNIT_MARKING_FONT","FONT")
    mark_curve.body="05"; mark_curve.size=.72; mark_curve.extrude=.004
    mark_curve.align_x="CENTER"; mark_curve.align_y="CENTER"
    mark=bpy.data.objects.new("STARBOARD_WING_UNIT_MARKING_05",mark_curve)
    bpy.context.collection.objects.link(mark)
    mark.location=(4.22,-.38,.39); mark.rotation_euler[2]=math.radians(78)
    mark.data.materials.append(edge)

    # Rear canted fins and ventral stabilizers, visibly separate from the wing.
    for s,side in [(-1,"PORT"),(1,"STARBOARD")]:
        aerofoil(side+"_REAR_CANTED_FIN",[(s*.58,-2.05),(s*1.32,-3.62),
                 (s*.88,-3.25),(s*.45,-2.48)],.20,.68,armor,.055)
        beam_between(side+"_FIN_ION_EDGE",(s*.72,-2.48,.86),(s*1.13,-3.28,.82),.055,.045,cyan)
        aerofoil(side+"_VENTRAL_STABILIZER",[(s*.58,-1.35),(s*1.22,-2.02),
                 (s*1.02,-3.42),(s*.52,-3.05)],-.78,.18,dark,.05)

    # Underbody armor, forward pulse emitters and restrained unit markings.
    aerofoil("VENTRAL_CENTER_ARMOR",[(-.48,-2.55),(.48,-2.55),(.36,1.08),(-.36,1.08)],-.78,.18,dark,.05)
    for s,side in [(-1,"PORT"),(1,"STARBOARD")]:
        cylinder(side+"_NOSE_PULSE_EMITTER",(s*.40,2.88,-.20),.095,.72,dark)
        cylinder(side+"_EMITTER_RIM",(s*.40,3.24,-.20),.12,.10,edge)
        sphere(side+"_EMITTER_CORE",(s*.40,3.30,-.20),(.07,.06,.07),cyan)
        for k in range(3):
            cube(side+"_IDENTIFICATION_MARK_"+str(k),(s*(3.78+k*.15),-.22-k*.18,.37),(.065,.30,.025),edge,.012)

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
    scene=bpy.context.scene
    # Studio floor and physically lit presentation render, matching the cool blue reference studio.
    floor_mat=mat("09 Studio blue-grey floor",(.105,.19,.29),.18,.48)
    bpy.ops.mesh.primitive_plane_add(size=200,location=(0,0,-1.42))
    floor=bpy.context.object; floor.name="STUDIO_GROUND"; floor.data.materials.append(floor_mat)
    scene.render.engine="BLENDER_EEVEE_NEXT"
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
    a=arguments(); setup(os.path.abspath(a.output_dir)); print("Valkyrie refined asset generated")
