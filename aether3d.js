import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';

// Renderizador 3D transparente: representa la nave real del jugador.
// La lógica y las colisiones siguen ejecutándose en game.js.
const canvas = document.getElementById('aether3dCanvas');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.15));
renderer.shadowMap.enabled = false;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.24;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 300);
function worldPos(x,y,width,height,z=-10){
  const depth=camera.position.z-z;
  const viewH=2*Math.tan(THREE.MathUtils.degToRad(camera.fov/2))*depth;
  const viewW=viewH*camera.aspect;
  // Centro exacto del plano a profundidad z sobre el eje óptico de la cámara.
  // Esto mantiene la coordenada 2D del jugador en la misma altura que su modelo 3D.
  const targetX=camera.position.x*.25;
  const targetY=camera.position.y*.18;
  const targetZ=-7;
  const t=(z-camera.position.z)/(targetZ-camera.position.z);
  const centerX=camera.position.x+(targetX-camera.position.x)*t;
  const centerY=camera.position.y+(targetY-camera.position.y)*t;
  return new THREE.Vector3(centerX+((x/width)-.5)*viewW,centerY+(.5-y/height)*viewH,z);
}
camera.position.set(0, 3.4, 16);
camera.lookAt(0, 0, -7);
scene.add(new THREE.HemisphereLight(0xc8e6ff, 0x171126, 1.65));
const ambientFill = new THREE.AmbientLight(0x526b9a, .38); scene.add(ambientFill);
const key = new THREE.DirectionalLight(0xe2f1ff, 3.8); key.position.set(-28, 24, 38); key.castShadow = true; key.shadow.mapSize.set(1024,1024); scene.add(key);
const rim = new THREE.PointLight(0x16cfff, 24, 36); rim.position.set(0, 1, 2); scene.add(rim);
const warmFill = new THREE.PointLight(0xff8a58, 9, 90); warmFill.position.set(-34,12,-72); scene.add(warmFill);
const violetFill = new THREE.PointLight(0x875dff, 11, 110); violetFill.position.set(38,-15,-112); scene.add(violetFill);
scene.add(rim);

// UNIVERSO CINEMATOGRÁFICO V2: capas de nebulosa, polvo estelar, planetas
// procedurales con mapas de superficie/nubes y una estación orbital modular.
const environment = new THREE.Group(); scene.add(environment);

function hash2(x,y,seed=0){let n=Math.sin(x*127.1+y*311.7+seed*74.7)*43758.5453;return n-Math.floor(n);}
function smoothNoise(x,y,seed=0){
  const ix=Math.floor(x),iy=Math.floor(y),fx=x-ix,fy=y-iy;
  const u=fx*fx*(3-2*fx),v=fy*fy*(3-2*fy);
  const a=hash2(ix,iy,seed),b=hash2(ix+1,iy,seed),c=hash2(ix,iy+1,seed),d=hash2(ix+1,iy+1,seed);
  return (a+(b-a)*u)*(1-v)+(c+(d-c)*u)*v;
}
function fbm(x,y,seed=0){let sum=0,amp=.5,norm=0;for(let o=0;o<5;o++){sum+=smoothNoise(x,y,seed+o*13)*amp;norm+=amp;x*=2.03;y*=2.03;amp*=.5;}return sum/norm;}
function makeNebulaTexture(seed, palette){
  const c=document.createElement('canvas');c.width=512;c.height=256;const ctx=c.getContext('2d');
  const img=ctx.createImageData(c.width,c.height);const d=img.data;
  for(let y=0;y<c.height;y++)for(let x=0;x<c.width;x++){
    const u=x/c.width,v=y/c.height;const n=fbm(u*7+seed,v*5+seed,seed);
    const wisps=fbm(u*18+seed*2,v*13-seed,seed+8);const ridge=1-Math.abs(n-.52)*2.1;
    const density=Math.max(0,Math.min(1,(ridge*.65+wisps*.55-.49)*2.1));
    const edge=Math.pow(Math.max(0,Math.sin(Math.PI*u)*Math.sin(Math.PI*v)),.42);
    const a=Math.min(170,Math.pow(density,1.55)*155*edge);
    const t=Math.max(0,Math.min(1,n*.95+wisps*.25));
    const col=t<.5?palette[0].map((q,i)=>q+(palette[1][i]-q)*t*2):palette[1].map((q,i)=>q+(palette[2][i]-q)*(t-.5)*2);
    const k=(y*c.width+x)*4;d[k]=col[0];d[k+1]=col[1];d[k+2]=col[2];d[k+3]=a;
  }
  ctx.putImageData(img,0,0);const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=8;return tex;
}
const nebulaPalettes=[[[17,48,125],[71,70,190],[205,58,151]],[[0,105,137],[32,155,187],[117,74,180]],[[76,34,117],[173,67,119],[232,130,78]],[[19,59,91],[48,127,143],[157,177,195]]];
const nebulaMaps=nebulaPalettes.map((palette,i)=>makeNebulaTexture(i+2,palette));
const nebulaTex=nebulaMaps[0];
for(let i=0;i<6;i++){
  const tex=nebulaMaps[i%nebulaMaps.length];
  const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true,opacity:.34,depthWrite:false,blending:THREE.AdditiveBlending,color:0xffffff}));
  sprite.position.set((Math.random()-.5)*150,(Math.random()-.5)*82,-58-Math.random()*170);
  const w=48+Math.random()*75,h=25+Math.random()*48;sprite.scale.set(w,h,1);sprite.material.rotation=(Math.random()-.5)*.7;environment.add(sprite);
}
// Estrellas en varias profundidades y temperaturas cromáticas.
const starColors=[0xb9ddff,0xffffff,0x7feaff,0xffd5a0,0xd2b7ff];
for(let layer=0;layer<3;layer++){
  const count=[360,220,100][layer],positions=[],colors=[],sizes=[];
  for(let i=0;i<count;i++){
    positions.push((Math.random()-.5)*290,(Math.random()-.5)*165,-22-Math.random()*(layer===0?240:layer===1?180:110));
    const color=new THREE.Color(starColors[Math.random()*starColors.length|0]);colors.push(color.r,color.g,color.b);sizes.push((.45+Math.random()*1.5)*(layer===2?1.8:1));
  }
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geo.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));
  const pts=new THREE.Points(geo,new THREE.PointsMaterial({size:layer===2?.58:.28,vertexColors:true,transparent:true,opacity:layer===0?.8:.65,sizeAttenuation:true,depthWrite:false}));environment.add(pts);if(layer===0)window.__aetherStarFar=pts;else if(layer===1)window.__aetherStarMid=pts;else window.__aetherStarNear=pts;
}

