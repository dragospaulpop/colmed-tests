import React, { useEffect, useState } from 'react';
import styles from './TechSection.module.css';

const TechSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'backend' | 'frontend'>('backend');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('arhitectura');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const backendTechnologies = [
    {
      name: 'NestJS',
      description: 'Framework modern pentru dezvoltarea aplicațiilor server scalabile și robuste',
      icon: '🚀',
      benefits: ['Arhitectură modulară', 'TypeScript nativ', 'Performanță ridicată']
    },
    {
      name: 'Prisma ORM',
      description: 'Sistem avansat de gestionare a bazelor de date cu type-safety complet',
      icon: '🗄️',
      benefits: ['Migrări automate', 'Query-uri optimizate', 'Type-safety']
    },
    {
      name: 'PostgreSQL',
      description: 'Bază de date relațională enterprise-grade pentru siguranța datelor medicale',
      icon: '🐘',
      benefits: ['ACID compliance', 'Backup automat', 'Scalabilitate']
    },
    {
      name: 'Multi-tenancy',
      description: 'Arhitectură care permite izolarea completă a datelor între clinici',
      icon: '🏢',
      benefits: ['Izolare date', 'Securitate maximă', 'Costuri optimizate']
    },
    {
      name: 'JWT Authentication',
      description: 'Sistem de autentificare securizat pentru protecția datelor sensibile',
      icon: '🔐',
      benefits: ['Securitate avansată', 'Session management', 'Role-based access']
    },
    {
      name: 'SIP Integration',
      description: 'Integrare nativă cu sistemele telefonice pentru call-center integrat',
      icon: '📞',
      benefits: ['Apeluri integrate', 'Recording automat', 'Queue management']
    }
  ];

  const frontendTechnologies = [
    {
      name: 'React.js',
      description: 'Biblioteca JavaScript modernă pentru interfețe utilizator reactive și rapide',
      icon: '⚛️',
      benefits: ['Componente reutilizabile', 'Virtual DOM', 'Ecosistem vast']
    },
    {
      name: 'Redux Toolkit',
      description: 'Managementul centralizat al stării aplicației pentru consistență și predictibilitate',
      icon: '🔄',
      benefits: ['State management', 'Time-travel debugging', 'Middleware support']
    },
    {
      name: 'Responsive Design',
      description: 'Interfață adaptabilă care funcționează perfect pe toate dispozitivele',
      icon: '📱',
      benefits: ['Mobile-first', 'Breakpoints adaptive', 'Cross-browser']
    },
    {
      name: 'Touchscreen Optimized',
      description: 'Optimizat special pentru tablete medicale și dispozitive touch',
      icon: '👆',
      benefits: ['Touch gestures', 'Large touch targets', 'Swipe navigation']
    },
    {
      name: 'TypeScript',
      description: 'Dezvoltare type-safe pentru reducerea erorilor și mentenanță ușoară',
      icon: '📝',
      benefits: ['Type safety', 'IntelliSense', 'Refactoring sigur']
    },
    {
      name: 'PWA Ready',
      description: 'Tehnologie Progressive Web App pentru experiență nativă pe mobile',
      icon: '📲',
      benefits: ['Offline support', 'Push notifications', 'App-like experience']
    }
  ];

  return (
    <section id="arhitectura" className={styles.techSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Header */}
          <div className={`${styles.header} ${isVisible ? styles.fadeInUp : ''}`}>
            <h2 className={styles.title}>
              Arhitectura Tehnică
            </h2>
            <div className={styles.titleUnderline}></div>
            <p className={styles.subtitle}>
              Colmed este construit pe o arhitectură modernă și scalabilă, 
              utilizând cele mai avansate tehnologii pentru a asigura performanță, 
              securitate și fiabilitate maximă.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className={`${styles.tabNavigation} ${isVisible ? styles.fadeInUp : ''}`}>
            <button
              className={`${styles.tabButton} ${activeTab === 'backend' ? styles.active : ''}`}
              onClick={() => setActiveTab('backend')}
            >
              <span className={styles.tabIcon}>⚙️</span>
              <span className={styles.tabLabel}>Backend & Infrastructure</span>
              <span className={styles.tabDescription}>Server, baze de date, securitate</span>
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === 'frontend' ? styles.active : ''}`}
              onClick={() => setActiveTab('frontend')}
            >
              <span className={styles.tabIcon}>🎨</span>
              <span className={styles.tabLabel}>Frontend & User Experience</span>
              <span className={styles.tabDescription}>Interfață, responsivitate, optimizări</span>
            </button>
          </div>

          {/* Technology Grid */}
          <div className={`${styles.techGrid} ${isVisible ? styles.fadeInUp : ''}`}>
            {(activeTab === 'backend' ? backendTechnologies : frontendTechnologies).map((tech, index) => (
              <div 
                key={tech.name} 
                className={styles.techCard}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.techHeader}>
                  <div className={styles.techIcon}>{tech.icon}</div>
                  <div className={styles.techInfo}>
                    <h3 className={styles.techName}>{tech.name}</h3>
                    <p className={styles.techDescription}>{tech.description}</p>
                  </div>
                </div>
                <div className={styles.techBenefits}>
                  <h4 className={styles.benefitsTitle}>Beneficii cheie:</h4>
                  <ul className={styles.benefitsList}>
                    {tech.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className={styles.benefitItem}>
                        <span className={styles.benefitIcon}>✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Architecture Overview */}
          <div className={`${styles.architectureOverview} ${isVisible ? styles.fadeInUp : ''}`}>
            <h3 className={styles.overviewTitle}>
              De ce această arhitectură?
            </h3>
            <div className={styles.overviewGrid}>
              <div className={styles.overviewCard}>
                <div className={styles.overviewIcon}>🛡️</div>
                <h4 className={styles.overviewCardTitle}>Securitate Maximă</h4>
                <p className={styles.overviewCardDescription}>
                  Datele medicale sunt protejate prin multiple straturi de securitate, 
                  criptare end-to-end și conformitate GDPR completă.
                </p>
              </div>
              <div className={styles.overviewCard}>
                <div className={styles.overviewIcon}>⚡</div>
                <h4 className={styles.overviewCardTitle}>Performanță Ridicată</h4>
                <p className={styles.overviewCardDescription}>
                  Arhitectura optimizată asigură timp de răspuns rapid chiar și 
                  cu volume mari de date și utilizatori concurenți.
                </p>
              </div>
              <div className={styles.overviewCard}>
                <div className={styles.overviewIcon}>📈</div>
                <h4 className={styles.overviewCardTitle}>Scalabilitate</h4>
                <p className={styles.overviewCardDescription}>
                  Sistemul poate crește odată cu clinica ta, de la câțiva utilizatori 
                  la sute de medici și mii de pacienți.
                </p>
              </div>
              <div className={styles.overviewCard}>
                <div className={styles.overviewIcon}>🔧</div>
                <h4 className={styles.overviewCardTitle}>Mentenanță Ușoară</h4>
                <p className={styles.overviewCardDescription}>
                  Codul modular și tehnologiile moderne permit actualizări rapide 
                  și adăugarea de noi funcționalități fără întreruperi.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className={`${styles.specifications} ${isVisible ? styles.fadeInUp : ''}`}>
            <h3 className={styles.specificationsTitle}>
              Specificații Tehnice Detaliate
            </h3>
            <div className={styles.specificationsTabs}>
              <div className={styles.specTab}>
                <h4 className={styles.specTabTitle}>🏗️ Infrastructure</h4>
                <ul className={styles.specList}>
                  <li>Cloud-native deployment cu auto-scaling</li>
                  <li>Load balancing pentru distribuția traficului</li>
                  <li>CDN global pentru performanță optimă</li>
                  <li>Backup automat zilnic cu retenție 30 zile</li>
                  <li>Monitoring 24/7 cu alerting proactiv</li>
                </ul>
              </div>
              <div className={styles.specTab}>
                <h4 className={styles.specTabTitle}>🔒 Securitate</h4>
                <ul className={styles.specList}>
                  <li>SSL/TLS encryption pentru toate comunicațiile</li>
                  <li>Two-factor authentication (2FA)</li>
                  <li>Role-based access control (RBAC)</li>
                  <li>Audit logging pentru toate acțiunile</li>
                  <li>Penetration testing regulat</li>
                </ul>
              </div>
              <div className={styles.specTab}>
                <h4 className={styles.specTabTitle}>🔗 Integrări</h4>
                <ul className={styles.specList}>
                  <li>API RESTful pentru integrări externe</li>
                  <li>Webhook support pentru notificări real-time</li>
                  <li>FHIR compliance pentru interoperabilitate</li>
                  <li>Export/import în formate standard</li>
                  <li>SDK pentru dezvoltatori terți</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechSection;