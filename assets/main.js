/* ---------------- rendering (no need to edit below) ---------------- */
const C = CONFIG;
/* A section file that is missing or has a typo leaves its list empty instead of breaking the page. */
["education","experience","partTime","skills","certs","development","design","recommendations"].forEach(k => { if (!Array.isArray(C[k])) C[k] = []; });
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const chips = a => `<ul class="chips">${a.map(t => `<li>${esc(t)}</li>`).join("")}</ul>`;
const ICON = {
  in:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3zM9.5 9.75h3.8v1.6h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.6 4.78 6V21h-4v-5.1c0-1.22-.02-2.8-1.7-2.8-1.72 0-1.98 1.33-1.98 2.7V21h-4z"/></svg>',
  gh:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/></svg>',
  mail:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 5h18a1 1 0 0 1 1 1v.4l-10 6.2L2 6.4V6a1 1 0 0 1 1-1zm-1 3.7 10 6.2 10-6.2V18a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/></svg>',
  doc:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm0 1.5L18.5 8H14zM8 13h8v1.5H8zm0 3.5h5V18H8z"/></svg>',
  trail:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 3 7v6c0 5 3.8 8.6 9 9 5.2-.4 9-4 9-9V7zm-1.2 13.6L7 11.8l1.4-1.4 2.4 2.4 4.8-4.8L17 9.4z"/></svg>',
  code:'<svg viewBox="0 0 64 64" fill="currentColor"><path d="M22 16 6 32l16 16 4.5-4.5L15 32l11.5-11.5zm20 0-4.5 4.5L49 32 37.5 43.5 42 48l16-16zM36.5 10l-15 44h6l15-44z"/></svg>',
  cloud:'<svg viewBox="0 0 64 64" fill="currentColor"><path d="M47 26.5A15 15 0 0 0 18.4 22 12 12 0 0 0 19 46h28a10 10 0 0 0 0-19.5z"/></svg>',
  bolt:'<svg viewBox="0 0 64 64" fill="currentColor"><path d="M8 12h48v34H38l4 6h-20l4-6H8zm6 6v22h36V18zm18 2-8 11h6l-3 8 9-11h-6z"/></svg>',
  link:'<svg viewBox="0 0 64 64" fill="currentColor"><path d="M26 22a10 10 0 0 0-14 0l-5 5a10 10 0 0 0 14 14l3-3-4-4-3 3a4.4 4.4 0 0 1-6-6l5-5a4.4 4.4 0 0 1 6 0l2 2 4-4zm12 20a10 10 0 0 0 14 0l5-5a10 10 0 0 0-14-14l-3 3 4 4 3-3a4.4 4.4 0 0 1 6 6l-5 5a4.4 4.4 0 0 1-6 0l-2-2-4 4zm-16-6 20-8 2 4-20 8z"/></svg>',
  db:'<svg viewBox="0 0 64 64" fill="currentColor"><ellipse cx="32" cy="14" rx="22" ry="8"/><path d="M10 20c0 4.4 9.8 8 22 8s22-3.6 22-8v10c0 4.4-9.8 8-22 8s-22-3.6-22-8zm0 16c0 4.4 9.8 8 22 8s22-3.6 22-8v12c0 4.4-9.8 8-22 8s-22-3.6-22-8z"/></svg>',
  tools:'<svg viewBox="0 0 64 64" fill="currentColor"><path d="M46 6a12 12 0 0 0-11.5 15.5L8 48a5 5 0 0 0 8 8l26.5-26.5A12 12 0 0 0 57.4 18l-7.2 7.2-7-2-2-7L48.4 7A12 12 0 0 0 46 6zM12 40l6-6 12 12-6 6zm28 4 6-6 12 12a4.2 4.2 0 0 1-6 6z"/></svg>'
};
function socials(){
  const s = [`<a class="soc" data-tip="LinkedIn" href="${esc(C.linkedin)}" target="_blank" rel="noopener" aria-label="LinkedIn">${ICON.in}</a>`];
  if (C.github) s.push(`<a class="soc" data-tip="GitHub" href="${esc(C.github)}" target="_blank" rel="noopener" aria-label="GitHub">${ICON.gh}</a>`);
  s.push(`<a class="soc" data-tip="Contact" href="#contact" aria-label="Contact">${ICON.mail}</a>`);
  s.push(`<a class="soc" data-tip="Résumé" href="${esc(C.resume)}" target="_blank" rel="noopener" aria-label="Résumé">${ICON.doc}</a>`);
  if (C.trailhead) s.push(`<a class="soc" data-tip="Trailhead" href="${esc(C.trailhead)}" target="_blank" rel="noopener" aria-label="Trailhead">${ICON.trail}</a>`);
  return s.join("");
}
function initials(){ return C.name.split(/\s+/).filter(w => /^[A-Za-z]/.test(w)).map(w => w[0]).join("").slice(0,2).toUpperCase(); }
function mock(label){ return `<div class="mock" aria-hidden="true"><div class="mb"><i></i><i></i><i></i></div><div class="mg"><div>${esc(label)}</div><div></div><div></div></div></div>`; }
function timeline(el, items, key){
  el.insertAdjacentHTML("beforeend", items.map(x => `
    <div class="item"><h4>${esc(x[key])}</h4><div class="sub">${esc(x.degree || x.role)}</div>
    <div class="when">${esc(x.when)}</div><p>${esc(x.text)}</p>${chips(x.tags)}</div>`).join(""));
}
/* ---------------- portfolio: cards, show more, carousels, pop-up ---------------- */
const PAGE = { development: 3, design: 4 };            // cards shown at first, and added per "show more"
const shown = { development: PAGE.development, design: PAGE.design };
const projImg = (p, src) => !src ? "" : /[\/:]/.test(src) ? src : `assets/img/projects/${p.id}/${src}`;
const gallery = p => (p.images || []).map(x => typeof x === "string" ? { src: x, caption: "" } : x).filter(x => x && x.src);
const coverOf = p => p.cover || (gallery(p)[0] || {}).src || "";
const img = (src, alt, fb) => `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" data-fb="${esc(fb)}">`;
const metaLine = p => [p.when, p.role].filter(Boolean).map(esc).join(" &bull; ");
const linkBtns = p => {
  const l = p.links || {}, out = [];
  if (l.github)  out.push(`<a class="obtn" href="${esc(l.github)}" target="_blank" rel="noopener">github</a>`);
  if (l.website) out.push(`<a class="obtn live" href="${esc(l.website)}" target="_blank" rel="noopener">visit website ↗</a>`);
  if (l.demo)    out.push(`<a class="obtn" href="${esc(l.demo)}" target="_blank" rel="noopener">watch demo</a>`);
  return out.join("");
};
/* Images that fail to load: cards and carousels fall back to a mock screen, gallery figures are hidden. */
document.addEventListener("error", e => {
  const t = e.target;
  if (t.tagName !== "IMG" || t.dataset.fb === undefined) return;
  if (t.dataset.fb === "hide") t.closest("figure")?.remove();
  else t.outerHTML = mock(t.dataset.fb);
}, true);

