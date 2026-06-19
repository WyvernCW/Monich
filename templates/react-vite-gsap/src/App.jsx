import React from "react";
import PinnedShowcase from "./components/PinnedShowcase.jsx";

function App() {
  return (
    <div className="page-shell">
      <header className="site-header" aria-label="Primary navigation">
        <a className="identity" href="#top" aria-label="Object studio home">
          <span className="identity-mark" aria-hidden="true" />
          <span>Object Studio</span>
        </a>
        <nav className="header-nav" aria-label="Page sections">
          <a href="#pin">Reveal</a>
          <a href="#specs">Craft</a>
          <a href="#footer">Build</a>
        </nav>
      </header>

      <main id="top">
        <section className="intro" aria-labelledby="intro-title">
          <div className="intro-copy">
            <p className="kicker">Pinned object assembly</p>
            <h1 id="intro-title">A 5090-class graphics card built by scroll.</h1>
          </div>
          <div className="intro-brief" aria-label="Reveal summary">
            <p>
              A recognizable enthusiast GPU replaces the furniture object.
              PCB, heatsink fins, dual fans, shroud, PCIe teeth, IO bracket, and power connector begin
              detached, then attach into a finished 5090-class graphics card.
            </p>
            <span>Generated geometry, no external assets</span>
          </div>
        </section>

        <PinnedShowcase />

        <section className="spec-section" id="specs" aria-labelledby="spec-title">
          <p className="kicker">Craft notes</p>
          <h2 id="spec-title">Dual fans, heatpipes, PCIe edge, IO bracket, and power socket.</h2>
          <div className="spec-grid">
            <article>
              <span>Object</span>
              <h3>Readable silhouette</h3>
              <p>The twin fans, long shroud, heatsink fins, gold PCIe teeth, rear IO plate, and 5090 label make the model understandable at a glance.</p>
            </article>
            <article>
              <span>Scroll</span>
              <h3>Physical joining</h3>
              <p>The GSAP timeline scrubs a Three.js progress value that moves each lamp part into its final socket.</p>
            </article>
            <article>
              <span>Style</span>
              <h3>Interior editorial</h3>
              <p>Warm surfaces, product-catalog typography, and restrained labels make it feel like furniture design.</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="footer">
        <span>5090-class GPU object showcase</span>
        <span>React + Vite + GSAP + Three.js</span>
      </footer>
    </div>
  );
}

export default App;
