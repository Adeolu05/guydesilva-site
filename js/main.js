import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

window.__gdsBoot = true;

/* ------------------------------------------------------------------ */
/* Content — one entry per project. Photos live in assets/work/        */
/* full/ (viewer), wall/ (3D wall) and thumb/ (project list).          */
/* `feature` picks up to three photos for the project's bay on the wall */
/* ------------------------------------------------------------------ */
const PROJECTS = [
  {
    id: 'disney', title: 'Walt Disney World', where: 'Orlando, Florida',
    plate: 'WALT DISNEY WORLD', sub: 'ORLANDO, FLORIDA',
    blurb: 'Themed environments and wayfinding across the resort: ship interiors and control panels for Star Wars: Galaxy\'s Edge, Droid Depot workstations, and character-themed parking signs and column wraps.',
    tags: ['Themed environments', 'Control panels', 'Parking wayfinding'],
    feature: [1, 4, 7],
    photos: [
      ['disney-01', 1024, 683, 'Millennium Falcon cockpit, Star Wars: Galaxy\'s Edge'],
      ['disney-02', 1010, 944, 'Cockpit seats and control panels'],
      ['disney-03', 1600, 1066, 'First Order command console'],
      ['disney-04', 1600, 1066, 'Gunner station controls'],
      ['disney-05', 1066, 1600, 'Inside Out themed parking aisle sign'],
      ['disney-06', 1600, 1066, 'Droid Depot workbench'],
      ['disney-07', 1280, 720, 'Droid Depot build station'],
      ['disney-08', 1066, 1600, 'Cars themed parking column wrap'],
      ['disney-09', 1600, 1066, 'Ship interior control bank'],
    ],
  },
  {
    id: 'universal', title: 'Universal Studios Florida', where: 'Orlando, Florida',
    plate: 'UNIVERSAL STUDIOS', sub: 'ORLANDO, FLORIDA',
    blurb: 'Queue graphics for the Bourne Stuntacular: printed photo panels on dimensional frames over backlit blue graphics, and a cut-metal figure set into a target ring.',
    tags: ['Queue graphics', 'Dimensional frames', 'Cut metal'],
    feature: [3, 4, 0],
    photos: [
      ['universal-01', 800, 600, 'Layered photo panels in the queue'],
      ['universal-02', 800, 600, 'Queue wall with dimensional photo frames'],
      ['universal-03', 640, 480, 'Photo wall over printed graphics'],
      ['universal-04', 1600, 1200, 'Cut-metal figure in a dimensional target ring'],
      ['universal-05', 800, 600, 'Queue hall lined with graphic walls'],
    ],
  },
  {
    id: 'steelers', title: 'Pittsburgh Steelers Hall of Honor', where: 'Pittsburgh, Pennsylvania',
    plate: 'PITTSBURGH STEELERS', sub: 'NFL HALL OF HONOR',
    blurb: 'An illuminated exhibit wall of inductee portraits and footballs, with a branded entry portal for the Hall of Honor.',
    tags: ['Exhibit wall', 'Illuminated displays', 'Entry portal'],
    feature: [0, 2, 1],
    photos: [
      ['steelers-01', 1600, 901, 'Curved inductee wall'],
      ['steelers-02', 1280, 720, 'Hall of Honor entry portal'],
      ['steelers-03', 1280, 720, 'Inductee portraits and footballs'],
    ],
  },
  {
    id: 'pistons', title: 'Detroit Pistons', where: 'Detroit, Michigan',
    plate: 'DETROIT PISTONS', sub: 'NBA, DETROIT, MICHIGAN',
    blurb: 'Exterior pylons for retired jersey numbers and a row of player monoliths along the entry plaza.',
    tags: ['Exterior pylons', 'Monoliths'],
    feature: [0, 1],
    photos: [
      ['pistons-01', 1600, 1200, 'Retired-number pylons at the entrance'],
      ['pistons-02', 768, 576, 'Player monoliths on the plaza'],
    ],
  },
  {
    id: 'mlb', title: 'MLB Corporate Offices', where: 'New York City',
    plate: 'MLB CORPORATE OFFICES', sub: 'NEW YORK CITY',
    blurb: 'Large-format wall graphics wrap the elevator lobbies and corridors with black-and-white photography of baseball legends. Line work bends with the folded walls, and a floor graphic carries a quote into the lobby.',
    tags: ['Wall graphics', 'Elevator lobby wraps', 'Floor graphics'],
    feature: [0, 1, 2],
    photos: [
      ['mlb-01', 1600, 1200, 'Elevator lobby wall wrap with a floor graphic'],
      ['mlb-02', 1600, 1200, 'Corridor graphics that follow the folded wall'],
      ['mlb-03', 1600, 1519, 'Lobby wrap in team navy'],
    ],
  },
  {
    id: 'lga', title: 'LaGuardia Airport', where: 'New York City',
    plate: 'LAGUARDIA AIRPORT', sub: 'NEW YORK CITY',
    blurb: 'Work on a large suspended installation hung through the terminal\'s open hall, built from thin frames and printed panels.',
    tags: ['Suspended installation'],
    feature: [1, 0],
    photos: [
      ['lga-01', 1024, 683, 'Looking up into the suspended installation'],
      ['lga-02', 1140, 1600, 'The installation from the terminal floor'],
    ],
  },
  {
    id: 'usaf', title: 'United States Air Force', where: 'Fort Worth, Texas',
    plate: 'UNITED STATES AIR FORCE', sub: 'FORT WORTH, TEXAS',
    blurb: 'An outdoor memorial plaza with long interpretive walls of history panels, set around aircraft on display and a bronze statue.',
    tags: ['Interpretive walls', 'Memorial plaza'],
    feature: [1, 0, 2],
    photos: [
      ['usaf-01', 1600, 1200, 'Interpretive history wall'],
      ['usaf-02', 1600, 1200, 'Plaza with statue and aircraft on display'],
      ['usaf-03', 1600, 1200, 'Panel wall facing an aircraft display'],
    ],
  },
  {
    id: 'sazoo', title: 'San Antonio Zoo', where: 'San Antonio, Texas',
    plate: 'SAN ANTONIO ZOO', sub: 'SAN ANTONIO, TEXAS',
    blurb: 'Parking garage facades: dimensional zoo letters, giraffe and butterfly graphics, and a tiger mural facing the street.',
    tags: ['Dimensional letters', 'Facade graphics', 'Murals'],
    feature: [2, 1, 0],
    photos: [
      ['sazoo-01', 1600, 1200, 'Tiger mural on the parking garage'],
      ['sazoo-02', 1438, 1078, 'Garage corner with giraffes and dimensional letters'],
      ['sazoo-03', 1438, 1078, 'Dimensional zoo letters and butterflies'],
    ],
  },
  {
    id: 'hzoo', title: 'Houston Zoo', where: 'Houston, Texas',
    plate: 'HOUSTON ZOO', sub: 'HOUSTON, TEXAS',
    blurb: 'Signage for South America\'s Pantanal: a monument sign of painted posts, an entry sign, and bilingual English and Spanish interpretive panels.',
    tags: ['Monument signs', 'Interpretive panels', 'Bilingual signage'],
    feature: [2, 1, 4],
    photos: [
      ['hzoo-01', 1600, 1200, 'Interpretive rail panels along the path'],
      ['hzoo-02', 1600, 1200, 'Bilingual panels for the giant anteater and Baird\'s tapir'],
      ['hzoo-03', 1600, 817, 'South America\'s Pantanal monument sign'],
      ['hzoo-04', 1200, 1600, 'Pantanal entry sign'],
      ['hzoo-05', 1600, 1200, 'Jaguar panel at the viewing window'],
    ],
  },
  {
    id: 'sdusd', title: 'San Diego Unified School District', where: 'Nipaquay Elementary and John Muir Language Academy, California',
    plate: 'SAN DIEGO UNIFIED', sub: 'SCHOOL DISTRICT, CALIFORNIA',
    blurb: 'Exterior signage and environmental graphics across two campuses: dimensional monument and building letters, an exterior mural, stair-riser graphics, a timeline pylon on the history of solar technology, perforated window graphics, banner blades and bilingual wayfinding.',
    tags: ['Monument signs', 'Dimensional letters', 'Murals', 'Wayfinding', 'Window graphics'],
    feature: [0, 4, 6],
    photos: [
      ['sdusd-01', 1500, 1000, 'Dimensional monument sign, Nipaquay Elementary'],
      ['sdusd-02', 1600, 640, 'Building letters and perforated window graphics, Nipaquay Elementary'],
      ['sdusd-03', 800, 533, 'Courtyard entry, Nipaquay Elementary'],
      ['sdusd-04', 800, 600, 'Exterior mural'],
      ['sdusd-05', 1500, 1000, 'Stair-riser graphics'],
      ['sdusd-06', 1500, 1000, 'Timeline pylon on the history of solar technology'],
      ['sdusd-07', 1500, 1000, 'Bilingual wayfinding pylon, John Muir Language Academy'],
      ['sdusd-08', 1500, 1000, 'Banner blades, John Muir Language Academy'],
    ],
  },
  {
    id: 'more', title: 'More installations', where: 'Campus letters',
    plate: 'MORE INSTALLATIONS', sub: 'DIMENSIONAL LETTERS',
    blurb: 'Dimensional and illuminated letter sets for campus entries and plazas.',
    tags: ['Dimensional letters', 'Illuminated letters'],
    feature: [0, 1],
    photos: [
      ['mission-01', 1008, 756, 'Mission College dimensional letters'],
      ['lmec-01', 1500, 999, 'Illuminated campus entry letters at dusk'],
    ],
  },
];

