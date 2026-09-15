const QUIZ = [
  {
    type: "mcq",
    tag: "اختيار من متعدد",
    q: "حسب دالتون، ذرات العنصر الواحد تتشابه في:",
    choices: [
      "الشكل والحجم والكتلة",
      "عدد النيوترونات فقط",
      "الشحنة الكهربائية فقط",
      "عدد الإلكترونات فقط"
    ],
    answer: 0,
    explain: "من فروض دالتون: ذرات العنصر الواحد تتشابه في الشكل والحجم والكتلة."
  },
  {
    type: "tf",
    tag: "صح أو خطأ",
    q: "نموذج دالتون للذرة هو كرة صلبة فارغة بلا أجزاء داخلية ظاهرة.",
    answer: true,
    explain: "صحيح. دالتون صوّر الذرة ككرة صلبة فارغة متجانسة."
  },
  {
    type: "mcq",
    tag: "اختيار من متعدد",
    q: "ماذا يدل عليه تفكك المركبات الأيونية بالتيار في التحليل الكهربائي؟",
    choices: [
      "أن الذرة ليس لها شحنات",
      "أن الذرة لها طبيعة كهربائية وتمتلك جسيمات مشحونة",
      "أن الذرة لا تتجزأ أبداً",
      "أن المركبات لا تتفكك"
    ],
    answer: 1,
    explain: "التحليل الكهربائي يدل على الطبيعة الكهربائية للذرة ووجود جسيمات مشحونة."
  },
  {
    type: "fill",
    tag: "أكمل الفراغ",
    q: "القطب السالب في خلية التحليل الكهربائي يُسمى ……",
    answer: "المهبط",
    accept: ["المهبط", "مهبط", "المهبط السالب"],
    explain: "المهبط هو القطب السالب، والمصعد هو القطب الموجب."
  },
  {
    type: "mcq",
    tag: "اختيار من متعدد",
    q: "الأشعة المهبطية:",
    choices: [
      "تنطلق من المصعد الموجب",
      "لا تنحرف في المجال الكهربائي",
      "لا تتغير خصائصها بتغيير مادة المهبط أو نوع الغاز داخل الأنبوب",
      "أثقل من ذرة الهيدروجين دائماً"
    ],
    answer: 2,
    explain: "من خصائص الأشعة المهبطية: ثبات خصائصها مهما تغيّر معدن المهبط أو الغاز."
  },
  {
    type: "tf",
    tag: "صح أو خطأ",
    q: "لأن الذرة متعادلة كهربائياً، فلا بد من وجود شحنات موجبة تعادل الشحنات السالبة.",
    answer: true,
    explain: "صحيح. وهذا ما دفع تومسون لرسم كرة موجبة فيها إلكترونات سالبة."
  },
  {
    type: "mcq",
    tag: "اختيار من متعدد",
    q: "نموذج تومسون يصف الذرة بأنها:",
    choices: [
      "نواة موجبة صغيرة جداً وإلكترونات حولها",
      "كرة موجبة تنتشر فيها إلكترونات سالبة",
      "كرة بلا أي شحنات",
      "بروتونات فقط دون إلكترونات"
    ],
    answer: 1,
    explain: "نموذج الحلوى الموجبة: كرة موجبة تنتشر فيها إلكترونات سالبة."
  },
  {
    type: "order",
    tag: "رتّبي النتائج",
    q: "رتّبي نتائج تجربة رقاقة الذهب من الأكثر حدوثاً إلى الأقل:",
    items: ["معظم جسيمات ألفا تعبر", "قليل ينحرف", "نادر جداً يرتد"],
    answer: [0, 1, 2],
    explain: "معظمها يعبر (فراغ)، قليل ينحرف، والنادر يرتد عن النواة الكثيفة."
  },
  {
    type: "mcq",
    tag: "اختيار من متعدد",
    q: "استنتج رذرفورد من ارتداد بعض جسيمات ألفا أن:",
    choices: [
      "الذرة كلها موجبة منتشرة",
      "معظم كتلة الذرة وشحنتها الموجبة مركّزة في نواة صغيرة",
      "لا توجد شحنات في الذرة",
      "الإلكترون أثقل من البروتون"
    ],
    answer: 1,
    explain: "الارتداد النادر أثبت وجود نواة موجبة صغيرة وكثيفة الكتلة."
  },
  {
    type: "fill",
    tag: "أكمل الفراغ",
    q: "كتلة الإلكترون تقريباً 1/…… من كتلة البروتون.",
    answer: "1840",
    accept: ["1840", "١٨٤٠"],
    explain: "كتلة الإلكترون ≈ 1/1840 من كتلة البروتون."
  },
  {
    type: "mcq",
    tag: "اختيار من متعدد",
    q: "في الذرة المتعادلة فقط:",
    choices: [
      "العدد الذري = عدد الإلكترونات = عدد البروتونات",
      "عدد النيوترونات = عدد البروتونات دائماً",
      "عدد الإلكترونات أكبر دائماً من البروتونات",
      "لا توجد نيوترونات"
    ],
    answer: 0,
    explain: "التعادل يعني تساوي عدد الإلكترونات مع عدد البروتونات (= العدد الذري)."
  },
  {
    type: "tf",
    tag: "صح أو خطأ",
    q: "النظائر ذرات من نفس العنصر تتشابه في العدد الذري وتختلف في العدد الكتلي بسبب اختلاف النيوترونات.",
    answer: true,
    explain: "صحيح. هذا تعريف النظائر كما في درس مكونات الذرة."
  }
];