function devCard(p, i){
  const tags = p.tags || [], extra = tags.length - 5;
  return `<article class="card" data-kind="development" data-i="${i}"${i >= shown.development ? " hidden" : ""}>
    <button class="shot" type="button" data-open="development:${i}" aria-label="Open ${esc(p.title)}">${coverOf(p) ? img(projImg(p, coverOf(p)), "Screenshot of " + p.title, p.title) : mock(p.title)}</button>
    <div class="body"><h4>${esc(p.title)}</h4>${metaLine(p) ? `<div class="pmeta">${metaLine(p)}</div>` : ""}
      ${chips(tags.slice(0, 5).concat(extra > 0 ? [`+${extra} more`] : []))}
      <div class="ov">Overview</div><p>${p.overview || ""}</p>
      <div class="acts"><button class="obtn" type="button" data-open="development:${i}">read more</button>${linkBtns(p)}</div></div>
  </article>`;
}
function designCard(p, i){
  const g = gallery(p), slides = g.length ? g : [{ src: "", caption: "" }];
  return `<article data-kind="design" data-i="${i}"${i >= shown.design ? " hidden" : ""}>
    <div class="car">
      <div class="slides">${slides.map((x, j) => `<div class="slide">${x.src ? img(projImg(p, x.src), `${p.title}, image ${j + 1}`, `${p.title} · ${j + 1}/${slides.length}`) : mock(p.title)}</div>`).join("")}</div>
      ${slides.length > 1 ? `<button class="arrow prev" type="button" aria-label="Previous image">‹</button><button class="arrow next" type="button" aria-label="Next image">›</button>
      <div class="dots">${slides.map((_, j) => `<button type="button" aria-label="Image ${j + 1}" class="${j ? "" : "on"}"></button>`).join("")}</div>` : ""}
    </div>
    <div class="dhead"><h4>${esc(p.title)}</h4></div>
    ${chips(p.tags || [])}<div class="dmeta">${metaLine(p)}</div>
    <div class="acts"><button class="obtn" type="button" data-open="design:${i}">read more</button>${linkBtns(p)}</div>
  </article>`;
}
function renderProjects(kind){
  const list = C[kind], grid = $(kind === "development" ? "cards" : "designs"), more = $(kind === "development" ? "more-dev" : "more-des");
  grid.innerHTML = list.map(kind === "development" ? devCard : designCard).join("");
  paintMore(kind);
  more.onclick = () => {
    const all = shown[kind] >= list.length;
    shown[kind] = all ? PAGE[kind] : shown[kind] + PAGE[kind];
    grid.querySelectorAll("[data-i]").forEach(el => {
      const was = el.hidden; el.hidden = +el.dataset.i >= shown[kind];
      if (was && !el.hidden){ el.classList.remove("rv"); el.classList.add("pop"); }
    });
    paintMore(kind);
    if (all) $("portfolio").scrollIntoView({ behavior: "smooth" });
  };
}
function paintMore(kind){
  const n = C[kind].length, b = $(kind === "development" ? "more-dev" : "more-des");
  b.hidden = n <= PAGE[kind];
  b.textContent = shown[kind] >= n ? "show less" : `show more (${n - shown[kind]} left)`;
}