// flat list for the photo viewer
const PHOTOS = [];
PROJECTS.forEach((p) => {
  p.first = PHOTOS.length;
  p.photos.forEach(([f, w, h, caption]) => PHOTOS.push({ f, w, h, caption, project: p }));
});
const img = (f, size) => `assets/work/${size}/${f}.jpg`;

const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduced) root.classList.add('reduced');

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch (e) { return false; }
}

/* ------------------------------------------------------------------ */
/* Shared materials and textures                                       */
/* ------------------------------------------------------------------ */
function makeWallTexture(base) {
  const c = document.createElement('canvas');
  c.width = c.height = 1024;
  const g = c.getContext('2d');
  g.fillStyle = base;
  g.fillRect(0, 0, 1024, 1024);
  // brushed paint: short horizontal strokes, light and dark
  for (let i = 0; i < 3200; i++) {
    const y = Math.random() * 1024, x = Math.random() * 1024, len = 30 + Math.random() * 280;
    g.strokeStyle = Math.random() < 0.5 ? `rgba(255,255,255,${Math.random() * 0.03})` : `rgba(0,0,0,${Math.random() * 0.05})`;
    g.lineWidth = 1;
    g.beginPath(); g.moveTo(x, y); g.lineTo(x + len, y); g.stroke();
  }
  // panel reveals (aluminum composite panel seams)
  g.fillStyle = 'rgba(0,0,0,0.5)';
  g.fillRect(0, 0, 1024, 5); g.fillRect(0, 0, 5, 1024);
  g.fillStyle = 'rgba(255,255,255,0.06)';
  g.fillRect(0, 5, 1024, 2); g.fillRect(5, 0, 2, 1024);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function makeRenderer(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 700 ? 1.5 : 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  return renderer;
}

function envFor(renderer) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const tex = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;
  pmrem.dispose();
  return tex;
}

