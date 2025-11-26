/**
 * 이미지 에러 처리 유틸리티
 */
export const handleImageError = (e, src, workId = 'unknown', galleryIndex = 'N/A') => {
  console.error(`Image failed to load: ${src} (Work ID: ${workId}, Gallery Index: ${galleryIndex})`, e);
  e.target.style.display = 'none'; // Hide the broken image
};

