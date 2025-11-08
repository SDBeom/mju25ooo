/**
 * Simple image preloader without external dependencies
 * @function
 * @param {string} selector - CSS selector for target images
 * @returns {Promise} - Resolves when all images are loaded
 */
export const preloadImages = (selector = 'img') => {
  return new Promise((resolve) => {
    const images = document.querySelectorAll(selector);
    if (images.length === 0) {
      resolve();
      return;
    }

    let loadedCount = 0;
    const totalImages = images.length;

    const onImageLoad = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        resolve();
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        onImageLoad();
      } else {
        img.addEventListener('load', onImageLoad);
        img.addEventListener('error', onImageLoad); // Continue even if image fails to load
      }
    });
  });
};

/**
 * Simple text splitter for animation (alternative to SplitText)
 * Splits text into characters or words/lines for animation
 */
export const splitText = (element, type = 'chars') => {
  if (!element) return { chars: [], words: [], lines: [] };

  const text = element.textContent.trim();
  const chars = [];
  const words = [];
  const lines = [];
  
  if (type === 'lines, chars') {
    // Split into characters, preserving spaces
    const charsContainer = document.createElement('span');
    charsContainer.style.display = 'inline-block';
    charsContainer.style.overflow = 'hidden';
    charsContainer.style.position = 'relative';
    
    Array.from(text).forEach((char) => {
      const charSpan = document.createElement('span');
      charSpan.className = 'char';
      charSpan.textContent = char === ' ' ? '\u00A0' : char; // Non-breaking space
      charSpan.style.display = 'inline-block';
      charSpan.style.transform = 'translate3d(0, 100%, 0)';
      charSpan.style.overflow = 'hidden';
      charsContainer.appendChild(charSpan);
      chars.push(charSpan);
    });
    
    element.textContent = '';
    element.appendChild(charsContainer);
  } else if (type === 'chars') {
    // Split into characters only
    const charsContainer = document.createElement('span');
    charsContainer.style.display = 'inline-block';
    charsContainer.style.overflow = 'hidden';
    
    Array.from(text).forEach((char) => {
      const charSpan = document.createElement('span');
      charSpan.className = 'char';
      charSpan.textContent = char === ' ' ? '\u00A0' : char;
      charSpan.style.display = 'inline-block';
      charSpan.style.transform = 'translate3d(0, 100%, 0)';
      charSpan.style.overflow = 'hidden';
      charsContainer.appendChild(charSpan);
      chars.push(charSpan);
    });
    
    element.textContent = '';
    element.appendChild(charsContainer);
  } else if (type === 'lines' || type === 'words') {
    // Split into lines (words grouped by line breaks or natural wrapping)
    const wordsContainer = document.createElement('div');
    wordsContainer.style.display = 'block';
    wordsContainer.style.overflow = 'hidden';
    
    // Split by line breaks first, then by words
    const textLines = text.split(/\n/);
    textLines.forEach((lineText) => {
      if (lineText.trim()) {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'line';
        lineDiv.style.display = 'block';
        lineDiv.style.overflow = 'hidden';
        lineDiv.style.transform = 'translate3d(0, 100%, 0)';
        
        const wordsArray = lineText.trim().split(/\s+/);
        wordsArray.forEach((word) => {
          const wordSpan = document.createElement('span');
          wordSpan.textContent = word;
          wordSpan.style.marginRight = '0.25em';
          lineDiv.appendChild(wordSpan);
          words.push(wordSpan);
        });
        
        wordsContainer.appendChild(lineDiv);
        lines.push(lineDiv);
      }
    });
    
    // If no line breaks, treat as single line
    if (lines.length === 0) {
      const lineDiv = document.createElement('div');
      lineDiv.className = 'line';
      lineDiv.style.display = 'block';
      lineDiv.style.overflow = 'hidden';
      lineDiv.style.transform = 'translate3d(0, 100%, 0)';
      
      text.split(/\s+/).forEach((word) => {
        if (word.trim()) {
          const wordSpan = document.createElement('span');
          wordSpan.textContent = word;
          wordSpan.style.marginRight = '0.25em';
          lineDiv.appendChild(wordSpan);
          words.push(wordSpan);
        }
      });
      
      wordsContainer.appendChild(lineDiv);
      lines.push(lineDiv);
    }
    
    element.textContent = '';
    element.appendChild(wordsContainer);
  }

  return { chars, words, lines };
};
