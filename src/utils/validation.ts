export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  requestDemo: boolean;
};

export type ValidationErrors = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Romanian phone number validation (optional field)
  if (!phone.trim()) return true; // Optional field
  const phoneRegex = /^(\+40|0040|0)[0-9]{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateContactForm = (data: ContactFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Name validation
  if (!data.name.trim()) {
    errors.name = 'Numele este obligatoriu';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Numele trebuie să aibă cel puțin 2 caractere';
  }

  // Email validation
  if (!data.email.trim()) {
    errors.email = 'Email-ul este obligatoriu';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Vă rugăm să introduceți un email valid';
  }

  // Phone validation (optional)
  if (data.phone.trim() && !validatePhone(data.phone)) {
    errors.phone = 'Vă rugăm să introduceți un număr de telefon valid (format românesc)';
  }

  // Company validation
  if (!data.company.trim()) {
    errors.company = 'Numele companiei este obligatoriu';
  } else if (data.company.trim().length < 2) {
    errors.company = 'Numele companiei trebuie să aibă cel puțin 2 caractere';
  }

  // Message validation
  if (!data.message.trim()) {
    errors.message = 'Mesajul este obligatoriu';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Mesajul trebuie să aibă cel puțin 10 caractere';
  } else if (data.message.trim().length > 1000) {
    errors.message = 'Mesajul nu poate depăși 1000 de caractere';
  }

  return errors;
};

export const hasValidationErrors = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length > 0;
};