function render(){
  $("logo").innerHTML = `${esc(C.brand)}<b>.</b>`;
  $("hname").textContent = C.name.split(" ")[0];
  const ph = `<div class="ph"><span>${initials()}</span>add your photo at<br>assets/img/profile.jpg</div>`;
  $("photo").innerHTML = ph;
  if (C.photo){ const img = new Image(); img.alt = `Portrait of ${C.name}`; img.onload = () => { $("photo").replaceChildren(img); }; img.src = C.photo; }
  $("intro").innerHTML = C.intro;
  $("socials").innerHTML = socials();
  $("fsocials").innerHTML = socials();
  timeline($("edu"), C.education, "school");
  timeline($("exp"), C.experience, "org");
  timeline($("pt"), C.partTime, "org");
  $("skillgrid").innerHTML = C.skills.map(s => `<div class="skill">${ICON[s.icon] || ICON.code}<h4>${esc(s.title)}</h4><hr><p>${esc(s.text)}</p></div>`).join("");
  $("certs").innerHTML = C.certs.map(c => `<div class="cert${c.arch ? " arch" : ""}"><i>${esc(c.code)}</i><div><b>${esc(c.name)}</b><span>${c.arch ? "Architect credential · " : ""}${esc(c.year)}</span></div></div>`).join("");
  $("certnote").innerHTML = C.trailhead ? `<a class="obtn" href="${esc(C.trailhead)}" target="_blank" rel="noopener">verify all on Trailhead</a>` : "";
  renderProjects("development");
  renderProjects("design");
  $("recs").innerHTML = C.recommendations.map(r => `
    <figure class="rec" style="margin:0"><blockquote>${esc(r.quote)}</blockquote>
    <cite>– <b>${esc(r.name)}</b>, ${esc(r.title)}, ${esc(r.org)}</cite></figure>`).join("");
  $("emailtxt").textContent = C.email;
  $("copyright").textContent = `© ${new Date().getFullYear()} ${C.name}`;
}
render();

/* ---------- mobile menu ---------- */
$("menu").addEventListener("click", () => { const o = $("nav").classList.toggle("open"); $("menu").setAttribute("aria-expanded", o); });
$("nav").addEventListener("click", e => { if (e.target.closest("a")) { $("nav").classList.remove("open"); $("menu").setAttribute("aria-expanded", false); } });

/* ---------- typing rotator ---------- */
(function(){
  const el = $("rot"); const words = C.rotating;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches){ el.textContent = words[0]; return; }
  let w = 0, i = 0, del = false;
  el.textContent = words[0]; i = words[0].length; del = true;
  function step(){
    const word = words[w];
    if (!del){ i++; el.textContent = word.slice(0,i); if (i === word.length){ del = true; return setTimeout(step, 2200); } }
    else { i--; el.textContent = word.slice(0,i); if (i === 0){ del = false; w = (w+1) % words.length; } }
    setTimeout(step, del ? 28 : 55);
  }
  setTimeout(step, 2600);
})();

