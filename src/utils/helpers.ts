// Helper functions

/**
 * Smooth scroll to element
 * @param elementId - The ID of the element to scroll to
 */
export const scrollToElement = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

/**
 * Debounce function
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  // aici era NodeJs.Timeout
  let timeout: number;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = window.setTimeout(later, wait);
  };
};

/**
 * Check if element is in viewport
 * @param element - Element to check
 * @returns True if element is in viewport
 */
export const isInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Format phone number
 * @param phone - Phone number to format
 * @returns Formatted phone number
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{3})$/);
  if (match) {
    return `+${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
  }
  return phone;
};

/**
 * Validate email address
 * @param email - Email to validate
 * @returns True if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Generate unique ID
 * @returns Unique ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Capitalize first letter
 * @param string - String to capitalize
 * @returns Capitalized string
 */
export const capitalize = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
