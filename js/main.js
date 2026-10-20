import * as THREE from 'three';

window.__gdsBoot = true;

/* ------------------------------------------------------------------ */
/* Content: one entry per project. Photos live in assets/work/         */
/* full/ (photo viewer), wall/ (carousel and 3D cards), thumb/ (grid). */
/* `short` is the pill label; `feature[0]` is the cover photo.         */
/* ------------------------------------------------------------------ */
const PROJECTS = [
  {
    id: 'disney', title: 'Walt Disney World', where: 'Orlando, Florida',
    short: 'Disney',
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
    short: 'Universal',
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
    short: 'Steelers',
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
    short: 'Pistons',
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
    short: 'MLB',
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
    short: 'LaGuardia',
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
    short: 'Air Force',
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
    short: 'San Antonio Zoo',
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
    short: 'Houston Zoo',
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
    id: 'sdusd', title: 'San Diego Unified School District', where: 'Nipaquay Elementary and John Muir Language Academy, California', place: 'San Diego, California',
    short: 'San Diego Unified',
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
    short: 'Campus letters',
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
const isSmall = window.innerWidth < 700;
const photoIndex = (f) => PHOTOS.findIndex((p) => p.f === f);
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch (e) { return false; }
}

/* ------------------------------------------------------------------ */
/* HERO: project photos hung from a ceiling rail, like airport signs   */
/* ------------------------------------------------------------------ */
const SIGNS = [
  { f: 'sdusd-01', w: 1.75, drop: 0.62 },
  { f: 'disney-05', w: 1.05, drop: 0.28 },
  { f: 'sazoo-03', w: 1.65, drop: 0.9 },
  { f: 'mlb-03', w: 1.3, drop: 0.42 },
  { f: 'hzoo-03', w: 1.95, drop: 0.74 },
];
// on phones three signs hang as a staggered cluster from a rail that runs edge to edge
const SIGNS_NARROW = [
  { k: 1, x: -1.42, drop: 0.22, z: 0 },
  { k: 2, x: 0.1, drop: 1.0, z: 0.04 },
  { k: 4, x: 1.34, drop: 0.32, z: -0.04 },
];

function roundedRect(w, h, r) {
  const s = new THREE.Shape();
  const x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

// a rounded-rectangle face whose UVs span the card, so a photo maps edge to edge
function faceGeometry(w, h, r) {
  const g = new THREE.ShapeGeometry(roundedRect(w, h, r), 12);
  const pos = g.attributes.position;
  const uv = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    uv[i * 2] = (pos.getX(i) + w / 2) / w;
    uv[i * 2 + 1] = (pos.getY(i) + h / 2) / h;
  }
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  return g;
}

// a pre-blurred rounded-rectangle shadow, like a CSS box-shadow, drawn once
function shadowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  const OFF = 2000;
  g.shadowColor = 'rgba(0,0,0,1)';
  g.shadowBlur = 34;
  g.shadowOffsetX = OFF;
  g.fillStyle = '#000';
  g.beginPath();
  if (g.roundRect) g.roundRect(48 - OFF, 48, 160, 160, 18);
  else g.rect(48 - OFF, 48, 160, 160);
  g.fill();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function whenVisible(el, onChange) {
  const io = new IntersectionObserver((entries) => entries.forEach((e) => onChange(e.isIntersecting)), { rootMargin: '120px' });
  io.observe(el);
}

function initSigns(onOpen) {
  const canvas = document.getElementById('signs-canvas');
  const host = canvas.parentElement;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isSmall ? 1.75 : 2));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(24, 1, 0.1, 100);
  const loader = new THREE.TextureLoader();
  const maxAniso = renderer.capabilities.getMaxAnisotropy();
  const ink = new THREE.MeshBasicMaterial({ color: 0x111111, toneMapped: false });
  const white = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });
  const shadowTex = shadowTexture();
  const world = new THREE.Group();
  scene.add(world);
  const textures = new Map();
  const hits = [];
  let signs = [], railW = 1, viewH = 1, layout = '', dist = 8, camY = 0, camX = 0, spanW = 1;

  function build(narrow) {
    world.traverse((o) => { if (o.isMesh && o.geometry) o.geometry.dispose(); });
    world.clear();
    hits.length = 0;
    const GAP = 0.36;
    const spec = narrow ? SIGNS_NARROW : SIGNS.map((sg, k) => ({ k, drop: sg.drop, z: 0 }));
    const items = spec.map((sp) => {
      const idx = photoIndex(SIGNS[sp.k].f);
      const ph = PHOTOS[idx];
      const w = SIGNS[sp.k].w;
      return { idx, ph, w, h: w / (ph.w / ph.h), drop: sp.drop, z: sp.z, x: sp.x };
    });
    if (!narrow) {
      // five signs side by side, centred under the rail
      const total = items.reduce((sum, it) => sum + it.w, 0) + GAP * (items.length - 1);
      let x = -total / 2;
      items.forEach((it) => { it.x = x + it.w / 2; x += it.w + GAP; });
    }
    const minX = Math.min(...items.map((it) => it.x - it.w / 2));
    const maxX = Math.max(...items.map((it) => it.x + it.w / 2));
    spanW = maxX - minX + (narrow ? 0.25 : 0.5);
    camX = (minX + maxX) / 2;
    railW = narrow ? 40 : spanW;

    // the ceiling rail: end caps on wide screens, edge to edge on phones
    const rail = new THREE.Mesh(new THREE.BoxGeometry(railW, 0.045, 0.05), ink);
    rail.position.set(narrow ? camX : 0, 0.022, 0);
    world.add(rail);
    if (!narrow) {
      [-1, 1].forEach((side) => {
        const cap = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.13, 0.06), ink);
        cap.position.set(side * railW / 2, 0.03, 0);
        world.add(cap);
      });
    }

    signs = items.map((it, i) => {
      const cx = it.x;
      const z = it.z;
      const pivot = new THREE.Group();
      pivot.position.set(cx, 0, z);
      const hang = new THREE.Group();
      pivot.add(hang);
      const cableX = it.w * 0.34;
      [-1, 1].forEach((side) => {
        const cable = new THREE.Mesh(new THREE.BoxGeometry(0.007, it.drop, 0.007), ink);
        cable.position.set(side * cableX, -it.drop / 2, 0);
        hang.add(cable);
        const clip = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.035, 0.03), ink);
        clip.position.set(side * cableX, -it.drop + 0.012, 0.01);
        hang.add(clip);
      });
      const panel = new THREE.Group();
      panel.position.y = -it.drop - it.h / 2;
      hang.add(panel);
      const R = 0.035, D = 0.03;
      const slab = new THREE.Mesh(new THREE.ExtrudeGeometry(roundedRect(it.w + 0.05, it.h + 0.05, R + 0.015), { depth: D, bevelEnabled: false, curveSegments: 6 }), white);
      slab.position.z = -D;
      const mat = new THREE.MeshBasicMaterial({ color: 0xededed, toneMapped: false });
      const face = new THREE.Mesh(faceGeometry(it.w, it.h, R), mat);
      face.position.z = 0.002;
      face.userData.sign = i;
      hits.push(face);
      const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, map: shadowTex, transparent: true, opacity: 0.24, depthWrite: false, depthTest: false, toneMapped: false });
      const shadow = new THREE.Mesh(new THREE.PlaneGeometry((it.w + 0.05) * 1.55, (it.h + 0.05) * 1.55), shadowMat);
      shadow.renderOrder = -1;
      shadow.position.set(0.05, -0.1, -0.25);
      panel.add(shadow, slab, face);
      const apply = (tex) => { mat.map = tex; mat.color.set(0xffffff); mat.needsUpdate = true; };
      if (textures.has(it.ph.f)) apply(textures.get(it.ph.f));
      else loader.load(img(it.ph.f, 'wall'), (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = maxAniso;
        textures.set(it.ph.f, tex);
        apply(tex);
      });
      world.add(pivot);
      return { pivot, hang, idx: it.idx, w: it.w, h: it.h, drop: it.drop, cx, i, theta: 0, omega: 0, twist: 0, landed: false };
    });
    viewH = Math.max(...items.map((it) => it.drop + it.h)) + 0.3;
  }

  function fit() {
    const w = host.clientWidth, h = host.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const mode = w < 600 ? 'narrow' : 'wide';
    if (mode !== layout) { layout = mode; build(mode === 'narrow'); }
    const vHalf = THREE.MathUtils.degToRad(camera.fov / 2);
    const hHalf = Math.atan(Math.tan(vHalf) * camera.aspect);
    dist = Math.max((spanW / 0.97) / 2 / Math.tan(hHalf), ((viewH + 0.12) / 0.97) / 2 / Math.tan(vHalf));
    const visH = 2 * dist * Math.tan(vHalf);
    camY = 0.1 - visH / 2; // the rail sits along the top edge of the canvas
    camera.position.set(camX, camY, dist);
    camera.lookAt(camX, camY, 0);
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(fit).observe(host);
  fit();

  // pointer: brushing past a sign sets it swinging; the signs turn slightly toward the cursor
  const pointer = { x: 0, tx: 0 };
  const ndc = new THREE.Vector2(9, 9);
  const ray = new THREE.Raycaster();
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const hitPoint = new THREE.Vector3();
  const pw = { x: 0, y: 0, vx: 0, valid: false };
  let inside = false, hovered = -1;
  const track = (e) => {
    pointer.tx = (e.clientX / innerWidth) * 2 - 1;
    const r = canvas.getBoundingClientRect();
    inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  };
  window.addEventListener('pointermove', track, { passive: true });
  canvas.addEventListener('pointerdown', track);
  canvas.addEventListener('pointerleave', () => { inside = false; pw.valid = false; });
  canvas.addEventListener('click', () => { if (hovered >= 0) onOpen(signs[hovered].idx); });

  const start = performance.now();
  let running = false, raf = 0, last = start, first = true;
  function frame(now) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const t = (now - start) / 1000;

    hovered = -1;
    if (inside) {
      ray.setFromCamera(ndc, camera);
      const hit = ray.intersectObjects(hits, false)[0];
      if (hit) hovered = hit.object.userData.sign;
      if (ray.ray.intersectPlane(plane, hitPoint)) {
        pw.vx = pw.valid ? (hitPoint.x - pw.x) / Math.max(dt, 1 / 120) : 0;
        pw.x = hitPoint.x; pw.y = hitPoint.y; pw.valid = true;
      }
    } else {
      pw.vx *= 0.8;
    }
    canvas.style.cursor = hovered >= 0 ? 'pointer' : 'default';

    pointer.x += (pointer.tx - pointer.x) * (1 - Math.exp(-dt * 3));
    signs.forEach((s) => {
      // drop in from above the rail, one after another
      const k = reduced ? 1 : clamp01((now - start - 200 - s.i * 150) / 900);
      s.pivot.position.y = (1 - easeOutCubic(k)) * 3;
      if (k >= 1 && !s.landed) { s.landed = true; if (!reduced) s.omega += (s.i % 2 ? 1 : -1) * 0.55; }

      if (!reduced && s.landed) {
        // a cursor moving across a sign pushes it the way the cursor is going
        const top = -s.drop, bottom = top - s.h;
        if (pw.valid && Math.abs(pw.x - s.cx) < s.w / 2 + 0.12 && pw.y < top + 0.1 && pw.y > bottom - 0.1) {
          s.omega += THREE.MathUtils.clamp(pw.vx, -12, 12) * 0.9 * dt / (s.drop + s.h);
        }
        // a pendulum: longer cables swing more slowly
        const len = s.drop + s.h / 2 + 0.3;
        s.omega += (-(9.8 / len) * Math.sin(s.theta) - 1.15 * s.omega) * dt;
        s.theta = THREE.MathUtils.clamp(s.theta + s.omega * dt, -0.5, 0.5);
      }
      s.pivot.rotation.z = s.theta;
      const twistTarget = reduced ? 0 : pointer.x * 0.22 + Math.sin(t * 0.5 + s.i * 1.3) * 0.03 + (s.i === hovered ? -pointer.x * 0.15 : 0);
      s.twist += (twistTarget - s.twist) * (1 - Math.exp(-dt * 3));
      s.hang.rotation.y = s.twist;
    });

    renderer.render(scene, camera);
    if (first) { first = false; root.classList.add('has-3d'); }
  }

  whenVisible(host, (vis) => {
    if (vis && !running) { running = true; last = performance.now(); raf = requestAnimationFrame(frame); }
    else if (!vis && running) { running = false; cancelAnimationFrame(raf); }
  });
}