/* ---------- scroll progress, active nav, timeline fill ---------- */
const navLinks = [...document.querySelectorAll(".nav a")];
const sections = ["about","skills","portfolio","contact"].map(id => $(id));
const lines = [...document.querySelectorAll(".tl")];
function onScroll(){
  const h = document.documentElement;
  const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
  $("progress").style.transform = `scaleX(${p})`;
  let cur = null;
  sections.forEach(s => { if (s.getBoundingClientRect().top < innerHeight * 0.4) cur = s.id; });
  navLinks.forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + cur));
  lines.forEach(tl => {
    const r = tl.getBoundingClientRect();
    const f = Math.min(1, Math.max(0, (innerHeight * 0.7 - r.top) / r.height));
    tl.querySelector(".fill").style.height = (f * (r.height - 14)) + "px";
  });
}
addEventListener("scroll", onScroll, { passive: true }); addEventListener("resize", onScroll); onScroll();

/* ---------- reveal on scroll (only what starts below the fold) ----------
   Whatever is already on screen at load stays put. Everything further down slides up as it scrolls
   into view, one after another: each group that enters together is staggered top-to-bottom, left-to-right. */
if (!matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window){
  const targets = document.querySelectorAll(".col,.item,.skill,.cert,.cert-note,.tabs,.card,.designs article,.rec,.kinds,.cform>input,.cform>textarea,.send,.alt,.sh");
  const io = new IntersectionObserver(es => {
    es.filter(e => e.isIntersecting)
      .sort((a,b) => (a.boundingClientRect.top - b.boundingClientRect.top) || (a.boundingClientRect.left - b.boundingClientRect.left))
      .forEach((e,n) => {
        const t = e.target;
        t.style.transitionDelay = Math.min(n, 6) * 110 + "ms";
        t.classList.add("in"); io.unobserve(t);
        t.addEventListener("transitionend", () => { t.style.transitionDelay = ""; t.classList.remove("rv"); }, { once: true });
      });
  }, { rootMargin: "0px 0px -10% 0px" });
  targets.forEach(t => { if (t.getBoundingClientRect().top > innerHeight){ t.classList.add("rv"); io.observe(t); } });
}

/* ---------- portfolio tabs ---------- */
const tabs = [$("tab-dev"), $("tab-des")], panels = [$("panel-dev"), $("panel-des")];
tabs.forEach((t,i) => t.addEventListener("click", () => {
  tabs.forEach((x,j) => x.setAttribute("aria-selected", i === j));
  panels.forEach((p,j) => { p.hidden = i !== j; if (i === j){ p.style.animation = "none"; p.offsetHeight; p.style.animation = ""; p.querySelectorAll(".rv").forEach(r => r.classList.add("in")); } });
}));

