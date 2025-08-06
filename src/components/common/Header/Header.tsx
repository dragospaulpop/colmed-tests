import React, { useState, useEffect } from 'react';
import { Logo } from '../../ui/Logo';
import { Icon } from '../../ui/Icon';
import { Button } from '../../ui/Button';
import styles from './Header.module.css';

export interface HeaderProps {
  onNavigate?: (section: string) => void;
}

const navigationItems = [
  { id: 'despre', label: 'Despre Colmed' },
  { id: 'functionalitati', label: 'Funcționalități' },
  { id: 'demo', label: 'Demonstrații' },
  { id: 'arhitectura', label: 'Arhitectura' },
  { id: 'avantaje', label: 'Avantaje' },
  { id: 'contact', label: 'Contact' }
];

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Detect touch device
    const detectTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    window.addEventListener('scroll', handleScroll);
    detectTouchDevice();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && !(event.target as Element).closest(`.${styles.mobileOverlay}, .${styles.mobileMenuButton}`)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isMobileMenuOpen]);

  const handleNavClick = (sectionId: string) => {
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      // Default smooth scroll behavior
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle touch events for better mobile interaction
  const handleTouchStart = (event: React.TouchEvent) => {
    // Add haptic feedback on supported devices
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  };

  const headerClasses = [
    styles.header,
    isScrolled && styles.scrolled
  ].filter(Boolean).join(' ');

  return (
    <header className={headerClasses}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <button
            className={styles.logoButton}
            onClick={() => handleNavClick('hero')}
            aria-label="Colmed - Acasă"
          >
            <Logo variant={isScrolled ? 'primary' : 'primary'} size="md" />
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav} aria-label="Navigație principală">
          <ul className={styles.navList}>
            {navigationItems.map((item) => (
              <li key={item.id}>
                <button
                  className={styles.navLink}
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA Button */}
        <div className={styles.ctaContainer}>
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleNavClick('contact')}
            className={styles.ctaButton}
          >
            Solicită Demo
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          onTouchStart={handleTouchStart}
          aria-label={isMobileMenuOpen ? 'Închide meniu' : 'Deschide meniu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          <Icon name={isMobileMenuOpen ? 'close' : 'menu'} size="lg" />
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div 
          className={styles.mobileOverlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
        >
          <nav 
            id="mobile-navigation"
            className={styles.mobileNav} 
            aria-label="Navigație mobilă"
          >
            <h2 id="mobile-menu-title" className="sr-only">Meniu de navigație</h2>
            <ul className={styles.mobileNavList}>
              {navigationItems.map((item, index) => (
                <li key={item.id}>
                  <button
                    className={styles.mobileNavLink}
                    onClick={() => handleNavClick(item.id)}
                    onTouchStart={handleTouchStart}
                    style={{ 
                      animationDelay: `${index * 0.05}s`,
                      animation: 'fadeIn 0.3s ease-out forwards'
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li className={styles.mobileCtaItem}>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleNavClick('contact')}
                  onTouchStart={handleTouchStart}
                  className={styles.mobileCtaButton}
                >
                  Solicită Demo
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};