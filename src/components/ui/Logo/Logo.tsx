import React from 'react';
import styles from './Logo.module.css';

export interface LogoProps {
  variant?: 'primary' | 'white' | 'monochrome';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'primary',
  size = 'md',
  className = ''
}) => {
  const logoClasses = [
    styles.logo,
    styles[variant],
    styles[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={logoClasses}>
      <svg
        viewBox="0 0 200 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.logoSvg}
        role="img"
        aria-label="Colmed Logo"
      >
        {/* Medical cross icon */}
        <rect
          x="10"
          y="20"
          width="8"
          height="20"
          rx="2"
          className={styles.crossVertical}
        />
        <rect
          x="6"
          y="26"
          width="16"
          height="8"
          rx="2"
          className={styles.crossHorizontal}
        />
        
        {/* Colmed text */}
        <text
          x="35"
          y="40"
          className={styles.logoText}
          fontSize="24"
          fontWeight="700"
          fontFamily="Inter, sans-serif"
        >
          Colmed
        </text>
        
        {/* Subtle accent line */}
        <line
          x1="35"
          y1="45"
          x2="120"
          y2="45"
          strokeWidth="2"
          className={styles.accentLine}
        />
      </svg>
    </div>
  );
};