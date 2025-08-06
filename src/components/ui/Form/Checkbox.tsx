import React from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  name,
  checked,
  onChange,
  error
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  const fieldId = `checkbox-${name}`;
  const errorId = `error-${name}`;

  return (
    <div className={styles.checkboxContainer}>
      <div className={styles.checkboxWrapper}>
        <input
          id={fieldId}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          className={styles.checkbox}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={error ? 'true' : 'false'}
        />
        <label htmlFor={fieldId} className={styles.label}>
          <span className={styles.checkmark}>
            {checked && (
              <svg
                className={styles.checkIcon}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </span>
          <span className={styles.labelText}>{label}</span>
        </label>
      </div>
      
      {error && (
        <span id={errorId} className={styles.errorMessage} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};