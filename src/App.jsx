import { useState } from 'react'
import './index.css'
import { PUBLICATIONS, TEACHING, SUMMER_SCHOOLS, PROJECTS, COMMITTEES } from './data'

const PAGES = [
  { id: 'about', label: 'About' },
  { id: 'publications', label: 'Publications' },
  { id: 'teaching', label: 'Teaching' },
  { id: 'projects', label: 'Projects' },
  { id: 'committees', label: 'Committees' },
]

function App() {
  const [currentPage, setCurrentPage] = useState('about')

  const renderPage = () => {
    switch (currentPage) {
      case 'about': return <About />
      case 'publications': return <Publications />
      case 'teaching': return <Teaching />
      case 'projects': return <Projects />
      case 'committees': return <Committees />
      default: return <About />
    }
  }

  return (
    <div className="container">
      <header className="header">
        <div className="brand">
          Wissam Mallouli
          <span className="brand-mark">PhD · CTO</span>
        </div>
        <nav className="nav">
          {PAGES.map(p => (
            <a
              key={p.id}
              href={`#${p.id}`}
              onClick={(e) => { e.preventDefault(); setCurrentPage(p.id); window.scrollTo({ top: 0 }) }}
              className={currentPage === p.id ? 'active' : ''}
            >
              {p.label}
            </a>
          ))}
        </nav>
      </header>

      <main className="main">
        {renderPage()}
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} — All rights reserved</span>
        <span className="sig">Paris · France</span>
        <span>v.2026</span>
      </footer>
    </div>
  )
}

function About() {
  return (
    <section id="about">
      <div className="hero">
        <div className="hero-text">
          <div className="eyebrow">Cybersecurity researcher</div>
          <h1 className="hero-name">
            Dr. Wissam<br/>
            <em>Mallouli.</em>
          </h1>
          <p className="hero-tagline">
            CTO at Montimage. Working at the intersection of cyberdefense,
            IoT and 5G networks.
          </p>
          <div className="hero-meta">
            <span>{PUBLICATIONS.reduce((n, y) => n + y.items.length, 0)}+ publications</span>
            <span className="dot" />
            <span>{PROJECTS.reduce((n, y) => n + y.items.length, 0)} EU research projects</span>
            <span className="dot" />
            <span>Paris</span>
          </div>
        </div>

        <div className="hero-portrait">
          <img src="https://www.mallouli.com/portrait.jpg" alt="Wissam Mallouli" />
          <div className="portrait-caption">— Paris, 2026</div>
        </div>
      </div>

      <div className="bio">
        <div className="bio-label">Biography</div>
        <div className="bio-body">
          <p>
            Dr. Wissam Mallouli is currently the CTO of <a href="https://www.montimage.com">Montimage</a>,
            located in Paris, France. He received his Telecommunication Engineer degree from the
            National Institute of Telecommunication (INT) in 2005 and his PhD in cybersecurity from
            Telecom & Management SudParis in 2008.
          </p>
          <p>
            His expertise covers continuous risk management and cyberdefense of critical systems
            and networks — including cloud-based systems, IoT and 4G/5G networks. He participates
            in several collaborative European research projects and has authored more than 50
            scientific publications in leading conferences and journals.
          </p>
        </div>
      </div>

      <div className="contact-card">
        <h4>Get in touch</h4>
        <div className="contact-row">
          <span className="k">Affiliation</span>
          <span className="v">Montimage<br/>39 rue Bobillot, 75013 Paris Cedex, France</span>
        </div>
        <div className="contact-row">
          <span className="k">Direct</span>
          <span className="v">
            +33 (0) 6 95 93 33 39<br/>
            <a href="mailto:wissam.mallouli@montimage.com">wissam.mallouli@montimage.com</a>
          </span>
        </div>
      </div>
    </section>
  )
}

