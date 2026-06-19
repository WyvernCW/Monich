import React from "react";
import ScrollShowcase from "./components/ScrollShowcase.jsx";

function App() {
  return (
    <div className="site-shell">
      <header className="topbar" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Atelier home">
          <span className="brand-mark" aria-hidden="true" />
          <span>Atelier Forma</span>
        </a>
        <nav className="nav-links" aria-label="Template sections">
          <a href="#showcase">Assembly</a>
          <a href="#materials">Materials</a>
          <a href="#notes">Notes</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Furniture scroll showcase</p>
            <h1 id="hero-title">A compact desktop assembled in mid-air.</h1>
            <p className="hero-lede">
              A warmer editorial template for real object storytelling. The
              compact desktop begins as separate aluminum shell, underside vent,
              port bank, logic board, cooling fan, and tiny front LED, then joins into a recognizable mini computer.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#showcase">Assemble desktop</a>
              <a className="button ghost" href="#materials">See materials</a>
            </div>
          </div>

          <aside className="hero-panel" aria-label="Furniture details">
            <div className="panel-header">
              <span>Object</span>
              <strong>Compact desktop</strong>
            </div>
            <div className="telemetry-grid">
              <div className="metric"><strong>06</strong><span>joining parts</span></div>
              <div className="metric"><strong>03</strong><span>visible materials</span></div>
              <div className="metric"><strong>0</strong><span>external assets</span></div>
            </div>
            <div className="track-list" aria-label="Furniture module checklist">
              <span>Aluminum shell</span>
              <span>Logic board</span>
              <span>Port bank</span>
              <span>Cooling vent</span>
            </div>
          </aside>
        </section>

        <ScrollShowcase />

        <section className="system-section" id="materials" aria-labelledby="materials-title">
          <p className="eyebrow">Material language</p>
          <h2 id="materials-title">Anodized aluminum, dark vent ring, precise rear ports.</h2>
          <div className="system-grid">
            <article>
              <span className="card-index">01</span>
              <h3>Recognizable Object</h3>
              <p>The model reads as a compact desktop from silhouette alone: square aluminum puck, underside vent, rear ports, front LED, and internal board.</p>
            </article>
            <article>
              <span className="card-index">02</span>
              <h3>Physical Assembly</h3>
              <p>Parts do not just fade. They translate and rotate from exploded positions into believable join points.</p>
            </article>
            <article>
              <span className="card-index">03</span>
              <h3>Editorial Layout</h3>
              <p>Warm background, product-catalog spacing, and quiet annotations replace the previous tech-dashboard look.</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="footer" id="notes">
        <span>Furniture object showcase</span>
        <span>React + Motion + Three.js, generated geometry only.</span>
      </footer>
    </div>
  );
}

export default App;
