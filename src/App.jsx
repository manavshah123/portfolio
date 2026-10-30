import { useEffect, useRef, useState } from 'react';
import { profile, upgrades, facts, projects, sideProjects, aiWork, skills, recommendations, education } from './data.js';

function ThemeSwitch() {
  // Without a saved choice, keep following the system setting as it changes.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const follow = (e) => {
      if (!localStorage.getItem('theme')) document.documentElement.dataset.theme = e.matches ? 'dark' : 'light';
    };
    media.addEventListener('change', follow);
    return () => media.removeEventListener('change', follow);
  }, []);

  const toggle = () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch {}
  };

  // Both icons render; CSS shows the right one, so the prerendered HTML never mismatches.
  return (
    <button className="theme-switch" onClick={toggle} aria-label="Switch between light and dark theme" title="Switch theme">
      <svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}

function Nav() {
  return (
    <header className="nav">
      <a href="#top" className="nav-name">Manav Shah</a>
      <nav aria-label="Sections">
        <a href="#work">Work</a>
        <a href="#ai">AI</a>
        <a href="#side-projects">Side projects</a>
        <a href="#skills">Skills</a>
        <a href="#education">Education</a>
        <a href="#contact">Contact</a>
      </nav>
      <ThemeSwitch />
    </header>
  );
}

function UpgradeLog() {
  return (
    <figure className="log" aria-label="Upgrades I have delivered">
      <figcaption className="log-head">
        <span className="dot" aria-hidden="true" />
        Upgrades I’ve delivered
      </figcaption>
      <ol className="log-rows">
        {upgrades.map((u, i) => (
          <li key={u.what} style={{ '--i': i }}>
            <span className="log-what">{u.what}</span>
            <span className="log-from">{u.from}</span>
            <span className="log-arrow" aria-label="to">→</span>
            <span className="log-to">{u.to}</span>
          </li>
        ))}
      </ol>
      <p className="log-foot" style={{ '--i': upgrades.length }}>
        build passing
      </p>
    </figure>
  );
}

function PhotoPopup() {
  const dialog = useRef(null);
  return (
    <>
      <button className="hero-photo-btn" onClick={() => dialog.current.showModal()} aria-label="Open larger photo">
        <img className="hero-photo" src={profile.photo} alt={`Photo of ${profile.name}`} width="64" height="64" />
      </button>
      <dialog
        ref={dialog}
        className="photo-dialog"
        aria-label={`Photo of ${profile.name}`}
        // Clicks on the backdrop land on the dialog itself, so close on those.
        onClick={(e) => e.target === dialog.current && dialog.current.close()}
      >
        <img src={profile.photoLarge} alt={`Photo of ${profile.name}`} width="960" height="960" loading="lazy" />
        <button className="photo-close" onClick={() => dialog.current.close()} aria-label="Close photo">×</button>
      </dialog>
    </>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-text">
        {/* A div, not a p: the photo dialog inside can't live in a paragraph. */}
        <div className="hero-who">
          <PhotoPopup />
          <span>{profile.name}, {profile.role.toLowerCase()} in {profile.location}</span>
        </div>
        <h1>{profile.headline}</h1>
        <p className="hero-intro">{profile.intro}</p>
        {profile.openTo && (
          <p className="hero-open"><span className="dot" aria-hidden="true" />{profile.openTo}</p>
        )}
        <div className="hero-actions">
          <a className="btn btn-solid" href="#work">See my work</a>
          <a className="btn btn-line" href={`mailto:${profile.email}`} data-umami-event="email-hero">Email me</a>
          {__HAS_RESUME__ && (
            <a className="btn btn-line" href={profile.resume} download data-umami-event="resume-download">Download resume</a>
          )}
        </div>
      </div>
      <UpgradeLog />
    </section>
  );
}

function Facts() {
  return (
    <dl className="facts">
      {facts.map((f) => (
        <div key={f.value}>
          <dt>{f.value}</dt>
          <dd>{f.label}</dd>
        </div>
      ))}
    </dl>
  );
}