// Alpha 4: sin planetas ni estación orbital. Fondo profundo y limpio.
const ship = new THREE.Group(); scene.add(ship);
const hullMat = new THREE.MeshPhysicalMaterial({ color: 0x9eb7c9, metalness: .94, roughness: .22, clearcoat: .8, clearcoatRoughness: .2 });
const darkMat = new THREE.MeshStandardMaterial({ color: 0x101c2c, metalness: .88, roughness: .3 });
const panelMat = new THREE.MeshStandardMaterial({ color: 0x31485d, metalness: .9, roughness: .34 });
const canopyMat = new THREE.MeshPhysicalMaterial({ color: 0x087ca5, metalness: .52, roughness: .09, transparent: true, opacity: .94, clearcoat: 1, emissive: 0x032c48 });
const glowMat = new THREE.MeshStandardMaterial({ color: 0x38efff, emissive: 0x00bde9, emissiveIntensity: 3.1, metalness: .3, roughness: .18 });
const goldMat = new THREE.MeshStandardMaterial({ color: 0xc78c45, metalness: .86, roughness: .28 });
function add(geometry, material, position, rotation=[0,0,0], parent=ship, scale=null) {
  const m = new THREE.Mesh(geometry, material); m.position.set(...position); m.rotation.set(...rotation);
  if(scale)m.scale.set(...scale); m.castShadow = false; m.receiveShadow = false; parent.add(m); return m;
}
// Fuselaje central aerodinámico, morro orientado hacia -Z.
add(new THREE.ConeGeometry(.62,4.45,12), hullMat, [0,0,-.55], [Math.PI/2,0,0]);
add(new THREE.CylinderGeometry(.48,.62,2.15,12), darkMat, [0,-.015,.92], [Math.PI/2,0,0]);
add(new THREE.BoxGeometry(.42,.22,2.1), panelMat, [0,-.28,.35]);
add(new THREE.SphereGeometry(.47,32,20), canopyMat, [0,.39,-.58], [0,0,0], ship, [1,.68,1.65]);
// Ala delta segmentada, con paneles superiores y bordes energéticos.
for (const side of [-1,1]) {
  const wing = add(new THREE.BoxGeometry(2.75,.18,2.5), darkMat, [side*1.23,-.10,.52], [0,side*.13,side*-.055]);
  add(new THREE.BoxGeometry(2.28,.035,1.62), panelMat, [side*1.23,.005,.37], [0,side*.13,side*-.055]);
  add(new THREE.BoxGeometry(.13,.10,2.12), glowMat, [side*1.23,.075,-.05], [0,side*.13,side*-.055]);
  add(new THREE.BoxGeometry(.22,.52,1.5), hullMat, [side*2.35,.12,.9], [0,0,side*-.18]);
  add(new THREE.ConeGeometry(.19,.92,8), goldMat, [side*2.35,.14,.1], [Math.PI/2,0,side*-.18]);
  // Aletas de control y cañones de ala.
  add(new THREE.BoxGeometry(.20,.42,1.12), darkMat, [side*.78,-.22,1.05], [0,0,side*.08]);
  add(new THREE.CylinderGeometry(.085,.11,1.35,12), goldMat, [side*1.72,-.12,-.62], [Math.PI/2,0,0]);
  add(new THREE.CylinderGeometry(.28,.38,1.12,20), darkMat, [side*.62,-.08,1.72], [Math.PI/2,0,0]);
  add(new THREE.CylinderGeometry(.19,.25,.18,20), goldMat, [side*.62,-.08,2.27], [Math.PI/2,0,0]);
  const plume=add(new THREE.ConeGeometry(.25,1.9,20), glowMat, [side*.62,-.08,3.18], [Math.PI/2,0,0]);
  plume.material=glowMat;
}
// Dorsal spine, armored nose, sensor lights and vent details.
add(new THREE.BoxGeometry(.30,.20,2.6), hullMat, [0,.23,.15]);
add(new THREE.ConeGeometry(.20,.75,8), goldMat, [0,.05,-2.05], [Math.PI/2,0,0]);
for(let i=0;i<5;i++){
  add(new THREE.BoxGeometry(.055,.045,.30), goldMat, [0,.34,.35+i*.28]);
}
for(const side of [-1,1]){
  add(new THREE.SphereGeometry(.075,12,8), glowMat, [side*2.42,.16,.0]);
  add(new THREE.BoxGeometry(.12,.05,.58), glowMat, [side*.35,-.32,1.3]);
}
const shield = new THREE.Mesh(new THREE.SphereGeometry(2.65, 24, 16), new THREE.MeshBasicMaterial({ color: 0x37dcff, wireframe: true, transparent: true, opacity: .13 }));
shield.visible = false; ship.add(shield);

