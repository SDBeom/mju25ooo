/**
 * Tailwind CSS 클래스를 일반 CSS로 변환하는 유틸리티
 * 
 * 주요 변환 규칙:
 * - flex, flex-col, items-center → display: flex; flex-direction: column; align-items: center;
 * - gap-[32px] → gap: 32px;
 * - px-[24px] → padding-left: 24px; padding-right: 24px;
 * - text-[40px] → font-size: 40px;
 * - bg-black → background: #000000;
 * - 등등...
 */

/**
 * Tailwind 클래스를 CSS 속성으로 변환
 */
function convertTailwindToCSS(tailwindClass) {
  const conversions = {
    // Display
    'flex': 'display: flex;',
    'block': 'display: block;',
    'inline': 'display: inline;',
    'inline-block': 'display: inline-block;',
    'grid': 'display: grid;',
    'hidden': 'display: none;',
    
    // Flexbox
    'flex-col': 'flex-direction: column;',
    'flex-row': 'flex-direction: row;',
    'flex-wrap': 'flex-wrap: wrap;',
    'items-center': 'align-items: center;',
    'items-start': 'align-items: flex-start;',
    'items-end': 'align-items: flex-end;',
    'items-stretch': 'align-items: stretch;',
    'justify-center': 'justify-content: center;',
    'justify-start': 'justify-content: flex-start;',
    'justify-end': 'justify-content: flex-end;',
    'justify-between': 'justify-content: space-between;',
    'justify-around': 'justify-content: space-around;',
    'content-stretch': 'align-content: stretch;',
    
    // Gap
    'gap-0': 'gap: 0;',
    'gap-1': 'gap: 0.25rem;',
    'gap-2': 'gap: 0.5rem;',
    'gap-4': 'gap: 1rem;',
    'gap-8': 'gap: 2rem;',
    
    // Padding
    'p-0': 'padding: 0;',
    'px-0': 'padding-left: 0; padding-right: 0;',
    'py-0': 'padding-top: 0; padding-bottom: 0;',
    
    // Margin
    'm-0': 'margin: 0;',
    'mx-auto': 'margin-left: auto; margin-right: auto;',
    
    // Width/Height
    'w-full': 'width: 100%;',
    'h-full': 'height: 100%;',
    'size-full': 'width: 100%; height: 100%;',
    
    // Position
    'relative': 'position: relative;',
    'absolute': 'position: absolute;',
    'fixed': 'position: fixed;',
    'sticky': 'position: sticky;',
    
    // Colors
    'bg-white': 'background: #ffffff;',
    'bg-black': 'background: #000000;',
    'text-white': 'color: #ffffff;',
    'text-black': 'color: #000000;',
    
    // Border
    'border': 'border: 1px solid;',
    'border-0': 'border: 0;',
    'border-2': 'border-width: 2px;',
    'border-solid': 'border-style: solid;',
    'rounded': 'border-radius: 0.25rem;',
    'rounded-lg': 'border-radius: 0.5rem;',
    'rounded-xl': 'border-radius: 0.75rem;',
    'rounded-2xl': 'border-radius: 1rem;',
    'rounded-full': 'border-radius: 9999px;',
    
    // Overflow
    'overflow-hidden': 'overflow: hidden;',
    'overflow-clip': 'overflow: clip;',
    'overflow-auto': 'overflow: auto;',
    
    // Text
    'text-center': 'text-align: center;',
    'text-left': 'text-align: left;',
    'text-right': 'text-align: right;',
    'font-bold': 'font-weight: 700;',
    'font-medium': 'font-weight: 500;',
    'font-normal': 'font-weight: 400;',
    'whitespace-pre-wrap': 'white-space: pre-wrap;',
    'whitespace-nowrap': 'white-space: nowrap;',
    
    // Cursor
    'cursor-pointer': 'cursor: pointer;',
    'cursor-default': 'cursor: default;',
    
    // Top/Right/Bottom/Left
    'top-0': 'top: 0;',
    'right-0': 'right: 0;',
    'bottom-0': 'bottom: 0;',
    'left-0': 'left: 0;',
    
    // Object fit
    'object-cover': 'object-fit: cover;',
    'object-contain': 'object-fit: contain;',
    
    // Shrink
    'shrink-0': 'flex-shrink: 0;',
    
    // Box sizing
    'box-border': 'box-sizing: border-box;',
    
    // Pointer events
    'pointer-events-none': 'pointer-events: none;',
    
    // Min/Max width
    'min-w-0': 'min-width: 0;',
    'min-h-px': 'min-height: 1px;',
    'min-w-px': 'min-width: 1px;',
    'max-w-none': 'max-width: none;',
    
    // Overflow text
    'overflow-ellipsis': 'text-overflow: ellipsis;',
    'overflow-hidden': 'overflow: hidden;',
    
    // Not italic
    'not-italic': 'font-style: normal;',
    
    // Leading
    'leading-0': 'line-height: 0;',
    
    // Inset
    'inset-0': 'top: 0; right: 0; bottom: 0; left: 0;',
  };
  
  // 직접 매칭
  if (conversions[tailwindClass]) {
    return conversions[tailwindClass];
  }
  
  // 동적 값 처리 (예: gap-[32px], px-[24px], text-[40px])
  const dynamicPatterns = [
    // Gap
    { pattern: /^gap-\[(\d+)px\]$/, css: (val) => `gap: ${val}px;` },
    
    // Padding
    { pattern: /^p-\[(\d+)px\]$/, css: (val) => `padding: ${val}px;` },
    { pattern: /^px-\[(\d+)px\]$/, css: (val) => `padding-left: ${val}px; padding-right: ${val}px;` },
    { pattern: /^py-\[(\d+)px\]$/, css: (val) => `padding-top: ${val}px; padding-bottom: ${val}px;` },
    { pattern: /^pt-\[(\d+)px\]$/, css: (val) => `padding-top: ${val}px;` },
    { pattern: /^pb-\[(\d+)px\]$/, css: (val) => `padding-bottom: ${val}px;` },
    { pattern: /^pl-\[(\d+)px\]$/, css: (val) => `padding-left: ${val}px;` },
    { pattern: /^pr-\[(\d+)px\]$/, css: (val) => `padding-right: ${val}px;` },
    
    // Margin
    { pattern: /^m-\[(\d+)px\]$/, css: (val) => `margin: ${val}px;` },
    { pattern: /^mx-\[(\d+)px\]$/, css: (val) => `margin-left: ${val}px; margin-right: ${val}px;` },
    { pattern: /^my-\[(\d+)px\]$/, css: (val) => `margin-top: ${val}px; margin-bottom: ${val}px;` },
    { pattern: /^mt-\[(\d+)px\]$/, css: (val) => `margin-top: ${val}px;` },
    { pattern: /^mb-\[(\d+)px\]$/, css: (val) => `margin-bottom: ${val}px;` },
    { pattern: /^ml-\[(\d+)px\]$/, css: (val) => `margin-left: ${val}px;` },
    { pattern: /^mr-\[(\d+)px\]$/, css: (val) => `margin-right: ${val}px;` },
    
    // Width/Height
    { pattern: /^w-\[(\d+)px\]$/, css: (val) => `width: ${val}px;` },
    { pattern: /^h-\[(\d+)px\]$/, css: (val) => `height: ${val}px;` },
    { pattern: /^w-\[(\d+)%\]$/, css: (val) => `width: ${val}%;` },
    { pattern: /^h-\[(\d+)%\]$/, css: (val) => `height: ${val}%;` },
    
    // Font size
    { pattern: /^text-\[(\d+)px\]$/, css: (val) => `font-size: ${val}px;` },
    
    // Colors (rgba)
    { pattern: /^bg-\[rgba\(([^)]+)\)\]$/, css: (val) => `background: rgba(${val});` },
    { pattern: /^text-\[rgba\(([^)]+)\)\]$/, css: (val) => `color: rgba(${val});` },
    { pattern: /^border-\[rgba\(([^)]+)\)\]$/, css: (val) => `border-color: rgba(${val});` },
    
    // Colors (hex)
    { pattern: /^bg-\[#([0-9a-fA-F]+)\]$/, css: (val) => `background: #${val};` },
    { pattern: /^text-\[#([0-9a-fA-F]+)\]$/, css: (val) => `color: #${val};` },
    
    // Border radius
    { pattern: /^rounded-\[(\d+)px\]$/, css: (val) => `border-radius: ${val}px;` },
    
    // Left/Top/Right/Bottom
    { pattern: /^left-\[(-?\d+)px\]$/, css: (val) => `left: ${val}px;` },
    { pattern: /^top-\[(-?\d+)px\]$/, css: (val) => `top: ${val}px;` },
    { pattern: /^right-\[(-?\d+)px\]$/, css: (val) => `right: ${val}px;` },
    { pattern: /^bottom-\[(-?\d+)px\]$/, css: (val) => `bottom: ${val}px;` },
    
    // Letter spacing
    { pattern: /^tracking-\[(-?\d+\.?\d*)px\]$/, css: (val) => `letter-spacing: ${val}px;` },
    
    // Line height
    { pattern: /^leading-\[(\d+\.?\d*)\]$/, css: (val) => `line-height: ${val};` },
    
    // Font family
    { pattern: /^font-\['([^']+)'\]$/, css: (val) => `font-family: ${val}, sans-serif;` },
    
    // Object position
    { pattern: /^object-(\d+)%-(\d+)%$/, css: (val1, val2) => `object-position: ${val1}% ${val2}%;` },
  ];
  
  for (const { pattern, css } of dynamicPatterns) {
    const match = tailwindClass.match(pattern);
    if (match) {
      return css(...match.slice(1));
    }
  }
  
  // 변환할 수 없는 클래스는 주석으로 표시
  return `/* ${tailwindClass} - 변환 필요 */`;
}

/**
 * Tailwind 클래스 문자열을 CSS로 변환
 */
function convertTailwindClassesToCSS(classNameString) {
  if (!classNameString) return '';
  
  const classes = classNameString.split(/\s+/).filter(Boolean);
  const cssRules = classes.map(convertTailwindToCSS).filter(Boolean);
  
  return cssRules.join('\n  ');
}

/**
 * React 컴포넌트 코드에서 Tailwind 클래스를 찾아 CSS로 변환
 */
function extractAndConvertTailwindFromJSX(jsxCode) {
  // className="..." 패턴 찾기
  const classNameRegex = /className=["']([^"']+)["']/g;
  const matches = [];
  let match;
  
  while ((match = classNameRegex.exec(jsxCode)) !== null) {
    matches.push(match[1]);
  }
  
  // 고유한 클래스만 추출
  const uniqueClasses = [...new Set(matches)];
  
  // 각 클래스를 CSS로 변환
  const cssRules = uniqueClasses.map(className => {
    const css = convertTailwindClassesToCSS(className);
    return `.${className.replace(/\s+/g, '.')} {\n  ${css}\n}`;
  });
  
  return cssRules.join('\n\n');
}

// 테스트 실행
const testClasses = [
  'flex flex-col items-center gap-[32px]',
  'px-[24px] py-[56px]',
  'text-[40px] font-bold',
  'bg-black text-white',
  'w-[375px] h-[298px]',
  'left-[-196px] top-0',
  'text-[rgba(0,0,0,0.55)]',
  'rounded-[12px]',
];

console.log('Tailwind → CSS 변환 테스트:\n');
testClasses.forEach(cls => {
  console.log(`Input: ${cls}`);
  console.log(`Output:\n${convertTailwindClassesToCSS(cls)}\n`);
});

export { convertTailwindToCSS, convertTailwindClassesToCSS, extractAndConvertTailwindFromJSX };

