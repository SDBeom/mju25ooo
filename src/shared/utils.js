// Utility functions for common operations

/**
 * Validates if a value is a valid array
 * @param {any} value - Value to validate
 * @returns {boolean} - True if valid array
 */
export const isValidArray = (value) => {
  return Array.isArray(value) && value.length > 0;
};

/**
 * Safely executes a function with error handling
 * @param {Function} fn - Function to execute
 * @param {any} fallback - Fallback value if function fails
 * @returns {any} - Function result or fallback
 */
export const safeExecute = (fn, fallback = null) => {
  try {
    return fn();
  } catch (error) {
    console.error('Safe execute error:', error);
    return fallback;
  }
};

/**
 * Generates unique keys for React components
 * @param {string} prefix - Key prefix
 * @param {number} index - Index number
 * @returns {string} - Unique key
 */
export const generateKey = (prefix, index) => {
  return `${prefix}-${index}`;
};

/**
 * Validates component props
 * @param {Object} props - Component props
 * @param {Array} requiredProps - Array of required prop names
 * @returns {boolean} - True if all required props are present
 */
export const validateProps = (props, requiredProps = []) => {
  if (!props || typeof props !== 'object') {
    return false;
  }
  
  return requiredProps.every(prop => prop in props);
};

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