const QuizApp = {
  i: 0,
  score: 0,
  answered: {},
  init() {
    this.root = document.querySelector("[data-quiz-root]");
    if (!this.root) return;
    this.els = {
      progress: document.querySelector("[data-q-progress]"),
      meter: document.querySelector("[data-q-meter]"),
      score: document.querySelector("[data-q-score]"),
      total: document.querySelector("[data-q-total]"),
      prev: document.querySelector("[data-q-prev]"),
      next: document.querySelector("[data-q-next]"),
      restart: document.querySelector("[data-q-restart]")
    };
    this.els.total.textContent = String(QUIZ.length);
    this.els.prev.addEventListener("click", () => this.go(-1));
    this.els.next.addEventListener("click", () => this.go(1));
    this.els.restart.addEventListener("click", () => this.reset());
    this.render();
  },
  reset() {
    this.i = 0;
    this.score = 0;
    this.answered = {};
    this.els.restart.hidden = true;
    this.els.next.hidden = false;
    this.render();
  },
  go(dir) {
    const next = this.i + dir;
    if (next < 0) return;
    if (next >= QUIZ.length) {
      this.showResult();
      return;
    }
    this.i = next;
    this.render();
  },
  mark(ok) {
    if (this.answered[this.i] != null) return;
    this.answered[this.i] = ok;
    if (ok) {
      this.score += 1;
      if (window.LabAudio) LabAudio.chime();
    } else if (window.LabAudio) LabAudio.beep(220, 0.15, "sawtooth");
    this.els.score.textContent = String(this.score);
  },
  render() {
    const item = QUIZ[this.i];
    const done = this.answered[this.i];
    this.els.progress.textContent = `السؤال ${this.i + 1} من ${QUIZ.length}`;
    this.els.meter.style.width = `${((this.i + 1) / QUIZ.length) * 100}%`;
    this.els.score.textContent = String(this.score);
    this.els.prev.disabled = this.i === 0;
    this.els.next.textContent = this.i === QUIZ.length - 1 ? "النتيجة النهائية ←" : "التالي ←";
    this.els.next.hidden = false;
    this.els.restart.hidden = true;

    let body = "";
    if (item.type === "mcq") body = this.mcq(item, done);
    if (item.type === "tf") body = this.tf(item, done);
    if (item.type === "fill") body = this.fill(item, done);
    if (item.type === "order") body = this.order(item, done);

    this.root.innerHTML = `
      <div class="quiz-tag">${item.tag}</div>
      <h2 class="quiz-q">${item.q}</h2>
      ${body}
      <div class="quiz-feedback ${done == null ? "hidden" : done ? "ok" : "bad"}" data-feedback>
        ${done == null ? "" : (done ? "✔ إجابة صحيحة" : "✖ إجابة خاطئة") + " — " + item.explain}
      </div>
    `;
    this.bind(item, done);
  },
  mcq(item, done) {
    return `<div class="quiz-choices">${item.choices.map((c, idx) => {
      let cls = "quiz-choice";
      if (done != null) {
        if (idx === item.answer) cls += " is-correct";
        if (done === false && this.answered["_pick" + this.i] === idx) cls += " is-wrong";
      }
      return `<button type="button" class="${cls}" data-choice="${idx}" ${done != null ? "disabled" : ""}>${c}</button>`;
    }).join("")}</div>`;
  },
  tf(item, done) {
    const mk = (val, label) => {
      let cls = "quiz-choice";
      if (done != null) {
        if (val === item.answer) cls += " is-correct";
        if (done === false && this.answered["_pick" + this.i] === val) cls += " is-wrong";
      }
      return `<button type="button" class="${cls}" data-tf="${val}" ${done != null ? "disabled" : ""}>${label}</button>`;
    };
    return `<div class="quiz-choices quiz-tf">${mk(true, "صح ✓")} ${mk(false, "خطأ ✗")}</div>`;
  },
  fill(item, done) {
    const locked = done != null;
    return `
      <div class="quiz-fill">
        <input type="text" data-fill placeholder="اكتبي الإجابة هنا" ${locked ? "disabled" : ""} value="${locked ? (this.answered["_text" + this.i] || "") : ""}" />
        <button class="btn primary" type="button" data-fill-check ${locked ? "disabled" : ""}>تحققي</button>
      </div>
    `;
  },
  order(item, done) {
    const state = this.answered["_order" + this.i] || item.items.map((_, i) => i);
    return `
      <div class="quiz-order" data-order>
        ${state.map((idx) => `<button type="button" class="quiz-choice order-item" data-ord="${idx}" ${done != null ? "disabled" : ""}>${item.items[idx]}</button>`).join("")}
      </div>
      <p class="caption">اضغطي عنصرين بالتتابع لتبادلي ترتيبهما، ثم اضغطي تحققي.</p>
      <button class="btn primary" type="button" data-order-check ${done != null ? "disabled" : ""}>تحققي من الترتيب</button>
    `;
  },
  bind(item, done) {
    if (done != null) return;
    if (item.type === "mcq") {
      this.root.querySelectorAll("[data-choice]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = Number(btn.dataset.choice);
          const ok = idx === item.answer;
          this.answered["_pick" + this.i] = idx;
          this.mark(ok);
          this.render();
        });
      });
    }
    if (item.type === "tf") {
      this.root.querySelectorAll("[data-tf]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const val = btn.dataset.tf === "true";
          const ok = val === item.answer;
          this.answered["_pick" + this.i] = val;
          this.mark(ok);
          this.render();
        });
      });
    }
    if (item.type === "fill") {
      const input = this.root.querySelector("[data-fill]");
      const check = this.root.querySelector("[data-fill-check]");
      const submit = () => {
        const raw = (input.value || "").trim();
        this.answered["_text" + this.i] = raw;
        const norm = (s) => s.replace(/\s+/g, "").toLowerCase();
        const ok = item.accept.some((a) => norm(a) === norm(raw));
        this.mark(ok);
        this.render();
      };
      check.addEventListener("click", submit);
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") submit();
      });
    }
    if (item.type === "order") {
      let first = null;
      const key = "_order" + this.i;
      if (!this.answered[key]) this.answered[key] = item.items.map((_, i) => i);
      this.root.querySelectorAll("[data-ord]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = Number(btn.dataset.ord);
          if (first == null) {
            first = idx;
            btn.classList.add("is-selected");
            return;
          }
          const arr = this.answered[key];
          const a = arr.indexOf(first);
          const b = arr.indexOf(idx);
          [arr[a], arr[b]] = [arr[b], arr[a]];
          first = null;
          this.render();
        });
      });
      this.root.querySelector("[data-order-check]").addEventListener("click", () => {
        const arr = this.answered[key];
        const ok = arr.every((v, i) => v === item.answer[i]);
        this.mark(ok);
        this.render();
      });
    }
  },
  showResult() {
    const pct = Math.round((this.score / QUIZ.length) * 100);
    let msg = "ممتاز! إتقان قوي لمكونات الذرة.";
    if (pct < 50) msg = "تحتاجين مراجعة سريعة للصفحات، ثم أعيدي المحاولة.";
    else if (pct < 80) msg = "مستوى جيد. راجعي النقاط التي أخطأتِ فيها.";
    this.root.innerHTML = `
      <div class="quiz-tag">النتيجة النهائية</div>
      <h2 class="quiz-q">${this.score} من ${QUIZ.length} · ${pct}%</h2>
      <p class="lead">${msg}</p>
      <div class="byline">
        <span class="chip gold">بيسان طارق</span>
        <span class="chip cyan">الصف التاسع ب</span>
        <span class="chip green">بإشراف المعلمة ربى</span>
      </div>
    `;
    this.els.progress.textContent = "انتهى الاختبار";
    this.els.meter.style.width = "100%";
    this.els.next.hidden = true;
    this.els.restart.hidden = false;
    this.els.prev.disabled = true;
    if (window.LabAudio && pct >= 70) LabAudio.chime();
  }
};

document.addEventListener("DOMContentLoaded", () => QuizApp.init());
