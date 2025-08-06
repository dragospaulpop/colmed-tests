import React, { useEffect, useState } from 'react';
import { Logo } from '../../ui/Logo/Logo';
import styles from './AboutSection.module.css';

const AboutSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('about');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const benefits = [
    {
      title: 'Digitalizare Completă',
      description: 'Transformă procesele tradiționale în fluxuri digitale moderne și eficiente'
    },
    {
      title: 'Eficientizare Operațională',
      description: 'Optimizează timpul personalului medical și reduce erorile administrative'
    },
    {
      title: 'Funcționalități Avansate',
      description: 'Integrează tehnologii moderne pentru o experiență superioară'
    }
  ];

  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Logo and Title */}
          <div className={`${styles.header} ${isVisible ? styles.fadeInUp : ''}`}>
            <div className={styles.logoContainer}>
              <Logo variant="primary" size="lg" />
            </div>
            <h2 className={styles.title}>
              Despre Colmed
            </h2>
            <div className={styles.titleUnderline}></div>
          </div>

          {/* Main Content */}
          <div className={styles.mainContent}>
            {/* Platform Description */}
            <div className={`${styles.description} ${isVisible ? styles.fadeInLeft : ''}`}>
              <h3 className={styles.subtitle}>
                Platforma Medicală Completă
              </h3>
              <p className={styles.text}>
                Colmed este o soluție software completă și adaptabilă, concepută special pentru 
                clinici și cabinete medicale moderne. Platforma noastră integrează toate aspectele 
                esențiale ale managementului medical într-un singur ecosistem digital.
              </p>
              <p className={styles.text}>
                De la gestionarea programărilor și pacienților, până la coordonarea echipelor medicale 
                și comunicarea internă, Colmed oferă instrumentele necesare pentru a transforma 
                complet modul în care funcționează instituțiile medicale.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className={`${styles.benefitsGrid} ${isVisible ? styles.fadeInRight : ''}`}>
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className={styles.benefitCard}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={styles.benefitIcon}>
                    <div className={styles.iconCircle}>
                      {index === 0 && (
                        <svg viewBox="0 0 24 24" fill="none" className={styles.icon}>
                          <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                          <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" fill="none"/>
                        </svg>
                      )}
                      {index === 1 && (
                        <svg viewBox="0 0 24 24" fill="none" className={styles.icon}>
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                          <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" fill="none"/>
                        </svg>
                      )}
                      {index === 2 && (
                        <svg viewBox="0 0 24 24" fill="none" className={styles.icon}>
                          <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                        </svg>
                      )}
                    </div>
                  </div>
                  <h4 className={styles.benefitTitle}>{benefit.title}</h4>
                  <p className={styles.benefitDescription}>{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Features Overview */}
          <div className={`${styles.featuresOverview} ${isVisible ? styles.fadeInUp : ''}`}>
            <h3 className={styles.featuresTitle}>
              Soluție Integrată pentru Managementul Medical
            </h3>
            <div className={styles.featuresList}>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>📅</span>
                <span>Gestionarea Programărilor</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>👥</span>
                <span>Managementul Pacienților</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>👨‍⚕️</span>
                <span>Coordonarea Doctorilor</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🏥</span>
                <span>Gestionarea Structurii</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>💬</span>
                <span>Comunicare Internă</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>📞</span>
                <span>Call-center Integrat</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;