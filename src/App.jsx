import { useState } from 'react'
import './index.css'

function App() {
  const [currentPage, setCurrentPage] = useState('about')

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <About />
      case 'publications':
        return <Publications />
      case 'teaching':
        return <Teaching />
      case 'projects':
        return <Projects />
      case 'committees':
        return <Committees />
      default:
        return <About />
    }
  }

  return (
    <div className="container">
      <header className="header">
        <nav className="nav">
          <a href="#about" onClick={(e) => { e.preventDefault(); setCurrentPage('about') }} className={currentPage === 'about' ? 'active' : ''}>About me</a>
          <a href="#publications" onClick={(e) => { e.preventDefault(); setCurrentPage('publications') }} className={currentPage === 'publications' ? 'active' : ''}>Publications</a>
          <a href="#teaching" onClick={(e) => { e.preventDefault(); setCurrentPage('teaching') }} className={currentPage === 'teaching' ? 'active' : ''}>Teaching</a>
          <a href="#projects" onClick={(e) => { e.preventDefault(); setCurrentPage('projects') }} className={currentPage === 'projects' ? 'active' : ''}>Projects</a>
          <a href="#committees" onClick={(e) => { e.preventDefault(); setCurrentPage('committees') }} className={currentPage === 'committees' ? 'active' : ''}>Committees</a>
        </nav>
      </header>

      <main className="main">
        {renderPage()}
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Wissam Mallouli. All rights reserved.</p>
      </footer>
    </div>
  )
}

function About() {
  return (
    <section id="about">
      <div className="profile-section">
        <div className="portrait">
          <img src="https://www.mallouli.com/portrait.jpg" alt="Wissam Mallouli" width="200" />
        </div>
        <h1>Wissam Mallouli</h1>
        <div className="contact-details">
          <p><strong>Contact details - Professional</strong></p>
          <p>Montimage</p>
          <p>39 rue Bobillot</p>
          <p>75013, Paris Cedex, France</p>
          <p>Phone: +33 (0) 6 95 93 33 39</p>
          <p>E-mail: <a href="mailto:wissam.mallouli@montimage.com">wissam.mallouli@montimage.com</a></p>
        </div>
      </div>

      <div className="bio">
        <h2>About me</h2>
        <p>Dr. Wissam Mallouli is currently the CTO of <a href="https://www.montimage.com">Montimage</a> company located in Paris, France. He got his Telecommunication Engineer degree from the National Institute of Telecommunication (INT) in 2005 and his PhD in cybersecurity from Telecom and Management SudParis (France) in 2008. His expertise covers continuous risk management and cyberdefense of critical systems and networks including cloud-based systems, IoT and 4G/5G networks. He is working in several collaborative European research projects and has more than 50 scientific publications in popular conferences and journals.</p>
      </div>
    </section>
  )
}