// Asteroides 3D sincronizados con las instancias reales del motor 2D.
// La simulación, impactos, vida y recompensas siguen controlados por game.js.
const asteroidMeshes = new Map();
const asteroidMaterials = {
  normal: new THREE.MeshStandardMaterial({ color: 0x68798a, metalness: .34, roughness: .94 }),
  explosive: new THREE.MeshStandardMaterial({ color: 0x665044, metalness: .42, roughness: .78, emissive: 0x6a2108, emissiveIntensity: .38 }),
  magnetic: new THREE.MeshStandardMaterial({ color: 0x425d75, metalness: .72, roughness: .42, emissive: 0x062b5b, emissiveIntensity: .6 }),
  shooting_star: new THREE.MeshBasicMaterial({ color: 0x9df8ff })
};
function makeRockGeometry(seed) {
  const geometry = new THREE.IcosahedronGeometry(1, 3);
  const position = geometry.attributes.position;
  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i), y = position.getY(i), z = position.getZ(i);
    const n = 1 + .17 * Math.sin((x * 17 + y * 11 + z * 7 + seed) * 2.1) + .09 * Math.cos((x * 9 - y * 15 + z * 13 + seed) * 1.7) + .045 * Math.sin((x*31+y*23-z*19+seed)*3.4);
    position.setXYZ(i, x*n, y*n, z*n);
  }
  geometry.computeVertexNormals();
  return geometry;
}
function addAsteroid3D(item) {
  const material = asteroidMaterials[item.kind] || asteroidMaterials.normal;
  const geometry = item.kind === 'shooting_star' ? new THREE.SphereGeometry(1, 14, 10) : makeRockGeometry(item.id);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = false; mesh.receiveShadow = false;
  if (item.kind === 'shooting_star') {
    const trail = new THREE.Mesh(new THREE.ConeGeometry(.32, 2.8, 10), new THREE.MeshBasicMaterial({ color: 0x16dfff, transparent: true, opacity: .52 }));
    trail.rotation.x = -Math.PI/2; trail.position.z = 1.45; mesh.add(trail);
  }
  scene.add(mesh); asteroidMeshes.set(item.id, mesh); return mesh;
}
function syncAsteroids(items, width, height, dt) {
  const alive = new Set();
  const depthBase = 16;
  const tanHalf = Math.tan(THREE.MathUtils.degToRad(camera.fov/2));
  for (const item of items || []) {
    alive.add(item.id);
    const mesh = asteroidMeshes.get(item.id) || addAsteroid3D(item);
    // Profundidad individual con coordenadas proyectadas para coincidir con la posición 2D.
    const z = -5 - (item.depth || 0);
    const depth = camera.position.z - z;
    const viewH = 2 * tanHalf * depth;
    const viewW = viewH * camera.aspect;
    const centerY = camera.position.y + (z-camera.position.z) * ((-3.4)/23);
    mesh.position.set(((item.x/width)-.5)*viewW, centerY + (.5-item.y/height)*viewH, z);
    const unit = viewH / height;
    const r = Math.max(.08, item.radius * unit);
    mesh.scale.set(r*(item.sx || 1), r*(item.sy || 1), r*(item.sz || 1));
    mesh.rotation.set(item.rot*.7, item.rot, item.rot*.42);
    if (item.hitFlash > 0 && item.kind !== 'shooting_star') mesh.material = asteroidMaterials.explosive;
    else mesh.material = asteroidMaterials[item.kind] || asteroidMaterials.normal;
    mesh.visible = true;
  }
  for (const [id, mesh] of asteroidMeshes) {
    if (!alive.has(id)) { spawn3DBurst(mesh.position.clone(),0xffbd68,Math.max(.65,mesh.scale.x*.55)); scene.remove(mesh); mesh.geometry.dispose(); if (mesh.children.length) mesh.children.forEach(child=>child.geometry?.dispose()); asteroidMeshes.delete(id); }
  }
}

