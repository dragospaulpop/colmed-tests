import React, { useEffect, useState } from 'react';
import { SITE_CONFIG } from '../../../utils/constants';
import heroMedicalImage from '../../../assets/images/hero-medical.svg';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  onCtaClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onCtaClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      // Default behavior - scroll to features section
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="hero" className={styles.heroSection}>
      {/* Gradient Background */}
      <div className={styles.gradientBackground}></div>
      
      <div className={styles.container}>
        <div className={styles.heroContent}>
          {/* Text Content - 60% */}
          <div className={`${styles.textContent} ${isVisible ? styles.fadeInLeft : ''}`}>
            <h1 className={styles.title}>
              {SITE_CONFIG.title}
            </h1>
            <p className={styles.subtitle}>
              {SITE_CONFIG.description}
            </p>
            <button 
              className={styles.ctaButton}
              onClick={handleCtaClick}
              aria-label="Descoperă mai multe despre Colmed"
            >
              Descoperă Colmed
            </button>
            
            {/* Company and Year Information */}
            <div className={styles.companyInfo}>
              <span className={styles.year}>{SITE_CONFIG.year}</span>
              <span className={styles.separator}>•</span>
              <span className={styles.company}>{SITE_CONFIG.name} by {SITE_CONFIG.company}</span>
            </div>
          </div>

          {/* Visual Content - 40% */}
          <div className={`${styles.visualContent} ${isVisible ? styles.fadeInRight : ''}`}>
            <div className={styles.heroImageContainer}>
              <img 
                src={heroMedicalImage}
                alt="Platformă medicală digitalizată Colmed - Dashboard pentru gestionarea pacienților și programărilor"
                className={styles.heroImage}
              />
              
              {/* Floating Animation Elements */}
              <div className={styles.floatingElement1}></div>
              <div className={styles.floatingElement2}></div>
              <div className={styles.floatingElement3}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;