/* Visible / not visible -> run or pause a render loop */
function whenVisible(el, onChange) {
  const io = new IntersectionObserver((entries) => entries.forEach((e) => onChange(e.isIntersecting)), { rootMargin: '120px' });
  io.observe(el);
}

/* Lay out a string glyph by glyph so each letter is its own mesh */
function glyphRun(font, text, size, tracking) {
  const scale = size / font.data.resolution;
  const out = [];
  let x = 0;
  for (const ch of text) {
    const g = font.data.glyphs[ch] || font.data.glyphs['?'];
    const adv = (g ? g.ha : 500) * scale;
    if (ch !== ' ') out.push({ ch, x, shapes: font.generateShapes(ch, size) });
    x += (ch === ' ' ? adv * 1.1 : adv) + tracking;
  }
  return { glyphs: out, width: x - tracking };
}

function shapeBounds(shapes) {
  const b = new THREE.Box2();
  shapes.forEach((s) => s.getPoints(6).forEach((p) => b.expandByPoint(p)));
  return b;
}

/* Halo texture: the letter's silhouette, blurred, as warm light on the wall */
function haloTexture(shapes, size) {
  const b = shapeBounds(shapes);
  const pad = size * 0.6;
  const ppu = 190;
  const W = Math.ceil((b.max.x - b.min.x + pad * 2) * ppu);
  const H = Math.ceil((b.max.y - b.min.y + pad * 2) * ppu);
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const g = c.getContext('2d');
  const tx = (x) => (x - b.min.x + pad) * ppu;
  const ty = (y) => (b.max.y + pad - y) * ppu;
  const OFF = W * 4;
  const path = () => {
    g.beginPath();
    shapes.forEach((s) => {
      const draw = (pts) => {
        pts.forEach((p, i) => (i ? g.lineTo(tx(p.x) - OFF, ty(p.y)) : g.moveTo(tx(p.x) - OFF, ty(p.y))));
        g.closePath();
      };
      draw(s.getPoints(8));
      s.holes.forEach((h) => draw(h.getPoints(8)));
    });
  };
  g.shadowOffsetX = OFF;
  g.fillStyle = '#000';
  const layers = [
    [0.34, 'rgba(255,170,90,0.55)'],
    [0.34, 'rgba(255,180,100,0.55)'],
    [0.14, 'rgba(255,205,150,0.9)'],
    [0.04, 'rgba(255,236,205,1)'],
  ];
  layers.forEach(([blur, col]) => {
    g.shadowBlur = blur * ppu;
    g.shadowColor = col;
    path();
    g.fill('evenodd');
  });
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return {
    texture: t,
    w: W / ppu, h: H / ppu,
    cx: (b.min.x + b.max.x) / 2, cy: (b.min.y + b.max.y) / 2,
  };
}

