import { useState, useEffect } from "react";

// ── Tokens ─────────────────────────────────────────────────────
const C = {
  bg:      "#020210",
  surf:    "rgba(6, 6, 28, 0.78)",
  cyan:    "#00e0ff",
  purple:  "#9b59ff",
  green:   "#00ff88",
  orange:  "#ff9f43",
  pink:    "#f472b6",
  text:    "#ddeaff",
  muted:   "rgba(140, 160, 210, 0.7)",
  dim:     "rgba(100, 120, 170, 0.4)",
  border:  "rgba(0, 224, 255, 0.13)",
};

const card = (hov = false, accent = C.cyan) => ({
  background: C.surf,
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: `1px solid ${hov ? accent + "55" : C.border}`,
  borderRadius: 18,
  boxShadow: hov ? `0 12px 48px ${accent}18` : "none",
  transition: "all 0.32s ease",
});

// ── Data ───────────────────────────────────────────────────────
const ROLES = ["Senior React Developer","Full-Stack MERN Engineer","Frontend Architect","API Performance Specialist"];

const SKILLS = {
  Frontend: { color: C.cyan,   items: ["React.js","Redux Toolkit","TypeScript","JavaScript","Tailwind CSS","HTML5","CSS3","Gatsby.js","Material UI","Bootstrap","React-Bootstrap"] },
  Backend:  { color: C.purple, items: ["Node.js","Express.js","NestJS","Prisma","RESTful APIs","JWT","OAuth","Axios"] },
  Database: { color: C.green,  items: ["MongoDB","Mongoose","PostgreSQL"] },
  Tooling:  { color: C.orange, items: ["Git","GitHub","GitLab","Bitbucket","JIRA","CI/CD","Postman","VS Code"] },
  Testing:  { color: C.pink,   items: ["Jest","React Testing Library","Cypress"] },
};

const PROJECTS = [
  { name: "Giant EIP", role: "Full-Stack Dev", period: "Jul 2025 – Present", accent: C.cyan,
    desc: "Enterprise integration platform with WCAG-compliant lazy-loaded UI and a NestJS/Prisma backend securing 100% of routes via JWT & OAuth.",
    tags: ["React.js","NestJS","Prisma","Tailwind CSS","JWT","OAuth","Redux Toolkit","Axios"],
    stats: [["50%","render time ↓"],["45%","query efficiency ↑"],["100%","routes secured"]] },
  { name: "Namo Bharat", role: "Frontend Dev", period: "Apr 2023 – Sep 2023", accent: C.purple,
    desc: "High-performance React application with advanced Redux Toolkit state management, serving a fully responsive cross-device experience.",
    tags: ["React.js","Redux Toolkit","Context API","RESTful APIs"],
    stats: [["25%","feature dev time ↓"],["3","device breakpoints"]] },
  { name: "Star Health", role: "Full-Stack Dev", period: "Jul 2022 – Mar 2023", accent: C.green,
    desc: "Real-time data-sync backend with Node.js & MongoDB, third-party API integrations, and a 75%+ test-covered Jest/RTL suite.",
    tags: ["Node.js","Express","MongoDB","Mongoose","Jest","RTL"],
    stats: [["40%","response time ↓"],["75%+","code coverage"],["20%","engagement ↑"]] },
  { name: "API Gateway", role: "Frontend Dev", period: "Oct 2022 – Feb 2023", accent: C.orange,
    desc: "React component library for a distributed cloud system, pairing optimised RESTful API consumption with accessibility-first design.",
    tags: ["React-Bootstrap","HTML5","CSS3","RESTful APIs"],
    stats: [["30%","request throughput ↑"]] },
  { name: "E-commerce Platform", role: "Internship", period: "Dec 2021 – Apr 2022", accent: C.pink,
    desc: "Full-stack MERN e-commerce with JWT auth, Redux cart, and a separate admin dashboard — both deployed on Netlify.",
    tags: ["React.js","Node.js","MongoDB","Express","JWT","Redux"],
    stats: [["2","live deployments"],["Netlify","hosted"]] },
];