/* ---------- carousels: one shared clock so every card turns at the same moment ---------- */
(function(){
  const cars = [];
  document.querySelectorAll(".car").forEach(car => {
    const slides = car.querySelector(".slides"), n = slides.children.length, dots = [...car.querySelectorAll(".dots button")];
    if (n < 2) return;
    const c = { car, n, k: 0, go(j){ this.k = (j + n) % n; slides.style.transform = `translateX(-${this.k*100}%)`; dots.forEach((d,x) => d.classList.toggle("on", x === this.k)); } };
    car.querySelector(".prev").addEventListener("click", () => { c.go(c.k-1); restart(); });
    car.querySelector(".next").addEventListener("click", () => { c.go(c.k+1); restart(); });
    dots.forEach((d,x) => d.addEventListener("click", () => { c.go(x); restart(); }));
    car.addEventListener("mouseenter", () => clearInterval(timer)); car.addEventListener("mouseleave", restart);
    cars.push(c);
  });
  let step = 0, timer;
  function restart(){
    clearInterval(timer);
    if (!cars.length || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer = setInterval(() => { step++; cars.forEach(c => c.go(step)); }, 4500);
  }
  restart();
})();

/* ---------- project pop-up ---------- */
const modal = $("modal"), box = $("modal-box"); let lastFocus = null;
const SECTIONS = [["tasks", "Tasks Performed"], ["features", "Core Features"], ["tech", "Technologies & Libraries Used"], ["results", "Results"]];
const block = (h, v) => !v || (Array.isArray(v) && !v.length) ? "" :
  `<div class="mblock"><h5>${esc(h)}</h5>${Array.isArray(v) ? `<ul>${v.map(x => `<li>${x}</li>`).join("")}</ul>` : `<p>${v}</p>`}</div>`;
function projectModal(p){
  const g = gallery(p);
  return `<header class="mhead"><h3 id="m-title">${esc(p.title)}</h3><button class="iconbtn" type="button" data-close aria-label="Close">✕</button></header>
    <div class="mscroll">
      ${metaLine(p) ? `<div class="mmeta">${metaLine(p)}</div>` : ""}
      ${chips(p.tags || [])}
      ${block("Overview", p.overview)}
      ${SECTIONS.map(([k, h]) => block(h, p[k])).join("")}
      ${(p.extra || []).map(x => block(x.heading, x.text || x.list)).join("")}
      ${g.length ? `<div class="mblock"><h5>Gallery</h5><div class="gallery">${g.map(x => `
        <figure><a href="${esc(projImg(p, x.src))}" target="_blank" rel="noopener" aria-label="Open full-size image">${img(projImg(p, x.src), x.caption || p.title, "hide")}</a>${x.caption ? `<figcaption>${esc(x.caption)}</figcaption>` : ""}</figure>`).join("")}</div></div>` : ""}
    </div>
    <footer class="mfoot">${linkBtns(p)}<button class="obtn" type="button" data-close>close</button></footer>`;
}
function openModal(html){
  lastFocus = document.activeElement;
  box.innerHTML = html; box.scrollTop = 0;
  modal.hidden = false; document.body.style.overflow = "hidden";
  box.querySelector("[data-close]").focus();
}
function closeModal(){ modal.hidden = true; document.body.style.overflow = ""; lastFocus && lastFocus.focus(); }
modal.addEventListener("click", e => { if (e.target === modal || e.target.closest("[data-close]")) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) closeModal(); });
document.addEventListener("click", e => {
  const b = e.target.closest("[data-open]"); if (!b) return;
  const [kind, i] = b.dataset.open.split(":");
  openModal(projectModal(C[kind][+i]));
});

