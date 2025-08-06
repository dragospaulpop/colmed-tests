import React, { useState, useEffect, useRef } from 'react';
import { Card, CardBody } from '../../ui/Card/Card';
import { Icon } from '../../ui/Icon/Icon';
import { DEMO_DATA, DEMO_CATEGORIES } from '../../../utils/demoData';
import { useSwipeGestureRef } from '../../../utils/useSwipeGesture';
import styles from './DemoSection.module.css';

const DemoSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeDemo, setActiveDemo] = useState<string>(DEMO_DATA[0].id);
  const [isZoomed, setIsZoomed] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('demo');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  // Filter demos based on active category
  const filteredDemos = activeCategory === 'all' 
    ? DEMO_DATA 
    : DEMO_DATA.filter(demo => demo.category === activeCategory);

  // Get current demo data
  const currentDemo = DEMO_DATA.find(demo => demo.id === activeDemo) || DEMO_DATA[0];

  // Handle image load for lazy loading
  const handleImageLoad = (imageId: string) => {
    setLoadedImages(prev => new Set([...prev, imageId]));
  };

  // Preload images for better performance
  useEffect(() => {
    const preloadImages = () => {
      DEMO_DATA.forEach(demo => {
        const img = new Image();
        img.src = demo.screenshot;
        img.onload = () => handleImageLoad(`preload-${demo.id}`);
      });
    };

    // Preload images after component mounts
    const timer = setTimeout(preloadImages, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle tab change
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    // Set first demo of the new category as active
    const firstDemo = categoryId === 'all' 
      ? DEMO_DATA[0] 
      : DEMO_DATA.find(demo => demo.category === categoryId);
    if (firstDemo) {
      setActiveDemo(firstDemo.id);
    }
  };

  // Handle demo change
  const handleDemoChange = (demoId: string) => {
    setActiveDemo(demoId);
    setIsZoomed(false); // Reset zoom when changing demo
  };

  // Navigation functions for swipe gestures
  const navigateToNextDemo = () => {
    const currentIndex = filteredDemos.findIndex(demo => demo.id === activeDemo);
    if (currentIndex < filteredDemos.length - 1) {
      setActiveDemo(filteredDemos[currentIndex + 1].id);
    }
  };

  const navigateToPrevDemo = () => {
    const currentIndex = filteredDemos.findIndex(demo => demo.id === activeDemo);
    if (currentIndex > 0) {
      setActiveDemo(filteredDemos[currentIndex - 1].id);
    }
  };

  // Handle zoom toggle
  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
  };

  // Swipe gesture setup for demo navigation
  const swipeRef = useSwipeGestureRef<HTMLDivElement>({
    onSwipeLeft: navigateToNextDemo,
    onSwipeRight: navigateToPrevDemo,
    threshold: 50
  });

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isZoomed) {
        setIsZoomed(false);
      }
      
      // Arrow key navigation for demos
      if (!isZoomed) {
        const currentIndex = filteredDemos.findIndex(demo => demo.id === activeDemo);
        
        if (event.key === 'ArrowLeft' && currentIndex > 0) {
          event.preventDefault();
          setActiveDemo(filteredDemos[currentIndex - 1].id);
        } else if (event.key === 'ArrowRight' && currentIndex < filteredDemos.length - 1) {
          event.preventDefault();
          setActiveDemo(filteredDemos[currentIndex + 1].id);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isZoomed, activeDemo, filteredDemos]);

  return (
    <section id="demo" className={styles.demoSection}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={`${styles.header} ${isVisible ? styles.fadeInUp : ''}`}>
          <h2 className={styles.title}>
            Demonstrații Vizuale
          </h2>
          <p className={styles.subtitle}>
            Explorează interfața Colmed și descoperă cum funcționează fiecare modul în practică
          </p>
          <p className={styles.keyboardHint}>
            Folosește săgețile ← → pentru navigare rapidă între demonstrații
          </p>
          <div className={styles.titleUnderline}></div>
        </div>

        {/* Tab Navigation */}
        <div className={`${styles.tabNavigation} ${isVisible ? styles.fadeInUp : ''}`}>
          {DEMO_CATEGORIES.map((category) => (
            <button
              key={category.id}
              className={`${styles.tabButton} ${
                activeCategory === category.id ? styles.active : ''
              }`}
              onClick={() => handleCategoryChange(category.id)}
              aria-selected={activeCategory === category.id}
            >
              <span className={styles.tabLabel}>{category.label}</span>
              <span className={styles.tabDescription}>{category.description}</span>
            </button>
          ))}
        </div>

        {/* Demo Content */}
        <div 
          ref={swipeRef}
          className={`${styles.demoContent} ${isVisible ? styles.fadeInUp : ''}`}
        >
          {/* Demo Thumbnails */}
          <div className={styles.thumbnailGrid}>
            {filteredDemos.map((demo, index) => (
              <Card
                key={demo.id}
                variant="outlined"
                hoverable
                className={`${styles.thumbnailCard} ${
                  activeDemo === demo.id ? styles.active : ''
                }`}
                onClick={() => handleDemoChange(demo.id)}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <CardBody>
                  <div className={styles.thumbnailContent}>
                    <div className={styles.thumbnailImageContainer}>
                      <img
                        src={demo.thumbnail}
                        alt={`Captură de ecran ${demo.title} - ${demo.description.substring(0, 100)}...`}
                        className={styles.thumbnailImage}
                        loading="lazy"
                        onLoad={() => handleImageLoad(demo.id)}
                        onError={(e) => {
                          console.warn(`Failed to load thumbnail for ${demo.title}`);
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      {!loadedImages.has(demo.id) && (
                        <div className={styles.imagePlaceholder}>
                          <Icon name="monitor" size="lg" />
                        </div>
                      )}
                    </div>
                    <div className={styles.thumbnailInfo}>
                      <h4 className={styles.thumbnailTitle}>{demo.title}</h4>
                      <p className={styles.thumbnailCategory}>
                        {demo.category === 'core' ? 'Modul Principal' : 'Modul Special'}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          {/* Main Screenshot Display */}
          <div className={styles.screenshotContainer}>
            <Card variant="elevated" className={styles.screenshotCard}>
              <CardBody>
                <div className={styles.screenshotHeader}>
                  <div className={styles.screenshotInfo}>
                    <div className={styles.screenshotTitleRow}>
                      <h3 className={styles.screenshotTitle}>{currentDemo.title}</h3>
                      <span className={`${styles.categoryBadge} ${
                        currentDemo.category === 'special' ? styles.specialBadge : styles.coreBadge
                      }`}>
                        {currentDemo.category === 'core' ? 'Modul Principal' : 'Modul Special'}
                      </span>
                    </div>
                    <p className={styles.screenshotDescription}>
                      {currentDemo.description}
                    </p>
                  </div>
                  <button
                    className={styles.zoomButton}
                    onClick={handleZoomToggle}
                    aria-label="Mărește captura de ecran pentru vizualizare detaliată"
                  >
                    <Icon name="monitor" size="md" />
                    <span>Zoom</span>
                  </button>
                </div>

                <div className={styles.screenshotImageContainer}>
                  <img
                    ref={imageRef}
                    src={currentDemo.screenshot}
                    alt={`Captură de ecran detaliată ${currentDemo.title} - Interfața Colmed prezentând ${currentDemo.description}`}
                    className={styles.screenshotImage}
                    loading="lazy"
                    onLoad={() => handleImageLoad(`main-${currentDemo.id}`)}
                    onClick={handleZoomToggle}
                    onError={(e) => {
                      console.warn(`Failed to load screenshot for ${currentDemo.title}`);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  {!loadedImages.has(`main-${currentDemo.id}`) && (
                    <div className={styles.screenshotPlaceholder}>
                      <Icon name="monitor" size="xl" />
                      <span>Se încarcă...</span>
                    </div>
                  )}
                </div>

                {/* Features List */}
                <div className={styles.featuresList}>
                  <h4 className={styles.featuresTitle}>Funcționalități cheie:</h4>
                  <ul className={styles.features}>
                    {currentDemo.features.map((feature, index) => (
                      <li key={index} className={styles.feature}>
                        <Icon name="check" size="sm" className={styles.checkIcon} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Zoom Modal */}
        {isZoomed && (
          <div className={styles.zoomModal} onClick={handleZoomToggle}>
            <div className={styles.zoomModalContent} onClick={(e) => e.stopPropagation()}>
              <button
                className={styles.zoomCloseButton}
                onClick={handleZoomToggle}
                aria-label="Close zoom"
              >
                <Icon name="close" size="md" />
              </button>
              <img
                src={currentDemo.screenshot}
                alt={`Captură de ecran mărită ${currentDemo.title} - Vizualizare detaliată a interfeței Colmed`}
                className={styles.zoomedImage}
                onError={(e) => {
                  console.warn(`Failed to load zoomed screenshot for ${currentDemo.title}`);
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className={styles.zoomInfo}>
                <h3>{currentDemo.title}</h3>
                <p>{currentDemo.description}</p>
              </div>
            </div>
          </div>
        )}

        {/* Section Footer */}
        <div className={`${styles.footer} ${isVisible ? styles.fadeInUp : ''}`}>
          <p className={styles.footerText}>
            Toate capturile de ecran prezintă interfața reală Colmed cu date demonstrative. 
            Fiecare modul este complet funcțional și poate fi personalizat conform nevoilor clinicii dumneavoastră.
          </p>
          <p className={styles.footerSubtext}>
            Pentru o demonstrație live și personalizată, contactați echipa noastră de specialiști.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;