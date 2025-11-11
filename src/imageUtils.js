/**
 * 브라우저 환경에서 이미지를 리사이징하고 원하는 포맷으로 변환합니다.
 * @param {File} file - 원본 이미지 파일 객체
 * @param {object} options - 변환 옵션
 * @param {number} [options.maxWidth=800] - 최대 너비
 * @param {number} [options.maxHeight=800] - 최대 높이
 * @param {string} [options.format='image/jpeg'] - 출력 포맷 (e.g., 'image/jpeg', 'image/png', 'image/webp')
 * @param {number} [options.quality=0.8] - JPEG/WebP 포맷의 품질 (0.0 ~ 1.0)
 * @returns {Promise<File>} - 변환된 이미지 File 객체를 담은 Promise
 */
export function processImage(file, options = {}) {
  return new Promise((resolve, reject) => {
    // 파일이 이미지인지 먼저 확인합니다.
    if (!file.type.startsWith('image/')) {
      return reject(new Error('Provided file is not an image.'));
    }

    const {
      maxWidth = 800,
      maxHeight = 800,
      format = 'image/jpeg',
      quality = 0.8,
    } = options;
 
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let { width, height } = img;
 
        if (width > height) { // 가로가 더 긴 이미지
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          // 세로가 더 길거나 정사각형인 이미지
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
 
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
 
        canvas.toBlob(
          (blob) => {
            if (blob) {
              // Blob을 File 객체로 변환하여 반환합니다. (서버 전송에 더 용이)
              const extension = format.split('/')[1];
              const newFileName = `${file.name.split('.').slice(0, -1).join('.')}_processed.${extension}`;
              resolve(new File([blob], newFileName, { type: format }));
            } else {
              reject(new Error('Canvas to Blob conversion failed.'));
            }
          },
          format,
          quality
        );
      };
      img.src = event.target.result; // as string
    };
    reader.readAsDataURL(file);
  });
}