import React from 'react';
import { SPACING, BREAKPOINTS } from '../../../shared/constants';
import './Container.css';

const Container = ({
  maxWidth = 'desktop',
  padding = 'medium',
  className = '',
  children,
  ...props
}) => {
  const getMaxWidthClass = () => {
    switch (maxWidth) {
      case 'mobile':
        return 'container-mobile';
      case 'tablet':
        return 'container-tablet';
      case 'desktop':
        return 'container-desktop';
      case 'large':
        return 'container-large';
      case 'full':
        return 'container-full';
      default:
        return 'container-desktop';
    }
  };

  const getPaddingClass = () => {
    switch (padding) {
      case 'none':
        return 'container-padding-none';
      case 'small':
        return 'container-padding-small';
      case 'medium':
        return 'container-padding-medium';
      case 'large':
        return 'container-padding-large';
      default:
        return 'container-padding-medium';
    }
  };

  return (
    <div
      className={`container ${getMaxWidthClass()} ${getPaddingClass()} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;

