import './App.css';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import FeaturesSection from './components/sections/FeaturesSection';
import DemoSection from './components/sections/DemoSection';
import TechSection from './components/sections/TechSection';
import BenefitsSection from './components/sections/BenefitsSection';
import ContactSection from './components/sections/ContactSection';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <DemoSection />
        <TechSection />
        <BenefitsSection />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
