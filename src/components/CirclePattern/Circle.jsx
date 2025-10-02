import React from 'react';
import { CIRCLE_COLORS } from '../../shared/constants';

const Circle = ({ color = CIRCLE_COLORS.WHITE, className = '' }) => {
  try {
    // Validate color
    const validColors = Object.values(CIRCLE_COLORS);
    if (!validColors.includes(color)) {
      console.warn(`Invalid circle color: ${color}. Using default color.`);
      color = CIRCLE_COLORS.WHITE;
    }

    return <div className={className}></div>;
  } catch (error) {
    console.error('Circle component error:', error);
    return <div className="circle error-circle"></div>;
  }
};

export default Circle;