/* ------------------------------------------------------------------ */
/* HERO — reverse channel letters, halo-lit, powering on               */
/* ------------------------------------------------------------------ */
function initHero(font) {
  const canvas = document.getElementById('hero-canvas');
  const host = canvas.parentElement;
  const renderer = makeRenderer(canvas);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#0f1828');
  const env = envFor(renderer);
  scene.environment = env;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 200);

  const wallTex = makeWallTexture('#1b2943');
  wallTex.repeat.set(14, 7);
  wallTex.offset.set(0.31, 0.62); // keep panel seams off the centre line
  const wall = new THREE.Mesh(
    new THREE.PlaneGeometry(60, 30),
    new THREE.MeshStandardMaterial({ map: wallTex, roughness: 0.85, metalness: 0.1, envMapIntensity: 0.2 })
  );
  scene.add(wall);

  scene.add(new THREE.AmbientLight(0x9fb2d6, 0.25));
  const key = new THREE.DirectionalLight(0xdfe7ff, 1.4);
  key.position.set(-5, 7, 9);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xffcf9a, 0.5);
  rim.position.set(6, -3, 5);
  scene.add(rim);

  const warm = [0, 1, 2].map(() => {
    const l = new THREE.PointLight(0xffb870, 0, 3.5, 2);
    scene.add(l);
    return l;
  });

  const faceMat = new THREE.MeshStandardMaterial({ color: 0x161a21, metalness: 0.6, roughness: 0.3, envMapIntensity: 0.8 });
  const sideMat = new THREE.MeshStandardMaterial({ color: 0xc3c9d2, metalness: 1, roughness: 0.26, envMapIntensity: 1.2 });

  const SIZE = 1, DEPTH = 0.2, STANDOFF = 0.17;
  const sign = new THREE.Group();
  scene.add(sign);
  let letters = [];
  let layout = '';
  let bounds = { w: 1, h: 1 };

  function build(lines) {
    sign.clear();
    letters.forEach((l) => { l.mesh.geometry.dispose(); l.glow.geometry.dispose(); l.glowMat.map.dispose(); l.glowMat.dispose(); });
    letters = [];
    const lineH = SIZE * 1.12;
    const runs = lines.map((t) => glyphRun(font, t, SIZE, SIZE * 0.06));
    const maxW = Math.max(...runs.map((r) => r.width));
    const capH = SIZE * 0.72;
    const totalH = capH + lineH * (lines.length - 1);
    let idx = 0;
    runs.forEach((run, li) => {
      const ox = -run.width / 2;
      const oy = totalH / 2 - capH - li * lineH;
      run.glyphs.forEach((gl) => {
        const geo = new THREE.ExtrudeGeometry(gl.shapes, {
          depth: DEPTH, curveSegments: 8,
          bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.008, bevelSegments: 2,
        });
        const mesh = new THREE.Mesh(geo, [faceMat, sideMat]);
        mesh.position.set(ox + gl.x, oy, STANDOFF);
        sign.add(mesh);

        const h = haloTexture(gl.shapes, SIZE);
        const glowMat = new THREE.MeshBasicMaterial({
          map: h.texture, transparent: true, opacity: 0,
          blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false,
        });
        const glow = new THREE.Mesh(new THREE.PlaneGeometry(h.w, h.h), glowMat);
        glow.position.set(ox + gl.x + h.cx, oy + h.cy, 0.006);
        sign.add(glow);
        letters.push({ mesh, glow, glowMat, i: idx++, power: 0 });
      });
    });
    bounds = { w: maxW, h: totalH };
    warm.forEach((l, i) => l.position.set((i - 1) * maxW * 0.36, 0, 0.12));
  }

  const target = new THREE.Vector3();
  let dist = 10, aimY = 0;
  function fit() {
    const w = host.clientWidth, h = host.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const wantLayout = camera.aspect < 0.95 ? 'stack' : 'line';
    if (wantLayout !== layout) {
      layout = wantLayout;
      build(layout === 'stack' ? ['GUY', 'DE SILVA'] : ['GUY DE SILVA']);
    }
    const vHalf = THREE.MathUtils.degToRad(camera.fov / 2);
    const hHalf = Math.atan(Math.tan(vHalf) * camera.aspect);
    const fillW = camera.aspect < 0.95 ? 0.84 : 0.8;
    const distW = (bounds.w / fillW) / 2 / Math.tan(hHalf);
    const distH = (bounds.h / 0.42) / 2 / Math.tan(vHalf);
    dist = Math.max(distW, distH) + STANDOFF;
    const visH = 2 * dist * Math.tan(vHalf);
    // keep the sign in the upper part of the hero, clear of the intro text
    aimY = -visH * (camera.aspect < 0.95 ? 0.13 : 0.14);
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(fit).observe(host);
  fit();

  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener('pointermove', (e) => {
    pointer.tx = (e.clientX / innerWidth) * 2 - 1;
    pointer.ty = (e.clientY / innerHeight) * 2 - 1;
  }, { passive: true });

  const start = performance.now();
  const hash = (n) => { const s = Math.sin(n) * 43758.5453; return s - Math.floor(s); };
  let running = false, raf = 0, last = start;

  function frame(now) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    const t = (now - start) / 1000;

    // power-on: each letter flickers on in turn, then holds steady
    let total = 0;
    letters.forEach((l) => {
      let p = 1;
      if (!reduced) {
        const k = (now - start - 500 - l.i * 130) / 650;
        if (k < 0) p = 0;
        else if (k < 1) p = hash(l.i * 17.3 + Math.floor(k * 16) * 3.1) > 0.42 ? 0.35 + 0.65 * k : 0.04;
      }
      l.power = p;
      l.glowMat.opacity = p;
      total += p;
    });
    const avg = letters.length ? total / letters.length : 0;
    warm.forEach((l) => (l.intensity = layout === 'stack' ? 0 : avg * 1.2));

    // camera: pointer parallax + slow drift + dolly as the hero scrolls away
    const k = 1 - Math.exp(-dt * 3);
    pointer.x += (pointer.tx - pointer.x) * k;
    pointer.y += (pointer.ty - pointer.y) * k;
    const drift = reduced ? 0 : Math.sin(t * 0.25) * 0.25;
    const scrollP = Math.min(1, Math.max(0, window.scrollY / host.clientHeight));
    const d = dist * (1 - scrollP * 0.18);
    const px = reduced ? 0 : pointer.x * dist * 0.09 + drift;
    const py = reduced ? 0 : -pointer.y * dist * 0.05;
    camera.position.set(px, aimY + py + 0.4, d);
    target.set(0, aimY, 0);
    camera.lookAt(target);
    renderer.render(scene, camera);
  }

  whenVisible(host, (vis) => {
    if (vis && !running) { running = true; last = performance.now(); raf = requestAnimationFrame(frame); }
    else if (!vis && running) { running = false; cancelAnimationFrame(raf); }
  });
}

