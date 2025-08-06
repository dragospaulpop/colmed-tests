import React, { useEffect, useState } from 'react';
import styles from './BenefitsSection.module.css';

const BenefitsSection: React.FC = () => {
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

    const section = document.getElementById('avantaje');
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
      title: 'Eficiență Crescută',
      description: 'Optimizează programările și comunicarea internă pentru o productivitate maximă',
      icon: 'efficiency',
      features: [
        'Programări automatizate și optimizate',
        'Comunicare internă instantanee',
        'Reducerea timpului administrativ',
        'Fluxuri de lucru simplificate'
      ]
    },
    {
      title: 'Experiență Modernă',
      description: 'Interfață intuitivă și modernă pentru personal medical și pacienți',
      icon: 'experience',
      features: [
        'Design modern și intuitiv',
        'Interfață touchscreen optimizată',
        'Experiență utilizator superioară',
        'Acces rapid la informații'
      ]
    },
    {
      title: 'Integrare Completă',
      description: 'Conectează toate sistemele într-o singură platformă unificată',
      icon: 'integration',
      features: [
        'Centrală telefonică integrată',
        'Modul WhatsApp integrat',
        'Sincronizare în timp real',
        'API-uri pentru integrări externe'
      ]
    },
    {
      title: 'Personalizare și Extensibilitate',
      description: 'Adaptează platforma la nevoile specifice ale organizației tale',
      icon: 'customization',
      features: [
        'Dashboard-uri personalizabile',
        'Configurări flexibile',
        'Module extensibile',
        'Adaptare la workflow-uri specifice'
      ]
    },
    {
      title: 'Rapoarte și Exporturi',
      description: 'Generează rapoarte detaliate și exportă date în multiple formate',
      icon: 'reports',
      features: [
        'Exporturi PDF și XLS',
        'Rapoarte personalizate',
        'Notificări automate',
        'Analize și statistici avansate'
      ]
    }
  ];

  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'efficiency':
        return (
          <svg viewBox="0 0 24 24" fill="none" className={styles.icon}>
            <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        );
      case 'experience':
        return (
          <svg viewBox="0 0 24 24" fill="none" className={styles.icon}>
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M21 9V7C21 5.9 20.1 5 19 5H5C3.9 5 3 5.9 3 7V9" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M3 9V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V9" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M9 9V21" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M15 9V21" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        );
      case 'integration':
        return (
          <svg viewBox="0 0 24 24" fill="none" className={styles.icon}>
            <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M8 12L10 14L16 8" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        );
      case 'customization':
        return (
          <svg viewBox="0 0 24 24" fill="none" className={styles.icon}>
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M19.4 15A1.65 1.65 0 0 0 21 13.09A1.65 1.65 0 0 0 19.4 9M14.5 4.1A1.65 1.65 0 0 0 11.91 3A1.65 1.65 0 0 0 9.5 4.1M9.5 19.9A1.65 1.65 0 0 0 12.09 21A1.65 1.65 0 0 0 14.5 19.9M4.6 15A1.65 1.65 0 0 0 3 13.09A1.65 1.65 0 0 0 4.6 9" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        );
      case 'reports':
        return (
          <svg viewBox="0 0 24 24" fill="none" className={styles.icon}>
            <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M16 13H8" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M16 17H8" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M10 9H8" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="avantaje" className={styles.benefitsSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Header */}
          <div className={`${styles.header} ${isVisible ? styles.fadeInUp : ''}`}>
            <h2 className={styles.title}>
              Avantajele Platformei Colmed
            </h2>
            <div className={styles.titleUnderline}></div>
            <p className={styles.subtitle}>
              Descoperă cum Colmed transformă complet modul în care funcționează instituțiile medicale
            </p>
          </div>

          {/* Benefits Grid */}
          <div className={`${styles.benefitsGrid} ${isVisible ? styles.fadeInUp : ''}`}>
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className={styles.benefitCard}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.benefitIcon}>
                  <div className={styles.iconCircle}>
                    {renderIcon(benefit.icon)}
                  </div>
                </div>
                
                <div className={styles.benefitContent}>
                  <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                  <p className={styles.benefitDescription}>{benefit.description}</p>
                  
                  <ul className={styles.featuresList}>
                    {benefit.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className={styles.featureItem}>
                        <span className={styles.checkIcon}>✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className={`${styles.ctaSection} ${isVisible ? styles.fadeInUp : ''}`}>
            <div className={styles.ctaContent}>
              <h3 className={styles.ctaTitle}>
                Transformă-ți clinica cu Colmed
              </h3>
              <p className={styles.ctaDescription}>
                Experimentează toate aceste avantaje într-o singură platformă integrată
              </p>
              <button className={styles.ctaButton}>
                Solicită o Demonstrație
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;