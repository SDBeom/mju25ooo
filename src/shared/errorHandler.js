// Error handling utilities


/**
 * Custom error class for application-specific errors
 */
export class AppError extends Error {
  constructor(message, code = 'UNKNOWN_ERROR', details = null) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.details = details;
    this.timestamp = new Date().toISOString();
  }
}


/**
 * Error handler for component errors
 * @param {Error} error - Error object
 * @param {string} componentName - Name of the component where error occurred
 * @param {Object} context - Additional context information
 */
export const handleComponentError = (error, componentName, context = {}) => {
  const errorInfo = {
    component: componentName,
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString()
  };

  console.error(`Component Error in ${componentName}:`, errorInfo);
  
  // In production, you might want to send this to an error reporting service
  // sendErrorToService(errorInfo);
  
  return errorInfo;
};

/**
 * Error boundary helper for React components
 * @param {Error} error - Error object
 * @param {Object} errorInfo - Error info from React
 */
export const logErrorBoundaryError = (error, errorInfo) => {
  const errorDetails = {
    error: error.message,
    stack: error.stack,
    componentStack: errorInfo.componentStack,
    timestamp: new Date().toISOString()
  };

  console.error('Error Boundary caught an error:', errorDetails);
  
  return errorDetails;
};

/**
 * Validates error object and returns safe error message
 * @param {any} error - Error object or any value
 * @param {string} defaultMessage - Default message if error is invalid
 * @returns {string} - Safe error message
 */
export const getSafeErrorMessage = (error, defaultMessage = 'An unexpected error occurred') => {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  if (error && typeof error === 'object' && error.message) {
    return error.message;
  }
  
  return defaultMessage;
};
