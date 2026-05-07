import { useEffect, useState } from 'react'
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
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const goTo = (id) => {
    setCurrentPage(id)
    setMenuOpen(false)
    window.scrollTo({ top: 0 })
  }

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
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMenuOpen(o => !o)}
        >
          <span className={`nav-toggle-bars ${menuOpen ? 'is-open' : ''}`} aria-hidden="true">
            <span /><span /><span />
          </span>
        </button>
        <nav id="primary-nav" className={`nav ${menuOpen ? 'is-open' : ''}`}>
          {PAGES.map(p => (
            <a
              key={p.id}
              href={`#${p.id}`}
              onClick={(e) => { e.preventDefault(); goTo(p.id) }}
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

const FLAT_PUBLICATIONS = PUBLICATIONS.flatMap(({ year, items }) =>
  items.map((p) => ({ ...p, year }))
)

const PUB_YEARS = [...new Set(FLAT_PUBLICATIONS.map(p => p.year))].sort((a, b) => b.localeCompare(a))

function classifyVenue(venue = '') {
  const v = venue.toLowerCase()
  if (/\bjournal\b|transactions|electronics journal|ieee access|computer networks|communications magazine|comm\.? mag\.?|computer journal|eurasip/i.test(v)) return 'journal'
  if (/handbook|book chapter|chapter\b/.test(v)) return 'book'
  return 'conference'
}

function Publications() {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('year-desc')
  const [yearFilter, setYearFilter] = useState('all')

  const filtered = FLAT_PUBLICATIONS
    .filter(p => yearFilter === 'all' || p.year === yearFilter)
    .filter(p => query.trim() === '' || p.title.toLowerCase().includes(query.trim().toLowerCase()))

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'year-asc') return a.year.localeCompare(b.year)
    if (sort === 'title-asc') return a.title.localeCompare(b.title)
    return b.year.localeCompare(a.year)
  })

  const totalCount = FLAT_PUBLICATIONS.length
  const numericYears = FLAT_PUBLICATIONS
    .map(p => parseInt(p.year, 10))
    .filter(n => !Number.isNaN(n))
  const yearMin = Math.min(...numericYears)
  const yearMax = Math.max(...numericYears)
  const counts = FLAT_PUBLICATIONS.reduce(
    (acc, p) => {
      const k = classifyVenue(p.venue)
      acc[k] = (acc[k] || 0) + 1
      return acc
    },
    { journal: 0, conference: 0, book: 0 },
  )

  const reset = () => { setQuery(''); setSort('year-desc'); setYearFilter('all') }
  const isFiltered = query !== '' || sort !== 'year-desc' || yearFilter !== 'all'

  // group sorted entries by year for display
  const groups = sorted.reduce((acc, p) => {
    const last = acc[acc.length - 1]
    if (last && last.year === p.year) last.items.push(p)
    else acc.push({ year: p.year, items: [p] })
    return acc
  }, [])

  return (
    <section id="publications" className="publications-page">
      <div className="eyebrow">{totalCount} entries · {yearMin} → {yearMax}</div>
      <h2>Publications.</h2>

      <div className="metrics-grid">
        <div className="metric"><span className="metric-num">{totalCount}</span><span className="metric-label">total</span></div>
        <div className="metric"><span className="metric-num">{yearMin}–{yearMax}</span><span className="metric-label">year span</span></div>
        <div className="metric"><span className="metric-num">{counts.journal}</span><span className="metric-label">journals</span></div>
        <div className="metric"><span className="metric-num">{counts.conference}</span><span className="metric-label">conferences</span></div>
        <div className="metric"><span className="metric-num">{counts.book}</span><span className="metric-label">book chapters</span></div>
      </div>

      <div className="controls">
        <input
          type="search"
          className="search-input"
          placeholder="Search by title…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search publications by title"
        />
        <select
          className="select"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          aria-label="Filter by year"
        >
          <option value="all">All years</option>
          {PUB_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
        <select
          className="select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort publications"
        >
          <option value="year-desc">Year — newest</option>
          <option value="year-asc">Year — oldest</option>
          <option value="title-asc">Title — A→Z</option>
        </select>
        {isFiltered && (
          <button type="button" className="link-btn" onClick={reset}>Reset</button>
        )}
      </div>

      <div className="results-count">
        {sorted.length} of {totalCount} publications
      </div>

      {groups.length === 0 && (
        <p className="empty-state">No publications match the current filters.</p>
      )}

      {groups.map(({ year, items }) => (
        <div key={year} className="year-block compact">
          <div className="year-label">{year}</div>
          <ul className="pub-list compact">
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
