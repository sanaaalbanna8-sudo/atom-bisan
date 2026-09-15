const PAGES = [
  { href: "index.html", title: "الغلاف" },
  { href: "map.html", title: "خريطة الاكتشاف" },
  { href: "atom.html", title: "ما الذرة؟" },
  { href: "dalton.html", title: "دالتون" },
  { href: "electrolysis.html", title: "التحليل الكهربائي" },
  { href: "discharge.html", title: "التفريغ الكهربائي" },
  { href: "thomson.html", title: "تومسون" },
  { href: "rutherford.html", title: "رذرفورد" },
  { href: "particles.html", title: "مكونات الذرة" },
  { href: "isotopes.html", title: "النظائر" },
  { href: "quiz.html", title: "اختبار تفاعلي" },
  { href: "finale.html", title: "الختام" }
];

const FORMULAS = ["H₂O", "NaCl", "CO₂", "e⁻", "α", "p⁺", "n⁰", "Cl⁻", "Na⁺", "H₂", "O₂", "e/m", "العدد الكتلي"];

const LabAudio = {
  ctx: null,
  muted: localStorage.getItem("bisan-mute") === "1",
  nodes: {},
  ensure() {
    if (this.ctx) return;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.ctx = ctx;
    const master = ctx.createGain();
    master.gain.value = this.muted ? 0 : 0.22;
    master.connect(ctx.destination);
    this.nodes.master = master;

    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 92;
    filter.type = "lowpass";
    filter.frequency.value = 240;
    gain.gain.value = 0.18;
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    osc.start();

    const osc2 = ctx.createOscillator();
    const g2 = ctx.createGain();
    osc2.type = "triangle";
    osc2.frequency.value = 138;
    g2.gain.value = 0.05;
    osc2.connect(g2);
    g2.connect(master);
    osc2.start();
  },
  setMuted(flag) {
    this.muted = flag;
    localStorage.setItem("bisan-mute", flag ? "1" : "0");
    if (this.nodes.master) this.nodes.master.gain.value = flag ? 0 : 0.22;
    const btn = document.querySelector("[data-mute]");
    if (btn) btn.textContent = flag ? "🔇" : "🔊";
  },
  beep(freq = 540, dur = 0.12, type = "sine") {
    if (!this.ctx || this.muted) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.16, this.ctx.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + dur);
    o.connect(g);
    g.connect(this.nodes.master);
    o.start();
    o.stop(this.ctx.currentTime + dur + 0.02);
  },
  spark() {
    this.beep(880, 0.08, "square");
    setTimeout(() => this.beep(420, 0.1, "sawtooth"), 70);
  },
  chime() {
    this.beep(523, 0.12);
    setTimeout(() => this.beep(659, 0.12), 90);
    setTimeout(() => this.beep(784, 0.18), 180);
  }
};

function currentIndex() {
  const file = location.pathname.split("/").pop() || "index.html";
  return Math.max(0, PAGES.findIndex((p) => p.href === file));
}

function injectChrome() {
  const idx = currentIndex();
  const header = document.createElement("header");
  header.className = "app-header";
  header.innerHTML = `
    <div class="brand">
      <div class="atom-badge" aria-hidden="true"><i></i></div>
      <div>
        <strong>بيسان طارق</strong>
        <small>الصف التاسع ب · مادة الكيمياء · مكونات الذرة</small>
      </div>
    </div>
    <div class="meta-pill">بإشراف المعلمة ربى</div>
    <div class="progress-pill">
      المحطة ${String(idx + 1).padStart(2, "0")} / ${String(PAGES.length).padStart(2, "0")}
      <span class="progress-track"><b style="width:${((idx + 1) / PAGES.length) * 100}%"></b></span>
    </div>
  `;

  const nav = document.createElement("nav");
  nav.className = "app-nav";
  nav.innerHTML = PAGES.map((p, i) =>
    `<a href="${p.href}" class="${i === idx ? "active" : ""}">${p.title}</a>`
  ).join("");

  const footer = document.createElement("footer");
  footer.className = "app-footer";
  footer.innerHTML = `
    <span>عرض كيميائي من إعداد الطالبة <b style="color:var(--gold)">بيسان طارق</b> · الصف التاسع ب</span>
    <span>بإشراف المعلمة ربى · درس مكونات الذرة والنماذج الذرية</span>
  `;

  const mark = document.createElement("div");
  mark.className = "watermark";
  mark.textContent = "بيسان طارق · الصف التاسع ب";

  const dock = document.createElement("div");
  dock.className = "audio-dock";
  dock.innerHTML = `
    <button type="button" data-mute title="الصوت">${LabAudio.muted ? "🔇" : "🔊"}</button>
    <button type="button" data-chime title="جرس المختبر">♪</button>
  `;

  document.body.prepend(nav);
  document.body.prepend(header);
  document.body.append(footer, mark, dock);

  const prev = PAGES[idx - 1];
  const next = PAGES[idx + 1];
  const pager = document.querySelector("[data-pager]");
  if (pager) {
    pager.innerHTML = `
      <a class="btn" href="${prev ? prev.href : PAGES[0].href}">→ ${prev ? prev.title : "الغلاف"}</a>
      <a class="btn primary" href="${next ? next.href : "finale.html"}">${next ? next.title : "الختام"} ←</a>
    `;
  }

  document.querySelector("[data-mute]").addEventListener("click", () => {
    LabAudio.ensure();
    LabAudio.setMuted(!LabAudio.muted);
  });
  document.querySelector("[data-chime]").addEventListener("click", () => {
    LabAudio.ensure();
    LabAudio.chime();
  });
}

