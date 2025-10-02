import React from 'react';
import { COLORS, SPACING, ANIMATIONS } from '../../../shared/constants';
import './Button.css';

const Button = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  className = '',
  children,
  onClick,
  type = 'button',
  ...props
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'primary':
        return 'button-primary';
      case 'secondary':
        return 'button-secondary';
      case 'outline':
        return 'button-outline';
      case 'ghost':
        return 'button-ghost';
      case 'orange':
        return 'button-orange';
      case 'blue':
        return 'button-blue';
      default:
        return 'button-primary';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'button-small';
      case 'medium':
        return 'button-medium';
      case 'large':
        return 'button-large';
      default:
        return 'button-medium';
    }
  };

  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type={type}
      className={`button ${getVariantClass()} ${getSizeClass()} ${
        fullWidth ? 'button-full-width' : ''
      } ${disabled ? 'button-disabled' : ''} ${loading ? 'button-loading' : ''} ${className}`}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="button-spinner" aria-hidden="true">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="31.416"
              strokeDashoffset="31.416"
              className="button-spinner-circle"
            />
          </svg>
        </span>
      )}
      <span className={loading ? 'button-text-loading' : 'button-text'}>
        {children}
      </span>
    </button>
  );
};

export default Button;