/* ------------------------------------------------------------------ */
/* Featured work: a draggable carousel, one card per project           */
/* ------------------------------------------------------------------ */
const ARROW = '<svg class="arrow" aria-hidden="true" focusable="false"><use href="#arrow"></use></svg>';

function renderFeatured(openAt) {
  const track = document.getElementById('carousel');
  let dragMoved = false;
  PROJECTS.forEach((p) => {
    const cover = p.photos[p.feature[0]];
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'slide';
    b.setAttribute('aria-label', `${p.title}, ${p.where}. View ${p.photos.length} photo${p.photos.length > 1 ? 's' : ''}`);
    const media = document.createElement('span');
    media.className = 'slide__media';
    const im = document.createElement('img');
    im.src = img(cover[0], 'wall'); im.alt = ''; im.loading = 'lazy'; im.draggable = false;
    im.width = cover[1]; im.height = cover[2];
    media.append(im);
    const plate = document.createElement('span');
    plate.className = 'plate';
    const name = document.createElement('span');
    name.className = 'plate__name';
    name.textContent = p.short;
    const where = document.createElement('span');
    where.className = 'plate__where';
    where.textContent = p.place || p.where;
    plate.append(name, where);
    plate.insertAdjacentHTML('beforeend', ARROW);
    b.append(media, plate);
    b.addEventListener('click', (e) => {
      if (dragMoved) { e.preventDefault(); return; }
      openAt(p.first + p.feature[0]);
    });
    track.append(b);
  });

  // drag to scroll with a mouse; touch and trackpads scroll natively
  let down = false, sx = 0, sl = 0;
  track.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    down = true; dragMoved = false; sx = e.clientX; sl = track.scrollLeft;
  });
  window.addEventListener('pointermove', (e) => {
    if (!down) return;
    const dx = e.clientX - sx;
    if (Math.abs(dx) > 5) { dragMoved = true; track.classList.add('is-dragging'); }
    track.scrollLeft = sl - dx;
  });
  window.addEventListener('pointerup', () => {
    if (!down) return;
    down = false;
    track.classList.remove('is-dragging');
    setTimeout(() => { dragMoved = false; }, 0);
  });

  const prev = document.getElementById('car-prev');
  const next = document.getElementById('car-next');
  const step = () => Math.max(240, track.clientWidth * 0.7);
  prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: reduced ? 'auto' : 'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: reduced ? 'auto' : 'smooth' }));
  const sync = () => {
    prev.disabled = track.scrollLeft < 8;
    next.disabled = track.scrollLeft > track.scrollWidth - track.clientWidth - 8;
  };
  track.addEventListener('scroll', sync, { passive: true });
  new ResizeObserver(sync).observe(track);
  sync();
}

