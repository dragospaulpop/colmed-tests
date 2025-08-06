import React, { useEffect, useState } from 'react';
import { Card, CardBody } from '../../ui/Card/Card';
import { Icon } from '../../ui/Icon/Icon';
import styles from './FeaturesSection.module.css';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'core' | 'special';
  benefits?: string[];
}

const FeaturesSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('features');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  // Core features (8 modules)
  const coreFeatures: Feature[] = [
    {
      id: 'appointments',
      title: 'Programări Medicale',
      description: 'Sistem complet de gestionare a programărilor cu calendar interactiv, notificări automate și sincronizare în timp real.',
      icon: 'calendar',
      category: 'core'
    },
    {
      id: 'patients',
      title: 'Gestionare Pacienți',
      description: 'Dosare medicale digitale complete cu istoric, documente, analize și comunicare directă cu pacienții.',
      icon: 'users',
      category: 'core'
    },
    {
      id: 'tickets',
      title: 'Modul Tickete',
      description: 'Sistem de ticketing pentru gestionarea solicitărilor, problemelor și comunicării interne eficiente.',
      icon: 'ticket',
      category: 'core'
    },
    {
      id: 'structure',
      title: 'Gestionare Structură',
      description: 'Administrarea clinicilor, specialităților, serviciilor medicale și organizarea ierarhică a instituției.',
      icon: 'building',
      category: 'core'
    },
    {
      id: 'doctors',
      title: 'Modul Doctori',
      description: 'Gestionarea programului medicilor, specializărilor, disponibilității și performanțelor profesionale.',
      icon: 'stethoscope',
      category: 'core'
    },
    {
      id: 'chat',
      title: 'Chat Intern',
      description: 'Comunicare instantanee între membrii echipei medicale cu grupuri, canale și mesagerie securizată.',
      icon: 'chat',
      category: 'core'
    },
    {
      id: 'dashboard',
      title: 'Dashboard Personalizat',
      description: 'Tablouri de bord adaptabile cu metrici în timp real, rapoarte și vizualizări personalizate.',
      icon: 'dashboard',
      category: 'core'
    },
    {
      id: 'callcenter',
      title: 'Call-center Integrat',
      description: 'Centrală telefonică integrată cu înregistrări, distribuție apeluri și management cozi de așteptare.',
      icon: 'phone',
      category: 'core'
    }
  ];

  // Special features (3 modules)
  const specialFeatures: Feature[] = [
    {
      id: 'monitoring',
      title: 'Sistem Monitorizare',
      description: 'Monitorizarea traficului, cozilor de așteptare și performanțelor în timp real cu alerte inteligente.',
      icon: 'monitor',
      category: 'special'
    },
    {
      id: 'whatsapp',
      title: 'Modul WhatsApp',
      description: 'Asistent virtual inteligent integrat pentru comunicare automată cu pacienții și programări.',
      icon: 'whatsapp',
      category: 'special',
      benefits: [
        'Programări automate prin WhatsApp',
        'Notificări și reminder-uri personalizate',
        'Răspunsuri inteligente la întrebări frecvente',
        'Integrare completă cu sistemul de programări'
      ]
    },
    {
      id: 'patient-app',
      title: 'Aplicația Pacient',
      description: 'Aplicație mobilă dedicată pacienților pentru programări, consultarea rezultatelor și comunicare directă.',
      icon: 'mobile',
      category: 'special',
      benefits: [
        'Programări online simple și rapide',
        'Acces la rezultate și istoric medical',
        'Notificări push pentru programări',
        'Chat direct cu echipa medicală'
      ]
    }
  ];

  const allFeatures = [...coreFeatures, ...specialFeatures];

  return (
    <section id="features" className={styles.featuresSection}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={`${styles.header} ${isVisible ? styles.fadeInUp : ''}`}>
          <h2 className={styles.title}>
            Funcționalități Principale
          </h2>
          <p className={styles.subtitle}>
            Descoperă modulele complete care transformă modul în care funcționează clinica ta
          </p>
          <div className={styles.titleUnderline}></div>
        </div>

        {/* Features Grid */}
        <div className={`${styles.featuresGrid} ${isVisible ? styles.fadeInUp : ''}`}>
          {allFeatures.map((feature, index) => (
            <Card
              key={feature.id}
              variant="feature"
              hoverable
              className={`${styles.featureCard} ${
                hoveredCard === feature.id ? styles.hovered : ''
              }`}
              onMouseEnter={() => setHoveredCard(feature.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <CardBody>
                <div className={styles.featureContent}>
                  {/* Icon */}
                  <div className={styles.iconContainer}>
                    <div className={`${styles.iconWrapper} ${
                      feature.category === 'special' ? styles.specialIcon : ''
                    }`}>
                      <Icon 
                        name={feature.icon} 
                        size="lg" 
                        className={styles.featureIcon}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={styles.textContent}>
                    <h3 className={styles.featureTitle}>
                      {feature.title}
                    </h3>
                    <p className={styles.featureDescription}>
                      {feature.description}
                    </p>

                    {/* Benefits for special features */}
                    {feature.benefits && (
                      <div className={styles.benefitsList}>
                        <h4 className={styles.benefitsTitle}>Beneficii cheie:</h4>
                        <ul className={styles.benefits}>
                          {feature.benefits.map((benefit, benefitIndex) => (
                            <li key={benefitIndex} className={styles.benefit}>
                              <Icon name="check" size="sm" className={styles.checkIcon} />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Hover Effect Arrow */}
                  <div className={styles.hoverArrow}>
                    <Icon name="arrow" size="sm" />
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Section Footer */}
        <div className={`${styles.footer} ${isVisible ? styles.fadeInUp : ''}`}>
          <p className={styles.footerText}>
            Toate modulele sunt integrate într-o singură platformă pentru o experiență unitară și eficientă
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;