/* ------------------------------------------------------------------ */
/* GALLERY — a lit wall with one bay per project, walked by scrolling  */
/* ------------------------------------------------------------------ */
function initGallery(font, onOpen) {
  const section = document.getElementById('corridor');
  const canvas = document.getElementById('gallery-canvas');
  const stage = canvas.parentElement;
  const renderer = makeRenderer(canvas);
  renderer.toneMappingExposure = 1.0;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#0c1422');
  scene.fog = new THREE.Fog('#0c1422', 12, 30);
  scene.environment = envFor(renderer);
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 150);
  const maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  const loader = new THREE.TextureLoader();

  const Z = 0.17, G = 0.2, BAY_GAP = 2.6, TOP = 1.1;
  const metal = new THREE.MeshStandardMaterial({ color: 0xc3c9d2, metalness: 1, roughness: 0.3, envMapIntensity: 1 });
  const edge = new THREE.MeshStandardMaterial({ color: 0x2a3140, metalness: 0.4, roughness: 0.5 });
  const haloMat = new THREE.MeshBasicMaterial({ color: 0xffc98a, toneMapped: false });
  const standoffGeo = new THREE.CylinderGeometry(0.03, 0.03, Z, 14);
  standoffGeo.rotateX(Math.PI / 2);

  // wall, floor and LED strip are resized after each layout
  const wallTex = makeWallTexture('#1c2a45');
  const wall = new THREE.Mesh(new THREE.PlaneGeometry(1, 1),
    new THREE.MeshStandardMaterial({ map: wallTex, roughness: 0.85, metalness: 0.1, envMapIntensity: 0.2 }));
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(1, 1),
    new THREE.MeshStandardMaterial({ color: 0x5d6572, roughness: 0.35, metalness: 0.2, envMapIntensity: 0.4 }));
  floor.rotation.x = -Math.PI / 2;
  const strip = new THREE.Mesh(new THREE.PlaneGeometry(1, 0.025), haloMat);
  scene.add(wall, floor, strip);

  scene.add(new THREE.HemisphereLight(0xb8c8e8, 0x1a2030, 0.6));
  const spot = new THREE.SpotLight(0xfff0db, 55, 20, 0.6, 0.7, 1.5);
  scene.add(spot, spot.target);

  const world = new THREE.Group();
  scene.add(world);
  const textures = new Map();
  let stops = [];
  let panels = [];
  let mode = '';

  function bayLayout(project, narrow) {
    const feats = project.feature.map((i) => ({ idx: i, a: project.photos[i][1] / project.photos[i][2] }));
    const [L, ...S] = feats;
    const rects = [];
    if (!narrow) {
      const lw = Math.min(2.3 * L.a, 3.6), lh = lw / L.a;
      rects.push({ ...L, x: 0, y: 0, w: lw, h: lh });
      if (S.length === 2) {
        const sh = (lh - G) / 2;
        S.forEach((s, k) => {
          const w = Math.min(sh * s.a, 2.4);
          rects.push({ ...s, x: lw + G, y: -k * (sh + G), w, h: w / s.a });
        });
      } else if (S.length === 1) {
        const w = Math.min(lh * 0.62 * S[0].a, 2.6);
        rects.push({ ...S[0], x: lw + G, y: 0, w, h: w / S[0].a });
      }
    } else {
      const W = 3.0;
      const lh = Math.min(W / L.a, 2.4), lw = lh * L.a;
      rects.push({ ...L, x: (W - lw) / 2, y: 0, w: lw, h: lh });
      if (S.length) {
        const n = S.length;
        const cw = n === 1 ? W * 0.62 : (W - G * (n - 1)) / n;
        let x = n === 1 ? (W - cw) / 2 : 0;
        S.forEach((s) => {
          let w = cw, h = w / s.a;
          if (h > 1.5) { h = 1.5; w = h * s.a; }
          rects.push({ ...s, x: x + (cw - w) / 2, y: -(lh + G), w, h });
          x += cw + G;
        });
      }
    }
    const w = Math.max(...rects.map((r) => r.x + r.w));
    const bottom = Math.min(...rects.map((r) => r.y - r.h));
    return { rects, w, bottom };
  }

  function makePlate(project, maxW) {
    const g = new THREE.Group();
    const main = glyphRun(font, project.plate, 0.3, 0.015);
    const sub = glyphRun(font, project.sub, 0.12, 0.022);
    main.glyphs.forEach((gl) => {
      const m = new THREE.Mesh(new THREE.ExtrudeGeometry(gl.shapes, { depth: 0.05, curveSegments: 5, bevelEnabled: false }), metal);
      m.position.set(gl.x, 0.42, 0.08);
      g.add(m);
    });
    sub.glyphs.forEach((gl) => {
      const m = new THREE.Mesh(new THREE.ShapeGeometry(gl.shapes, 5), haloMat);
      m.position.set(gl.x, 0.16, 0.01);
      g.add(m);
    });
    const bar = new THREE.Mesh(new THREE.PlaneGeometry(Math.max(main.width, sub.width), 0.012), haloMat);
    bar.position.set(Math.max(main.width, sub.width) / 2, 0.35, 0.01);
    g.add(bar);
    const w = Math.max(main.width, sub.width);
    const s = Math.min(1, maxW / w);
    g.scale.setScalar(s);
    return { group: g, w: w * s, h: 0.7 * s };
  }

  function clearWorld() {
    world.traverse((o) => {
      if (o.isMesh && o.geometry !== standoffGeo) o.geometry.dispose();
      if (o.isMesh && o.userData.ownMat) o.material[4].dispose();
    });
    world.clear();
  }

  function build() {
    clearWorld();
    stops = [];
    panels = [];
    const narrow = mode === 'narrow';
    let x = 0;
    let lowest = 0;
    PROJECTS.forEach((p) => {
      const lay = bayLayout(p, narrow);
      const plate = makePlate(p, narrow ? 3.0 : Math.max(lay.w, 3.6));
      const bay = new THREE.Group();
      bay.position.set(x, TOP, 0);
      plate.group.position.set(0, 0.06, 0);
      bay.add(plate.group);
      const mats = [];
      lay.rects.forEach((r) => {
        const ph = p.photos[r.idx];
        const tex = textures.get(ph[0]);
        // photos are shown unlit and untone-mapped so they match the original files exactly
        const front = new THREE.MeshBasicMaterial({ color: 0x223049, toneMapped: false, fog: false });
        if (tex) applyTex(front, tex);
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(r.w, r.h, 0.05), [edge, edge, edge, edge, front, edge]);
        mesh.position.set(r.x + r.w / 2, r.y - r.h / 2, Z + 0.025);
        mesh.userData = { photo: p.first + r.idx, ownMat: true };
        bay.add(mesh);
        panels.push(mesh);
        mats.push({ mat: front, f: ph[0] });
        const inset = Math.min(0.1, r.w * 0.12, r.h * 0.12);
        [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sy]) => {
          const s = new THREE.Mesh(standoffGeo, metal);
          s.position.set(r.x + r.w / 2 + sx * (r.w / 2 - inset), r.y - r.h / 2 + sy * (r.h / 2 - inset), Z / 2 + 0.02);
          bay.add(s);
        });
      });
      world.add(bay);
      const w = Math.max(lay.w, plate.w);
      const top = TOP + 0.06 + plate.h;
      const bottom = TOP + lay.bottom;
      lowest = Math.min(lowest, bottom);
      stops.push({ project: p, cx: x + w / 2, cy: (top + bottom) / 2, w, h: top - bottom, mats });
      x += w + BAY_GAP;
    });
    const length = x - BAY_GAP;
    const floorY = lowest - 2.2;
    wall.scale.set(length + 80, floorY < -6 ? 30 : 24, 1);
    wall.position.set(length / 2, floorY + wall.scale.y / 2, 0);
    wallTex.repeat.set((length + 80) / 4, wall.scale.y / 4);
    floor.scale.set(length + 80, 16, 1);
    floor.position.set(length / 2, floorY, 8);
    strip.scale.set(length + 80, 1, 1);
    strip.position.set(length / 2, floorY + 0.02, 0.02);
    section.style.height = `${(stops.length - 1) * 70 + 100}vh`;
    loaded.clear();
    active = -1;
  }

  function applyTex(mat, tex) {
    mat.map = tex;
    mat.color.set(0xffffff);
    mat.needsUpdate = true;
  }

  // textures load a bay or two ahead of the camera
  const loaded = new Set();
  function loadAround(i) {
    for (let k = i - 1; k <= i + 2; k++) {
      const s = stops[k];
      if (!s || loaded.has(k)) continue;
      loaded.add(k);
      s.mats.forEach(({ mat, f }) => {
        if (textures.has(f)) { applyTex(mat, textures.get(f)); return; }
        loader.load(img(f, 'wall'), (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.anisotropy = maxAniso;
          textures.set(f, tex);
          applyTex(mat, tex);
        });
      });
    }
  }

  // UI
  const elProject = document.getElementById('plaque-project');
  const elCaption = document.getElementById('plaque-caption');
  const elCount = document.getElementById('plaque-count');
  const elBar = document.getElementById('progress-bar');
  const elOpen = document.getElementById('plaque-open');
  let active = -1;
  function setActive(i) {
    if (i === active) return;
    active = i;
    const p = stops[i].project;
    elProject.textContent = p.title;
    elCaption.textContent = p.where;
    elCount.textContent = `Project ${i + 1} of ${stops.length}`;
    elOpen.textContent = p.photos.length > 1 ? `View ${p.photos.length} photos` : 'View photo';
    loadAround(i);
  }
  elOpen.addEventListener('click', () => onOpen(stops[Math.max(0, active)].project.first));

  let vHalf = 0, hHalf = 0;
  function fit() {
    const w = stage.clientWidth, h = stage.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    vHalf = THREE.MathUtils.degToRad(camera.fov / 2);
    hHalf = Math.atan(Math.tan(vHalf) * camera.aspect);
    camera.updateProjectionMatrix();
    const want = camera.aspect < 0.9 ? 'narrow' : 'wide';
    if (want !== mode) { mode = want; build(); }
  }
  const distFor = (s) => Math.max((s.w / 0.86) / 2 / Math.tan(hHalf), (s.h / 0.6) / 2 / Math.tan(vHalf));

  const ease = (f) => { const s = f * f * f * (f * (f * 6 - 15) + 10); return f + (s - f) * 0.85; };
  function scrollTarget(out) {
    const r = section.getBoundingClientRect();
    const total = section.offsetHeight - innerHeight;
    const p = Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
    elBar.style.width = `${p * 100}%`;
    const f = p * (stops.length - 1);
    const i = Math.min(stops.length - 2, Math.floor(f));
    const e = ease(Math.min(1, f - i));
    const a = stops[i], b = stops[i + 1];
    setActive(Math.round(f));
    out.x = THREE.MathUtils.lerp(a.cx, b.cx, e);
    out.y = THREE.MathUtils.lerp(a.cy, b.cy, e);
    out.d = THREE.MathUtils.lerp(distFor(a), distFor(b), e);
  }

  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  stage.addEventListener('pointermove', (e) => {
    const r = stage.getBoundingClientRect();
    pointer.tx = ((e.clientX - r.left) / r.width) * 2 - 1;
    pointer.ty = ((e.clientY - r.top) / r.height) * 2 - 1;
  }, { passive: true });

  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  canvas.addEventListener('click', (e) => {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(panels, false)[0];
    if (hit) onOpen(hit.object.userData.photo);
  });

  new ResizeObserver(fit).observe(stage);
  fit();
  setActive(0);

  const tgt = { x: 0, y: 0, d: 8 };
  scrollTarget(tgt);
  const cur = { ...tgt };
  let running = false, raf = 0, last = performance.now();
  const look = new THREE.Vector3();
  function frame(now) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    scrollTarget(tgt);
    const k = 1 - Math.exp(-dt * 7);
    cur.x += (tgt.x - cur.x) * k;
    cur.y += (tgt.y - cur.y) * k;
    cur.d += (tgt.d - cur.d) * k;
    const kp = 1 - Math.exp(-dt * 3);
    pointer.x += (pointer.tx - pointer.x) * kp;
    pointer.y += (pointer.ty - pointer.y) * kp;

    // keep the bay above the caption card; stand a little to the left so depth reads
    const visH = 2 * cur.d * Math.tan(vHalf);
    const ly = cur.y - visH * 0.035;
    camera.position.set(cur.x - cur.d * 0.14 + pointer.x * 0.35, ly + 0.15 - pointer.y * 0.2, cur.d);
    look.set(cur.x, ly, 0);
    camera.lookAt(look);
    spot.position.set(cur.x - 0.8, cur.y + 3.2, 4);
    spot.target.position.set(cur.x, cur.y - 0.3, 0);
    renderer.render(scene, camera);
  }

  whenVisible(stage, (vis) => {
    if (vis && !running) { running = true; last = performance.now(); raf = requestAnimationFrame(frame); }
    else if (!vis && running) { running = false; cancelAnimationFrame(raf); }
  });
}