function injectAtmosphere() {
  const canvas = document.createElement("canvas");
  canvas.id = "lab-canvas";
  const hex = document.createElement("div");
  hex.className = "hex-grid";
  const rain = document.createElement("div");
  rain.className = "formula-rain";
  FORMULAS.forEach((f, i) => {
    const s = document.createElement("span");
    s.textContent = f;
    s.style.right = `${(i * 7.4) % 100}%`;
    s.style.animationDelay = `${i * 1.3}s`;
    s.style.animationDuration = `${16 + (i % 6)}s`;
    rain.appendChild(s);
  });
  document.body.prepend(rain, hex, canvas);
  startParticles(canvas);
}

function startParticles(canvas) {
  const ctx = canvas.getContext("2d");
  const dots = [];
  const resize = () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  };
  resize();
  addEventListener("resize", resize);
  for (let i = 0; i < 58; i++) {
    dots.push({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      r: Math.random() * 2.2 + 0.6,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      c: ["#3cefff", "#f5c84c", "#3dffb0"][i % 3]
    });
  }
  const tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach((d, i) => {
      d.x += d.vx;
      d.y += d.vy;
      if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
      if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
      ctx.beginPath();
      ctx.fillStyle = d.c;
      ctx.globalAlpha = 0.55;
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fill();
      dots.slice(i + 1).forEach((o) => {
        const dist = Math.hypot(d.x - o.x, d.y - o.y);
        if (dist < 110) {
          ctx.globalAlpha = 0.08;
          ctx.strokeStyle = "#3cefff";
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(o.x, o.y);
          ctx.stroke();
        }
      });
    });
    requestAnimationFrame(tick);
  };
  tick();
}

function gate() {
  if (sessionStorage.getItem("bisan-lab") === "1") {
    LabAudio.ensure();
    return;
  }
  const el = document.createElement("div");
  el.className = "gate";
  el.innerHTML = `
    <div class="gate-box glass">
      <div class="kicker">مختبر الكيمياء · الصف التاسع ب</div>
      <h2>بيسان طارق</h2>
      <p class="lead">ادخلي المختبر لتبدئي رحلة اكتشاف مكونات الذرة، بصوت المختبر ورسوم النماذج الذرية.</p>
      <button class="btn primary" type="button" data-enter>ادخلي إلى المختبر</button>
    </div>
  `;
  document.body.appendChild(el);
  el.querySelector("[data-enter]").addEventListener("click", () => {
    sessionStorage.setItem("bisan-lab", "1");
    LabAudio.ensure();
    LabAudio.chime();
    el.remove();
  });
}

function bindKeys() {
  addEventListener("keydown", (e) => {
    const idx = currentIndex();
    if (e.key === "ArrowLeft" && PAGES[idx + 1]) location.href = PAGES[idx + 1].href;
    if (e.key === "ArrowRight" && PAGES[idx - 1]) location.href = PAGES[idx - 1].href;
  });
  document.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => LabAudio.beep(640, 0.08, "triangle"));
  });
}

function pageDemos() {
  const page = document.body.dataset.page;
  if (page === "electrolysis") demoElectrolysis();
  if (page === "discharge") demoDischarge();
  if (page === "rutherford") demoRutherford();
  if (page === "isotopes") demoIsotopes();
  if (page === "particles") demoAtom();
}

