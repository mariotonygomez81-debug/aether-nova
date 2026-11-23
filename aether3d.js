import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';

// Renderizador 3D transparente: representa la nave real del jugador.
// La lógica y las colisiones siguen ejecutándose en game.js.
const canvas = document.getElementById('aether3dCanvas');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(window.AETHER_PLATFORM?.pixelRatio || Math.min(window.devicePixelRatio || 1, 1.15));
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

// AETHER NOVA — entorno planetario cinematográfico.
 // Los cuerpos son puramente decorativos: no alteran colisiones ni progresión.
 // La densidad geométrica se adapta al perfil del dispositivo.
const qualityTier=window.AETHER_PLATFORM?.tier||"medium";
const planetSegments=qualityTier==="low"?24:qualityTier==="medium"?36:56;
const worldBody=new THREE.Group();
worldBody.name="AETHER_PLANETARY_BACKDROP";
environment.add(worldBody);

function makePlanetSurface(seed,base,land,ice){
  const canvas=document.createElement("canvas");canvas.width=384;canvas.height=192;
  const c=canvas.getContext("2d"),img=c.createImageData(canvas.width,canvas.height),d=img.data;
  for(let y=0;y<canvas.height;y++)for(let x=0;x<canvas.width;x++){
    const u=x/canvas.width,v=y/canvas.height;
    const broad=fbm(u*7+seed,v*5-seed,seed);
    const detail=fbm(u*22+seed*2,v*15+seed,seed+11);
    const ridges=Math.max(0,Math.min(1,(broad*.72+detail*.38-.53)*3.2));
    const polar=Math.pow(Math.abs(v-.5)*2,5);
    const mix=Math.max(0,Math.min(1,ridges*.82+polar*.24));
    const k=(y*canvas.width+x)*4;
    for(let channel=0;channel<3;channel++){
      const terrain=base[channel]*(1-mix)+land[channel]*mix;
      d[k+channel]=Math.max(0,Math.min(255,terrain*(1-polar*.28)+ice[channel]*polar*.28));
    }
    d[k+3]=255;
  }
  c.putImageData(img,0,0);
  const tex=new THREE.CanvasTexture(canvas);tex.colorSpace=THREE.SRGBColorSpace;
  tex.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
  return tex;
}
const planetTexture=makePlanetSurface(13,[34,75,105],[102,119,112],[174,202,220]);
const planetMaterial=new THREE.MeshStandardMaterial({map:planetTexture,color:0xc7dce9,roughness:.88,metalness:.06});
const worldEraColors=[
  [0xc7dce9,0x42bfff,0x91b5c8],[0xb4d6d8,0x35e0d2,0x8ebeb7],
  [0xd6b8a4,0xff9a62,0xd7a17c],[0xb9a8e4,0x9b72ff,0x9c87c7],
  [0x9eb7d0,0x4e9dff,0x91a9d2],[0xd2c6a4,0xffd27b,0xc9b88b],
  [0xa7c6b5,0x61e6b2,0x91bba7],[0xb9a6a6,0xff6e91,0xc18d9e],
  [0x9eb1c4,0x62b7dc,0x8ea8bc],[0xc8b4d9,0xb18aff,0xa48cbe]
];
let planetRingMaterial=null, currentWorldEra=-1;
function applyWorldEra(level){
  const era=Math.max(0,Math.floor((Math.max(1,level)-1)/10))%worldEraColors.length;
  if(era===currentWorldEra)return;
  currentWorldEra=era;
  const colors=worldEraColors[era];
  planetMaterial.color.setHex(colors[0]);
  atmosphere.material.color.setHex(colors[1]);
  if(planetRingMaterial)planetRingMaterial.color.setHex(colors[2]);
}
const planet=new THREE.Mesh(new THREE.SphereGeometry(16.5,planetSegments,Math.max(16,planetSegments/2)),planetMaterial);
planet.position.set(-48,25,-132);worldBody.add(planet);
const atmosphere=new THREE.Mesh(
  new THREE.SphereGeometry(17.15,planetSegments,Math.max(16,planetSegments/2)),
  new THREE.MeshBasicMaterial({color:0x42bfff,transparent:true,opacity:.105,side:THREE.BackSide,blending:THREE.AdditiveBlending,depthWrite:false})
);
atmosphere.position.copy(planet.position);worldBody.add(atmosphere);
if(qualityTier!=="low"){
  const ring=new THREE.Mesh(
    new THREE.TorusGeometry(20.1,.82,6,qualityTier==="medium"?64:112),
    (planetRingMaterial=new THREE.MeshStandardMaterial({color:0x91b5c8,metalness:.42,roughness:.72,transparent:true,opacity:.52,side:THREE.DoubleSide}))
  );
  ring.position.copy(planet.position);ring.rotation.set(1.19,.16,-.28);ring.scale.set(1,.72,1);worldBody.add(ring);
  const moon=new THREE.Mesh(
    new THREE.SphereGeometry(4.1,qualityTier==="medium"?20:32,16),
    new THREE.MeshStandardMaterial({color:0x8995a6,roughness:.96,metalness:.02})
  );
  moon.position.set(25,-18,-153);worldBody.add(moon);
  const moonRim=new THREE.Mesh(
    new THREE.SphereGeometry(4.28,qualityTier==="medium"?20:32,16),
    new THREE.MeshBasicMaterial({color:0x789bc0,transparent:true,opacity:.07,side:THREE.BackSide,blending:THREE.AdditiveBlending,depthWrite:false})
  );
  moonRim.position.copy(moon.position);worldBody.add(moonRim);
}
// Polvo espacial en profundidad: pocos puntos y sin luces individuales.
const dustCount=qualityTier==="low"?48:qualityTier==="medium"?96:160;
const dustPositions=[],dustColors=[];
for(let i=0;i<dustCount;i++){
  dustPositions.push((Math.random()-.5)*210,(Math.random()-.5)*118,-48-Math.random()*170);
  const tint=new THREE.Color([0x6c9db8,0x8ab9ce,0xb2a0d5,0x9daec0][i%4]);
  dustColors.push(tint.r,tint.g,tint.b);
}
const dustGeometry=new THREE.BufferGeometry();
dustGeometry.setAttribute("position",new THREE.Float32BufferAttribute(dustPositions,3));
dustGeometry.setAttribute("color",new THREE.Float32BufferAttribute(dustColors,3));
const cosmicDust=new THREE.Points(dustGeometry,new THREE.PointsMaterial({
  size:qualityTier==="low"?.32:.48,vertexColors:true,transparent:true,opacity:.24,
  sizeAttenuation:true,depthWrite:false,blending:THREE.AdditiveBlending
}));
environment.add(cosmicDust);