const slug = (name) => name.replace(/\W+/g, '-').toLowerCase();

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// "Aug 2023" -> months since year 0; "Present" -> null.
const toMonth = (text) => {
  const [mon, year] = text.trim().split(' ');
  return MONTHS.includes(mon) ? Number(year) * 12 + MONTHS.indexOf(mon) : null;
};

// Starts at the build date so the prerendered HTML matches, then moves to today.
function useNow() {
  const [now, setNow] = useState(() => new Date(__BUILD_DATE__));
  useEffect(() => setNow(new Date()), []);
  return now;
}

function Timeline({ onSelect }) {
  const now = useNow();
  const nowMonth = now.getFullYear() * 12 + now.getMonth();
  const rows = projects
    .map((p) => {
      const [from, to] = p.period.split('–');
      const start = toMonth(from);
      const end = to ? toMonth(to) ?? nowMonth : start;
      return { p, start, end: end + 1, ongoing: to?.trim() === 'Present' };
    })
    .sort((a, b) => a.start - b.start);

  const firstYear = Math.floor(rows[0].start / 12);
  const lastYear = now.getFullYear() + 1;
  const span = (lastYear - firstYear) * 12;
  const pct = (m) => `${((m - firstYear * 12) / span) * 100}%`;
  const years = Array.from({ length: lastYear - firstYear }, (_, i) => firstYear + i);

  return (
    <figure className="timeline" aria-label="Timeline of projects by year">
      <div className="tl-axis" aria-hidden="true">
        {years.map((y) => (
          <span key={y} style={{ left: pct(y * 12) }}>{y}</span>
        ))}
      </div>
      <ol className="tl-rows">
        {rows.map(({ p, start, end, ongoing }) => (
          <li key={p.name} className="tl-row">
            <span className="tl-label">{p.short}</span>
            <span className="tl-track">
              {years.map((y) => (
                <i key={y} className="tl-grid" style={{ left: pct(y * 12) }} aria-hidden="true" />
              ))}
              <a
                href={`#item-${slug(p.name)}`}
                className={`tl-bar${ongoing ? ' is-ongoing' : ''}`}
                style={{ left: pct(start), width: `calc(${pct(end)} - ${pct(start)})` }}
                onClick={() => onSelect(p.name)}
                title={`${p.name}: ${p.period}`}
              >
                <span className="visually-hidden">{p.name}: {p.period}</span>
              </a>
            </span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

function Project({ p, open, onToggle }) {
  const id = `proj-${slug(p.name)}`;
  return (
    <li className={`project${open ? ' is-open' : ''}`} id={`item-${slug(p.name)}`}>
      <p className="project-period">{p.period}</p>
      <div className="project-body">
        <h3>{p.name}</h3>
        <p className="project-summary">{p.summary}</p>
        <p className="project-stack">
          {p.tech.map((t) => <span key={t}>{t}</span>)}
        </p>
        <button
          className="project-toggle"
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
        >
          {open ? 'Hide details' : 'Show details'}
        </button>
        <div className="project-detail" id={id} hidden={!open}>
          <ul>
            {p.highlights.map((h) => <li key={h}>{h}</li>)}
          </ul>
          <p className="project-tools"><strong>Tools:</strong> {p.tools.join(', ')}</p>
          {p.href && (
            <p className="project-tools">
              <a href={p.href} target="_blank" rel="noreferrer" data-umami-event="repo-click" data-umami-event-project={p.short ?? p.name}>View on GitHub</a>
            </p>
          )}
        </div>
      </div>
    </li>
  );
}

function Work() {
  // DocGen starts expanded to show the strongest work first.
  const [open, setOpen] = useState(
    () => new Set(projects.filter((p) => p.name.startsWith('DocGen')).map((p) => p.name)),
  );
  const toggle = (name) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });

  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="section-head">
        <h2 id="work-title">Work</h2>
        <p>
          Wishtree Technologies LLP, Pune. Software engineer since January 2022.
          Projects newest first.
        </p>
      </div>
      <Timeline onSelect={(name) => setOpen((prev) => new Set(prev).add(name))} />
      <ol className="projects">
        {projects.map((p) => (
          <Project key={p.name} p={p} open={open.has(p.name)} onToggle={() => toggle(p.name)} />
        ))}
      </ol>
    </section>
  );
}

function SideProjects() {
  const [open, setOpen] = useState(() => new Set());
  const toggle = (name) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });

  return (
    <section className="section" id="side-projects" aria-labelledby="side-title">
      <div className="section-head">
        <h2 id="side-title">Side projects</h2>
        <p>Things I build outside work. Newest first.</p>
      </div>
      <ol className="projects">
        {sideProjects.map((p) => (
          <Project key={p.name} p={p} open={open.has(p.name)} onToggle={() => toggle(p.name)} />
        ))}
      </ol>
    </section>
  );
}

