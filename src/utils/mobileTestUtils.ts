// Mobile testing utilities for responsive design validation

export interface DeviceTestConfig {
  name: string;
  width: number;
  height: number;
  userAgent: string;
  touchEnabled: boolean;
}

export const DEVICE_CONFIGS: DeviceTestConfig[] = [
  {
    name: 'iPhone SE',
    width: 375,
    height: 667,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
    touchEnabled: true
  },
  {
    name: 'iPhone 12',
    width: 390,
    height: 844,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15',
    touchEnabled: true
  },
  {
    name: 'Samsung Galaxy S21',
    width: 360,
    height: 800,
    userAgent: 'Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36',
    touchEnabled: true
  },
  {
    name: 'iPad',
    width: 768,
    height: 1024,
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
    touchEnabled: true
  },
  {
    name: 'Desktop',
    width: 1920,
    height: 1080,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    touchEnabled: false
  }
];

// Test touch target sizes
export const validateTouchTargets = (): { passed: boolean; issues: string[] } => {
  const issues: string[] = [];
  const minTouchSize = 44; // Minimum touch target size in pixels
  
  // Get all interactive elements
  const interactiveElements = document.querySelectorAll(
    'button, a, input, select, textarea, [role="button"], [tabindex="0"]'
  );
  
  interactiveElements.forEach((element, index) => {
    const rect = element.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(element);
    
    // Check if element is visible
    if (rect.width === 0 || rect.height === 0 || computedStyle.display === 'none') {
      return;
    }
    
    // Check minimum touch target size
    if (rect.width < minTouchSize || rect.height < minTouchSize) {
      const elementInfo = element.tagName.toLowerCase() + 
        (element.className ? `.${element.className.split(' ')[0]}` : '') +
        (element.id ? `#${element.id}` : '');
      
      issues.push(
        `Element ${elementInfo} (${index}) has touch target size ${Math.round(rect.width)}x${Math.round(rect.height)}px, ` +
        `minimum required is ${minTouchSize}x${minTouchSize}px`
      );
    }
  });
  
  return {
    passed: issues.length === 0,
    issues
  };
};

// Test responsive breakpoints
export const testResponsiveBreakpoints = (): { passed: boolean; issues: string[] } => {
  const issues: string[] = [];
  const breakpoints = [320, 768, 1024];
  
  breakpoints.forEach(width => {
    // Simulate viewport width
    const mediaQuery = window.matchMedia(`(min-width: ${width}px)`);
    
    if (!mediaQuery.matches && window.innerWidth >= width) {
      issues.push(`Breakpoint at ${width}px may not be working correctly`);
    }
  });
  
  return {
    passed: issues.length === 0,
    issues
  };
};

// Test mobile navigation functionality
export const testMobileNavigation = (): { passed: boolean; issues: string[] } => {
  const issues: string[] = [];
  
  // Check if mobile menu button exists
  const mobileMenuButton = document.querySelector('[aria-expanded]');
  if (!mobileMenuButton) {
    issues.push('Mobile menu button not found');
    return { passed: false, issues };
  }
  
  // Check ARIA attributes
  const ariaExpanded = mobileMenuButton.getAttribute('aria-expanded');
  const ariaLabel = mobileMenuButton.getAttribute('aria-label');
  const ariaControls = mobileMenuButton.getAttribute('aria-controls');
  
  if (!ariaLabel) {
    issues.push('Mobile menu button missing aria-label');
  }
  
  if (!ariaControls) {
    issues.push('Mobile menu button missing aria-controls');
  }
  
  if (ariaExpanded !== 'true' && ariaExpanded !== 'false') {
    issues.push('Mobile menu button has invalid aria-expanded value');
  }
  
  // Check if mobile menu is accessible
  if (ariaExpanded === 'true') {
    const mobileMenu = document.getElementById(ariaControls || '');
    if (!mobileMenu) {
      issues.push('Mobile menu element not found when expanded');
    }
  }
  
  return {
    passed: issues.length === 0,
    issues
  };
};

// Comprehensive mobile test suite
export const runMobileTestSuite = (): {
  touchTargets: { passed: boolean; issues: string[] };
  responsive: { passed: boolean; issues: string[] };
  navigation: { passed: boolean; issues: string[] };
  overall: boolean;
} => {
  const touchTargets = validateTouchTargets();
  const responsive = testResponsiveBreakpoints();
  const navigation = testMobileNavigation();
  
  const overall = touchTargets.passed && responsive.passed && navigation.passed;
  
  return {
    touchTargets,
    responsive,
    navigation,
    overall
  };
};

// Device simulation helper
export const simulateDevice = (config: DeviceTestConfig): void => {
  // This would be used in development/testing environments
  console.log(`Simulating ${config.name}:`);
  console.log(`- Viewport: ${config.width}x${config.height}`);
  console.log(`- Touch enabled: ${config.touchEnabled}`);
  console.log(`- User Agent: ${config.userAgent}`);
  
  // In a real implementation, this could integrate with browser dev tools
  // or testing frameworks to actually change the viewport and user agent
};

// Performance testing for mobile
export const testMobilePerformance = (): Promise<{
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
}> => {
  return new Promise((resolve) => {
    // Use Performance Observer API to measure key metrics
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const metrics = {
        loadTime: performance.now(),
        firstContentfulPaint: 0,
        largestContentfulPaint: 0,
        cumulativeLayoutShift: 0
      };
      
      entries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          metrics.firstContentfulPaint = entry.startTime;
        }
        if (entry.entryType === 'largest-contentful-paint') {
          metrics.largestContentfulPaint = entry.startTime;
        }
        if (entry.entryType === 'layout-shift') {
          metrics.cumulativeLayoutShift += (entry as any).value;
        }
      });
      
      resolve(metrics);
    });
    
    observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift'] });
    
    // Fallback timeout
    setTimeout(() => {
      resolve({
        loadTime: performance.now(),
        firstContentfulPaint: 0,
        largestContentfulPaint: 0,
        cumulativeLayoutShift: 0
      });
    }, 5000);
  });
};