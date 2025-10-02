import React from 'react';
import { TYPOGRAPHY } from '../../../shared/constants';
import './Typography.css';

const Typography = ({ 
  variant = 'body1', 
  color = 'primary', 
  weight = 'regular',
  align = 'left',
  className = '',
  children,
  ...props 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'h1':
        return {
          fontSize: TYPOGRAPHY.FONT_SIZES['7XL'],
          fontWeight: TYPOGRAPHY.FONT_WEIGHTS.BOLD,
          lineHeight: TYPOGRAPHY.LINE_HEIGHTS.TIGHT,
        };
      case 'h2':
        return {
          fontSize: TYPOGRAPHY.FONT_SIZES['6XL'],
          fontWeight: TYPOGRAPHY.FONT_WEIGHTS.BOLD,
          lineHeight: TYPOGRAPHY.LINE_HEIGHTS.TIGHT,
        };
      case 'h3':
        return {
          fontSize: TYPOGRAPHY.FONT_SIZES['5XL'],
          fontWeight: TYPOGRAPHY.FONT_WEIGHTS.SEMIBOLD,
          lineHeight: TYPOGRAPHY.LINE_HEIGHTS.TIGHT,
        };
      case 'h4':
        return {
          fontSize: TYPOGRAPHY.FONT_SIZES['4XL'],
          fontWeight: TYPOGRAPHY.FONT_WEIGHTS.SEMIBOLD,
          lineHeight: TYPOGRAPHY.LINE_HEIGHTS.NORMAL,
        };
      case 'h5':
        return {
          fontSize: TYPOGRAPHY.FONT_SIZES['3XL'],
          fontWeight: TYPOGRAPHY.FONT_WEIGHTS.MEDIUM,
          lineHeight: TYPOGRAPHY.LINE_HEIGHTS.NORMAL,
        };
      case 'h6':
        return {
          fontSize: TYPOGRAPHY.FONT_SIZES['2XL'],
          fontWeight: TYPOGRAPHY.FONT_WEIGHTS.MEDIUM,
          lineHeight: TYPOGRAPHY.LINE_HEIGHTS.NORMAL,
        };
      case 'body1':
        return {
          fontSize: TYPOGRAPHY.FONT_SIZES.BASE,
          fontWeight: TYPOGRAPHY.FONT_WEIGHTS.REGULAR,
          lineHeight: TYPOGRAPHY.LINE_HEIGHTS.NORMAL,
        };
      case 'body2':
        return {
          fontSize: TYPOGRAPHY.FONT_SIZES.SM,
          fontWeight: TYPOGRAPHY.FONT_WEIGHTS.REGULAR,
          lineHeight: TYPOGRAPHY.LINE_HEIGHTS.NORMAL,
        };
      case 'caption':
        return {
          fontSize: TYPOGRAPHY.FONT_SIZES.XS,
          fontWeight: TYPOGRAPHY.FONT_WEIGHTS.REGULAR,
          lineHeight: TYPOGRAPHY.LINE_HEIGHTS.NORMAL,
        };
      case 'button':
        return {
          fontSize: TYPOGRAPHY.FONT_SIZES.SM,
          fontWeight: TYPOGRAPHY.FONT_WEIGHTS.MEDIUM,
          lineHeight: TYPOGRAPHY.LINE_HEIGHTS.TIGHT,
        };
      default:
        return {
          fontSize: TYPOGRAPHY.FONT_SIZES.BASE,
          fontWeight: TYPOGRAPHY.FONT_WEIGHTS.REGULAR,
          lineHeight: TYPOGRAPHY.LINE_HEIGHTS.NORMAL,
        };
    }
  };

  const getColorClass = () => {
    switch (color) {
      case 'primary':
        return 'typography-primary';
      case 'secondary':
        return 'typography-secondary';
      case 'muted':
        return 'typography-muted';
      case 'orange':
        return 'typography-orange';
      case 'blue':
        return 'typography-blue';
      default:
        return 'typography-primary';
    }
  };

  const getWeightClass = () => {
    switch (weight) {
      case 'light':
        return 'typography-light';
      case 'regular':
        return 'typography-regular';
      case 'medium':
        return 'typography-medium';
      case 'semibold':
        return 'typography-semibold';
      case 'bold':
        return 'typography-bold';
      case 'extrabold':
        return 'typography-extrabold';
      default:
        return 'typography-regular';
    }
  };

  const getAlignClass = () => {
    switch (align) {
      case 'left':
        return 'typography-left';
      case 'center':
        return 'typography-center';
      case 'right':
        return 'typography-right';
      default:
        return 'typography-left';
    }
  };

  const Component = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(variant) ? variant : 'p';

  return (
    <Component
      className={`typography typography-${variant} ${getColorClass()} ${getWeightClass()} ${getAlignClass()} ${className}`}
      style={getVariantStyles()}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Typography;