/* ------------------------------------------------------------------ */
/* More work: every photo as a rounded tile                            */
/* ------------------------------------------------------------------ */
function renderGrid(openAt) {
  const box = document.getElementById('grid');
  PHOTOS.forEach((ph, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'tile';
    b.setAttribute('aria-label', `${ph.project.title}: ${ph.caption}`);
    const im = document.createElement('img');
    im.src = img(ph.f, 'thumb'); im.alt = ''; im.loading = 'lazy'; im.draggable = false;
    const tag = document.createElement('span');
    tag.className = 'tile__tag';
    tag.setAttribute('aria-hidden', 'true');
    tag.textContent = ph.project.short;
    b.append(im, tag);
    b.addEventListener('click', () => openAt(i));
    box.append(b);
  });
}

/* ------------------------------------------------------------------ */
/* Photo viewer                                                        */
/* ------------------------------------------------------------------ */
const dialog = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
const lbProject = document.getElementById('lightbox-project');
const lbWhere = document.getElementById('lightbox-where');
const lbCaption = document.getElementById('lightbox-caption');
const lbBlurb = document.getElementById('lightbox-blurb');
let lbIndex = 0;

function showPhoto(i) {
  lbIndex = (i + PHOTOS.length) % PHOTOS.length;
  const ph = PHOTOS[lbIndex];
  const p = ph.project;
  lbImg.src = img(ph.f, 'full');
  lbImg.alt = ph.caption;
  lbProject.textContent = p.title;
  lbWhere.textContent = p.where;
  lbCaption.textContent = `${ph.caption} (${lbIndex - p.first + 1} of ${p.photos.length})`;
  lbBlurb.textContent = p.blurb;
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
let touchX = null;
dialog.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
dialog.addEventListener('touchend', (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) showPhoto(lbIndex + (dx < 0 ? 1 : -1));
  touchX = null;
}, { passive: true });