function Publications() {
  return (
    <section id="publications">
      <h2>Publications</h2>

      <div className="pub-year">
        <h3>2026</h3>
        <ul>
          <li>
            <span className="authors">Kitty Kioskli, Eleni Seralidou, Wissam Mallouli, Dimitrios Koutras, Pedro Tomas, and Dimitrios Kallergis (2026).</span>
            <span className="title"> A human-centric AI-enabled ecosystem for SME cybersecurity: Cross-sectoral practices and adaptation framework for maritime defence.</span>
            <span className="venue"> Electronics Journal, 2026, Volume 15, Article 1520.</span>
            <a href="https://doi.org/10.3390/electronics15071520" target="_blank" rel="noopener">DOI</a>
          </li>
        </ul>
      </div>

      <div className="pub-year">
        <h3>2025</h3>
        <ul>
          <li>
            <span className="authors">Phu Hong Nguyen, Hui Song, Rustem Dautov, Nicolas Ferry, Angel Rego, Erkuden Rios, Eider Iturbe, Valeria Valdes, Ana Rosa Cavalli, Wissam Mallouli.</span>
            <span className="title"> Knowledge Systematization for Security Orchestration in CPS and IoT Systems.</span>
            <span className="venue"> CSR 2025, pp 672-678.</span>
          </li>
          <li>
            <span className="authors">Assia Belbachir, Antonio M. Ortiz, Ahmed Nabil Belbachir, Wissam Mallouli, An Ngoc Lam, Akhilesh Kumar Srivastava, Martin Hemmer.</span>
            <span className="title"> COGNIMAN Digital Twin Architecture for Flexible Manufacturing.</span>
            <span className="venue"> Journal of Intelligent Manufacturing.</span>
            <a href="https://doi.org/10.1007/s10845-025-02625-1" target="_blank" rel="noopener">DOI</a>
          </li>
        </ul>
      </div>

      <div className="pub-year">
        <h3>2024</h3>
        <ul>
          <li>
            <span className="authors">Ana Rosa Cavalli, Wissam Mallouli, Edgardo Montes de Oca, and Diego Rivera.</span>
            <span className="title"> IoT Security Monitoring Tools and Models.</span>
            <span className="venue"> Springer Handbook of Internet of Things.</span>
          </li>
          <li>
            <span className="authors">An Ngoc Lam, Goran Brekke Svaland, Miguel Angel Barcelona, Shane Keaveney, Wissam Mallouli, Luong Nguyen, Assia Belbachir, Xiang Ma, Akhilesh Kumar Srivastava, and Ahmed Nabil Belbachir.</span>
            <span className="title"> SINDIT: A Framework for Knowledge Graph-Based Digital Twins in Smart Manufacturing.</span>
            <span className="venue"> IoT 2024 Graal4IoT Workshop.</span>
          </li>
        </ul>
      </div>

      <p className="more-link"><a href="http://www.mallouli.com/publication.php">More publications...</a></p>
    </section>
  )
}

function Teaching() {
  return (
    <section id="teaching">
      <h2>Teaching</h2>

      <div className="teaching-year">
        <h3>2017 - 2018</h3>
        <ul>
          <li>Lecture "Java" in l'Ecole ESME Sudria for Master 2 Master of science (20 hours)</li>
          <li>Lecture "Javascript" in l'Ecole ESME Sudria for Master 2 Master of science (20 hours)</li>
          <li>Lecture "Protocol Engineering" in University Paris VII Diderot for Master 2 SRI (6 hours)</li>
          <li>Lecture "Network traffic analysis based on DPI" in ESME Sudria Engineering School for Master 2 3BR Electronics and Telecoms (28 hours)</li>
        </ul>
      </div>

      <div className="teaching-year">
        <h3>2016 - 2017</h3>
        <ul>
          <li>CM "Java" in l'Ecole ESME Sudria for Master 2 Master of science (16 hours)</li>
          <li>CM "Javascript" in l'Ecole ESME Sudria for Master 2 Master of science (16 hours)</li>
          <li>CM "Network traffic analysis based on DPI" in l'Ecole ESME Sudria for Master 2 3BR Electronique Télécoms (24 hours)</li>
          <li>Lecture "Protocol Engineering" in University Paris VII Diderot for Master 2 SRI (6 hours)</li>
        </ul>
      </div>

      <div className="teaching-year">
        <h3>2015 - 2016</h3>
        <ul>
          <li>CM "Conception de protocoles réseaux" in l'Ecole ESME Sudria for Master 2 A2R Informatique et Réseaux (12 hours)</li>
          <li>CM "Passive testing" in Genopole for Master 2 Biology (mSSB) (6 hours)</li>
          <li>CM "Ingénierie des protocoles" in l'Université Paris VII Diderot for Master 2 SRI (6 hours)</li>
          <li>Encadrement "Deep Packet Inspection" in l'Ecole ESME Sudria for Master 2 B Electronique Télécoms (30 hours)</li>
        </ul>
      </div>

      <div className="summer-schools">
        <h3>Summer Schools</h3>
        <ul>
          <li>TAROT 2017 : 13th International Summer School on Training And Research On Testing (Naples, Italy) - Organizer + Speaker</li>
          <li>TAROT 2016 : 12th International Summer School on Training And Research On Testing (Porto, Portugal) - Organizer + Speaker</li>
          <li>TAROT 2015 : 11th International Summer School on Training And Research On Testing (Porto, Portugal) - Speaker</li>
        </ul>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects">
      <h2>Projects</h2>

      <div className="project-year">
        <h3>2017</h3>
        <ul>
          <li>
            <strong>MoNet</strong> - Montimage deploys its MMT monitoring tool to detect functional and security anomalies in Softfire platforms.
            <br /><span className="dates">Start: 2017-11-15 - End: 2018-02-15</span>
          </li>
          <li>
            <strong>SAINT</strong> - Analysis of cybercriminal activity ecosystems and development of a framework for fighting cybercrime.
            <br /><span className="dates">Start: 2017-05-01 - End: 2019-04-30</span>
          </li>
          <li>
            <strong>ANASTACIA</strong> - H2020 research project on cyber-security for Cyber Physical Systems (CPS) based on IoT and Cloud architectures.
            <br /><span className="dates">Start: 2017-01-01 - End: 2019-12-31</span>
          </li>
        </ul>
      </div>

      <div className="project-year">
        <h3>2015</h3>
        <ul>
          <li>
            <strong>MEASURE</strong> - ITEA3 project for automated and continuous measurement in software engineering.
            <br /><span className="dates">Start: 2015-12-01 - End: 2019-02-28</span>
          </li>
          <li>
            <strong>CLARUS</strong> - Security framework for cloud computing data storage and processing.
            <br /><span className="dates">Start: 2015-01-01 - End: 2017-12-31</span>
          </li>
          <li>
            <strong>MUSA</strong> - Security-intelligent lifecycle management of distributed applications over heterogeneous cloud resources.
            <br /><span className="dates">Start: 2015-01-01 - End: 2017-12-31</span>
          </li>
        </ul>
      </div>

      <div className="project-year">
        <h3>2014</h3>
        <ul>
          <li>
            <strong>DOCTOR</strong> - Network Virtualization Function (NFV) security and monitoring in virtualized environments.
            <br /><span className="dates">Start: 2014-10-01 - End: 2018-03-31</span>
          </li>
        </ul>
      </div>
    </section>
  )
}

