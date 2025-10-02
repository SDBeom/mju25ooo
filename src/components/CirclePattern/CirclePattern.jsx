import React from 'react';
import { CIRCLE_PATTERN_CONFIG, CIRCLE_COLORS } from '../../shared/constants';
import Circle from './Circle';
import './CirclePattern.css';

const CirclePattern = () => {
  try {
    const renderCircleRow = (rowConfig, rowIndex) => {
      return (
        <div key={rowIndex} className="circle-row">
          {rowConfig.circles.map((color, circleIndex) => (
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
