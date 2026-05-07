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
  const totalPublications = PUBLICATIONS.reduce((n, y) => n + y.items.length, 0)
  const totalProjects = PROJECTS.reduce((n, y) => n + y.items.length, 0)
  const totalCourses = TEACHING.reduce((n, y) => n + y.items.length, 0)
  const academicYears = TEACHING.length
  const totalCommitteePc = COMMITTEES.reduce((n, e) => n + (e.pc?.length || 0), 0)
  const yearsService = COMMITTEES.length
  const summerSchoolsCount = SUMMER_SCHOOLS.length
  const careerStartYears = (() => {
    const ys = PUBLICATIONS
      .map(y => parseInt(y.year, 10))
      .filter(n => !Number.isNaN(n))
    return Math.max(...ys) - Math.min(...ys) + 1
  })()

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
            <span>{totalPublications}+ publications</span>
            <span className="dot" />
            <span>{totalProjects} EU research projects</span>
            <span className="dot" />
            <span>Paris</span>
          </div>
        </div>

        <div className="hero-portrait">
          <img src="https://www.mallouli.com/portrait.jpg" alt="Wissam Mallouli" />
          <div className="portrait-caption">— Paris, 2026</div>
        </div>
      </div>

      <div className="metrics-grid about-metrics">
        <div className="metric"><span className="metric-num">{totalPublications}</span><span className="metric-label">publications</span></div>
        <div className="metric"><span className="metric-num">{totalProjects}</span><span className="metric-label">research projects</span></div>
        <div className="metric"><span className="metric-num">{totalCourses}</span><span className="metric-label">courses taught</span></div>
        <div className="metric"><span className="metric-num">{academicYears}</span><span className="metric-label">academic years</span></div>
        <div className="metric"><span className="metric-num">{totalCommitteePc}</span><span className="metric-label">PC memberships</span></div>
        <div className="metric"><span className="metric-num">{yearsService}</span><span className="metric-label">years of service</span></div>
        <div className="metric"><span className="metric-num">{summerSchoolsCount}</span><span className="metric-label">summer schools</span></div>
        <div className="metric"><span className="metric-num">{careerStartYears}</span><span className="metric-label">years of research</span></div>
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
                {p.pdf && (
                  <a
                    className="pdf-badge"
                    href={`${import.meta.env.BASE_URL.replace(/\/$/, '')}${p.pdf}`}
                    target="_blank"
                    rel="noopener"
                    title="Download PDF"
                  >
                    PDF
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}

function Teaching() {
  const [tab, setTab] = useState('courses')
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? TEACHING : TEACHING.slice(0, 6)

  const totalCourses = TEACHING.reduce((n, y) => n + y.items.length, 0)
  const academicYears = TEACHING.length
  const institutions = new Set(
    TEACHING.flatMap(y => y.items.map(t => (t.where || '').split('—')[0].trim()))
  )
  const summerSchoolsCount = SUMMER_SCHOOLS.length
  const speakerCount = SUMMER_SCHOOLS.filter(s => /Speaker|Organizer/.test(s.role)).length

  const handleKey = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault()
      setTab(tab === 'courses' ? 'summer' : 'courses')
    }
  }

  return (
    <section id="teaching">
      <div className="eyebrow">Lectures · supervision · summer schools</div>
      <h2>Teaching.</h2>

      <div className="metrics-grid">
        <div className="metric"><span className="metric-num">{academicYears}</span><span className="metric-label">academic years</span></div>
        <div className="metric"><span className="metric-num">{totalCourses}</span><span className="metric-label">course assignments</span></div>
        <div className="metric"><span className="metric-num">{institutions.size}</span><span className="metric-label">institutions</span></div>
        <div className="metric"><span className="metric-num">{summerSchoolsCount}</span><span className="metric-label">summer schools</span></div>
        <div className="metric"><span className="metric-num">{speakerCount}</span><span className="metric-label">speaker / organizer roles</span></div>
      </div>

      <div className="tabs" role="tablist" aria-label="Teaching categories" onKeyDown={handleKey}>
        <button
          type="button"
          role="tab"
          id="tab-courses"
          aria-selected={tab === 'courses'}
          aria-controls="panel-courses"
          tabIndex={tab === 'courses' ? 0 : -1}
          className={`tab ${tab === 'courses' ? 'active' : ''}`}
          onClick={() => setTab('courses')}
        >
          University courses
        </button>
        <button
          type="button"
          role="tab"
          id="tab-summer"
          aria-selected={tab === 'summer'}
          aria-controls="panel-summer"
          tabIndex={tab === 'summer' ? 0 : -1}
          className={`tab ${tab === 'summer' ? 'active' : ''}`}
          onClick={() => setTab('summer')}
        >
          Summer schools / TAROT
        </button>
      </div>

      {tab === 'courses' && (
        <div id="panel-courses" role="tabpanel" aria-labelledby="tab-courses">
          {visible.map(({ year, items }) => (
            <div key={year} className="year-block compact">
              <div className="year-label">{year}</div>
              <ul className="teach-list compact">
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
        </div>
      )}

      {tab === 'summer' && (
        <div id="panel-summer" role="tabpanel" aria-labelledby="tab-summer">
          <ul className="teach-list compact summer-list">
            {SUMMER_SCHOOLS.map((s, i) => (
              <li key={i}>
                <strong>{s.name}</strong> — {s.where}
                <span className="meta">{s.role}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

const FLAT_PROJECTS = PROJECTS.flatMap(({ year, items }) =>
  items.map(p => ({ ...p, year }))
)

const PROJECT_PROGRAMS = [...new Set(FLAT_PROJECTS.map(p => p.program).filter(Boolean))].sort()

function Projects() {
  const [query, setQuery] = useState('')
  const [program, setProgram] = useState('all')
  const [sort, setSort] = useState('year-desc')

  const filtered = FLAT_PROJECTS
    .filter(p => program === 'all' || p.program === program)
    .filter(p => {
      const q = query.trim().toLowerCase()
      if (!q) return true
      return p.name.toLowerCase().includes(q) || (p.desc || '').toLowerCase().includes(q)
    })

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'year-asc') return a.year.localeCompare(b.year)
    if (sort === 'name-asc') return a.name.localeCompare(b.name)
    return b.year.localeCompare(a.year)
  })

  const total = FLAT_PROJECTS.length
  const numericYears = FLAT_PROJECTS.map(p => parseInt(p.year, 10)).filter(n => !Number.isNaN(n))
  const yearMin = Math.min(...numericYears)
  const yearMax = Math.max(...numericYears)
  const programCounts = FLAT_PROJECTS.reduce((acc, p) => {
    if (p.program) acc[p.program] = (acc[p.program] || 0) + 1
    return acc
  }, {})
  const topProgram = Object.entries(programCounts).sort((a, b) => b[1] - a[1])[0]

  const reset = () => { setQuery(''); setProgram('all'); setSort('year-desc') }
  const isFiltered = query !== '' || program !== 'all' || sort !== 'year-desc'

  const groups = sorted.reduce((acc, p) => {
    const last = acc[acc.length - 1]
    if (last && last.year === p.year) last.items.push(p)
    else acc.push({ year: p.year, items: [p] })
    return acc
  }, [])

  return (
    <section id="projects">
      <div className="eyebrow">Collaborative European research</div>
      <h2>Projects.</h2>

      <div className="metrics-grid">
        <div className="metric"><span className="metric-num">{total}</span><span className="metric-label">total projects</span></div>
        <div className="metric"><span className="metric-num">{yearMin}–{yearMax}</span><span className="metric-label">year span</span></div>
        <div className="metric"><span className="metric-num">{PROJECT_PROGRAMS.length}</span><span className="metric-label">funding programs</span></div>
        {topProgram && (
          <div className="metric"><span className="metric-num">{topProgram[1]}× {topProgram[0]}</span><span className="metric-label">most frequent</span></div>
        )}
      </div>

      <div className="controls">
        <input
          type="search"
          className="search-input"
          placeholder="Search by name or description…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search projects"
        />
        <select
          className="select"
          value={program}
          onChange={(e) => setProgram(e.target.value)}
          aria-label="Filter by funding program"
        >
          <option value="all">All programs</option>
          {PROJECT_PROGRAMS.map(p => (
            <option key={p} value={p}>{p} ({programCounts[p]})</option>
          ))}
        </select>
        <select
          className="select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort projects"
        >
          <option value="year-desc">Year — newest</option>
          <option value="year-asc">Year — oldest</option>
          <option value="name-asc">Name — A→Z</option>
        </select>
        {isFiltered && (
          <button type="button" className="link-btn" onClick={reset}>Reset</button>
        )}
      </div>

      <div className="results-count">
        {sorted.length} of {total} projects
      </div>

      {groups.length === 0 && (
        <p className="empty-state">No projects match the current filters.</p>
      )}

      {groups.map(({ year, items }) => (
        <div key={year} className="year-block compact">
          <div className="year-label">{year}</div>
          <ul className="proj-list compact">
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

const ROLE_LABELS = {
  pc: 'Program Committee',
  organizing: 'Organizing · Editor',
  evaluation: 'Evaluation Committee',
  reviews: 'Reviews',
}

const FLAT_COMMITTEES = COMMITTEES.flatMap((entry) =>
  Object.entries(ROLE_LABELS).flatMap(([key]) =>
    (entry[key] || []).map(text => ({ year: entry.year, role: key, text }))
  )
)

function Committees() {
  const [query, setQuery] = useState('')
  const [role, setRole] = useState('all')
  const [sort, setSort] = useState('year-desc')

  const filtered = FLAT_COMMITTEES
    .filter(c => role === 'all' || c.role === role)
    .filter(c => {
      const q = query.trim().toLowerCase()
      if (!q) return true
      return c.text.toLowerCase().includes(q)
    })

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'year-asc') return a.year.localeCompare(b.year)
    return b.year.localeCompare(a.year)
  })

  // Counts (computed from full data — not the filtered view)
  const roleCounts = FLAT_COMMITTEES.reduce((acc, c) => {
    acc[c.role] = (acc[c.role] || 0) + 1
    return acc
  }, {})
  const totalEntries = FLAT_COMMITTEES.length
  const yearsOfService = COMMITTEES.length

  const reset = () => { setQuery(''); setRole('all'); setSort('year-desc') }
  const isFiltered = query !== '' || role !== 'all' || sort !== 'year-desc'

  // Group by year, then within a year group by role
  const groupedByYear = sorted.reduce((acc, c) => {
    const last = acc[acc.length - 1]
    if (last && last.year === c.year) last.entries.push(c)
    else acc.push({ year: c.year, entries: [c] })
    return acc
  }, [])

  return (
    <section id="committees">
      <div className="eyebrow">Service to the research community</div>
      <h2>Committees.</h2>

      <div className="metrics-grid">
        <div className="metric"><span className="metric-num">{yearsOfService}</span><span className="metric-label">years of service</span></div>
        <div className="metric"><span className="metric-num">{roleCounts.pc || 0}</span><span className="metric-label">PC memberships</span></div>
        <div className="metric"><span className="metric-num">{roleCounts.organizing || 0}</span><span className="metric-label">organizing roles</span></div>
        <div className="metric"><span className="metric-num">{roleCounts.evaluation || 0}</span><span className="metric-label">evaluations</span></div>
        <div className="metric"><span className="metric-num">{roleCounts.reviews || 0}</span><span className="metric-label">reviews</span></div>
      </div>

      <div className="controls">
        <input
          type="search"
          className="search-input"
          placeholder="Search by venue or conference name…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search committees"
        />
        <select
          className="select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          aria-label="Filter by role"
        >
          <option value="all">All roles</option>
          {Object.entries(ROLE_LABELS).map(([k, label]) => (
            <option key={k} value={k}>{label} ({roleCounts[k] || 0})</option>
          ))}
        </select>
        <select
          className="select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort committees"
        >
          <option value="year-desc">Year — newest</option>
          <option value="year-asc">Year — oldest</option>
        </select>
        {isFiltered && (
          <button type="button" className="link-btn" onClick={reset}>Reset</button>
        )}
      </div>

      <div className="results-count">
        {sorted.length} of {totalEntries} entries
      </div>

      {groupedByYear.length === 0 && (
        <p className="empty-state">No committee entries match the current filters.</p>
      )}

      {groupedByYear.map(({ year, entries }) => {
        const byRole = entries.reduce((acc, c) => {
          (acc[c.role] = acc[c.role] || []).push(c.text)
          return acc
        }, {})
        return (
          <div key={year} className="year-block compact">
            <div className="year-label">{year}</div>
            <div>
              {Object.entries(ROLE_LABELS).map(([k, label]) =>
                byRole[k] && (
                  <div key={k} className="committee-section">
                    <h4>{label}</h4>
                    <ul className="com-list">
                      {byRole[k].map((x, i) => <li key={i}>{x}</li>)}
                    </ul>
                  </div>
                )
              )}
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default App