function Committees() {
  return (
    <section id="committees">
      <h2>Committees</h2>

      <div className="committee-year">
        <h3>2026</h3>
        <div className="committee-section">
          <h4>Program Committee Member</h4>
          <ul>
            <li>ICICNCT 2026 - 2nd International Conference on Intelligent Communication Networks and Computational Techniques</li>
            <li>ICTSS 2026 - The 38th International Conference on Testing Software and Systems</li>
            <li>CSR 2026 - IEEE International Conference on Cyber Security and Resilience</li>
            <li>SecSoft 2026 - The 11th IEEE International Conference on Network Softwarization</li>
          </ul>
        </div>
        <div className="committee-section">
          <h4>Reviews</h4>
          <ul>
            <li>ICSOFT 2026, SecSoft 2026, CSR 2026</li>
          </ul>
        </div>
      </div>

      <div className="committee-year">
        <h3>2025</h3>
        <div className="committee-section">
          <h4>Program Committee Member</h4>
          <ul>
            <li>CSR 2025 - The IEEE International Conference on Cyber Security and Resilience</li>
            <li>STAM 2025 - The 5th International Workshop on Security Testing and Monitoring</li>
            <li>DT4DRS 2025 - Workshop on Digital Twins for Dependability, Resilience and Security</li>
          </ul>
        </div>
        <div className="committee-section">
          <h4>Reviews</h4>
          <ul>
            <li>Journal of Network and Computer Applications, Computer Science Journal, FPS 2025</li>
          </ul>
        </div>
      </div>

      <div className="committee-year">
        <h3>2024</h3>
        <div className="committee-section">
          <h4>Program Committee Member</h4>
          <ul>
            <li>TrustCom 2024 - The 23rd IEEE International Conference on Trust, Security and Privacy in Computing and Communications</li>
            <li>STAM 2024 - The 4th International Workshop on Security Testing and Monitoring</li>
            <li>CloudCom 2024 - The 15th IEEE International conference on cloud computing technology and science</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default App