/* ------------------------------------------------------------------ */
/* Menu (floating button), section highlight, in-page links            */
/* ------------------------------------------------------------------ */
const menuBtn = document.getElementById('menu-btn');
const siteNav = document.getElementById('site-nav');
const menuOpen = () => root.classList.contains('menu-open');
function setMenu(open, { restoreFocus = true } = {}) {
  root.classList.toggle('menu-open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Menu');
  if (open) siteNav.querySelector('a').focus({ preventScroll: true });
  else if (restoreFocus) menuBtn.focus({ preventScroll: true });
}
menuBtn.addEventListener('click', () => setMenu(!menuOpen()));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuOpen()) setMenu(false);
  if (e.key !== 'Tab' || !menuOpen()) return;
  const items = [...siteNav.querySelectorAll('a[href]'), menuBtn];
  const firstItem = items[0], lastItem = items[items.length - 1];
  if (e.shiftKey && document.activeElement === firstItem) { e.preventDefault(); lastItem.focus(); }
  else if (!e.shiftKey && document.activeElement === lastItem) { e.preventDefault(); firstItem.focus(); }
});
document.addEventListener('focusin', (e) => {
  if (menuOpen() && !siteNav.contains(e.target) && e.target !== menuBtn) menuBtn.focus({ preventScroll: true });
});

