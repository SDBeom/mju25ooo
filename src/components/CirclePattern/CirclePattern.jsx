import React from 'react';
import { useBreakpointContext } from '../../contexts/BreakpointContext';
import { CIRCLE_PATTERN_CONFIG } from '../../shared/constants';
import Circle from './Circle';
import './CirclePattern.css';

const CirclePattern = () => {
  const { isMobile } = useBreakpointContext();

  try {
    const renderCircleRow = (rowConfig, rowIndex) => {
      // Mobile: 60%만 표시
      const circles = isMobile 
        ? rowConfig.circles.slice(0, Math.ceil(rowConfig.circles.length * 0.6))
        : rowConfig.circles;

      return (
        <div key={rowIndex} className="circle-row">
          {circles.map((color, circleIndex) => (
            <Circle
              key={`${rowIndex}-${circleIndex}`}
              color={color}
              className={`circle ${color}`}
            />
          ))}
        </div>
      );
    };

    return (
      <div className="circle-pattern">
        {CIRCLE_PATTERN_CONFIG.map((rowConfig, index) =>
          renderCircleRow(rowConfig, index)
        )}
      </div>
    );
  } catch (error) {
    console.error('CirclePattern component error:', error);
    return (
      <div className="circle-pattern-error">
        <p>Pattern failed to load</p>
      </div>
    );
  }
};

export default CirclePattern;