/* ------------------------------------------------------------------ */
/* Project list                                                        */
/* ------------------------------------------------------------------ */
function renderProjects(openAt) {
  const box = document.getElementById('project-list');
  PROJECTS.forEach((p) => {
    const a = document.createElement('article');
    a.className = 'project';
    a.id = `project-${p.id}`;
    const h = document.createElement('header');
    const h3 = document.createElement('h3'); h3.textContent = p.title;
    const where = document.createElement('p'); where.className = 'project__where'; where.textContent = p.where;
    h.append(h3, where);
    const blurb = document.createElement('p'); blurb.textContent = p.blurb;
    const tags = document.createElement('ul'); tags.className = 'tags'; tags.setAttribute('aria-label', 'Scope');
    p.tags.forEach((t) => { const li = document.createElement('li'); li.textContent = t; tags.append(li); });
    const thumbs = document.createElement('div'); thumbs.className = 'thumbs';
    p.photos.forEach(([f, , , caption], k) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', `Open photo: ${caption}`);
      const im = document.createElement('img');
      im.src = img(f, 'thumb'); im.alt = ''; im.loading = 'lazy';
      b.append(im);
      b.addEventListener('click', () => openAt(p.first + k));
      thumbs.append(b);
    });
    a.append(h, blurb, tags, thumbs);
    box.append(a);
  });
}