/* ---------- contact form ---------- */
async function copy(text, btn, el){
  try { await navigator.clipboard.writeText(text); const o = btn.textContent; btn.textContent = "copied"; setTimeout(() => btn.textContent = o, 1400); }
  catch { if (el){ const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(r); } }
}
$("cpy").addEventListener("click", e => copy(C.email, e.currentTarget, $("emailtxt")));
const TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
const enc = encodeURIComponent;
const stamp = d => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const fmtWhen = d => d.toLocaleString(undefined, { weekday:"short", month:"short", day:"numeric", year:"numeric", hour:"numeric", minute:"2-digit", timeZoneName:"short" });
// Google Calendar "new event" link with `guest` pre-added; saving it sends that guest a real invite
const gcalLink = (ev, guest) => `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${enc(ev.title)}&dates=${stamp(ev.start)}/${stamp(ev.end)}&details=${enc(ev.details)}&add=${enc(guest)}`;
function icsFile(ev, organizer, attendee){
  const esc = t => t.replace(/[\;,]/g, m => "\\" + m).replace(/\n/g, "\\n");
  return ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//portfolio//invite//EN","METHOD:REQUEST","BEGIN:VEVENT",
    `UID:${Date.now()}-${Math.random().toString(36).slice(2)}@portfolio`, `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(ev.start)}`, `DTEND:${stamp(ev.end)}`, `SUMMARY:${esc(ev.title)}`, `DESCRIPTION:${esc(ev.details)}`,
    `ORGANIZER;CN=${esc(organizer.name)}:mailto:${organizer.email}`,
    `ATTENDEE;CN=${esc(C.name)};RSVP=TRUE:mailto:${attendee}`, "END:VEVENT","END:VCALENDAR"].join("\r\n");
}
function calButtons(ev, d){
  const ics = URL.createObjectURL(new Blob([icsFile(ev, d, C.email)], { type:"text/calendar" }));
  return `<p style="margin:12px 0 8px">Add it to your calendar so I get a calendar invite too:</p>
    <div style="display:flex;gap:10px;flex-wrap:wrap"><a class="obtn" href="${gcalLink(ev, C.email)}" target="_blank" rel="noopener">Google Calendar</a><a class="obtn" href="${ics}" download="interview-invite.ics">Outlook / Apple (.ics)</a></div>`;
}
$("tz").textContent = `Times are in your timezone (${TZ}).`;
document.querySelectorAll('input[name="kind"]').forEach(r => r.addEventListener("change", () => {
  const invite = $("k2").checked;
  $("when-row").classList.toggle("show", invite);
  $("f-msg").placeholder = invite ? "what's the role, and who will I be meeting?" : "message";
  $("send").textContent = invite ? "Send invite" : "Send";
}));
$("cform").addEventListener("submit", async e => {
  e.preventDefault();
  if ($("f-trap").value) return;
  const form = e.currentTarget, invite = $("k2").checked, hint = $("hint");
  const start = invite && $("f-when").value ? new Date($("f-when").value) : null;
  const bad = [];
  if (!$("f-name").value.trim()) bad.push("f-name");
  if (!/^\S+@\S+\.\S+$/.test($("f-email").value.trim())) bad.push("f-email");
  if (invite && !(start > new Date())) bad.push("f-when");
  if (!$("f-msg").value.trim()) bad.push("f-msg");
  if (bad.length){ hint.textContent = invite ? "Add your name, a valid email, a future date and time, and a message." : "Add your name, a valid email, and a message."; hint.classList.add("err"); $(bad[0]).focus(); return; }
  hint.textContent = "I reply within two business days."; hint.classList.remove("err");
  const d = { kind: form.kind.value, name: $("f-name").value.trim(), email: $("f-email").value.trim(), company: $("f-co").value.trim(), message: $("f-msg").value.trim() };
  let ev = null;
  if (invite){
    const mins = +$("f-dur").value;
    ev = { start, end: new Date(start.getTime() + mins * 60000), mins,
      title: `Interview: ${C.name} / ${d.name}${d.company ? " (" + d.company + ")" : ""}`,
      details: `${d.message}\n\nScheduled via ${location.href.split("#")[0]}` };
  }
  const when = ev ? `${fmtWhen(ev.start)} (${ev.mins} min)` : "";
  const text = `${d.kind} from ${d.name}${d.company ? " (" + d.company + ")" : ""}\nReply to: ${d.email}${when ? "\nProposed time: " + when : ""}\n\n${d.message}`;
  const label = $("send").textContent; $("send").disabled = true; $("send").textContent = "Sending…";
  const payload = { _subject: `${d.kind}: ${d.name}${d.company ? " (" + d.company + ")" : ""}`, _replyto: d.email, _template: "table",
    type: d.kind, name: d.name, email: d.email, company: d.company || "-", message: d.message };
  if (ev){ payload.proposed_time = when; payload.add_to_my_calendar = gcalLink(ev, d.email); }
  let ok = false;
  try {
    const r = await fetch(C.formEndpoint || `https://formsubmit.co/ajax/${C.email}`, { method:"POST", headers:{ "Content-Type":"application/json", Accept:"application/json" }, body: JSON.stringify(payload) });
    const j = await r.json().catch(() => ({}));
    ok = r.ok && String(j.success) !== "false";
  } catch { ok = false; }
  $("send").disabled = false; $("send").textContent = label;
  const t = $("toast"); t.hidden = false;
  if (ok){
    t.innerHTML = `<b>${invite ? "Invite sent." : "Message sent."}</b> Thanks, ${esc(d.name)}. I'll reply to ${esc(d.email)} within two business days.` + (ev ? calButtons(ev, d) : "");
    form.reset(); $("when-row").classList.remove("show"); $("send").textContent = "Send"; $("f-msg").placeholder = "message";
  } else {
    const mailto = `mailto:${enc(C.email)}?subject=${enc(payload._subject)}&body=${enc(text)}`;
    t.innerHTML = `<b>Your ${invite ? "invite" : "message"} is ready.</b> It couldn't be sent from the site just now, so send it by email to <code>${esc(C.email)}</code>.<pre id="draft">${esc(text)}</pre>
      <div style="display:flex;gap:10px;flex-wrap:wrap"><a class="obtn" href="${mailto}">open in email app</a><button class="obtn" type="button" id="cpd">copy message</button></div>` + (ev ? calButtons(ev, d) : "");
    $("cpd").addEventListener("click", ev2 => copy(text, ev2.currentTarget, $("draft")));
  }
  t.scrollIntoView({ behavior:"smooth", block:"nearest" });
});