function demoElectrolysis() {
  const canvas = document.querySelector("#demo-el");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const fit = () => {
    canvas.width = Math.max(canvas.clientWidth * 2, 1100);
    canvas.height = 640;
  };
  fit();
  let mode = "nacl";
  const ions = [];
  const bubbles = [];
  const spawn = () => {
    ions.length = 0;
    for (let i = 0; i < 20; i++) {
      ions.push({
        x: 260 + Math.random() * 600,
        y: 160 + Math.random() * 320,
        kind: i % 2 === 0 ? "cat" : "an",
        v: 0.8 + Math.random() * 0.7
      });
    }
  };
  spawn();
  document.querySelectorAll("[data-el]").forEach((btn) => {
    btn.addEventListener("click", () => {
      mode = btn.dataset.el;
      spawn();
      LabAudio.beep(480, 0.1);
    });
  });
  const draw = () => {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(18, 64, 86, 0.55)";
    ctx.beginPath();
    ctx.roundRect(120, 90, w - 240, 470, 28);
    ctx.fill();
    ctx.strokeStyle = "rgba(160, 230, 255, 0.55)";
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.shadowColor = "#3cefff";
    ctx.shadowBlur = 22;
    ctx.fillStyle = "#7cf6ff";
    ctx.fillRect(180, 130, 28, 380);
    ctx.shadowColor = "#f5c84c";
    ctx.fillStyle = "#ffd36a";
    ctx.fillRect(w - 210, 130, 28, 380);
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#eaf6ff";
    ctx.font = "bold 26px Segoe UI, Tahoma";
    ctx.fillText("مهبط  -", 160, 70);
    ctx.fillText("مصعد  +", w - 280, 70);
    if (Math.random() > 0.7) {
      bubbles.push({ x: 194, y: 480, c: "#9ff7ff" });
      bubbles.push({ x: w - 196, y: 480, c: "#ffe08a" });
    }
    bubbles.forEach((b) => {
      b.y -= 2.2;
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.fillStyle = b.c;
      ctx.arc(b.x, b.y, 5, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    ions.forEach((ion) => {
      if (ion.kind === "cat") ion.x -= ion.v;
      else ion.x += ion.v;
      if (ion.x < 230) ion.x = w - 250;
      if (ion.x > w - 230) ion.x = 250;
      ctx.beginPath();
      ctx.fillStyle = ion.kind === "cat" ? "#f5c84c" : "#3cefff";
      ctx.arc(ion.x, ion.y, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#07101c";
      ctx.font = "bold 16px Segoe UI";
      const label = mode === "nacl" ? (ion.kind === "cat" ? "Na+" : "Cl-") : (ion.kind === "cat" ? "H+" : "OH-");
      ctx.fillText(label, ion.x - 14, ion.y + 5);
    });
    requestAnimationFrame(draw);
  };
  draw();
}

function demoDischarge() {
  const canvas = document.querySelector("#demo-ray");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = Math.max(canvas.clientWidth * 2, 1100);
  canvas.height = 640;
  let on = false;
  let field = false;
  document.querySelector("[data-ray-on]")?.addEventListener("click", () => {
    on = !on;
    if (on) LabAudio.spark();
  });
  document.querySelector("[data-field]")?.addEventListener("click", () => {
    field = !field;
    LabAudio.beep(700, 0.1);
  });
  let t = 0;
  const draw = () => {
    t += 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(180,220,255,0.7)";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.ellipse(600, 320, 430, 150, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "#ff8a3d";
    ctx.fillRect(180, 250, 28, 140);
    ctx.fillStyle = "#3cefff";
    ctx.fillRect(990, 250, 28, 140);
    ctx.fillStyle = "#fff";
    ctx.font = "26px Cairo";
    ctx.fillText("مهبط −", 140, 230);
    ctx.fillText("مصعد +", 960, 230);
    if (on) {
      ctx.strokeStyle = field ? "#3dffb0" : "#7cf6ff";
      ctx.shadowColor = "#3cefff";
      ctx.shadowBlur = 18;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(210, 320);
      const midY = field ? 230 + Math.sin(t / 8) * 8 : 320 + Math.sin(t / 7) * 4;
      ctx.quadraticCurveTo(600, midY, 990, field ? 250 : 320);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
    requestAnimationFrame(draw);
  };
  draw();
}

function demoRutherford() {
  const canvas = document.querySelector("#demo-gold");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = Math.max(canvas.clientWidth * 2, 1100);
  canvas.height = 640;
  const particles = [];
  const spawn = () => {
    const roll = Math.random();
    let path = "through";
    if (roll > 0.97) path = "back";
    else if (roll > 0.82) path = "deflect";
    particles.push({
      x: 140,
      y: 300 + (Math.random() - 0.5) * 160,
      path,
      age: 0,
      angle: path === "deflect" ? (Math.random() > 0.5 ? -0.7 : 0.7) : path === "back" ? Math.PI : 0
    });
  };
  setInterval(spawn, 220);
  const draw = () => {
    ctx.fillStyle = "rgba(4,7,12,0.28)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#f5c84c";
    ctx.fillRect(600, 160, 8, 320);
    ctx.beginPath();
    ctx.fillStyle = "#ffe27a";
    ctx.arc(604, 320, 10, 0, Math.PI * 2);
    ctx.fill();
    particles.forEach((p) => {
      p.age += 1;
      if (p.path === "through") p.x += 6;
      if (p.path === "deflect" && p.x < 600) p.x += 6;
      if (p.path === "deflect" && p.x >= 600) {
        p.x += Math.cos(p.angle) * 6;
        p.y += Math.sin(p.angle) * 7;
      }
      if (p.path === "back" && p.x < 590) p.x += 6;
      if (p.path === "back" && p.x >= 590) p.x -= 6;
      ctx.beginPath();
      ctx.fillStyle = p.path === "back" ? "#ff5d9a" : "#f5c84c";
      ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  };
  draw();
}

function demoIsotopes() {
  const host = document.querySelector("[data-iso]");
  if (!host) return;
  const data = {
    h1: { title: "هيدروجين-1 بروتيوم", z: 1, n: 0, a: 1, note: "أبسط ذرة في الكون: بروتون واحد ولا نيوترون." },
    h2: { title: "هيدروجين-2 ديوتيريوم", z: 1, n: 1, a: 2, note: "نفس العنصر كيميائياً، لكن نواته أثقل بضعف تقريباً." },
    h3: { title: "هيدروجين-3 تريتيوم", z: 1, n: 2, a: 3, note: "نظير مشع، يُستخدم في تتبّع التفاعلات وفي بعض التطبيقات العلمية." },
    c12: { title: "كربون-12", z: 6, n: 6, a: 12, note: "المعيار الذي تُقاس عليه الكتل الذرية النسبية." },
    c14: { title: "كربون-14", z: 6, n: 8, a: 14, note: "نظير مشع يُستخدم في تقدير أعمار الآثار العضوية." },
    cl35: { title: "كلور-35", z: 17, n: 18, a: 35, note: "النظير الأكثر وفرة في الكلور الطبيعي." },
    cl37: { title: "كلور-37", z: 17, n: 20, a: 37, note: "أقل وفرة، وبه يرتفع متوسط الكتلة الذرية للكلور إلى نحو 35.5." }
  };
  const render = (key) => {
    const d = data[key];
    host.innerHTML = `
      <h3>${d.title}</h3>
      <p class="formula">العدد الذري = ${d.z} &nbsp;&nbsp; عدد النيوترونات = ${d.n} &nbsp;&nbsp; العدد الكتلي = ${d.a}</p>
      <p>${d.note}</p>
      <p class="note">لأن العدد الذري ثابت، السلوك الكيميائي واحد. الذي تغيّر هو العدد الكتلي فقط.</p>
    `;
  };
  document.querySelectorAll("[data-iso-key]").forEach((btn) => {
    btn.addEventListener("click", () => {
      LabAudio.beep(600, 0.08);
      render(btn.dataset.isoKey);
    });
  });
  render("h1");
}

function demoAtom() {
  const canvas = document.querySelector("#demo-atom");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = Math.max(canvas.clientWidth * 2, 1100);
  canvas.height = 640;
  let ang = 0;
  const draw = () => {
    ang += 0.02;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = 320;
    ctx.beginPath();
    ctx.fillStyle = "#f5c84c";
    ctx.arc(cx, cy, 22, 0, Math.PI * 2);
    ctx.fill();
    [[70, 0.9], [120, 1.4], [170, 1.8]].forEach(([r, s], i) => {
      ctx.strokeStyle = "rgba(60,239,255,0.35)";
      ctx.beginPath();
      ctx.ellipse(cx, cy, r * 2.1, r, 0.4 * i, 0, Math.PI * 2);
      ctx.stroke();
      const x = cx + Math.cos(ang * s + i) * r * 2.1;
      const y = cy + Math.sin(ang * s + i) * r;
      ctx.beginPath();
      ctx.fillStyle = "#3cefff";
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  };
  draw();
}

document.addEventListener("DOMContentLoaded", () => {
  injectAtmosphere();
  injectChrome();
  gate();
  bindKeys();
  pageDemos();
});