function AiWork() {
  return (
    <section className="section" id="ai" aria-labelledby="ai-title">
      <div className="section-head">
        <h2 id="ai-title">AI and agents</h2>
        <p>What I’m building and exploring now: voice agents, RAG and LLM-driven automation.</p>
      </div>
      <ul className="projects">
        {aiWork.map((a) => (
          <li key={a.title} className="project">
            <p className="project-period">{a.label}</p>
            <div className="project-body">
              <h3>{a.title}</h3>
              <p className="project-stack">
                {a.tags.map((t) => <span key={t}>{t}</span>)}
              </p>
              <div className="project-detail">
                <ul>
                  {a.points.map((pt) => <li key={pt}>{pt}</li>)}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Skills() {
  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <div className="section-head">
        <h2 id="skills-title">Skills</h2>
        <p>
          Strongest in Java with Spring and Hibernate, from design through testing and deployment.
        </p>
      </div>
      <div className="skills">
        {skills.map((s) => (
          <div key={s.group} className="skill-group">
            <h3>{s.group}</h3>
            <ul>
              {s.items.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Recommendations() {
  if (recommendations.length === 0) return null;
  return (
    <section className="section" id="recommendations" aria-labelledby="rec-title">
      <div className="section-head">
        <h2 id="rec-title">What people say</h2>
      </div>
      <ul className="recs">
        {recommendations.map((r) => (
          <li key={r.name}>
            <blockquote>“{r.quote}”</blockquote>
            <p className="rec-who"><strong>{r.name}</strong> · {r.role}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Education() {
  return (
    <section className="section" id="education" aria-labelledby="edu-title">
      <div className="section-head">
        <h2 id="edu-title">Education</h2>
      </div>
      <ul className="edu">
        {education.map((e) => (
          <li key={e.school}>
            <p className="edu-period">{e.period}</p>
            <div>
              <h3>{e.degree}</h3>
              <p>{e.school}, {e.place}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };
  return (
    <footer className="contact" id="contact">
      <div className="contact-inner">
      <h2>Have a Java platform that needs moving forward? Let’s talk.</h2>
      {profile.openTo && <p className="contact-open">{profile.openTo}</p>}
      <p className="contact-email">
        <a href={`mailto:${profile.email}`} data-umami-event="email-contact">{profile.email}</a>
        <button className="copy" onClick={copy} aria-live="polite" data-umami-event="email-copy">
          {copied ? 'Copied' : 'Copy email'}
        </button>
      </p>
      <p className="contact-links">
        {profile.links.map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noreferrer" data-umami-event={`${l.label.toLowerCase()}-click`}>{l.label}</a>
        ))}
      </p>
      <p className="fine">© {new Date().getFullYear()} {profile.name}</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <a className="skip" href="#work">Skip to work</a>
      <Nav />
      <main>
        <Hero />
        <Facts />
        <Work />
        <AiWork />
        <SideProjects />
        <Skills />
        <Recommendations />
        <Education />
      </main>
      <Contact />
    </>
  );
}