// Modelo 3D del jugador y catálogo de naves seleccionables.
const ship = new THREE.Group(); scene.add(ship);
const shipModel = new THREE.Group(); shipModel.name="valkyrie"; ship.add(shipModel);
const hullMat = new THREE.MeshPhysicalMaterial({ color: 0x9eb7c9, metalness: .94, roughness: .22, clearcoat: .8, clearcoatRoughness: .2 });
const darkMat = new THREE.MeshStandardMaterial({ color: 0x101c2c, metalness: .88, roughness: .3 });
const panelMat = new THREE.MeshStandardMaterial({ color: 0x31485d, metalness: .9, roughness: .34 });
const canopyMat = new THREE.MeshPhysicalMaterial({ color: 0x087ca5, metalness: .52, roughness: .09, transparent: true, opacity: .94, clearcoat: 1, emissive: 0x032c48 });
const glowMat = new THREE.MeshStandardMaterial({ color: 0x38efff, emissive: 0x00bde9, emissiveIntensity: 3.1, metalness: .3, roughness: .18 });
const goldMat = new THREE.MeshStandardMaterial({ color: 0xc78c45, metalness: .86, roughness: .28 });
function add(geometry, material, position, rotation=[0,0,0], parent=shipModel, scale=null) {
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
// Microgeometría de la Valkyrie: placas, respiraderos y guías de servicio.
 // Se añade al modelo base antes de crear las variantes, sin tocar su hitbox 2D.
for(const side of [-1,1]){
  // Paneles de blindaje superpuestos sobre las alas.
  add(new THREE.BoxGeometry(1.72,.055,1.08),hullMat,[side*1.58,.105,.34],[0,side*.13,side*-.055]);
  add(new THREE.BoxGeometry(1.34,.026,.055),goldMat,[side*1.58,.143,-.12],[0,side*.13,side*-.055]);
  add(new THREE.BoxGeometry(.82,.035,.07),glowMat,[side*1.58,.15,.78],[0,side*.13,side*-.055]);
  // Rejillas de refrigeración oscuras con tres aletas metálicas.
  add(new THREE.BoxGeometry(.48,.035,.32),darkMat,[side*1.02,.15,1.08]);
  for(let vent=0;vent<3;vent++){
    add(new THREE.BoxGeometry(.055,.022,.25),panelMat,[side*(.84+vent*.16),.174,1.08],[0,0,side*-.08]);
  }
  // Cañón reforzado con boca de energía y carcasa de montaje.
  add(new THREE.BoxGeometry(.28,.20,.72),darkMat,[side*1.72,-.10,-.58],[0,side*.12,0]);
  add(new THREE.CylinderGeometry(.12,.15,.16,16),goldMat,[side*1.72,-.10,-.98],[Math.PI/2,0,0]);
  add(new THREE.TorusGeometry(.12,.025,6,18),glowMat,[side*1.72,-.10,-1.075]);
  // Detalles de actuadores y uniones del ala.
  for(let bolt=0;bolt<4;bolt++){
    add(new THREE.SphereGeometry(.026,8,6),goldMat,[side*(.95+bolt*.36),.17,-.18+bolt*.09]);
  }
  add(new THREE.BoxGeometry(.12,.12,.82),darkMat,[side*2.18,.04,.96],[0,0,side*-.18]);
}
for(const side of [-1,1]){
  add(new THREE.TorusGeometry(.255,.038,8,24),goldMat,[side*.62,-.08,2.28]);
  add(new THREE.CylinderGeometry(.145,.18,.12,20),darkMat,[side*.62,-.08,2.34],[Math.PI/2,0,0]);
  add(new THREE.SphereGeometry(.105,16,12),glowMat,[side*.62,-.08,2.42]);
}

// Modelos de silueta diferenciada para cada clase de caza.
const shipVariants = Object.create(null);
const variantMats = {
  hull: hullMat, dark: darkMat, panel: panelMat, canopy: canopyMat,
  cyan: glowMat, gold: goldMat,
  stealth: new THREE.MeshPhysicalMaterial({color:0x302b50,metalness:.96,roughness:.2,clearcoat:.8}),
  green: new THREE.MeshStandardMaterial({color:0x42e6ad,metalness:.82,roughness:.24,emissive:0x064b36,emissiveIntensity:.55}),
  amber: new THREE.MeshStandardMaterial({color:0xf0a83a,metalness:.88,roughness:.26,emissive:0x5a2600,emissiveIntensity:.3}),
  violet: new THREE.MeshStandardMaterial({color:0x8b68cf,metalness:.9,roughness:.22,emissive:0x35106d,emissiveIntensity:.6}),
  ice: new THREE.MeshStandardMaterial({color:0xb8dfff,metalness:.94,roughness:.18,emissive:0x164b8a,emissiveIntensity:.45}),
  red: new THREE.MeshStandardMaterial({color:0xe45c72,metalness:.86,roughness:.24,emissive:0x641024,emissiveIntensity:.6}),
  lime: new THREE.MeshStandardMaterial({color:0xb4e65a,metalness:.88,roughness:.2,emissive:0x456d08,emissiveIntensity:.55}),
  white: new THREE.MeshStandardMaterial({color:0xe8eaff,metalness:.96,roughness:.16,emissive:0x443a9a,emissiveIntensity:.45})
};
function makeVariant(id, build) {
  const group=new THREE.Group(); group.name=id; group.visible=false; ship.add(group);
  const part=(geo,mat,pos,rot=[0,0,0],scale=null)=>{const m=new THREE.Mesh(geo,mat);m.position.set(...pos);m.rotation.set(...rot);if(scale)m.scale.set(...scale);group.add(m);return m;};
  const wing=(side,x,z,w,d,mat,angle=0)=>part(new THREE.BoxGeometry(w,.16,d),mat,[side*x,-.08,z],[0,side*angle,side*-.08]);
  const nose=(mat=variantMats.hull,len=4.2,r=.55)=>part(new THREE.ConeGeometry(r,len,10),mat,[0,0,-.55],[Math.PI/2,0,0]);
  const engine=(side,mat=variantMats.cyan,size=1.7)=>part(new THREE.ConeGeometry(.24,size,16),mat,[side*.72,-.08,2.65],[Math.PI/2,0,0]);
  build({part,wing,nose,engine,mat:variantMats});
  shipVariants[id]=group;
}
makeVariant("viper",({part,wing,nose,engine,mat})=>{
  nose(mat.green,4.9,.42);
  part(new THREE.SphereGeometry(.36,24,16),mat.canopy,[0,.34,-.62],[0,0,0],[.8,.62,1.6]);
  for(const s of [-1,1]){wing(s,1.55,.2,3.4,2.9,mat.green,.3);part(new THREE.ConeGeometry(.13,1.25,8),mat.gold,[s*2.9,.04,-.5],[Math.PI/2,0,s*.12]);engine(s,mat.green,2.25);}
  part(new THREE.BoxGeometry(.18,.18,2.3),mat.cyan,[0,.12,.3]);
});
makeVariant("titan",({part,wing,nose,engine,mat})=>{
  nose(mat.amber,3.8,.82);
  part(new THREE.BoxGeometry(1.18,.62,2.6),mat.hull,[0,-.02,.6]);
  part(new THREE.SphereGeometry(.48,24,16),mat.canopy,[0,.42,-.5],[0,0,0],[1.2,.7,1.1]);
  for(const s of [-1,1]){wing(s,1.8,.55,3.5,3.4,mat.amber,.08);part(new THREE.BoxGeometry(.65,.55,2.2),mat.dark,[s*2.35,-.02,1]);part(new THREE.CylinderGeometry(.32,.42,1.35,16),mat.gold,[s*1.2,-.1,2],[Math.PI/2,0,0]);engine(s,mat.amber,1.65);}
});
makeVariant("wraith",({part,wing,nose,engine,mat})=>{
  nose(mat.stealth,5.1,.48);
  part(new THREE.SphereGeometry(.38,24,16),mat.violet,[0,.28,-.75],[0,0,0],[.85,.5,1.6]);
  for(const s of [-1,1]){wing(s,1.8,.25,4.1,3.5,mat.stealth,.42);part(new THREE.ConeGeometry(.16,2.5,6),mat.violet,[s*2.65,.02,.35],[Math.PI/2,0,s*.18]);engine(s,mat.violet,2.1);}
  part(new THREE.TorusGeometry(.48,.07,8,24),mat.violet,[0,.15,1.55],[Math.PI/2,0,0]);
});
makeVariant("bastion",({part,wing,nose,engine,mat})=>{
  nose(mat.ice,3.9,.72);
  part(new THREE.BoxGeometry(1.35,.72,3.1),mat.ice,[0,0,.55]);
  part(new THREE.SphereGeometry(.44,24,16),mat.canopy,[0,.48,-.6],[0,0,0],[1.15,.55,1.2]);
  for(const s of [-1,1]){wing(s,2.05,.65,3.7,2.8,mat.dark,.04);part(new THREE.BoxGeometry(.78,.62,2.7),mat.ice,[s*2.35,-.02,.8]);part(new THREE.CylinderGeometry(.3,.42,1.2,16),mat.gold,[s*2.2,-.1,2.1],[Math.PI/2,0,0]);engine(s,mat.ice,1.55);}
});
makeVariant("phoenix",({part,wing,nose,engine,mat})=>{
  nose(mat.red,4.8,.52);
  part(new THREE.SphereGeometry(.4,24,16),mat.canopy,[0,.34,-.68],[0,0,0],[.9,.62,1.5]);
  for(const s of [-1,1]){wing(s,1.7,.1,3.2,4.1,mat.red,.28);part(new THREE.ConeGeometry(.32,2.6,8),mat.amber,[s*2.35,.02,1.05],[Math.PI/2,0,s*.22]);engine(s,mat.red,2.8);}
  part(new THREE.ConeGeometry(.18,1.4,8),mat.amber,[0,.1,1.6],[Math.PI/2,0,0]);
});
makeVariant("singularity",({part,wing,nose,engine,mat})=>{
  nose(mat.lime,4.3,.56);
  part(new THREE.SphereGeometry(.5,28,18),mat.stealth,[0,.36,-.55],[0,0,0],[1,.62,1.45]);
  for(const s of [-1,1]){wing(s,1.7,.35,3.1,2.5,mat.lime,.2);part(new THREE.TorusGeometry(1.0,.09,8,32),mat.cyan,[s*1.55,.02,.65],[Math.PI/2,0,s*.2]);engine(s,mat.lime,2.1);}
  part(new THREE.TorusGeometry(1.15,.1,10,48),mat.lime,[0,.05,.55],[Math.PI/2,0,0]);
});
makeVariant("omega",({part,wing,nose,engine,mat})=>{
  nose(mat.white,5.1,.5);
  part(new THREE.SphereGeometry(.42,28,18),mat.canopy,[0,.4,-.72],[0,0,0],[.95,.58,1.55]);
  for(const s of [-1,1]){wing(s,1.55,-.05,3.9,3.5,mat.white,.34);part(new THREE.ConeGeometry(.23,3.0,7),mat.violet,[s*2.5,.02,.45],[Math.PI/2,0,s*.2]);engine(s,mat.white,2.6);}
  part(new THREE.BoxGeometry(.28,.22,2.4),mat.violet,[0,.2,.25]);
});

// Alpha 36: alas esculpidas, blindaje facetado, cabina y propulsión con volumen.
// Cada clase recibe una geometría de ala propia, además de su estructura específica.
const wingProfiles = {
  valkyrie:[[.34,-1.8],[1.05,-1.15],[3.45,-.35],[2.85,.65],[1.2,.42],[.42,1.22]],
  viper:[[.35,-1.65],[1.05,-.95],[3.45,.35],[2.55,.72],[1.25,.35],[.5,1.15]],
  titan:[[.35,-1.35],[1.1,-1.1],[3.75,-.45],[3.25,.9],[1.2,1.25],[.4,1.05]],
  wraith:[[.3,-1.7],[1.25,-1.1],[3.8,.85],[2.75,.55],[1.2,.25],[.45,1.2]],
  bastion:[[.35,-1.45],[1.2,-1.2],[3.55,-.75],[3.75,.45],[1.45,1.15],[.45,1.0]],
  phoenix:[[.35,-1.8],[1.0,-1.15],[3.55,-.2],[2.8,.6],[1.0,.2],[.35,1.25]],
  singularity:[[.35,-1.4],[1.1,-1.0],[3.35,-.4],[2.7,.7],[1.3,.5],[.45,1.1]],
  omega:[[.3,-1.8],[1.0,-1.1],[3.8,.4],[2.8,.65],[1.15,.2],[.4,1.2]]
};
const armorMats = {
  valkyrie:hullMat,viper:variantMats.green,titan:variantMats.amber,wraith:variantMats.stealth,
  bastion:variantMats.ice,phoenix:variantMats.red,singularity:variantMats.lime,omega:variantMats.white
};
for(const [id,group] of [["valkyrie",shipModel],...Object.entries(shipVariants)]){
  const profile=wingProfiles[id]||wingProfiles.viper;
  const mat=armorMats[id]||hullMat;
  const armorMaterial=mat.clone(); armorMaterial.side=THREE.DoubleSide;
  for(const side of [-1,1]){
    const shape=new THREE.Shape();
    profile.forEach(([x,z],i)=>i?shape.lineTo(side*x,z):shape.moveTo(side*x,z));
    shape.closePath();
    const geo=new THREE.ExtrudeGeometry(shape,{depth:.16,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.075,bevelThickness:.055});
    geo.rotateX(-Math.PI/2);
    const armor=new THREE.Mesh(geo,armorMaterial);
    armor.position.y=-.17; armor.castShadow=false; group.add(armor);
    // Líneas de borde luminosas y nervaduras metálicas.
    const edge=new THREE.Mesh(new THREE.BoxGeometry(.055,.055,2.15),glowMat);
    edge.position.set(side*1.62,.015,.05); edge.rotation.y=side*.22; group.add(edge);
    for(let j=0;j<3;j++){
      const rib=new THREE.Mesh(new THREE.BoxGeometry(.055,.045,1.05+j*.22),panelMat);
      rib.position.set(side*(.95+j*.48),-.055,.28+j*.18);
      rib.rotation.y=side*(.12+j*.055); group.add(rib);
    }
    // Cañones dobles con bocas metálicas y emisores.
    const barrel=new THREE.Mesh(new THREE.CylinderGeometry(.075,.11,1.35,16),goldMat);
    barrel.rotation.x=Math.PI/2; barrel.position.set(side*1.28,-.06,-1.05); group.add(barrel);
    const muzzle=new THREE.Mesh(new THREE.CylinderGeometry(.105,.105,.13,16),glowMat);
    muzzle.rotation.x=Math.PI/2; muzzle.position.set(side*1.28,-.06,-1.76); group.add(muzzle);
    // Motor independiente: carcasa, anillo de tobera y núcleo de plasma.
    const engineX=side*(id==="bastion"||id==="titan"?1.35:.72);
    const nozzle=new THREE.Mesh(new THREE.CylinderGeometry(.34,.48,.72,24,1,true),darkMat);
    nozzle.rotation.x=Math.PI/2; nozzle.position.set(engineX,-.08,1.95); group.add(nozzle);
    const rimRing=new THREE.Mesh(new THREE.TorusGeometry(.36,.075,10,28),goldMat);
    rimRing.position.set(engineX,-.08,2.32); group.add(rimRing);
    const core=new THREE.Mesh(new THREE.CylinderGeometry(.19,.25,.12,20),glowMat);
    core.rotation.x=Math.PI/2; core.position.set(engineX,-.08,2.34); group.add(core);
  }
  // Placas dorsales escalonadas, escotillas y sensores de navegación.
  for(let i=0;i<4;i++){
    const plate=new THREE.Mesh(new THREE.BoxGeometry(.34,.075,.38),panelMat);
    plate.position.set(0,.24,.05+i*.48); group.add(plate);
  }
  const dorsal=new THREE.Mesh(new THREE.BoxGeometry(.22,.12,2.45),mat);
  dorsal.position.set(0,.22,.05); group.add(dorsal);
  const sensor=new THREE.Mesh(new THREE.SphereGeometry(.12,16,12),glowMat);
  sensor.position.set(0,.34,-1.35); group.add(sensor);
}

// PROPULSIÓN CINEMÁTICA: toberas multicapa con plasma animado para cada caza.
const engineFX=[];
function attachEngineFX(group,id){
  const xs=id==="titan"||id==="bastion"?[-1.35,1.35]:id==="valkyrie"?[-.62,.62]:[-.9,0,.9];
  const tint=id==="phoenix"?0xff7a38:id==="wraith"||id==="omega"?0x9b7cff:id==="singularity"?0xb8ff62:id==="bastion"?0x8edfff:0x38eaff;
  for(const x of xs){
    const outer=new THREE.Mesh(new THREE.ConeGeometry(.34,2.15,18,1,true),new THREE.MeshBasicMaterial({color:tint,transparent:true,opacity:.42,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));
    outer.rotation.x=Math.PI/2;outer.position.set(x,-.08,3.35);group.add(outer);
    const inner=new THREE.Mesh(new THREE.ConeGeometry(.15,1.42,16,1,true),new THREE.MeshBasicMaterial({color:0xeaffff,transparent:true,opacity:.72,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));
    inner.rotation.x=Math.PI/2;inner.position.set(x,-.08,3.08);group.add(inner);
    const core=new THREE.Mesh(new THREE.SphereGeometry(.19,18,12),new THREE.MeshBasicMaterial({color:0xc9fbff,transparent:true,opacity:.78,blending:THREE.AdditiveBlending,depthWrite:false}));
    core.position.set(x,-.08,2.52);group.add(core);engineFX.push({outer,inner,core,seed:engineFX.length*.91});
  }
}
attachEngineFX(shipModel,"valkyrie");
for(const [id,group] of Object.entries(shipVariants))attachEngineFX(group,id);

const shield = new THREE.Mesh(new THREE.SphereGeometry(2.65, 24, 16), new THREE.MeshBasicMaterial({ color: 0x37dcff, wireframe: true, transparent: true, opacity: .13 }));
shield.visible = false; ship.add(shield);

// Nave del segundo piloto: modelo 3D duplicado, materiales propios y firma naranja.
const ship2 = ship.clone(true);
ship2.visible = false;
ship2.scale.setScalar(1);
ship2.traverse(part=>{
  if(!part.isMesh||!part.material)return;
  const copyMaterial=mat=>{
    const m=mat.clone();
    if(m.color)m.color.set(0xffa34d);
    if(m.emissive)m.emissive.set(0x9b3c12);
    if("emissiveIntensity" in m)m.emissiveIntensity=Math.max(1.1,m.emissiveIntensity||0);
    return m;
  };
  part.material=Array.isArray(part.material)?part.material.map(copyMaterial):copyMaterial(part.material);
});
scene.add(ship2);

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
// Detalles compartidos para que el acabado mineral no multiplique geometrías por asteroide.
const rockDetailGeometry = {
  crater: new THREE.SphereGeometry(1, 10, 7),
  craterRim: new THREE.TorusGeometry(.78,.105,5,14),
  crystal: new THREE.ConeGeometry(.19,.62,5,1),
  seam: new THREE.CylinderGeometry(.018,.018,1,5)
};
const rockDetailMaterials = {
  shadow: new THREE.MeshStandardMaterial({color:0x111923,roughness:1,metalness:0}),
  rim: new THREE.MeshStandardMaterial({color:0x9aa7b2,roughness:.88,metalness:.12}),
  ice: new THREE.MeshStandardMaterial({color:0x63dfff,emissive:0x0b5878,emissiveIntensity:.7,roughness:.32,metalness:.24}),
  ore: new THREE.MeshStandardMaterial({color:0xffa15b,emissive:0x6e260b,emissiveIntensity:.42,roughness:.68,metalness:.3})
};
Object.values(rockDetailGeometry).forEach(geometry=>{geometry.userData.sharedGeometry=true;});
function addRockSurfaceDetails(mesh,item){
  const detail=new THREE.Group();
  detail.name="asteroid-surface-details";
  const seed=Math.abs(Number(item.id)||1);
  const detailCount=qualityTier==="low"?1:qualityTier==="medium"?2:3;
  for(let i=0;i<detailCount;i++){
    const angle=(seed*.731+i*2.399)% (Math.PI*2);
    const latitude=-.42+(i%3)*.39;
    const normal=new THREE.Vector3(Math.cos(angle)*Math.cos(latitude),Math.sin(latitude),Math.sin(angle)*Math.cos(latitude)).normalize();
    const crater=new THREE.Group();
    crater.position.copy(normal.clone().multiplyScalar(.965));
    crater.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),normal);
    const bowl=new THREE.Mesh(rockDetailGeometry.crater,rockDetailMaterials.shadow);
    bowl.scale.set(.19+(i%2)*.055,.15,.035);
    crater.add(bowl);
    const rim=new THREE.Mesh(rockDetailGeometry.craterRim,rockDetailMaterials.rim);
    rim.scale.set(.22+(i%2)*.055,.18,1);
    rim.position.z=.012;
    crater.add(rim);
    detail.add(crater);
  }
  if(item.kind==="magnetic"||item.kind==="explosive"){
    const crystalMat=item.kind==="magnetic"?rockDetailMaterials.ice:rockDetailMaterials.ore;
    const crystals=qualityTier==="low"?1:2;
    for(let i=0;i<crystals;i++){
      const shard=new THREE.Mesh(rockDetailGeometry.crystal,crystalMat);
      const angle=(seed*.41+i*Math.PI)*1.7;
      shard.position.set(Math.cos(angle)*.66,.42+(i%2)*.12,Math.sin(angle)*.66);
      shard.rotation.set(.25+i*.18,angle,.45-i*.2);
      shard.scale.setScalar(item.kind==="magnetic"?1:.72);
      detail.add(shard);
    }
  }
  mesh.add(detail);
  mesh.userData.surfaceDetails=detail;
}
function addAsteroid3D(item) {
  const material = asteroidMaterials[item.kind] || asteroidMaterials.normal;
  const geometry = item.kind === 'shooting_star' ? new THREE.SphereGeometry(1, 14, 10) : makeRockGeometry(item.id);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = false; mesh.receiveShadow = false;
  if(item.kind!=="shooting_star")addRockSurfaceDetails(mesh,item);
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
    if (mesh.userData.surfaceDetails) {
      const detail=mesh.userData.surfaceDetails;
      detail.rotation.set(item.rot*.11,item.rot*.17,item.rot*.09);
    }
    if (item.hitFlash > 0 && item.kind !== 'shooting_star') mesh.material = asteroidMaterials.explosive;
    else mesh.material = asteroidMaterials[item.kind] || asteroidMaterials.normal;
    mesh.visible = true;
  }
  for (const [id, mesh] of asteroidMeshes) {
    if (!alive.has(id)) { spawn3DBurst(mesh.position.clone(),0xffbd68,Math.max(.65,mesh.scale.x*.55)); scene.remove(mesh); mesh.geometry.dispose(); if (mesh.children.length) mesh.children.forEach(child=>{if(child.geometry&&!child.geometry.userData.sharedGeometry)child.geometry.dispose();}); asteroidMeshes.delete(id); }
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
  if(item.type==="laser"){
    const beam=new THREE.Mesh(new THREE.CylinderGeometry(.075,.13,2.25,16),mats.core);
    beam.position.y=-.58;
    group.add(beam);
    const aura=new THREE.Mesh(new THREE.CylinderGeometry(.19,.24,2.5,16),mats.glow);
    aura.position.y=-.58;
    group.add(aura);
    const tip=new THREE.Mesh(new THREE.SphereGeometry(.18,20,16),mats.shell);
    tip.position.y=.58;
    group.add(tip);
  } else {
  // Orbe de plasma compacto con tres capas luminosas concéntricas.
  const core=new THREE.Mesh(new THREE.SphereGeometry(1,32,24),mats.core);
  core.scale.setScalar(item.type==="plasma"?.34:item.missile?.24:.205);
  group.add(core);
  const shell=new THREE.Mesh(new THREE.SphereGeometry(1,32,24),mats.shell);
  shell.scale.setScalar(item.type==="plasma"?.49:item.missile?.35:.30);
  group.add(shell);
  const halo=new THREE.Mesh(new THREE.SphereGeometry(1,28,20),mats.glow);
  halo.scale.setScalar(item.type==="plasma"?.66:item.missile?.49:.43);
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
  }
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
 const group=new THREE.Group();group.position.copy(position);scene.add(group);const particles=[];
 for(let i=0;i<30;i++){
  const mesh=new THREE.Mesh(new THREE.SphereGeometry(.035+Math.random()*.085,8,6),new THREE.MeshBasicMaterial({color,transparent:true,opacity:.95,blending:THREE.AdditiveBlending,depthWrite:false}));
  const u=Math.random()*2-1,angle=Math.random()*Math.PI*2,q=Math.sqrt(1-u*u),v=.85+Math.random()*3.2;
  group.add(mesh);particles.push({mesh,vx:Math.cos(angle)*q*v,vy:u*v,vz:Math.sin(angle)*q*v});
 }
 const rings=[];
 for(let i=0;i<3;i++){const ring=new THREE.Mesh(new THREE.TorusGeometry(.3+i*.12,.035-i*.006,8,40),new THREE.MeshBasicMaterial({color:i===1?0xffffff:color,transparent:true,opacity:.92-i*.16,blending:THREE.AdditiveBlending,depthWrite:false}));ring.rotation.set(i*.78,Math.PI/2.3+i*.52,i*.6);group.add(ring);rings.push(ring);}
 const flash=new THREE.Mesh(new THREE.SphereGeometry(.32,20,14),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.8,blending:THREE.AdditiveBlending,depthWrite:false}));
 group.add(flash);group.scale.setScalar(scale);fxBursts.push({group,particles,rings,flash,life:30,maxLife:30});
}
function update3DBursts(dt){
 for(let i=fxBursts.length-1;i>=0;i--){
  const fx=fxBursts[i];fx.life-=dt*60;const k=Math.max(0,fx.life/fx.maxLife),progress=1-k;
  for(const p of fx.particles){p.mesh.position.x+=p.vx*dt;p.mesh.position.y+=p.vy*dt;p.mesh.position.z+=p.vz*dt;p.mesh.material.opacity=k;}
  fx.rings.forEach((ring,j)=>{ring.scale.setScalar(.8+progress*(3.6+j*.8));ring.material.opacity=k*(.9-j*.18);});
  fx.flash.scale.setScalar(.4+progress*3.8);fx.flash.material.opacity=Math.max(0,.82*(1-progress*3.2));
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
  add(new THREE.BoxGeometry(2.7,.5,2.8),enemyDark,[0,-.2,.7],[0,0,0],g);
  for(const s of [-1,1]) add(new THREE.SphereGeometry(.32,16,12),enemyGold,[s*.75,-.35,1.35],[0,0,0],g);
 } else if(variant==='carrier'){
  add(new THREE.BoxGeometry(4.5,.55,3.5),enemyDark,[0,-.2,.7],[0,0,0],g);
  for(let i=-2;i<=2;i++) add(new THREE.BoxGeometry(.36,.22,1.7),enemyViolet,[i*.7,.18,1.3],[0,0,0],g);
  add(new THREE.SphereGeometry(.55,20,14),enemyCyan,[0,.2,-.3],[0,0,0],g);
 } else if(variant==='interceptor'){
  for(const s of [-1,1]) add(new THREE.ConeGeometry(.2,1.35,8),enemyRed,[s*1.15,0,.1],[0,0,s*.8],g);
 }
 // Placas de blindaje, líneas emisivas y reactor central para lectura clara a distancia.
 add(new THREE.BoxGeometry(variant==='carrier'?1.25:.48,.12,1.15),enemyDark,[0,.16,-.18],[0,0,0],g);
 add(new THREE.SphereGeometry(variant==='carrier'?.34:.22,18,14),enemyCyan,[0,.20,1.05],[0,0,0],g);
 const dorsal=add(new THREE.BoxGeometry(.12,.10,variant==='carrier'?3.1:1.9),accent,[0,.22,.05],[0,0,0],g);
 // Aletas facetadas, paneles de blindaje y líneas de energía propias de cada clase.
 for(const side of [-1,1]){
  const span=variant==='carrier'?3.5:variant==='bomber'?2.2:variant==='lancer'?1.15:1.65;
  const plate=add(new THREE.BoxGeometry(span*.72,.075,.86),enemyDark,[side*span*.48,.08,.35],[0,side*.16,side*.08],g);
  plate.material=enemyDark;
  add(new THREE.BoxGeometry(span*.62,.045,.12),accent,[side*span*.48,.13,-.02],[0,side*.16,side*.08],g);
  add(new THREE.BoxGeometry(.10,.075,.62),enemyCyan,[side*span*.65,.15,.48],[0,side*.16,0],g);
  const exhaust=new THREE.Mesh(new THREE.ConeGeometry(.16,.92,12,1,true),new THREE.MeshBasicMaterial({color:variant==='bomber'?0xffb35c:variant==='weaver'?0xb18aff:0x4cecff,transparent:true,opacity:.42,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));
  exhaust.rotation.x=Math.PI/2;exhaust.position.set(side*.55,-.14,2.72);exhaust.userData.enemyFlame=true;g.add(exhaust);
 }
 for(let i=0;i<3;i++)add(new THREE.BoxGeometry(.18,.045,.28),enemyDark,[-.25+i*.25,.25,.55],[0,0,0],g);
 // Microdetalle industrial compartido: paneles, ranuras de ventilación y sensores.
 const bodySpan=variant==='carrier'?2.8:variant==='bomber'?1.9:1.25;
 for(const side of [-1,1]){
  add(new THREE.BoxGeometry(bodySpan*.42,.035,.42),enemyHull,[side*bodySpan*.27,.205,-.48],[0,side*.08,0],g);
  for(let vent=0;vent<3;vent++){
   add(new THREE.BoxGeometry(.055,.025,.34),enemyCyan,[side*(.28+vent*.105),.235,.12],[0,0,0],g);
  }
  const sensor=add(new THREE.SphereGeometry(.095,12,8),accent,[side*(variant==='carrier'?2.05:.82),.22,-.82],[0,0,0],g);
  sensor.userData.enemySensor=side;
 }
 // Cañones compactos y abrazaderas de motor, con silueta diferenciada por clase.
 const barrelCount=variant==='carrier'?4:variant==='bomber'?3:2;
 for(let i=0;i<barrelCount;i++){
  const x=(i-(barrelCount-1)/2)*(variant==='carrier'?.72:.42);
  add(new THREE.CylinderGeometry(.075,.11,variant==='carrier'?1.25:.78,10),enemyDark,[x,-.12,-1.02],[Math.PI/2,0,0],g);
  add(new THREE.CylinderGeometry(.105,.105,.12,10),accent,[x,-.12,-1.43],[Math.PI/2,0,0],g);
 }
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
  mesh.traverse(part=>{if(part.userData.enemyFlame){const pulse=.82+.2*Math.sin((item.age||0)*.22);part.scale.set(1,pulse,1);part.material.opacity=.26+.2*pulse;}});
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
let currentBossVariant=-1;
function buildBoss(v=0){
 bossGroup.clear();
 const colors=[0xff398d,0xff8b38,0x22f0d0,0x75f0c4,0xff3864,0xd8e2f0,0xffad66,0xff874a,0xb9a0ff,0xff3d8d];
 bossCore.color.setHex(colors[v]);bossCore.emissive.setHex(colors[v]);
 const p=(w,h,d,x,y,z,m=bossMat,r=[0,0,0])=>add(new THREE.BoxGeometry(w,h,d),m,[x,y,z],r,bossGroup);
 const c=(x,y,z,r=1)=>add(new THREE.SphereGeometry(r,24,16),bossCore,[x,y,z],[0,0,0],bossGroup);
 if(v===0){p(8,.85,5.5,0,0,0);c(0,.35,-1.2,1.15);for(const q of [-1,1]){p(4.8,.45,3.2,q*5,-.1,.45,bossBlack,[0,0,q*-.12]);p(1.1,1.2,2.2,q*7,.1,1);for(let i=0;i<3;i++)add(new THREE.CylinderGeometry(.32,.48,1.3,16),bossCore,[q*(2.8+i*.9),-.25,2.9],[Math.PI/2,0,0],bossGroup);}}
 else if(v===1){p(4.2,1.1,7,0,0,-.2);add(new THREE.ConeGeometry(2.3,7,6),bossBlack,[0,0,-4],[Math.PI/2,0,0],bossGroup);c(0,.4,-1.4,1.3);for(const q of [-1,1]){p(1.1,.7,5,q*2.5,-.1,.6,bossBlack,[0,0,q*.24]);add(new THREE.ConeGeometry(.55,3.4,8),bossCore,[q*3.1,0,2],[Math.PI/2,0,0],bossGroup);}}
 else if(v===2){for(let i=0;i<3;i++){const m=add(new THREE.TorusGeometry(3.2+i*.8,.32,12,64),bossCore,[0,0,0],[Math.PI/2,0,i*.45],bossGroup);m.rotation.x=.5+i*.3;}c(0,0,0,1.35);for(let i=0;i<8;i++){const q=i*Math.PI/4;p(1.1,.7,2.8,Math.cos(q)*4,Math.sin(q)*3,0,bossBlack,[0,0,q]);}}
 else if(v===3){p(2.6,.8,5,0,0,0);c(0,.45,-.6,1.1);for(const q of [-1,1]){p(2,.55,5,q*3,.1,.5,bossBlack,[0,0,q*.55]);p(.8,1.1,3.5,q*5,.1,1);for(let i=0;i<4;i++)add(new THREE.ConeGeometry(.35,2.2,8),bossCore,[q*(2+i*.85),0,2.6],[Math.PI/2,0,q*.1],bossGroup);}}
 else if(v===4){p(7,1,6,0,0,0,bossBlack);c(0,.5,-1,1.5);for(const q of [-1,1]){p(3,.45,4,q*4,.1,.5);add(new THREE.ConeGeometry(.8,4,8),bossCore,[q*5,0,-2],[Math.PI/2,0,q*.2],bossGroup);}for(let i=0;i<6;i++)p(.2,.2,2,-3+i*1.2,.7,1,bossCore);}
 else if(v===5){p(10,1.6,5,0,0,0,bossBlack);p(8,.45,2.5,0,.9,.4);c(0,.65,-.6,1.25);for(const q of [-1,1]){p(2.6,1.3,4,q*5.2,0,.3);for(let i=0;i<4;i++)p(.35,.5,3,q*(2.2+i*.65),.9,1,bossCore);}}
 else if(v===6){const core=add(new THREE.SphereGeometry(2.1,32,24),bossBlack,[0,0,0]);core.scale.set(1.25,1,.8);c(0,0,0,1.35);for(let i=0;i<3;i++){const m=add(new THREE.TorusGeometry(3.2+i*.7,.16,10,72),bossCore,[0,0,0],[.5+i*.35,.2+i*.45,0],bossGroup);m.rotation.z=i*.8;}for(let i=0;i<6;i++){const q=i*Math.PI/3;add(new THREE.ConeGeometry(.7,3.8,8),bossMat,[Math.cos(q)*4,Math.sin(q)*3,0],[0,0,q],bossGroup);}}
 else if(v===7){p(9,1.4,7,0,0,0,bossBlack);c(0,.7,-1.4,1.3);for(const q of [-1,1]){p(2,.7,5,q*5,0,1);for(let i=0;i<3;i++)add(new THREE.CylinderGeometry(.55,.8,2.2,12),bossCore,[q*(3.2+i*.9),-.2,3],[Math.PI/2,0,0],bossGroup);}}
 else if(v===8){c(0,0,0,1.15);for(let i=0;i<4;i++)add(new THREE.TorusGeometry(2.5+i*.6,.18,12,64),bossCore,[0,0,0],[Math.PI/2,i*.55,i*.8],bossGroup);for(let i=0;i<8;i++){const q=i*Math.PI/4;p(.5,.5,4,Math.cos(q)*3.8,Math.sin(q)*3,0,bossBlack,[0,0,q]);}}
 else{p(8,1.2,6,0,0,0,bossBlack);c(0,.5,-.7,1.7);for(const q of [-1,1]){p(3,.5,5,q*4,.1,.2,bossMat,[0,0,q*.35]);for(let i=0;i<3;i++)add(new THREE.ConeGeometry(.45,3,8),bossCore,[q*(2.4+i*.9),0,2.6],[Math.PI/2,0,q*.1],bossGroup);}add(new THREE.TorusGeometry(5,.16,12,96),bossCore,[0,0,0],[Math.PI/2,0,0],bossGroup);}
 // Detalle de ingeniería del casco: blindaje segmentado, disipadores y bocas de cañón.
 for(const side of [-1,1]){
  for(let i=0;i<4;i++){
   add(new THREE.BoxGeometry(.42,.12,1.55),bossBlack,[side*(1.35+i*.72),-.72,-.35],[0,0,side*.035],bossGroup);
   add(new THREE.BoxGeometry(.22,.045,.9),bossCore,[side*(1.35+i*.72),-.635,-.36],[0,0,side*.035],bossGroup);
  }
  const cannon=add(new THREE.CylinderGeometry(.24,.34,2.2,16),bossBlack,[side*4.55,-.18,2.15],[Math.PI/2,0,0],bossGroup);
  add(new THREE.CylinderGeometry(.29,.29,.16,16),bossCore,[side*4.55,-.18,3.22],[Math.PI/2,0,0],bossGroup);
  const vent=add(new THREE.BoxGeometry(.72,.09,1.4),bossMat,[side*5.1,.42,-1.15],[0,0,side*.12],bossGroup);
  vent.userData.bossVent=side;
 }
 // Sensores frontales y aletas de estabilización dan escala y lectura de amenaza.
 for(let i=0;i<5;i++){
  const x=(i-2)*.78;
  add(new THREE.SphereGeometry(.16,14,10),bossCore,[x,.42,2.8],[0,0,0],bossGroup);
  add(new THREE.BoxGeometry(.12,.7,1.8),bossMat,[x*.82,.08,-2.45],[0,0,(i-2)*.035],bossGroup);
 }
 // Kit de comandante: placas laterales, aros de reactor y balizas de energía.
 for(const side of [-1,1]){
  add(new THREE.BoxGeometry(2.05,.22,2.65),bossMat,[side*3.25,-.58,.35],[0,0,side*.12],bossGroup);
  add(new THREE.SphereGeometry(.24,18,14),bossCore,[side*4.2,.25,1.42],[0,0,0],bossGroup);
  add(new THREE.BoxGeometry(.16,.13,2.35),bossCore,[side*2.25,.55,-.12],[0,0,side*.08],bossGroup);
 }
 for(let i=0;i<2;i++){
  const halo=add(new THREE.TorusGeometry(5.65+i*.55,.075,10,96),bossCore,[0,.08,0],[Math.PI/2.1+i*.4,.2+i*.48,i*.35],bossGroup);
  halo.userData.bossHalo=i;
 }
 for(let i=0;i<8;i++){
  const angle=i*Math.PI/4,beacon=add(new THREE.SphereGeometry(.105,12,8),bossCore,[Math.cos(angle)*5.25,Math.sin(angle)*3.15,.12],[0,0,0],bossGroup);
  beacon.userData.bossBeacon=i;
 }
 // Escudo holográfico de emergencia: aparece en la tercera fase del jefe.
 const shieldShell=new THREE.Mesh(
  new THREE.IcosahedronGeometry(7.25,2),
  new THREE.MeshBasicMaterial({color:colors[v],wireframe:true,transparent:true,opacity:.12,blending:THREE.AdditiveBlending,depthWrite:false})
 );
 shieldShell.userData.bossShield=true;shieldShell.visible=false;bossGroup.add(shieldShell);
}
function syncBoss(b,width,height,now){
 if(!b){bossGroup.visible=false;return;}
 if(currentBossVariant!==b.variant){currentBossVariant=b.variant;buildBoss(b.variant);}
 bossGroup.visible=true;bossGroup.position.copy(worldPos(b.x,b.y,width,height,-10));
 bossGroup.scale.setScalar(Math.max(.85,b.radius/52));
 bossGroup.rotation.y=Math.sin(now*.001)*.08;bossGroup.rotation.z=Math.sin(now*.002)*.035;
 bossGroup.traverse(part=>{if(part.userData.bossHalo!==undefined)part.rotation.z=now*.00035*(part.userData.bossHalo%2?-1:1);if(part.userData.bossBeacon!==undefined)part.material.emissiveIntensity=1.4+Math.sin(now*.009+part.userData.bossBeacon)*.8;});
 bossCore.emissiveIntensity=2.5+Math.sin(now*.012)*1.3+(b.phase===3?2:0);
 bossGroup.traverse(part=>{
  if(part.userData.bossVent!==undefined)part.material.emissiveIntensity=.45+.35*Math.sin(now*.006+part.userData.bossVent);
  if(part.userData.bossShield){
   part.visible=b.phase===3;
   part.rotation.set(now*.00018,now*.00027,now*.00013);
   part.material.opacity=b.phase===3?.10+.045*(.5+.5*Math.sin(now*.008)):.0;
  }
 });
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
 const additive=(color,opacity=1)=>new THREE.MeshBasicMaterial({color,transparent:opacity<1,opacity,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide});
 const sphere=(radius,material,segments=32)=>new THREE.Mesh(new THREE.SphereGeometry(radius,segments,Math.max(16,segments>>1)),material);
 const ring=(radius,tube,material,segments=96)=>new THREE.Mesh(new THREE.TorusGeometry(radius,tube,10,segments),material);
 if(kind==='blackhole'){
  const voidCore=sphere(1.12,new THREE.MeshBasicMaterial({color:0x000004}),48);voidCore.scale.set(1,1,.42);g.add(voidCore);
  const photon=ring(1.22,.105,additive(0xffe7bd,.98),128);photon.rotation.x=Math.PI/2.12;g.add(photon);photon.userData.photon=true;
  for(let i=0;i<4;i++){
   const disk=new THREE.Mesh(new THREE.RingGeometry(1.3+i*.12,2.15+i*.31,128,4),additive([0xff9a42,0xff5b31,0xb64cff,0x55dfff][i],[.62,.38,.3,.2][i]));
   disk.rotation.x=Math.PI/2.12+(i-1.5)*.035;disk.scale.set(1,.48+i*.035,1);g.add(disk);disk.userData.disk=i;
  }
  for(let i=0;i<3;i++){const r=ring(1.38+i*.36,.035,additive(i===1?0x9b58ff:0xffb15a,.72));r.rotation.set(Math.PI/2.12+i*.08,i*.37,i*.2);g.add(r);r.userData.orbit=i;}
  const jetMat=additive(0x75dfff,.2);
  for(const sign of [-1,1]){
   const jet=new THREE.Mesh(new THREE.CylinderGeometry(.08,.48,5.8,20,1,true),jetMat);jet.position.y=sign*3.25;jet.scale.x=.72;g.add(jet);jet.userData.jet=sign;
   const lance=new THREE.Mesh(new THREE.ConeGeometry(.3,2.3,20,1,true),additive(0x9e7aff,.16));lance.position.y=sign*6.2;lance.rotation.z=sign*Math.PI;g.add(lance);
  }
  const halo=ring(2.85,.055,additive(0x56cfff,.42));halo.rotation.x=Math.PI/2.12;g.add(halo);halo.userData.halo=true;
  const light=new THREE.PointLight(0xff8a43,14,34);g.add(light);
 }else if(kind==='supernova'){
  const core=sphere(.72,additive(0xffffff,.98),48);core.userData.blastCore=true;g.add(core);
  const inner=sphere(1.02,additive(0xfff1b8,.82),48);g.add(inner);inner.userData.corona=1;
  const outer=sphere(1.8,additive(0xff4b27,.24),48);g.add(outer);outer.userData.corona=2;
  const hotHalo=ring(1.45,.15,additive(0xffe1a0,.92),144);hotHalo.rotation.x=Math.PI/2.2;g.add(hotHalo);hotHalo.userData.hotHalo=true;
  // Cuatro frentes de choque tridimensionales, con planos distintos para dar profundidad.
  for(let i=0;i<4;i++){
   const shock=ring(.82+i*.13,.055-i*.006,additive([0xfff5cf,0xffffe8,0xff7138,0xffa34d][i],.96-i*.12),144);
   shock.rotation.set(i*.82,Math.PI/2.4+i*.53,i*.71);g.add(shock);shock.userData.shock=i;
  }
  // Capas esféricas de plasma: la onda no es un disco plano, se expande en todas direcciones.
  for(let i=0;i<3;i++){
   const shell=sphere(1,additive([0xfff2c2,0xff813d,0xff3d29][i],[.32,.2,.13][i]),40);
   shell.userData.blastShell=i;g.add(shell);
  }
  for(let i=0;i<3;i++){const wave=sphere(1,additive([0xffa34d,0xff4d8d,0x9a69ff][i],.2),32);wave.userData.wave=i;g.add(wave);}
  // Filamentos de plasma radiales que se estiran desde el núcleo durante la detonación.
  const filamentPositions=[];
  for(let i=0;i<36;i++){
   const u=Math.random()*2-1,p=Math.random()*Math.PI*2,q=Math.sqrt(1-u*u);
   const dx=q*Math.cos(p),dy=u,dz=q*Math.sin(p);
   filamentPositions.push(dx*.42,dy*.42,dz*.42,dx*(1.15+(i%5)*.12),dy*(1.15+(i%5)*.12),dz*(1.15+(i%5)*.12));
  }
  const fg=new THREE.BufferGeometry();fg.setAttribute('position',new THREE.Float32BufferAttribute(filamentPositions,3));
  const filaments=new THREE.LineSegments(fg,additive(0xffd18a,.9));filaments.userData.filaments=true;filaments.userData.initialPositions=filamentPositions.slice();g.add(filaments);
  const positions=[],colors=[],directions=[];
  for(let i=0;i<420;i++){
   const u=Math.random()*2-1,p=Math.random()*Math.PI*2,q=Math.sqrt(1-u*u);
   const dx=q*Math.cos(p),dy=u,dz=q*Math.sin(p),r=.75+Math.random()*1.9;
   positions.push(dx*r,dy*r,dz*r);directions.push(dx,dy,dz);
   const c=new THREE.Color([0xffffff,0xffd18a,0xff7444,0x8edfff,0xfff4d4][i%5]);colors.push(c.r,c.g,c.b);
  }
  const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));pg.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));
  const debris=new THREE.Points(pg,new THREE.PointsMaterial({size:.105,vertexColors:true,transparent:true,opacity:1,blending:THREE.AdditiveBlending,depthWrite:false}));debris.userData.debris=true;debris.userData.directions=directions;debris.userData.initialPositions=positions.slice();g.add(debris);
  const light=new THREE.PointLight(0xff8a42,42,90);light.userData.blastLight=true;g.add(light);
  const flash=sphere(1.65,additive(0xffffff,.42),40);g.add(flash);flash.userData.flash=true;
 }else if(kind==='magnetar'){
  const star=sphere(.72,new THREE.MeshStandardMaterial({color:0xf1e5ff,emissive:0x9c27ff,emissiveIntensity:5,metalness:.18,roughness:.16}),40);g.add(star);
  const corona=sphere(1.02,additive(0x9b42ff,.22),32);g.add(corona);corona.userData.corona=true;
  for(let i=0;i<7;i++){const loop=ring(1.25+i*.19,.025,additive(i%2?0x9e54ff:0x55efff,.68),80);loop.rotation.set(Math.PI/2+(i-3)*.13,(i-3)*.28,i*.19);g.add(loop);loop.userData.field=i;}
  // Arcos de plasma curvos alrededor del campo magnético.
  for(let i=0;i<8;i++){
   const pts=[];const a=i*Math.PI/4;
   for(let j=0;j<=18;j++){const t=j/18,ang=a+t*Math.PI*.9,r=.9+Math.sin(t*Math.PI)*(.75+(i%3)*.18);pts.push(new THREE.Vector3(Math.cos(ang)*r,Math.sin(ang)*r*.72,Math.sin(t*Math.PI*2+i)*.22));}
   const curve=new THREE.CatmullRomCurve3(pts);const arc=new THREE.Mesh(new THREE.TubeGeometry(curve,28,.018,5,false),additive(i%2?0xd85cff:0x5cfaff,.88));g.add(arc);arc.userData.arc=i;
  }
  const pulse=sphere(1.05,additive(0xc45cff,.28),28);pulse.userData.pulse=true;g.add(pulse);
  // Frentes de onda visibles que se expanden desde el magnetar.
  for(let i=0;i<3;i++){
   const wave=ring(1,.045,additive([0xffffff,0xd45cff,0x65eaff][i],.9),128);
   wave.rotation.x=Math.PI/2;g.add(wave);wave.userData.gravityWave=i;
  }
  const light=new THREE.PointLight(0xb84cff,13,34);g.add(light);
 }else if(kind==='pulsar'){
  const star=sphere(.58,new THREE.MeshStandardMaterial({color:0xeaffff,emissive:0x00cfff,emissiveIntensity:6,metalness:.12,roughness:.12}),40);g.add(star);
  const corona=sphere(.86,additive(0x39eaff,.22),32);g.add(corona);corona.userData.corona=true;
  const beamPivot=new THREE.Group();g.add(beamPivot);beamPivot.userData.beamPivot=true;
  for(const sign of [-1,1]){
   const beam=new THREE.Mesh(new THREE.CylinderGeometry(.08,.66,11,24,1,true),additive(0x63fff0,.24));beam.position.y=sign*5.2;beam.scale.x=.9;beamPivot.add(beam);
   const beamCore=new THREE.Mesh(new THREE.CylinderGeometry(.025,.2,10.5,16,1,true),additive(0xffffff,.34));beamCore.position.y=sign*5.2;beamPivot.add(beamCore);
   const flare=new THREE.Mesh(new THREE.ConeGeometry(.78,2.4,24,1,true),additive(0x20cfff,.2));flare.position.y=sign*10.6;flare.rotation.z=sign*Math.PI;beamPivot.add(flare);
  }
  for(let i=0;i<4;i++){const r=ring(.9+i*.32,.022,additive(i%2?0x6c8cff:0x55faff,.68),72);r.rotation.x=Math.PI/2;g.add(r);r.userData.pulseRing=i;}
  const light=new THREE.PointLight(0x38f5ff,12,38);g.add(light);
 }
 return g;
}
function syncPhenomena(items,width,height,now){
 const alive=new Set(),phase=now*.001;
 for(const item of items||[]){
  alive.add(item.id);
  let g=phenomenonMeshes.get(item.id);
  if(!g){g=makePhenomenon(item.kind);scene.add(g);phenomenonMeshes.set(item.id,g);}
  g.visible=true;g.position.copy(worldPos(item.x,item.y,width,height,-13));
  const age=item.timer||0,life=Math.max(1,item.maxTimer||250),progress=item.kind==='supernova'&&item.detonated?Math.max(0,Math.min(1,Number(item.blastProgress)||0)):Math.min(1,age/life);
  if(item.kind==='supernova'){
   // La detonación usa su propio reloj y escala: no hereda el radio de carga 2D (220 px).
   const base=item.detonated?1:Math.max(.5,(item.radius||18)/36),pulse=1+Math.sin(phase*4.5)*.055;
   g.scale.setScalar(base*pulse);g.rotation.y=phase*.18;
   g.children.forEach((o,i)=>{
    if(o.userData.shock!==undefined){
     const k=o.userData.shock,spread=.28+progress*(7.2+k*.52);
     o.scale.setScalar(spread);o.rotation.z=phase*(.18+k*.075);o.rotation.x=Math.PI/2.4+k*.53;
     o.material.opacity=Math.max(0,(.98-k*.12)*(1-progress*.82));
    }
    if(o.userData.blastShell!==undefined){
     const k=o.userData.blastShell,spread=.22+progress*(6.8+k*.7);
     o.scale.setScalar(spread);o.material.opacity=Math.max(0,[.3,.2,.13][k]*(1-progress*.9));
    }
    if(o.userData.wave!==undefined){
     const k=o.userData.wave,p=(progress*1.55+k*.3)%1;
     o.scale.setScalar(.35+p*(4.5+k*.5));o.material.opacity=.25*(1-p)*(1-progress*.55);
    }
    if(o.userData.corona){const k=o.userData.corona;o.scale.setScalar((k===1?1.05+Math.sin(phase*5)*.13:1.8+Math.sin(phase*2.2)*.2)*(item.detonated?1+progress*2.2:1));o.material.opacity=(k===1?.62:.22)*(item.detonated?1-progress:1);}
    if(o.userData.hotHalo){o.rotation.z=phase*.35;o.scale.setScalar(1+progress*4.4);o.material.opacity=Math.max(0,.92*(1-progress*.82));}
    if(o.userData.filaments){
     const attr=o.geometry.attributes.position,initial=o.userData.initialPositions,len=1+progress*5.2;
     for(let j=0;j<attr.count;j++){
      const factor=j%2===0?1:len;
      attr.setXYZ(j,initial[j*3]*factor,initial[j*3+1]*factor,initial[j*3+2]*factor);
     }
     attr.needsUpdate=true;o.material.opacity=Math.max(0,.9*(1-progress));
    }
    if(o.userData.flash){const f=Math.min(1,age/9);o.scale.setScalar(1+f*7.2);o.material.opacity=Math.max(0,.72*(1-f));}
    if(o.userData.blastCore){o.scale.setScalar(1+progress*2.2);o.material.opacity=Math.max(0,.98*(1-progress));}
    if(o.userData.blastLight){o.intensity=46*(1-progress);o.distance=95+progress*35;}
    if(o.userData.debris){
     const attr=o.geometry.attributes.position,dirs=o.userData.directions,initial=o.userData.initialPositions;
     for(let j=0;j<attr.count;j++){
      const r=Math.hypot(initial[j*3],initial[j*3+1],initial[j*3+2])+progress*(5.5+(j%7)*.48);
      attr.setXYZ(j,dirs[j*3]*r,dirs[j*3+1]*r,dirs[j*3+2]*r);
     }
     attr.needsUpdate=true;o.rotation.y=phase*.25;o.rotation.x=phase*.08;o.material.opacity=Math.max(0,1-progress*.92);
    }
   });
  }else{
   const r=item.kind==='blackhole'?Math.max(1.05,(item.radius||34)/34)*1.22:item.kind==='magnetar'?1.25:1.15;
   g.scale.setScalar(r);
   if(item.kind==='blackhole'){
    g.rotation.y=phase*.12;
    g.children.forEach((o,i)=>{
     if(o.userData.disk!==undefined){o.rotation.z=phase*(.28+o.userData.disk*.055)*(o.userData.disk%2?-1:1);o.material.opacity=[.58,.35,.26,.17][o.userData.disk];}
     if(o.userData.orbit!==undefined)o.rotation.z=phase*(o.userData.orbit%2?.38:-.3)+o.userData.orbit*.23;
     if(o.userData.photon)o.rotation.z=-phase*.42;
     if(o.userData.jet)o.scale.set(1+Math.sin(phase*3+o.userData.jet)*.12,1+Math.sin(phase*3+o.userData.jet)*.16,1);
     if(o.userData.halo)o.rotation.z=phase*.16;
    });
   }else if(item.kind==='magnetar'){
    g.rotation.z=-phase*.2;
    g.children.forEach(o=>{
     if(o.userData.field!==undefined)o.rotation.z=phase*(o.userData.field%2?.65:-.52)+o.userData.field*.2;
     if(o.userData.arc!==undefined){o.rotation.z=phase*(o.userData.arc%2?.42:-.36);o.material.opacity=.45+.42*(.5+.5*Math.sin(phase*9+o.userData.arc));}
     if(o.userData.pulse){const p=(age%72)/72;o.scale.setScalar(1.08+p*1.65);o.material.opacity=.3*(1-p);}
     if(o.userData.gravityWave!==undefined){
      const k=o.userData.gravityWave,period=140,p=((age+k*46)%period)/period;
      o.scale.set(1.1+p*8.5,1.1+p*8.5,1);
      o.material.opacity=.92*(1-p);
      o.rotation.z=phase*(k%2?.18:-.14);
     }
     if(o.userData.corona)o.scale.setScalar(1+Math.sin(phase*7)*.12);
    });
   }else if(item.kind==='pulsar'){
    g.rotation.y=Math.sin(phase*.7)*.08;
    g.children.forEach(o=>{
     if(o.userData.beamPivot)o.rotation.z=phase*1.65;
     if(o.userData.pulseRing!==undefined){const k=o.userData.pulseRing,p=(age%62)/62;o.rotation.z=phase*(k%2?.4:-.3);o.scale.setScalar(1+k*.28+p*.25);o.material.opacity=.6*(1-p*.75);}
     if(o.userData.corona)o.scale.setScalar(1+Math.sin(phase*8)*.1);
    });
   }
  }
 }
 for(const [id,g] of phenomenonMeshes){if(!alive.has(id)){scene.remove(g);g.traverse(o=>{if(o.geometry)o.geometry.dispose();});phenomenonMeshes.delete(id);}}
}
let last = performance.now();
let lastRender = 0;
const renderInterval = 1000 / (window.AETHER_PLATFORM?.fps || 40); // Límite adaptativo por dispositivo.
let targetX = 0, targetY = 0;
function resize() {
  const w=window.innerWidth, h=window.innerHeight; camera.aspect=w/h; camera.updateProjectionMatrix();
  renderer.setPixelRatio(window.AETHER_PLATFORM?.pixelRatio || Math.min(window.devicePixelRatio || 1, 1.15));
  renderer.shadowMap.enabled = false; renderer.setSize(w,h);
}
window.addEventListener('resize', resize, { passive: true });
function animate(now) {
  requestAnimationFrame(animate);
  if (now - lastRender < renderInterval) return;
  const frameDelta = (now-lastRender)/1000; lastRender=now;
  const dt=Math.min(frameDelta,.05); last=now;
  const data=window.__AETHER3D_STATE;
  if (data && data.playing) {
    // Cada bloque de diez sectores cambia la paleta del mundo sin reconstruir geometría.
    applyWorldEra(data.level||1);
    // Parallax ambiental sutil: da escala y profundidad sin competir con el combate.
    worldBody.rotation.y+=dt*.0022;
    worldBody.position.x=THREE.MathUtils.damp(worldBody.position.x,-(data.x/data.width-.5)*2.4,1.6,dt);
    cosmicDust.rotation.z+=dt*.0007;
    const impact=window.__AETHER3D_IMPACT;
    if(impact && impact.serial!==lastImpactSerial){lastImpactSerial=impact.serial;spawn3DBurst(worldPos(impact.x,impact.y,data.width,data.height,-8),impact.color==="#55eaff"?0x55eaff:0xff684d,1.35);}
    // Usar la misma proyección perspectiva que asteroides, enemigos y proyectiles.
    // La fórmula anterior trataba la cámara como ortográfica y desplazaba la nave.
    const shipTarget = worldPos(data.x, data.y, data.width, data.height, -10);
    const selectedModel = data.selectedShip && shipVariants[data.selectedShip] ? shipVariants[data.selectedShip] : shipModel;
    // Pulsación de toberas: plasma exterior, núcleo blanco y estela variable.
    for(const fx of engineFX){
      const active=selectedModel===shipModel||selectedModel===fx.outer.parent;
      fx.outer.visible=active;fx.inner.visible=active;fx.core.visible=active;
      if(active){const pulse=.82+.2*Math.sin(now*.018+fx.seed)+.08*Math.sin(now*.037+fx.seed*2);
        fx.outer.scale.set(1,pulse,1);fx.inner.scale.set(1,.88+pulse*.16,1);
        fx.outer.material.opacity=.28+.16*pulse;fx.inner.material.opacity=.58+.18*pulse;fx.core.scale.setScalar(.85+.2*pulse);}
    }
    shipModel.visible = selectedModel === shipModel;
    for (const [id, model] of Object.entries(shipVariants)) model.visible = model === selectedModel;
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
    const p2=data.coopPlayer2;
    if(p2){
      ship2.visible=true;
      const p2ShipId=p2.selectedShip||"viper";
      ship2.children.forEach(child=>{if(child.name==="valkyrie"||shipVariants[child.name])child.visible=child.name===p2ShipId;});
      const p2Target=worldPos(p2.x,p2.y,data.width,data.height,-10);
      ship2.position.x=THREE.MathUtils.damp(ship2.position.x,p2Target.x,16,dt);
      ship2.position.y=THREE.MathUtils.damp(ship2.position.y,p2Target.y,16,dt);
      ship2.position.z=THREE.MathUtils.damp(ship2.position.z,-10,16,dt);
      ship2.rotation.z=THREE.MathUtils.damp(ship2.rotation.z,-(p2.x-data.width/2)/(data.width/2)*.22,7,dt);
      ship2.rotation.x=THREE.MathUtils.damp(ship2.rotation.x,Math.sin(now*.002+.8)*.018,3,dt);
      ship2.traverse(part=>{
        if(!part.isMesh||!part.material)return;
        const mats=Array.isArray(part.material)?part.material:[part.material];
        for(const mat of mats){
          if(mat.userData.coopBaseOpacity===undefined)mat.userData.coopBaseOpacity=mat.opacity;
          mat.transparent=!!p2.invulnerable;
          mat.opacity=p2.invulnerable?Math.min(mat.userData.coopBaseOpacity,.58):mat.userData.coopBaseOpacity;
          mat.depthWrite=!p2.invulnerable;
        }
      });
    }else ship2.visible=false;
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
    ship.visible=false; ship2.visible=false; shield.visible=false; bossGroup.visible=false;
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
