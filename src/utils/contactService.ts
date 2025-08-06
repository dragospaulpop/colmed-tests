import type { ContactFormData } from './validation';

export interface ContactSubmissionResponse {
  success: boolean;
  message: string;
  error?: string;
}

// In a real application, this would make an actual API call
export const submitContactForm = async (data: ContactFormData): Promise<ContactSubmissionResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  try {
    // In a real implementation, this would be an actual API call
    // For now, we'll simulate different scenarios based on email
    
    // Simulate validation error
    if (data.email.includes('error')) {
      return {
        success: false,
        message: 'A apărut o eroare la trimiterea mesajului.',
        error: 'VALIDATION_ERROR'
      };
    }

    // Simulate server error
    if (data.email.includes('server')) {
      throw new Error('Server error');
    }

    // Log the form data (in real app, this would be sent to server)
    console.log('Contact form submitted:', {
      ...data,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer || 'direct'
    });

    // Simulate successful submission
    return {
      success: true,
      message: data.requestDemo 
        ? 'Mesajul a fost trimis cu succes! Vă vom contacta în curând pentru a programa demonstrația.'
        : 'Mesajul a fost trimis cu succes! Vă vom contacta în curând.'
    };

  } catch (error) {
    console.error('Contact form submission error:', error);
    return {
      success: false,
      message: 'A apărut o eroare tehnică. Vă rugăm să încercați din nou sau să ne contactați direct.',
      error: 'NETWORK_ERROR'
    };
  }
};

// Contact information constants
export const CONTACT_INFO = {
  email: 'contact@colmed.ro',
  phone: '+40 123 456 789',
  supportEmail: 'support@colmed.ro',
  salesEmail: 'sales@colmed.ro',
  responseTime: {
    general: '24 de ore',
    demo: '2-3 zile lucrătoare',
    support: '4-6 ore în zilele lucrătoare'
  },
  workingHours: 'Luni - Vineri, 09:00 - 18:00',
  company: {
    name: 'Digital Wizards Inc.',
    year: '2025'
  }
} as const;