const navLinks = [...siteNav.querySelectorAll('a[href^="#"]')];
const watched = navLinks.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
const seen = new Map();
function markCurrent() {
  // at the very bottom of the page the footer can't reach mid-screen, so it wins outright
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
  const current = atBottom ? watched[watched.length - 1] : watched.find((s) => seen.get(s.id));
  navLinks.forEach((a) => {
    if (current && a.getAttribute('href') === `#${current.id}`) a.setAttribute('aria-current', 'true');
    else a.removeAttribute('aria-current');
  });
}
const navIO = new IntersectionObserver((entries) => {
  entries.forEach((e) => seen.set(e.target.id, e.isIntersecting));
  markCurrent();
}, { rootMargin: '-45% 0px -50% 0px' });
watched.forEach((s) => navIO.observe(s));
window.addEventListener('scroll', markCurrent, { passive: true });

// time-based glide: always lands on target, even if frames are slow; any user scroll input cancels it
let glide = 0;
function glideTo(y) {
  cancelAnimationFrame(glide);
  const from = window.scrollY, d = y - from, t0 = performance.now(), dur = 520;
  const stop = () => { cancelAnimationFrame(glide); ['wheel', 'touchstart', 'keydown'].forEach((ev) => removeEventListener(ev, stop)); };
  ['wheel', 'touchstart', 'keydown'].forEach((ev) => addEventListener(ev, stop, { passive: true, once: true }));
  const stepFn = (now) => {
    const k = Math.min(1, (now - t0) / dur);
    window.scrollTo(0, from + d * (1 - Math.pow(1 - k, 3)));
    if (k < 1) glide = requestAnimationFrame(stepFn); else stop();
  };
  glide = requestAnimationFrame(stepFn);
}

// In-page links: long jumps cut most of the way instantly, then glide the last screen.
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
  const id = a.getAttribute('href').slice(1);
  const el = id ? document.getElementById(id) : null;
  if (!el) return;
  e.preventDefault();
  if (menuOpen()) setMenu(false, { restoreFocus: false });
  const y = id === 'top' ? 0 : Math.max(0, el.getBoundingClientRect().top + window.scrollY - 16);
  const dist = y - window.scrollY;
  if (reduced) window.scrollTo(0, y);
  else {
    if (Math.abs(dist) > innerHeight * 1.5) window.scrollTo(0, y - Math.sign(dist) * innerHeight * 0.8);
    glideTo(y);
  }
  try { history.replaceState(null, '', `#${id}`); } catch (err) { /* ignore */ }
  if (el.tabIndex < 0 && !/^(A|BUTTON|INPUT)$/.test(el.tagName)) el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
});

const footer = document.getElementById('contact');
new IntersectionObserver(([e]) => root.classList.toggle('at-contact', e.isIntersecting), { threshold: 0.15 }).observe(footer);

// size CONTACT and its arrow so together they span the sign exactly, whatever the screen width
const word = document.querySelector('.footer__word');
const wordText = word.querySelector('.footer__text');
function fitWord() {
  const cs = getComputedStyle(wordText, '::before');
  const ctx = fitWord.ctx || (fitWord.ctx = document.createElement('canvas').getContext('2d'));
  ctx.font = `800 100px ${cs.fontFamily}`;
  const text = 'CONTACT';
  const textW = (ctx.measureText(text).width - 0.03 * 100 * text.length) / 100;
  const ratio = textW + 0.66 + 0.08; // text, arrow, gap (in units of font size)
  word.style.setProperty('--word-size', `${(word.clientWidth / ratio) * 0.985}px`);
}
new ResizeObserver(fitWord).observe(word);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitWord);

/* ------------------------------------------------------------------ */
/* Copy email                                                          */
/* ------------------------------------------------------------------ */
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
renderFeatured(openLightbox);
renderGrid(openLightbox);
if (hasWebGL()) {
  try { initSigns(openLightbox); } catch (err) { console.error(err); root.classList.add('no-webgl'); }
} else {
  root.classList.add('no-webgl');
}