function Publications() {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? PUBLICATIONS : PUBLICATIONS.slice(0, 5)
  const totalCount = PUBLICATIONS.reduce((n, y) => n + y.items.length, 0)

  return (
    <section id="publications">
      <div className="eyebrow">{totalCount} entries · 2006 → 2026</div>
      <h2>Publications.</h2>

      {visible.map(({ year, items }) => (
        <div key={year} className="year-block">
          <div className="year-label">{year}</div>
          <ul className="pub-list">
            {items.map((p, i) => (
              <li key={i}>
                <span className="title">{p.title}</span>
                <span className="authors">{p.authors}</span>
                <span className="venue">{p.venue}</span>
                {p.note && <span className="award"> · {p.note}</span>}
                {p.doi && <a className="doi" href={p.doi} target="_blank" rel="noopener">DOI</a>}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <p className="more-link">
        <button className="link-btn" onClick={() => setShowAll(!showAll)}>
          {showAll ? 'Show recent only' : `Show all ${PUBLICATIONS.length} years`}
        </button>
      </p>
    </section>
  )
}

function Teaching() {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? TEACHING : TEACHING.slice(0, 4)

  return (
    <section id="teaching">
      <div className="eyebrow">Lectures · supervision · summer schools</div>
      <h2>Teaching.</h2>

      {visible.map(({ year, items }) => (
        <div key={year} className="year-block">
          <div className="year-label">{year}</div>
          <ul className="teach-list">
            {items.map((t, i) => (
              <li key={i}>
                <strong>{t.what}</strong> — {t.where}
                {t.meta && <span className="meta">{t.meta}</span>}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <p className="more-link">
        <button className="link-btn" onClick={() => setShowAll(!showAll)}>
          {showAll ? 'Show recent only' : `Show all ${TEACHING.length} academic years`}
        </button>
      </p>

      <div className="summer-schools">
        <h3>Summer Schools — TAROT & RESCOM</h3>
        <ul className="teach-list">
          {SUMMER_SCHOOLS.map((s, i) => (
            <li key={i}>
              <strong>{s.name}</strong> — {s.where}
              <span className="meta">{s.role}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects">
      <div className="eyebrow">Collaborative European research</div>
      <h2>Projects.</h2>

      {PROJECTS.map(({ year, items }) => (
        <div key={year} className="year-block">
          <div className="year-label">{year}</div>
          <ul className="proj-list">
            {items.map((p, i) => (
              <li key={i}>
                <span className="name">{p.name}</span>
                {p.program && <span className="badge">{p.program}</span>}
                <span className="desc"> {p.desc}</span>
                <span className="meta">{p.dates}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}

function Committees() {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? COMMITTEES : COMMITTEES.slice(0, 4)

  return (
    <section id="committees">
      <div className="eyebrow">Service to the research community</div>
      <h2>Committees.</h2>

      {visible.map((entry) => (
        <div key={entry.year} className="year-block">
          <div className="year-label">{entry.year}</div>
          <div>
            {entry.evaluation && (
              <div className="committee-section">
                <h4>Evaluation Committee</h4>
                <ul className="com-list">
                  {entry.evaluation.map((x, i) => <li key={i}>{x}</li>)}
                </ul>
              </div>
            )}
            {entry.pc && (
              <div className="committee-section">
                <h4>Program Committee</h4>
                <ul className="com-list">
                  {entry.pc.map((x, i) => <li key={i}>{x}</li>)}
                </ul>
              </div>
            )}
            {entry.organizing && (
              <div className="committee-section">
                <h4>Organizing Committee · Editor</h4>
                <ul className="com-list">
                  {entry.organizing.map((x, i) => <li key={i}>{x}</li>)}
                </ul>
              </div>
            )}
            {entry.reviews && (
              <div className="committee-section">
                <h4>Reviews</h4>
                <ul className="com-list">
                  {entry.reviews.map((x, i) => <li key={i}>{x}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}

      <p className="more-link">
        <button className="link-btn" onClick={() => setShowAll(!showAll)}>
          {showAll ? 'Show recent only' : `Show all ${COMMITTEES.length} years`}
        </button>
      </p>
    </section>
  )
}

export default App