// PROYECTILES 3D: colección y sincronización con los disparos reales del motor 2D.
const shotMeshes = new Map();
const shotMaterials = new Map();
function getShotMaterial(color) {
  const key=String(color||'#39eaff');
  if(!shotMaterials.has(key)){
    let tint=0x39eaff;
    if(/^#[0-9a-f]{6}$/i.test(key)) tint=Number.parseInt(key.slice(1),16);
    const colorObj=new THREE.Color(tint);
    shotMaterials.set(key,{
      core:new THREE.MeshBasicMaterial({color:colorObj}),
      shell:new THREE.MeshBasicMaterial({color:colorObj,transparent:true,opacity:.92,blending:THREE.AdditiveBlending,depthWrite:false}),
      glow:new THREE.MeshBasicMaterial({color:colorObj,transparent:true,opacity:.24,blending:THREE.AdditiveBlending,depthWrite:false}),
      tail:new THREE.MeshBasicMaterial({color:colorObj,transparent:true,opacity:.42,blending:THREE.AdditiveBlending,depthWrite:false})
    });
  }
  return shotMaterials.get(key);
}
function createShotMesh(item){
  const group=new THREE.Group();
  const mats=getShotMaterial(item.color);
  // Orbe de plasma compacto con tres capas luminosas concéntricas.
  const core=new THREE.Mesh(new THREE.SphereGeometry(1,32,24),mats.core);
  core.scale.setScalar(item.missile?.24:.205);
  group.add(core);
  const shell=new THREE.Mesh(new THREE.SphereGeometry(1,32,24),mats.shell);
  shell.scale.setScalar(item.missile?.35:.30);
  group.add(shell);
  const halo=new THREE.Mesh(new THREE.SphereGeometry(1,28,20),mats.glow);
  halo.scale.setScalar(item.missile?.49:.43);
  group.add(halo);
  // Estela continua: esferas solapadas para eliminar el efecto de puntos separados.
  const trailSpecs=item.missile
    ? [[.235,-.17],[.215,-.34],[.185,-.51],[.145,-.68],[.105,-.84],[.065,-.99]]
    : [[.205,-.16],[.185,-.31],[.155,-.46],[.12,-.61],[.085,-.75],[.05,-.88]];
  for(let i=0;i<trailSpecs.length;i++){
    const [radius,offset]=trailSpecs[i];
    const volume=new THREE.Mesh(
      new THREE.SphereGeometry(1,24,18),
      i<2?mats.shell:mats.tail
    );
    volume.scale.set(radius,radius*1.12,radius);
    volume.position.y=offset;
    group.add(volume);
  }
  // Brillo difuso central que une visualmente el orbe y la estela.
  const bridge=new THREE.Mesh(new THREE.SphereGeometry(1,24,18),mats.glow);
  bridge.scale.set(item.missile?.19:.16,item.missile?.53:.43,item.missile?.19:.16);
  bridge.position.y=item.missile?-.39:-.32;
  group.add(bridge);
  if(item.missile){
    const fins=new THREE.Group();
    for(const side of [-1,1]){
      const fin=new THREE.Mesh(new THREE.BoxGeometry(.12,.20,.035),mats.core);
      fin.position.set(side*.22,-.02,0);
      fins.add(fin);
    }
    group.add(fins);
  }
  scene.add(group);
  shotMeshes.set(item.id,group);
  return group;
}
// Disparos enemigos 3D: proyectiles energéticos con orientación según velocidad.
const enemyShotMeshes = new Map();
const enemyShotMaterials = new Map();
function getEnemyShotMaterials(color){
  const key=String(color||"#ff4d6d");
  if(!enemyShotMaterials.has(key)){
    const tint=new THREE.Color(key);
    enemyShotMaterials.set(key,{
      core:new THREE.MeshBasicMaterial({color:tint}),
      shell:new THREE.MeshBasicMaterial({color:tint,transparent:true,opacity:.9,blending:THREE.AdditiveBlending,depthWrite:false}),
      glow:new THREE.MeshBasicMaterial({color:tint,transparent:true,opacity:.28,blending:THREE.AdditiveBlending,depthWrite:false}),
      trail:new THREE.MeshBasicMaterial({color:tint,transparent:true,opacity:.48,blending:THREE.AdditiveBlending,depthWrite:false})
    });
  }
  return enemyShotMaterials.get(key);
}
function createEnemyShot(item){
  const group=new THREE.Group(),m=getEnemyShotMaterials(item.color);
  const core=new THREE.Mesh(new THREE.SphereGeometry(1,24,18),m.core);
  core.scale.set(.15,.24,.15);group.add(core);
  const shell=new THREE.Mesh(new THREE.SphereGeometry(1,24,18),m.shell);
  shell.scale.set(.23,.34,.23);group.add(shell);
  const halo=new THREE.Mesh(new THREE.SphereGeometry(1,20,16),m.glow);
  halo.scale.set(.34,.48,.34);group.add(halo);
  const ring=new THREE.Mesh(new THREE.TorusGeometry(.27,.035,8,24),m.shell);
  ring.rotation.x=Math.PI/2;group.add(ring);
  for(let i=0;i<4;i++){
    const bead=new THREE.Mesh(new THREE.SphereGeometry(1,16,12),m.trail);
    const r=[.18,.145,.105,.065][i];
    bead.scale.set(r,r*1.2,r);
    bead.position.y=.28+i*.16;
    group.add(bead);
  }
  scene.add(group);enemyShotMeshes.set(item.id,group);return group;
}
function syncEnemyShots(items,width,height){
  const alive=new Set();
  for(const item of items||[]){
    if(item.id==null)continue;
    alive.add(item.id);
    const mesh=enemyShotMeshes.get(item.id)||createEnemyShot(item);
    mesh.position.copy(worldPos(item.x,item.y,width,height,-7.2));
    // El eje +Y apunta en la dirección de movimiento; la estela queda detrás.
    const vx=Number(item.vx)||0, vy=Number(item.vy)||1;
    mesh.rotation.z=Math.atan2(-vx,-vy);
    mesh.visible=true;
  }
  for(const [id,mesh] of enemyShotMeshes){
    if(!alive.has(id)){
      scene.remove(mesh);
      mesh.traverse(part=>{if(part.geometry)part.geometry.dispose();});
      enemyShotMeshes.delete(id);
    }
  }
}

function syncShots(items, width, height) {
  const alive = new Set();
  for (const item of items || []) {
    if (item.id == null) continue;
    alive.add(item.id);
    const mesh = shotMeshes.get(item.id) || createShotMesh(item);
    mesh.position.copy(worldPos(item.x, item.y, width, height, -7.5));
    mesh.rotation.set(0, 0, 0);
    mesh.visible = true;
  }
  for (const [id, mesh] of shotMeshes) {
    if (!alive.has(id)) {
      scene.remove(mesh);
      mesh.traverse(part => { if (part.geometry) part.geometry.dispose(); });
      shotMeshes.delete(id);
    }
  }
}

// ENEMIGOS Y JEFES 3D sincronizados con las entidades reales del juego.
const fxBursts=[];
let lastImpactSerial=0;
function spawn3DBurst(position,color=0xff9a55,scale=1){
 const group=new THREE.Group();group.position.copy(position);scene.add(group);
 const material=new THREE.MeshBasicMaterial({color,transparent:true,opacity:.95});
 const particles=[];
 for(let i=0;i<14;i++){
  const mesh=new THREE.Mesh(new THREE.SphereGeometry(.055+Math.random()*.07,7,6),material.clone());
  const a=Math.random()*Math.PI*2, v=.7+Math.random()*2.3;
  mesh.position.set(0,0,0);group.add(mesh);particles.push({mesh,vx:Math.cos(a)*v,vy:Math.sin(a)*v,vz:(Math.random()-.5)*1.2});
 }
 const ring=new THREE.Mesh(new THREE.TorusGeometry(.28,.045,8,28),new THREE.MeshBasicMaterial({color,transparent:true,opacity:.9}));
 group.add(ring);ring.rotation.x=Math.PI/2;group.scale.setScalar(scale);fxBursts.push({group,particles,ring,life:24,maxLife:24});
}
function update3DBursts(dt){
 for(let i=fxBursts.length-1;i>=0;i--){const fx=fxBursts[i];fx.life-=dt*60;const k=Math.max(0,fx.life/fx.maxLife);
  for(const p of fx.particles){p.mesh.position.x+=p.vx*dt;p.mesh.position.y+=p.vy*dt;p.mesh.position.z+=p.vz*dt;p.mesh.material.opacity=k;}
  fx.ring.scale.setScalar(1+(1-k)*4);fx.ring.material.opacity=k;fx.group.scale.setScalar(fx.group.scale.x*(1+dt*.2));
  if(fx.life<=0){scene.remove(fx.group);fx.group.traverse(o=>{o.geometry?.dispose();if(o.material){if(Array.isArray(o.material))o.material.forEach(m=>m.dispose());else o.material.dispose();}});fxBursts.splice(i,1);}
 }
}
const enemyMeshes=new Map();
const enemyHull=new THREE.MeshStandardMaterial({color:0x8298ad,metalness:.88,roughness:.25});
const enemyDark=new THREE.MeshStandardMaterial({color:0x101827,metalness:.82,roughness:.31});
const enemyRed=new THREE.MeshStandardMaterial({color:0xff496f,emissive:0x9b1238,emissiveIntensity:2.2});
const enemyViolet=new THREE.MeshStandardMaterial({color:0xb18aff,emissive:0x5420a8,emissiveIntensity:2.1});
const enemyCyan=new THREE.MeshStandardMaterial({color:0x42eaff,emissive:0x087eaa,emissiveIntensity:2.4});
const enemyGold=new THREE.MeshStandardMaterial({color:0xffbd65,emissive:0x9b4b12,emissiveIntensity:1.3});
function buildEnemy(variant='scout'){
 const g=new THREE.Group();
 const accent=variant==='carrier'||variant==='weaver'?enemyViolet:variant==='bomber'?enemyGold:enemyRed;
 // Fuselaje principal y reactor visible desde la cámara trasera del jugador.
 add(new THREE.ConeGeometry(variant==='carrier'?.95:.58,variant==='carrier'?4.2:2.8,variant==='carrier'?10:8),enemyHull,[0,0,0],[Math.PI/2,0,0],g);
 add(new THREE.BoxGeometry(variant==='carrier'?2.8:1.35,.22,variant==='carrier'?3.5:1.8),enemyDark,[0,-.06,.35],[0,0,0],g);
 const wing=variant==='carrier'?3.5:variant==='bomber'?2.2:variant==='lancer'?1.15:1.65;
 for(const s of [-1,1]){
  add(new THREE.BoxGeometry(wing,.16,variant==='interceptor'?1.1:1.8),enemyHull,[s*(wing*.48),-.02,.48],[0,s*.13,0],g);
  add(new THREE.ConeGeometry(.18,.92,10),accent,[s*(wing*.45),.02,1.38],[Math.PI/2,0,0],g);
  add(new THREE.SphereGeometry(.17,14,10),enemyCyan,[s*.52,.12,.78], [0,0,0],g);
  // Motores gemelos con núcleo cian.
  const engine=add(new THREE.CylinderGeometry(.19,.28,1.15,14),enemyDark,[s*.55,-.14,1.48],[Math.PI/2,0,0],g);
  add(new THREE.SphereGeometry(.15,12,8),enemyCyan,[s*.55,-.14,2.08],[0,0,0],g);
 }
 if(variant==='lancer'){
  add(new THREE.ConeGeometry(.24,2.1,8),enemyRed,[0,0,-1.9],[Math.PI/2,0,0],g);
  add(new THREE.BoxGeometry(.18,.65,1.5),enemyViolet,[0,.18,.5],[0,0,0],g);
 } else if(variant==='weaver'){
  for(let i=0;i<3;i++){
   const ring=add(new THREE.TorusGeometry(.72+i*.2,.055,8,28),enemyViolet,[0,.12,.3+i*.35],[Math.PI/2,0,0],g);
   ring.rotation.z=i*.5;
  }
 } else if(variant==='bomber'){
  add(new THREE.BoxGeometry(2.7,.5,2.8),enemyDark,[0,-.2,.7]);
  for(const s of [-1,1]) add(new THREE.SphereGeometry(.32,16,12),enemyGold,[s*.75,-.35,1.35],[0,0,0],g);
 } else if(variant==='carrier'){
  add(new THREE.BoxGeometry(4.5,.55,3.5),enemyDark,[0,-.2,.7]);
  for(let i=-2;i<=2;i++) add(new THREE.BoxGeometry(.36,.22,1.7),enemyViolet,[i*.7,.18,1.3],[0,0,0],g);
  add(new THREE.SphereGeometry(.55,20,14),enemyCyan,[0,.2,-.3]);
 } else if(variant==='interceptor'){
  for(const s of [-1,1]) add(new THREE.ConeGeometry(.2,1.35,8),enemyRed,[s*1.15,0,.1],[0,0,s*.8],g);
 }
 // Placas de blindaje, líneas emisivas y reactor central para lectura clara a distancia.
 add(new THREE.BoxGeometry(variant==='carrier'?1.25:.48,.12,1.15),enemyDark,[0,.16,-.18],[0,0,0],g);
 add(new THREE.SphereGeometry(variant==='carrier'?.34:.22,18,14),enemyCyan,[0,.20,1.05],[0,0,0],g);
 const dorsal=add(new THREE.BoxGeometry(.12,.10,variant==='carrier'?3.1:1.9),accent,[0,.22,.05],[0,0,0],g);
 return g;
}

function syncEnemies(items,width,height){
 const alive=new Set();
 for(const item of items||[]){
  alive.add(item.id);
  let mesh=enemyMeshes.get(item.id);
  if(!mesh){mesh=buildEnemy(item.variant);scene.add(mesh);enemyMeshes.set(item.id,mesh);}
  mesh.position.copy(worldPos(item.x,item.y,width,height,-11));
  mesh.rotation.z=Math.sin((item.age||0)*.04)*.035;
  // El modelo 3D respeta el tamaño del hitbox 2D; antes era mucho más ancho
  // que su radio lógico y daba la impresión de que los disparos lo atravesaban.
  const modelWidth = item.variant==='carrier' ? 7 : item.variant==='bomber' ? 4.4 : 3.3;
  const depth = camera.position.z - (-11);
  const worldPerPixel = (2*Math.tan(THREE.MathUtils.degToRad(camera.fov/2))*depth)/height;
  const targetWidth = item.radius * 2 * 1.42;
  const visualScale = THREE.MathUtils.clamp((targetWidth*worldPerPixel)/modelWidth,.22,.72);
  mesh.scale.setScalar(visualScale);
 }
 for(const [id,mesh] of enemyMeshes){if(!alive.has(id)){spawn3DBurst(mesh.position.clone(),0xff5c91,1.15);scene.remove(mesh);mesh.traverse(o=>{if(o.geometry)o.geometry.dispose();});enemyMeshes.delete(id);}}
}

const bossGroup=new THREE.Group();scene.add(bossGroup);bossGroup.visible=false;
const bossMat=new THREE.MeshStandardMaterial({color:0x596779,metalness:.94,roughness:.25});
const bossBlack=new THREE.MeshStandardMaterial({color:0x11182a,metalness:.86,roughness:.3});
const bossCore=new THREE.MeshStandardMaterial({color:0xff398d,emissive:0xe00058,emissiveIntensity:3.4});
function buildBoss(){
 add(new THREE.BoxGeometry(8,.85,5.5),bossMat,[0,0,0],[0,0,0],bossGroup);
 add(new THREE.ConeGeometry(1.35,5.5,8),bossBlack,[0,0,-4.4],[Math.PI/2,0,0],bossGroup);
 add(new THREE.SphereGeometry(1.15,32,20),bossCore,[0,.35,-1.2],[0,0,0],bossGroup);
 for(const s of [-1,1]){
  add(new THREE.BoxGeometry(4.8,.45,3.2),bossBlack,[s*5,-.1,.45],[0,0,s*-.12],bossGroup);
  add(new THREE.BoxGeometry(1.1,1.2,2.2),bossMat,[s*7.1,.1,1.0],[0,0,s*-.15],bossGroup);
  for(let i=0;i<3;i++)add(new THREE.CylinderGeometry(.32,.48,1.3,16),bossCore,[s*(2.8+i*.9),-.25,2.9],[Math.PI/2,0,0],bossGroup);
 }
 for(let i=0;i<5;i++)add(new THREE.BoxGeometry(.22,.18,1.8),bossCore,[-3.2+i*1.6,.55,1.1],[0,0,0],bossGroup);
}
buildBoss();
function syncBoss(b,width,height,now){
 if(!b){bossGroup.visible=false;return;}
 bossGroup.visible=true;bossGroup.position.copy(worldPos(b.x,b.y,width,height,-10));
 bossGroup.scale.setScalar(Math.max(.85,b.radius/52));
 bossGroup.rotation.y=Math.sin(now*.001)*.08;bossGroup.rotation.z=Math.sin(now*.002)*.035;
 bossCore.emissiveIntensity=2.5+Math.sin(now*.012)*1.3+(b.phase===3?2:0);
}

// Fenómenos cósmicos 3D: agujero negro, supernova, magnetar y púlsar.
const phenomenonMeshes=new Map();
const fxBlack=new THREE.MeshBasicMaterial({color:0x02020a});
const fxGold=new THREE.MeshBasicMaterial({color:0xffb45a,transparent:true,opacity:.9});
const fxOrange=new THREE.MeshBasicMaterial({color:0xff542e,transparent:true,opacity:.72});
const fxViolet=new THREE.MeshBasicMaterial({color:0xc36bff,transparent:true,opacity:.8});
const fxCyan=new THREE.MeshBasicMaterial({color:0x62f5ff,transparent:true,opacity:.9});
const fxWhite=new THREE.MeshBasicMaterial({color:0xffffff});
function makePhenomenon(kind){
 const g=new THREE.Group();
 if(kind==='blackhole'){
  const core=new THREE.Mesh(new THREE.SphereGeometry(1,48,32),new THREE.MeshBasicMaterial({color:0x000106}));core.scale.set(1,1,.72);g.add(core);
  const diskA=new THREE.Mesh(new THREE.RingGeometry(1.18,2.72,128,4),new THREE.MeshBasicMaterial({color:0xff7a32,side:THREE.DoubleSide,transparent:true,opacity:.62,blending:THREE.AdditiveBlending,depthWrite:false}));
  diskA.rotation.x=Math.PI/2.18;diskA.scale.set(1,.56,1);g.add(diskA);
  const diskB=new THREE.Mesh(new THREE.RingGeometry(2.05,3.15,128,2),new THREE.MeshBasicMaterial({color:0x7d42ff,side:THREE.DoubleSide,transparent:true,opacity:.38,blending:THREE.AdditiveBlending,depthWrite:false}));
  diskB.rotation.x=Math.PI/2.18+.035;diskB.scale.set(1,.58,1);g.add(diskB);
  for(let i=0;i<5;i++){const tor=new THREE.Mesh(new THREE.TorusGeometry(1.22+i*.31,.045-i*.005,12,112),i%2?fxViolet:fxGold);tor.rotation.x=Math.PI/2.18+(i%2)*.09;tor.rotation.y=i*.19;g.add(tor);}
  const photon=new THREE.Mesh(new THREE.TorusGeometry(1.08,.085,12,112),new THREE.MeshBasicMaterial({color:0xffe6c1,transparent:true,opacity:.96,blending:THREE.AdditiveBlending}));photon.rotation.x=Math.PI/2.18;g.add(photon);
  const jetMat=new THREE.MeshBasicMaterial({color:0x7bdcff,transparent:true,opacity:.23,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,depthWrite:false});
  const jet=new THREE.Mesh(new THREE.ConeGeometry(.24,2.6,24,1,true),jetMat);jet.position.y=2;g.add(jet);const jet2=jet.clone();jet2.position.y=-2;jet2.rotation.z=Math.PI;g.add(jet2);
  const lens=new THREE.PointLight(0xff8a43,9,24);g.add(lens);
 } else if(kind==='supernova'){
  const star=new THREE.Mesh(new THREE.SphereGeometry(.82,48,32),new THREE.MeshBasicMaterial({color:0xfff5d7}));g.add(star);
  const inner=new THREE.Mesh(new THREE.SphereGeometry(1.08,40,28),new THREE.MeshBasicMaterial({color:0xffd36a,transparent:true,opacity:.62,blending:THREE.AdditiveBlending,depthWrite:false}));g.add(inner);
  const corona=new THREE.Mesh(new THREE.SphereGeometry(1.48,40,28),new THREE.MeshBasicMaterial({color:0xff5428,transparent:true,opacity:.28,blending:THREE.AdditiveBlending,depthWrite:false}));g.add(corona);
  for(let i=0;i<4;i++){const shell=new THREE.Mesh(new THREE.SphereGeometry(1,32,24),new THREE.MeshBasicMaterial({color:[0xffefb0,0xff7438,0xff3b91,0x8d58ff][i],wireframe:true,transparent:true,opacity:.34-i*.055,blending:THREE.AdditiveBlending,depthWrite:false}));shell.userData.shell=i;g.add(shell);}
  for(let i=0;i<3;i++){const arc=new THREE.Mesh(new THREE.TorusGeometry(1.45+i*.36,.035,8,96),i===1?fxViolet:fxGold);arc.rotation.set(Math.PI/2+i*.44,i*.7,i*.35);g.add(arc);}
  const positions=[];for(let i=0;i<520;i++){const u=Math.random()*2-1,phi=Math.random()*Math.PI*2,r=1.25+Math.random()*1.65,q=Math.sqrt(1-u*u);positions.push(r*q*Math.cos(phi),r*u,r*q*Math.sin(phi));}
  const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));const debris=new THREE.Points(pg,new THREE.PointsMaterial({color:0xffc06b,size:.075,transparent:true,opacity:.82,blending:THREE.AdditiveBlending,depthWrite:false}));debris.userData.debris=true;g.add(debris);
  const light=new THREE.PointLight(0xff6a36,16,48);g.add(light);
 } else if(kind==='magnetar'){
  const star=new THREE.Mesh(new THREE.SphereGeometry(.68,28,20),new THREE.MeshStandardMaterial({color:0xe5c8ff,emissive:0x9a28ff,emissiveIntensity:3.5,metalness:.25,roughness:.18}));g.add(star);
  for(let i=0;i<5;i++){
   const loop=new THREE.Mesh(new THREE.TorusGeometry(1.25+i*.22,.025,8,64),i%2?fxViolet:fxCyan);
   loop.rotation.set(Math.PI/2+(i-2)*.12,(i-2)*.22,0);g.add(loop);
  }
  const pulse=new THREE.Mesh(new THREE.SphereGeometry(1,24,18),new THREE.MeshBasicMaterial({color:0xc45cff,wireframe:true,transparent:true,opacity:.32,blending:THREE.AdditiveBlending,depthWrite:false}));
  pulse.userData.pulse=true;g.add(pulse);
  const light=new THREE.PointLight(0xc45cff,6,25);g.add(light);
 } else if(kind==='pulsar'){
  const star=new THREE.Mesh(new THREE.SphereGeometry(.58,28,20),new THREE.MeshStandardMaterial({color:0xc7ffff,emissive:0x00cfff,emissiveIntensity:4,metalness:.2,roughness:.15}));g.add(star);
  const beamMat=new THREE.MeshBasicMaterial({color:0x68fff0,transparent:true,opacity:.32,blending:THREE.AdditiveBlending,depthWrite:false});
  const beam=new THREE.Mesh(new THREE.CylinderGeometry(.12,.62,12,20,1,true),beamMat);
  beam.rotation.x=Math.PI/2;beam.position.z=-6;g.add(beam);
  const beam2=beam.clone();beam2.position.z=6;beam2.rotation.x=-Math.PI/2;g.add(beam2);
  for(let i=0;i<3;i++){
   const ring=new THREE.Mesh(new THREE.TorusGeometry(1+i*.32,.025,8,48),fxCyan);ring.rotation.x=Math.PI/2;g.add(ring);
  }
  const light=new THREE.PointLight(0x38f5ff,7,30);g.add(light);
 }
 return g;
}
function syncPhenomena(items,width,height,now){
 const alive=new Set();
 for(const item of items||[]){
  alive.add(item.id);
  let g=phenomenonMeshes.get(item.id);
  if(!g){g=makePhenomenon(item.kind);scene.add(g);phenomenonMeshes.set(item.id,g);}
  g.visible=true;
  g.position.copy(worldPos(item.x,item.y,width,height,-13));
  const age=(item.timer||0), phase=now*.001;
  if(item.kind==='supernova'){
   const r=Math.max(.5,(item.radius||18)/36);
   g.scale.setScalar(r);
   g.rotation.y=phase*.24;
   g.children.forEach(o=>{if(o.userData.shell!==undefined){const k=o.userData.shell,p=Math.min(1,age/(item.maxTimer||250)),s=1+k*.30+p*(2.8+k*.34);o.scale.setScalar(s);o.material.opacity=Math.max(.035,(.42-k*.065)*(1-p*.78));}if(o.userData.debris){o.rotation.y=phase*.22;o.scale.setScalar(1+Math.min(1.6,age/(item.maxTimer||250)*1.4));o.material.opacity=Math.max(.08,.82-age/(item.maxTimer||250)*.55);}});
  } else {
   const r=item.kind==='blackhole'?Math.max(.85,(item.radius||34)/34):item.kind==='magnetar'?1.25:1.15;
   g.scale.setScalar(r);
   g.rotation.z=item.kind==='blackhole'?phase*.22:item.kind==='magnetar'?-phase*.48:phase*1.1;
   g.rotation.y=item.kind==='pulsar'?phase*1.35:Math.sin(phase*.7)*.08;
   g.children.forEach((o,index)=>{
    if(o.userData.pulse){const p=(age%70)/70;const sc=1.05+p*1.45;o.scale.setScalar(sc);o.material.opacity=.38*(1-p);}
    if(item.kind==='blackhole' && o.geometry && o.geometry.type==='TorusGeometry') o.rotation.z=phase*(index%2?.34:-.27)+index*.23;
    if(item.kind==='magnetar' && o.geometry && o.geometry.type==='TorusGeometry') o.rotation.z=phase*(index%2?.7:-.55)+index*.19;
    if(item.kind==='pulsar' && o.geometry && o.geometry.type==='CylinderGeometry') o.rotation.z=phase*1.35;
    if(item.kind==='supernova' && o.userData.shell!==undefined){const p=(age%90)/90;o.material.opacity=.32*(1-p); }
   });
  }
 }
 for(const [id,g] of phenomenonMeshes){
  if(!alive.has(id)){scene.remove(g);g.traverse(o=>{if(o.geometry)o.geometry.dispose();});phenomenonMeshes.delete(id);}
 }
}
let last = performance.now();
let lastRender = 0;
const renderInterval = 1000 / 24; // Overlay 3D limitado a 24 FPS para priorizar fluidez del juego.
let targetX = 0, targetY = 0;
function resize() {
  const w=window.innerWidth, h=window.innerHeight; camera.aspect=w/h; camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.15));