const EXP = {
  company: "Bahwan CyberTek (BCT)",
  role:    "Software Engineer – Full Stack (React / MERN)",
  period:  "May 2022 – Present",
  bullets: [
    "Built 20+ reusable React/Gatsby UI components, improving maintainability and load performance across enterprise projects",
    "Architected Node.js & MongoDB backend services capable of handling high-traffic enterprise workloads",
    "Cut API latency by 40% through RESTful optimisation and smart third-party service integrations",
    "Reduced codebase bugs by 30% with TypeScript; accelerated new developer onboarding by 2 weeks",
    "Boosted Agile sprint velocity by 20% collaborating with design, QA, and product teams",
  ],
};

const CERTS = [
  { name: "NestJS Course",                 org: "Udemy",            year: "2025", icon: "⚡" },
  { name: "Full-Stack Development",        org: "LinkedIn Learning", year: "2024", icon: "💼" },
  { name: "MERN Stack Web Development",    org: "Udemy",            year: "2023", icon: "🎓" },
  { name: "E-commerce Internship Project", org: "Self-Directed",    year: "2022", icon: "🏗️" },
];

const NAV_ITEMS = ["About","Skills","Projects","Experience","Certifications","Contact"];
const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

// ── Main ───────────────────────────────────────────────────────
export default function Portfolio() {
  const [scrolled,   setScrolled]   = useState(false);
  const [skillTab,   setSkillTab]   = useState("Frontend");
  const [hovProj,    setHovProj]    = useState(null);
  const [typed,      setTyped]      = useState("");
  const [roleIdx,    setRoleIdx]    = useState(0);
  const [charIdx,    setCharIdx]    = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [vw,         setVw]         = useState(1024);

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 28);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Typewriter
  useEffect(() => {
    const role = ROLES[roleIdx];
    const atEnd = charIdx === role.length;
    const delay = isDeleting ? 32 : atEnd ? 2000 : 72;
    const t = setTimeout(() => {
      if (!isDeleting) {
        if (charIdx < role.length) { setTyped(role.slice(0, charIdx + 1)); setCharIdx(c => c + 1); }
        else setIsDeleting(true);
      } else {
        if (charIdx > 0) { setTyped(role.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }
        else { setIsDeleting(false); setRoleIdx(i => (i + 1) % ROLES.length); }
      }
    }, delay);
    return () => clearTimeout(t);
  }, [charIdx, isDeleting, roleIdx]);

  const mobile = vw < 720;

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: "'Syne',sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;500;700&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:${C.bg}; }
        ::-webkit-scrollbar-thumb { background:${C.cyan}44; border-radius:2px; }
        a { text-decoration:none; }
        button, input, textarea { font-family:inherit; }

        .bg-grid {
          background-image: linear-gradient(rgba(0,224,255,.025) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,224,255,.025) 1px, transparent 1px);
          background-size: 52px 52px;
        }
        @keyframes orb       { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(28px,-18px) scale(1.06)} 70%{transform:translate(-18px,24px) scale(.96)} }
        @keyframes blink     { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp    { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glowPulse { 0%,100%{text-shadow:0 0 24px ${C.cyan}55} 50%{text-shadow:0 0 48px ${C.cyan}90,0 0 80px ${C.cyan}30} }

        .cursor { display:inline-block; width:2px; height:.9em; background:${C.cyan}; margin-left:2px; vertical-align:middle; border-radius:1px; animation:blink .75s ease-in-out infinite; }
        .orb-a  { position:absolute; border-radius:50%; pointer-events:none; animation:orb 13s ease-in-out infinite; }
        .orb-b  { position:absolute; border-radius:50%; pointer-events:none; animation:orb 10s ease-in-out infinite reverse; }

        .nav-link { font-size:13px; color:${C.muted}; cursor:pointer; font-weight:500; letter-spacing:.6px; transition:color .18s; padding:4px 0; border-bottom:1px solid transparent; }
        .nav-link:hover { color:${C.cyan}; border-bottom-color:${C.cyan}; }

        .btn-prime { padding:13px 28px; background:linear-gradient(130deg,${C.cyan},${C.purple}); border:none; border-radius:10px; color:#000; font-weight:700; font-size:14px; cursor:pointer; letter-spacing:.5px; transition:all .22s; }
        .btn-prime:hover { transform:translateY(-2px); box-shadow:0 8px 32px ${C.cyan}44; }
        .btn-ghost { padding:13px 28px; background:transparent; border:1px solid ${C.purple}70; border-radius:10px; color:${C.purple}; font-weight:700; font-size:14px; cursor:pointer; letter-spacing:.5px; transition:all .22s; }
        .btn-ghost:hover { transform:translateY(-2px); box-shadow:0 8px 28px ${C.purple}30; border-color:${C.purple}; background:${C.purple}0e; }

        .proj-card  { transition:all .3s ease; }
        .proj-card:hover  { transform:translateY(-5px); }
        .cert-card  { transition:all .25s ease; }
        .cert-card:hover  { transform:translateY(-3px); }
        .skill-chip { display:inline-block; padding:7px 15px; border-radius:7px; font-size:13px; font-weight:500; cursor:default; transition:transform .18s; font-family:'DM Sans',sans-serif; }
        .skill-chip:hover { transform:translateY(-2px); }
        .tab-btn { padding:7px 17px; border-radius:7px; font-size:11px; font-weight:700; letter-spacing:1px; text-transform:uppercase; cursor:pointer; transition:all .2s; border:1px solid transparent; }
        .cfield { width:100%; padding:12px 15px; background:rgba(255,255,255,.04); border:1px solid ${C.border}; border-radius:9px; color:${C.text}; font-size:14px; outline:none; font-family:'DM Sans',sans-serif; transition:border-color .2s; }
        .cfield:focus { border-color:${C.cyan}50; }
        .cfield::placeholder { color:${C.dim}; }
        .hero-fade { animation:fadeUp .7s ease both; }
      `}</style>

      {/* ── NAV ─────────────────────────────────────── */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:999, height:62,
        padding:`0 clamp(1.5rem,5vw,3.5rem)`,
        background: scrolled ? "rgba(2,2,16,.95)" : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        transition:"all .3s", display:"flex", alignItems:"center", justifyContent:"space-between",
      }}>
        <div onClick={() => go("hero")} style={{ fontFamily:"'JetBrains Mono',monospace", color:C.cyan, fontWeight:700, fontSize:20, textShadow:`0 0 22px ${C.cyan}88`, cursor:"pointer" }}>
          &lt;SF /&gt;
        </div>
        {!mobile && (
          <div style={{ display:"flex", gap:"1.8rem" }}>
            {NAV_ITEMS.map(n => <span key={n} className="nav-link" onClick={() => go(n.toLowerCase())}>{n}</span>)}
          </div>
        )}
        <a href="mailto:salmanfarzee0001000@gmail.com" className="btn-prime" style={{ padding:"8px 20px", fontSize:13 }}>
          Hire Me
        </a>
      </nav>

      {/* ── HERO ─────────────────────────────────────── */}
      <section id="hero" className="bg-grid" style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", position:"relative", padding:"80px 2rem 5rem", textAlign:"center", overflow:"hidden" }}>
        <div className="orb-a" style={{ width:480, height:480, background:`radial-gradient(circle,${C.cyan}13 0%,transparent 70%)`, top:"-80px", left:"-60px" }} />
        <div className="orb-b" style={{ width:360, height:360, background:`radial-gradient(circle,${C.purple}14 0%,transparent 70%)`, bottom:"-60px", right:"-40px" }} />
        <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", alignItems:"center" }}>
          <div className="hero-fade" style={{ fontFamily:"'JetBrains Mono',monospace", color:C.cyan, fontSize:11, letterSpacing:6, marginBottom:28, opacity:.65, animationDelay:".1s" }}>
            PORTFOLIO · 2026 · CHENNAI
          </div>
          <h1 className="hero-fade" style={{
            fontSize:`clamp(44px,10vw,94px)`, fontWeight:800, lineHeight:1.04, marginBottom:14, animationDelay:".2s",
            background:`linear-gradient(128deg,#fff 0%,${C.cyan} 42%,${C.purple} 100%)`,
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
          }}>
            Salman Farzee
          </h1>
          <div className="hero-fade" style={{ height:44, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:22, animationDelay:".35s" }}>
            <span style={{ fontSize:`clamp(15px,2.6vw,22px)`, fontWeight:600, color:C.text, fontFamily:"'DM Sans',sans-serif" }}>
              {typed}<span className="cursor" />
            </span>
          </div>
          <p className="hero-fade" style={{ maxWidth:500, color:C.muted, fontSize:15, lineHeight:1.82, marginBottom:42, fontFamily:"'DM Sans',sans-serif", animationDelay:".5s" }}>
            4+ years shipping scalable web platforms at <span style={{ color:C.text, fontWeight:600 }}>Bahwan CyberTek</span>. Passionate about performance, clean architecture, and interfaces that feel effortless.
          </p>
          <div className="hero-fade" style={{ display:"flex", gap:14, flexWrap:"wrap", justifyContent:"center", animationDelay:".65s" }}>
            <button className="btn-prime" onClick={() => go("projects")}>View Projects →</button>
            <button className="btn-ghost" onClick={() => go("contact")}>Let's Connect</button>
          </div>
        </div>
        <div onClick={() => go("about")} style={{ position:"absolute", bottom:30, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:8, cursor:"pointer", opacity:.45 }}>
          <span style={{ fontSize:9, letterSpacing:3, color:C.muted }}>SCROLL</span>
          <div style={{ width:1, height:38, background:`linear-gradient(to bottom,${C.cyan},transparent)` }} />
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────── */}
      <section id="about" style={{ padding:"96px clamp(1.5rem,5vw,3.5rem)", maxWidth:1100, margin:"0 auto" }}>
        <SecHead label="About Me" accent={C.cyan} />
        <div style={{ display:"grid", gridTemplateColumns: mobile ? "1fr" : "260px 1fr", gap:36, alignItems:"start" }}>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:18 }}>
            <div style={{ width:160, height:160, borderRadius:"50%", background:`linear-gradient(135deg,${C.cyan}22,${C.purple}22)`, border:`1.5px solid ${C.cyan}30`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:64 }}>👨‍💻</div>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:18, fontWeight:700 }}>Salman Farzee</div>
              <div style={{ fontSize:12, color:C.cyan, marginTop:4, fontFamily:"'JetBrains Mono',monospace" }}>Chennai · India</div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:8, width:"100%" }}>
              {[
                ["✉","salmanfarzee0001000@gmail.com","mailto:salmanfarzee0001000@gmail.com"],
                ["in","linkedin.com/in/salman-farzee","https://linkedin.com/in/salman-farzee"],
                ["☎","+91 82205 25374","tel:+918220525374"],
              ].map(([ic,val,href]) => (
                <a key={val} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ ...card(), padding:"10px 14px", display:"flex", gap:10, alignItems:"center", color:C.muted, fontSize:12, fontFamily:"'DM Sans',sans-serif" }}>
                  <span style={{ color:C.cyan, fontFamily:"'JetBrains Mono',monospace", fontSize:11, minWidth:14 }}>{ic}</span>
                  <span style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{val}</span>
                </a>
              ))}
            </div>
          </div>
          <div style={{ ...card(), padding:"30px 34px" }}>
            <p style={{ color:C.muted, lineHeight:1.85, marginBottom:22, fontSize:15, fontFamily:"'DM Sans',sans-serif" }}>
              I'm a <span style={{ color:C.cyan, fontWeight:600 }}>Senior React / Full-Stack MERN Developer</span> with 4+ years turning complex requirements into clean, performant web applications. At <span style={{ color:C.text, fontWeight:600 }}>Bahwan CyberTek</span>, I work across the full stack — from architecting Node.js APIs to crafting pixel-perfect React UIs.
            </p>
            <p style={{ color:C.muted, lineHeight:1.85, marginBottom:26, fontSize:15, fontFamily:"'DM Sans',sans-serif" }}>
              I care about WCAG accessibility, API performance, and writing code that scales cleanly. I thrive in Agile teams where design, engineering, and product move together.
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
              {[["📍","Location","Chennai, India"],["🎓","Education","MCA – MIIT (87%)"],["💼","Experience","4+ Years Full Stack"],["🏢","Company","Bahwan CyberTek"]].map(([ic,lb,vl]) => (
                <div key={lb} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                  <span style={{ fontSize:17 }}>{ic}</span>
                  <div>
                    <div style={{ fontSize:10, color:C.dim, textTransform:"uppercase", letterSpacing:"1.5px", marginBottom:2, fontFamily:"'DM Sans',sans-serif" }}>{lb}</div>
                    <div style={{ fontSize:13, color:C.text, fontWeight:500, fontFamily:"'DM Sans',sans-serif" }}>{vl}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ─────────────────────────────────────── */}
      <section id="skills" style={{ padding:"96px clamp(1.5rem,5vw,3.5rem)", background:"rgba(0,224,255,.015)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <SecHead label="Technical Skills" accent={C.purple} />
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:24 }}>
            {Object.entries(SKILLS).map(([k,{ color }]) => (
              <button key={k} className="tab-btn" onClick={() => setSkillTab(k)}
                style={{ color: skillTab===k ? color : C.muted, border:`1px solid ${skillTab===k ? color+"55" : C.border}`, background: skillTab===k ? `${color}12` : "transparent", boxShadow: skillTab===k ? `0 0 18px ${color}22` : "none" }}>
                {k}
              </button>
            ))}
          </div>
          <div style={{ ...card(), padding:"28px 30px", minHeight:120 }}>
            <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
              {SKILLS[skillTab].items.map(s => (
                <span key={s} className="skill-chip"
                  style={{ background:`${SKILLS[skillTab].color}11`, color:SKILLS[skillTab].color, border:`1px solid ${SKILLS[skillTab].color}33` }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────── */}
      <section id="projects" style={{ padding:"96px clamp(1.5rem,5vw,3.5rem)", maxWidth:1100, margin:"0 auto" }}>
        <SecHead label="Projects" accent={C.cyan} />
        <div style={{ display:"grid", gridTemplateColumns:`repeat(auto-fill,minmax(${mobile?"280px":"310px"},1fr))`, gap:20 }}>
          {PROJECTS.map((p,i) => (
            <div key={p.name} className="proj-card"
              onMouseEnter={() => setHovProj(i)} onMouseLeave={() => setHovProj(null)}
              style={{ ...card(hovProj===i, p.accent), padding:24 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10, marginBottom:12 }}>
                <div>
                  <div style={{ fontSize:16, fontWeight:700, marginBottom:3 }}>{p.name}</div>
                  <div style={{ fontSize:10, color:p.accent, fontWeight:700, letterSpacing:"1px", textTransform:"uppercase", fontFamily:"'JetBrains Mono',monospace" }}>{p.role}</div>
                </div>
                <span style={{ fontSize:10, color:C.muted, background:`${p.accent}12`, padding:"3px 9px", borderRadius:20, whiteSpace:"nowrap", flexShrink:0, fontFamily:"'DM Sans',sans-serif" }}>{p.period}</span>
              </div>
              <div style={{ height:1, background:`linear-gradient(to right,${p.accent}44,transparent)`, marginBottom:12 }} />
              <p style={{ color:C.muted, fontSize:13, lineHeight:1.75, marginBottom:12, fontFamily:"'DM Sans',sans-serif" }}>{p.desc}</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:12 }}>
                {p.stats.map(([n,l]) => (
                  <span key={l} style={{ display:"inline-flex", alignItems:"center", gap:4, padding:"3px 10px", borderRadius:6, fontSize:11, fontWeight:700, fontFamily:"'JetBrains Mono',monospace", background:`${p.accent}14`, color:p.accent, border:`1px solid ${p.accent}28` }}>
                    <strong>{n}</strong> {l}
                  </span>
                ))}
              </div>
              <div>
                {p.tags.map(t => (
                  <span key={t} style={{ display:"inline-block", padding:"2px 8px", borderRadius:5, fontSize:11, margin:"2px", background:"rgba(255,255,255,.04)", color:C.muted, border:"1px solid rgba(255,255,255,.07)", fontFamily:"'DM Sans',sans-serif" }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── EXPERIENCE ─────────────────────────────────────── */}
      <section id="experience" style={{ padding:"96px clamp(1.5rem,5vw,3.5rem)", background:"rgba(155,89,255,.015)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <SecHead label="Work Experience" accent={C.purple} />
          <div style={{ display:"flex", gap:22 }}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0 }}>
              <div style={{ width:14, height:14, borderRadius:"50%", background:C.cyan, boxShadow:`0 0 14px ${C.cyan}`, marginTop:8 }} />
              <div style={{ width:2, flex:1, background:`linear-gradient(to bottom,${C.cyan}55,transparent)`, marginTop:8 }} />
            </div>
            <div style={{ ...card(), padding:"28px 30px", flex:1 }}>
              <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:12, marginBottom:20 }}>
                <div>
                  <h3 style={{ fontSize:18, fontWeight:700, marginBottom:6, lineHeight:1.3 }}>{EXP.role}</h3>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ fontSize:15, color:C.cyan, fontWeight:700 }}>{EXP.company}</span>
                    <span style={{ fontSize:10, background:`${C.cyan}1a`, color:C.cyan, padding:"3px 10px", borderRadius:20, fontWeight:700, fontFamily:"'JetBrains Mono',monospace", letterSpacing:1 }}>CURRENT</span>
                  </div>
                </div>
                <span style={{ fontSize:13, color:C.muted, background:"rgba(255,255,255,.05)", padding:"6px 14px", borderRadius:8, alignSelf:"flex-start", fontFamily:"'DM Sans',sans-serif" }}>{EXP.period}</span>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:11 }}>
                {EXP.bullets.map((b,j) => (
                  <div key={j} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                    <span style={{ color:C.cyan, fontFamily:"'JetBrains Mono',monospace", fontSize:13, marginTop:2, flexShrink:0 }}>▸</span>
                    <span style={{ color:C.muted, fontSize:14, lineHeight:1.68, fontFamily:"'DM Sans',sans-serif" }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ─────────────────────────────────────── */}
      <section id="certifications" style={{ padding:"96px clamp(1.5rem,5vw,3.5rem)", maxWidth:1100, margin:"0 auto" }}>
        <SecHead label="Certifications" accent={C.green} />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:16 }}>
          {CERTS.map((c,i) => (
            <div key={i} className="cert-card" style={{ ...card(), padding:"20px 22px", display:"flex", gap:14, alignItems:"flex-start" }}>
              <span style={{ fontSize:32, lineHeight:1, flexShrink:0 }}>{c.icon}</span>
              <div>
                <div style={{ fontSize:14, fontWeight:600, lineHeight:1.4, marginBottom:5, fontFamily:"'DM Sans',sans-serif" }}>{c.name}</div>
                <div style={{ fontSize:12, color:C.green, marginBottom:3, fontWeight:600 }}>{c.org}</div>
                <div style={{ fontSize:11, color:C.dim, fontFamily:"'JetBrains Mono',monospace" }}>{c.year}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────── */}
      <section id="contact" style={{ padding:"96px clamp(1.5rem,5vw,3.5rem)", background:"rgba(0,224,255,.01)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <SecHead label="Get In Touch" accent={C.cyan} />
          <div style={{ display:"grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap:36 }}>
            <div>
              <p style={{ color:C.muted, fontSize:16, lineHeight:1.85, marginBottom:28, fontFamily:"'DM Sans',sans-serif" }}>
                Open to <span style={{ color:C.text, fontWeight:600 }}>full-time roles</span>, freelance work, or a conversation about what you're building. If it's interesting, reach out.
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {[
                  ["✉","Email","salmanfarzee0001000@gmail.com","mailto:salmanfarzee0001000@gmail.com"],
                  ["📞","Phone","+91 82205 25374","tel:+918220525374"],
                  ["💼","LinkedIn","linkedin.com/in/salman-farzee","https://linkedin.com/in/salman-farzee"],
                  ["📍","Location","Chennai, India",null],
                ].map(([ic,lb,vl,href]) => (
                  <div key={lb} style={{ ...card(), padding:"14px 18px", display:"flex", gap:14, alignItems:"center" }}>
                    <span style={{ fontSize:18, flexShrink:0 }}>{ic}</span>
                    <div>
                      <div style={{ fontSize:10, color:C.dim, textTransform:"uppercase", letterSpacing:"1.5px", marginBottom:2, fontFamily:"'DM Sans',sans-serif" }}>{lb}</div>
                      {href
                        ? <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontSize:13, color:C.cyan, fontWeight:500, fontFamily:"'DM Sans',sans-serif" }}>{vl}</a>
                        : <span style={{ fontSize:13, color:C.text, fontWeight:500, fontFamily:"'DM Sans',sans-serif" }}>{vl}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────── */}
      <footer style={{ textAlign:"center", padding:"28px 2rem", borderTop:`1px solid ${C.border}` }}>
        <div style={{ fontFamily:"'JetBrains Mono',monospace", color:C.cyan, fontWeight:700, fontSize:18, marginBottom:8, textShadow:`0 0 22px ${C.cyan}66` }}>&lt;SF /&gt;</div>
        <p style={{ color:C.dim, fontSize:12, fontFamily:"'DM Sans',sans-serif" }}>© 2026 Salman Farzee · Chennai, India · Built with React</p>
      </footer>
    </div>
  );
}

// ── Section Header ─────────────────────────────────────────────
function SecHead({ label, accent }) {
  return (
    <div style={{ marginBottom:48 }}>
      <h2 style={{ fontSize:"clamp(26px,4vw,44px)", fontWeight:800, lineHeight:1.1, color:"#fff" }}>{label}</h2>
      <div style={{ width:52, height:3, background:`linear-gradient(to right,${accent},transparent)`, marginTop:14, borderRadius:2 }} />
    </div>
  );
}

// ── Contact Form ───────────────────────────────────────────────
function ContactForm() {
  const [f, setF]     = useState({ name:"", email:"", message:"" });
  const [sent, setSent] = useState(false);
  const wrap = {
    background:"rgba(6,6,28,.78)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
    border:`1px solid rgba(0,224,255,.13)`, borderRadius:18, padding:"28px 30px",
  };
  return (
    <div style={wrap}>
      {sent ? (
        <div style={{ textAlign:"center", padding:"44px 0", display:"flex", flexDirection:"column", alignItems:"center", gap:12 }}>
          <span style={{ fontSize:48 }}>🚀</span>
          <div style={{ fontSize:20, fontWeight:700, color:"#00e0ff" }}>Message Sent!</div>
          <div style={{ fontSize:14, color:"rgba(140,160,210,.7)", fontFamily:"'DM Sans',sans-serif" }}>I'll get back to you as soon as possible.</div>
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {[["Name","text","Your name"],["Email","email","your@email.com"]].map(([lb,tp,ph]) => (
            <div key={lb}>
              <label style={{ display:"block", fontSize:10, color:"rgba(100,120,170,.4)", marginBottom:5, textTransform:"uppercase", letterSpacing:"1.5px", fontFamily:"'DM Sans',sans-serif" }}>{lb}</label>
              <input className="cfield" type={tp} placeholder={ph}
                value={f[lb.toLowerCase()]} onChange={e => setF(p => ({ ...p, [lb.toLowerCase()]:e.target.value }))} />
            </div>
          ))}
          <div>
            <label style={{ display:"block", fontSize:10, color:"rgba(100,120,170,.4)", marginBottom:5, textTransform:"uppercase", letterSpacing:"1.5px", fontFamily:"'DM Sans',sans-serif" }}>Message</label>
            <textarea className="cfield" rows={5} placeholder="Tell me about the opportunity..."
              value={f.message} onChange={e => setF(p => ({ ...p, message:e.target.value }))}
              style={{ resize:"vertical" }} />
          </div>
          <button className="btn-prime" style={{ width:"100%", padding:14, fontSize:15 }}
            onClick={() => { if (f.name && f.email && f.message) setSent(true); }}>
            Send Message →
          </button>
        </div>
      )}
    </div>
  );
}
