// Utility functions for common operations
import { ROUTE_PATHS } from './constants';

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

/**
 * Modal utility functions
 */

/**
 * Gets the root element safely
 * @returns {HTMLElement | null} - Root element or null
 */
export const getRootElement = () => {
  return document.getElementById('root');
};

/**
 * Applies modal open state to document (scroll lock, class addition)
 * @param {number} scrollY - Current scroll position
 */
export const applyModalOpenState = (scrollY) => {
  // Import MODAL constants to avoid circular dependency
  // Using dynamic import pattern to access constants
  const MODAL_CLASS_NAME = 'is-modal-open';
  const MODAL_DATA_ATTR = 'modalScrollY';
  const root = getRootElement();
  
  document.body.dataset[MODAL_DATA_ATTR] = String(scrollY);
  document.body.style.top = `-${scrollY}px`;
  document.body.classList.add(MODAL_CLASS_NAME);
  document.documentElement.classList.add(MODAL_CLASS_NAME);
  
  if (root) {
    root.classList.add(MODAL_CLASS_NAME);
  }
};

/**
 * Removes modal open state from document (restore scroll, remove classes)
 * @returns {number} - Previous scroll position
 */
export const removeModalOpenState = () => {
  const MODAL_CLASS_NAME = 'is-modal-open';
  const MODAL_DATA_ATTR = 'modalScrollY';
  const root = getRootElement();
  const previousScrollY = Number(document.body.dataset[MODAL_DATA_ATTR] || '0');
  
  document.body.classList.remove(MODAL_CLASS_NAME);
  document.documentElement.classList.remove(MODAL_CLASS_NAME);
  
  if (root) {
    root.classList.remove(MODAL_CLASS_NAME);
  }
  
  document.body.style.top = '';
  delete document.body.dataset[MODAL_DATA_ATTR];
  
  return previousScrollY;
};

/**
 * Resolves and normalizes path for routing
 * @param {string} path - Path to resolve
 * @returns {string} - Normalized path
 */
export const resolvePath = (path) => {
  if (path === ROUTE_PATHS.ROOT || path === '/') {
    return ROUTE_PATHS.MAIN;
  }
  
  // Check if path matches any defined route
  const definedRoutes = Object.values(ROUTE_PATHS);
  if (definedRoutes.includes(path)) {
    return path;
  }
  
  // Handle designer detail paths
  if (path.startsWith('/designer/') && path !== ROUTE_PATHS.DESIGNER) {
    return path;
  }
  
  // Default to main
  return ROUTE_PATHS.MAIN;
};

/**
 * Safely checks if window object exists (for SSR compatibility)
 * @returns {boolean} - True if window exists
 */
export const isBrowser = () => {
  return typeof window !== 'undefined';
};

/**
 * Safely accesses window object
 * @param {Function} callback - Function to execute with window
 * @param {any} fallback - Fallback value if window doesn't exist
 * @returns {any} - Result or fallback
 */
export const safeWindowAccess = (callback, fallback = null) => {
  if (!isBrowser()) {
    return fallback;
  }
  return safeExecute(() => callback(window), fallback);
};