/* ------------------------------------------------------------------ */
/* Lightbox, nav, copy email                                           */
/* ------------------------------------------------------------------ */
const dialog = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
const lbProject = document.getElementById('lightbox-project');
const lbCaption = document.getElementById('lightbox-caption');
let lbIndex = 0;

function showPhoto(i) {
  lbIndex = (i + PHOTOS.length) % PHOTOS.length;
  const ph = PHOTOS[lbIndex];
  const n = ph.project.photos.length;
  lbImg.src = img(ph.f, 'full');
  lbImg.alt = ph.caption;
  lbProject.textContent = `${ph.project.title}, ${ph.project.where}`;
  lbCaption.textContent = `${ph.caption} (${lbIndex - ph.project.first + 1} of ${n})`;
  [1, -1].forEach((d) => { const nb = PHOTOS[(lbIndex + d + PHOTOS.length) % PHOTOS.length]; new Image().src = img(nb.f, 'full'); });
}
function openLightbox(i) {
  showPhoto(i);
  root.classList.add('lb-open');
  if (typeof dialog.showModal === 'function') { if (!dialog.open) dialog.showModal(); }
  else dialog.setAttribute('open', '');
}
document.getElementById('lb-prev').addEventListener('click', () => showPhoto(lbIndex - 1));
document.getElementById('lb-next').addEventListener('click', () => showPhoto(lbIndex + 1));
document.getElementById('lb-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => root.classList.remove('lb-open'));
dialog.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') showPhoto(lbIndex - 1);
  if (e.key === 'ArrowRight') showPhoto(lbIndex + 1);
});

