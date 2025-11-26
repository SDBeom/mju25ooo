/**
 * Figma 디자인 샘플을 처리하는 스크립트
 * 
 * 이 스크립트는:
 * 1. Figma 디자인 정보를 읽어서
 * 2. React 컴포넌트와 CSS를 생성하고
 * 3. 프로젝트에 통합합니다
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { convertTailwindClassesToCSS } from './convert-tailwind-to-css.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

/**
 * 컴포넌트 이름 생성 (PascalCase)
 */
function toPascalCase(str) {
  return str
    .split(/[-_\s]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

/**
 * 파일 이름 생성 (kebab-case)
 */
function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Figma React 코드에서 이미지 URL 추출
 */
function extractImageUrls(jsxCode) {
  const imageRegex = /const\s+(\w+)\s*=\s*["']([^"']+)["']/g;
  const images = {};
  let match;
  
  while ((match = imageRegex.exec(jsxCode)) !== null) {
    images[match[1]] = match[2];
  }
  
  return images;
}

/**
 * Figma React 코드를 프로젝트 스타일에 맞게 변환
 */
function convertFigmaJSXToProjectStyle(jsxCode, componentName, deviceType) {
  // 이미지 URL 추출
  const imageUrls = extractImageUrls(jsxCode);
  
  // 이미지 import 문 생성 (실제로는 assets 폴더의 이미지를 사용해야 함)
  const imageImports = Object.entries(imageUrls).map(([varName, url]) => {
    // 임시로 Figma URL을 사용 (나중에 실제 이미지로 교체)
    return `// TODO: Replace with actual image import\n// const ${varName} = '${url}';`;
  }).join('\n');
  
  // 컴포넌트 코드 변환
  // 1. 함수명 변경
  let converted = jsxCode.replace(/export default function \w+\(\)/, 
    `const ${componentName}${deviceType} = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  if (!work || !designer) {
    return null;
  }
  
  return (`);
  
  // 2. className을 프로젝트 스타일에 맞게 변경
  // 3. 이미지 src를 work.gallery나 work.thumbnail로 변경
  // 4. 텍스트를 work props에서 가져오도록 변경
  
  converted += `\n  );\n};\n\nexport default ${componentName}${deviceType};`;
  
  return {
    jsx: converted,
    imageUrls: imageUrls
  };
}

// 샘플 처리
console.log('Figma 샘플 처리 스크립트\n');
console.log('이 스크립트는 Figma 디자인을 프로젝트 스타일에 맞게 변환합니다.\n');
console.log('✅ Tailwind → CSS 변환 로직 준비 완료');
console.log('✅ 컴포넌트 생성 로직 준비 완료\n');
console.log('📝 다음 단계:');
console.log('   1. Figma API에서 디자인 코드 가져오기');
console.log('   2. Tailwind 클래스를 CSS로 변환');
console.log('   3. React 컴포넌트 생성');
console.log('   4. 이미지 다운로드 및 경로 설정');
console.log('   5. WorkDetailContent.jsx에 등록');

