import React, { useState } from 'react';
import { FormField, Checkbox } from '../../ui/Form';
import { Button } from '../../ui/Button';
import { validateContactForm, hasValidationErrors } from '../../../utils/validation';
import { submitContactForm, CONTACT_INFO } from '../../../utils/contactService';
import type { ContactFormData, ValidationErrors } from '../../../utils/validation';
import styles from './ContactSection.module.css';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    requestDemo: false
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleFieldChange = (field: keyof ContactFormData) => (value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[field as keyof ValidationErrors]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateContactForm(formData);
    setErrors(validationErrors);

    if (hasValidationErrors(validationErrors)) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      const response = await submitContactForm(formData);
      
      if (response.success) {
        setSubmitStatus('success');
        setSubmitMessage(response.message);
        
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
          requestDemo: false
        });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(response.message);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setSubmitMessage('A apărut o eroare neașteptată. Vă rugăm să încercați din nou.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Header */}
          <div className={styles.header}>
            <h2 className={styles.title}>Contactează-ne</h2>
            <p className={styles.subtitle}>
              Ești gata să digitalizezi clinica ta? Contactează-ne pentru o demonstrație personalizată 
              a platformei Colmed și descoperă cum putem transforma operațiunile tale medicale.
            </p>
          </div>

          <div className={styles.contentGrid}>
            {/* Contact Form */}
            <div className={styles.formSection}>
              <form onSubmit={handleSubmit} className={styles.form} noValidate>
                <div className={styles.formGrid}>
                  <FormField
                    label="Nume complet"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleFieldChange('name')}
                    error={errors.name}
                    required
                    placeholder="Introduceți numele dvs. complet"
                  />

                  <FormField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleFieldChange('email')}
                    error={errors.email}
                    required
                    placeholder="nume@companie.ro"
                  />

                  <FormField
                    label="Telefon"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleFieldChange('phone')}
                    error={errors.phone}
                    placeholder="+40 XXX XXX XXX (opțional)"
                  />

                  <FormField
                    label="Compania"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleFieldChange('company')}
                    error={errors.company}
                    required
                    placeholder="Numele clinicii/spitalului"
                  />
                </div>

                <FormField
                  label="Mesaj"
                  name="message"
                  type="textarea"
                  value={formData.message}
                  onChange={handleFieldChange('message')}
                  error={errors.message}
                  required
                  placeholder="Spune-ne mai multe despre nevoile clinicii tale și cum te putem ajuta..."
                  rows={5}
                />

                <Checkbox
                  label="Doresc să programez o demonstrație personalizată a platformei Colmed"
                  name="requestDemo"
                  checked={formData.requestDemo}
                  onChange={handleFieldChange('requestDemo')}
                />

                <div className={styles.submitSection}>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    className={styles.submitButton}
                  >
                    {isSubmitting ? 'Se trimite...' : 'Trimite mesajul'}
                  </Button>

                  {submitStatus === 'success' && (
                    <div className={styles.successMessage} role="alert">
                      ✅ {submitMessage}
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className={styles.errorMessage} role="alert">
                      ❌ {submitMessage}
                    </div>
                  )}
                </div>
              </form>
            </div>

            {/* Contact Information */}
            <div className={styles.contactInfo}>
              <h3 className={styles.contactTitle}>Informații de contact</h3>
              
              <div className={styles.contactDetails}>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                      <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                    </svg>
                  </div>
                  <div className={styles.contactText}>
                    <span className={styles.contactLabel}>Email general</span>
                    <a href={`mailto:${CONTACT_INFO.email}`} className={styles.contactValue}>
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className={styles.contactText}>
                    <span className={styles.contactLabel}>Telefon</span>
                    <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className={styles.contactValue}>
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div className={styles.contactText}>
                    <span className={styles.contactLabel}>Program</span>
                    <span className={styles.contactValue}>
                      {CONTACT_INFO.workingHours}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.responseTime}>
                <h4 className={styles.responseTitle}>Timp de răspuns</h4>
                <div className={styles.responseList}>
                  <div className={styles.responseItem}>
                    <span className={styles.responseType}>Întrebări generale:</span>
                    <span className={styles.responseValue}>{CONTACT_INFO.responseTime.general}</span>
                  </div>
                  <div className={styles.responseItem}>
                    <span className={styles.responseType}>Demonstrații:</span>
                    <span className={styles.responseValue}>{CONTACT_INFO.responseTime.demo}</span>
                  </div>
                  <div className={styles.responseItem}>
                    <span className={styles.responseType}>Suport tehnic:</span>
                    <span className={styles.responseValue}>{CONTACT_INFO.responseTime.support}</span>
                  </div>
                </div>
              </div>

              <div className={styles.companyInfo}>
                <p className={styles.companyText}>
                  © {CONTACT_INFO.company.year} {CONTACT_INFO.company.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;