renderer.shadowMap.enabled = false; renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.15)); renderer.setSize(w,h);
}
window.addEventListener('resize', resize, { passive: true });
function animate(now) {
  requestAnimationFrame(animate);
  if (now - lastRender < renderInterval) return;
  const frameDelta = (now-lastRender)/1000; lastRender=now;
  const dt=Math.min(frameDelta,.05); last=now;
  const data=window.__AETHER3D_STATE;
  if (data && data.playing) {
    const impact=window.__AETHER3D_IMPACT;
    if(impact && impact.serial!==lastImpactSerial){lastImpactSerial=impact.serial;spawn3DBurst(worldPos(impact.x,impact.y,data.width,data.height,-8),impact.color==="#55eaff"?0x55eaff:0xff684d,1.35);}
    // Usar la misma proyección perspectiva que asteroides, enemigos y proyectiles.
    // La fórmula anterior trataba la cámara como ortográfica y desplazaba la nave.
    const shipTarget = worldPos(data.x, data.y, data.width, data.height, -10);
    ship.position.x=THREE.MathUtils.damp(ship.position.x,shipTarget.x,16,dt);
    ship.position.y=THREE.MathUtils.damp(ship.position.y,shipTarget.y,16,dt);
    ship.position.z=THREE.MathUtils.damp(ship.position.z,-10,16,dt);
    ship.rotation.z=THREE.MathUtils.damp(ship.rotation.z,-(data.x-data.width/2)/(data.width/2)*.22,7,dt);
    ship.rotation.x=THREE.MathUtils.damp(ship.rotation.x,Math.sin(now*.002)*.018,3,dt);
    // Durante la invulnerabilidad la nave parpadea, pero nunca desaparece del todo.
    ship.visible=true;
    ship.traverse((part)=>{
      if(!part.isMesh || !part.material) return;
      const materials=Array.isArray(part.material)?part.material:[part.material];
      for(const mat of materials){
        if(mat.userData.baseOpacity===undefined) mat.userData.baseOpacity=mat.opacity;
        if(data.invulnerable){
          mat.transparent=true;
          mat.opacity=Math.min(mat.userData.baseOpacity,.58);
          mat.depthWrite=false;
        } else {
          mat.opacity=mat.userData.baseOpacity;
          mat.depthWrite=true;
        }
      }
    });
    shield.visible=!!data.shield;
    glowMat.emissiveIntensity=2.4+Math.sin(now*.012)*.45;
    rim.position.x=ship.position.x; rim.position.y=ship.position.y;
    camera.position.x=THREE.MathUtils.damp(camera.position.x,ship.position.x*.18,2.4,dt);
    camera.position.y=THREE.MathUtils.damp(camera.position.y,3.4+ship.position.y*.12,2.4,dt);
    camera.lookAt(camera.position.x*.25, camera.position.y*.18, -7);
    syncAsteroids(data.asteroids, data.width, data.height, dt);
    syncShots(data.shots, data.width, data.height);
    syncEnemyShots(data.enemyShots, data.width, data.height);
    syncEnemies(data.enemies, data.width, data.height);
    syncBoss(data.boss, data.width, data.height, now);
    syncPhenomena(data.phenomena, data.width, data.height, now);
  } else {
    ship.visible=false; shield.visible=false; bossGroup.visible=false;
    for (const mesh of asteroidMeshes.values()) mesh.visible=false;
    for (const mesh of shotMeshes.values()) mesh.visible=false;
    for (const mesh of enemyShotMeshes.values()) mesh.visible=false;
    for (const mesh of enemyMeshes.values()) mesh.visible=false;
    for (const mesh of phenomenonMeshes.values()) mesh.visible=false;
  }
  if(window.__aetherStarFar) window.__aetherStarFar.rotation.z+=dt*.00008;
  if(window.__aetherStarNear) window.__aetherStarNear.rotation.z+=dt*.00018;
  if(window.__aetherStarMid) window.__aetherStarMid.rotation.z-=dt*.00008;
  update3DBursts(dt);
  renderer.render(scene,camera);
}
try {
  document.body.classList.add('aether3d-ready');
  window.__AETHER3D_ACTIVE = true;
  requestAnimationFrame(animate);
  console.info('AETHER NOVA 3D: Alpha 5: proyectiles 3D con núcleo energético, carcasa luminosa y misiles modelados.');
} catch (error) {
  window.__AETHER3D_ACTIVE = false;
  document.body.classList.remove('aether3d-ready');
  console.error('AETHER NOVA 3D no pudo inicializarse; continúa el modo 2D.', error);
}