renderProjects(openLightbox);

// pinned nav: transparent over the hero, solid once you scroll; highlights the current section
const topbar = document.querySelector('.topbar');
const onScroll = () => topbar.classList.toggle('is-solid', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
const navLinks = [...document.querySelectorAll('.topbar nav a[href^="#"]')];
const watched = navLinks.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
const seen = new Map();
const navIO = new IntersectionObserver((entries) => {
  entries.forEach((e) => seen.set(e.target.id, e.isIntersecting));
  const current = watched.find((s) => seen.get(s.id));
  navLinks.forEach((a) => {
    if (current && a.getAttribute('href') === `#${current.id}`) a.setAttribute('aria-current', 'true');
    else a.removeAttribute('aria-current');
  });
}, { rootMargin: '-45% 0px -50% 0px' });
watched.forEach((s) => navIO.observe(s));


// mobile menu
const menuBtn = document.getElementById('menu-btn');
const siteNav = document.getElementById('site-nav');
const menuMQ = matchMedia('(max-width: 720px)');
const menuOpen = () => root.classList.contains('menu-open');
function setMenu(open, { restoreFocus = true } = {}) {
  root.classList.toggle('menu-open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.querySelector('.menu-btn__label').textContent = open ? 'Close' : 'Menu';
  if (open) siteNav.querySelector('a').focus({ preventScroll: true });
  else if (restoreFocus) menuBtn.focus({ preventScroll: true });
}
menuBtn.addEventListener('click', () => setMenu(!menuOpen()));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menuOpen()) setMenu(false); });
// keep keyboard focus inside the menu while it is open
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Tab' || !menuOpen()) return;
  const items = [...topbar.querySelectorAll('a[href], button')];
  const first = items[0], last = items[items.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});
document.addEventListener('focusin', (e) => { if (menuOpen() && !topbar.contains(e.target)) menuBtn.focus({ preventScroll: true }); });
menuMQ.addEventListener('change', (e) => { if (!e.matches && menuOpen()) setMenu(false, { restoreFocus: false }); });

// time-based glide: always lands on target, even if frames are slow; any user scroll input cancels it
let glide = 0;
function glideTo(y) {
  cancelAnimationFrame(glide);
  const from = window.scrollY, d = y - from, t0 = performance.now(), dur = 520;
  const stop = () => { cancelAnimationFrame(glide); ['wheel', 'touchstart', 'keydown'].forEach((ev) => removeEventListener(ev, stop)); };
  ['wheel', 'touchstart', 'keydown'].forEach((ev) => addEventListener(ev, stop, { passive: true, once: true }));
  const step = (now) => {
    const k = Math.min(1, (now - t0) / dur);
    window.scrollTo(0, from + d * (1 - Math.pow(1 - k, 3)));
    if (k < 1) glide = requestAnimationFrame(step); else stop();
  };
  glide = requestAnimationFrame(step);
}

// In-page links: long jumps cut most of the way instantly, then glide the last screen.
// (Native smooth scrolling stalls over very long distances, and racing the camera past
// every bay of the 3D wall is unpleasant.)
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
  const id = a.getAttribute('href').slice(1);
  const el = id ? document.getElementById(id) : null;
  if (!el) return;
  e.preventDefault();
  if (menuOpen()) setMenu(false, { restoreFocus: false });
  const offset = id === 'top' ? 0 : topbar.offsetHeight + 12;
  const y = Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset);
  const dist = y - window.scrollY;
  if (reduced) window.scrollTo(0, y);
  else {
    if (Math.abs(dist) > innerHeight * 1.5) window.scrollTo(0, y - Math.sign(dist) * innerHeight * 0.8);
    glideTo(y);
  }
  try { history.replaceState(null, '', `#${id}`); } catch (err) { /* ignore */ }
  if (el.tabIndex < 0 && !/^(A|BUTTON|INPUT)$/.test(el.tagName)) { el.setAttribute('tabindex', '-1'); }
  el.focus({ preventScroll: true });
});

// swipe between photos in the viewer
let touchX = null;
dialog.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
dialog.addEventListener('touchend', (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) showPhoto(lbIndex + (dx < 0 ? 1 : -1));
  touchX = null;
}, { passive: true });

const copyBtn = document.getElementById('copy-email');
const copyStatus = document.getElementById('copy-status');
const emailEl = document.getElementById('email-addr');
copyBtn.addEventListener('click', () => {
  const text = emailEl.textContent.trim();
  const selectIt = () => {
    const r = document.createRange(); r.selectNodeContents(emailEl);
    const s = getSelection(); s.removeAllRanges(); s.addRange(r);
    copyStatus.textContent = 'Address selected. Press Ctrl+C or Cmd+C to copy.';
  };
  try {
    navigator.clipboard.writeText(text).then(() => { copyStatus.textContent = 'Copied'; }, selectIt);
  } catch (e) { selectIt(); }
});

/* ------------------------------------------------------------------ */
/* Boot                                                                */
/* ------------------------------------------------------------------ */
async function boot() {
  if (!hasWebGL()) { root.classList.add('no-webgl'); return; }
  try {
    const font = await new FontLoader().loadAsync('assets/fonts/bigshoulders-800.typeface.json');
    initHero(font);
    if (!reduced) initGallery(font, openLightbox);
  } catch (err) {
    console.error(err);
    root.classList.add('no-webgl');
  }
}
boot();
