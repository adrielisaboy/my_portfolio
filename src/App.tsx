import { useState, useCallback } from 'react';
import Preloader from './components/Preloader.jsx';
import Navigation from './components/Navigation.jsx';
import Footer from './components/Footer.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Skills from './sections/Skills.jsx';
import Projects from './sections/Projects.jsx';
import Experience from './sections/Experience.jsx';
import Creative from './sections/Creative.jsx';
import Certificates from './sections/Certificates.jsx';
import Files from './sections/Files.jsx';
import Contact from './sections/Contact.jsx';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  // Called by Preloader when its GSAP timeline finishes — unlocks the hero entrance.
  const handleComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
      <Preloader onComplete={handleComplete} />
      <Navigation />
      <main>
        <Hero ready={loaded} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Creative />
        <Certificates />
        <Files />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
