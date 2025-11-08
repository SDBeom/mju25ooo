import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import './BackgroundImages.css';
import image1 from '../../assets/imgi_3_premium_photo-1758613868292-a3f75bf1b649.webp';
import image2 from '../../assets/poster_final.png';

const BackgroundImages = ({ currentIndex }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [viewportSize, setViewportSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);

  // assets 폴더의 실제 이미지 파일들 사용 (다양한 이미지)
  const imageData = useMemo(() => {
    const images = [];
    const imageFiles = [
      image1,
      image2
    ];
    
    // 24개 이미지 생성 (다양한 이미지 파일 사용)
    for (let i = 0; i < 24; i++) {
      const imageIndex = i % imageFiles.length;
      images.push({
        id: i + 1,
        src: imageFiles[imageIndex],
        alt: `Designer ${i + 1}`,
        title: `Designer ${i + 1}`,
        // 이미지 로드 실패 시 대체할 그라데이션 색상
        fallbackColor: `hsl(${(i * 15) % 360}, 70%, 60%)`
      });
    }
    
    return images;
  }, []);

  // 이미지 로드 핸들러
  const handleImageLoad = useCallback((imageId) => {
    setLoadedImages(prev => new Set([...prev, imageId]));
  }, []);

  // 지연 로딩을 위한 이미지 프리로드
  const preloadImage = useCallback((src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = src;
    });
  }, []);

  // 현재 보이는 이미지와 인접 이미지만 로드
  const getVisibleImageIds = useCallback(() => {
    const visibleIds = new Set();
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + imageData.length) % imageData.length;
      visibleIds.add(imageData[index].id);
    }
    return visibleIds;
  }, [currentIndex, imageData]);

  useEffect(() => {
    // 초기 이미지 데이터 설정
    const initialImages = imageData.map((img, index) => ({
      ...img,
      loaded: false,
      placeholder: `linear-gradient(135deg, 
        ${img.fallbackColor}, 
        hsl(${(index * 15 + 60) % 360}, 70%, 40%))`
    }));

    setImages(initialImages);
    setIsLoading(false);

    // 현재 보이는 이미지들 프리로드
    const visibleIds = getVisibleImageIds();
    visibleIds.forEach(id => {
      const image = imageData.find(img => img.id === id);
      if (image) {
        preloadImage(image.src)
          .then(() => handleImageLoad(id))
          .catch(() => console.warn(`Failed to load image: ${image.src}`));
      }
    });
  }, [imageData, getVisibleImageIds, preloadImage, handleImageLoad]);

  // currentIndex 변경 시 새로운 이미지 프리로드
  useEffect(() => {
    const visibleIds = getVisibleImageIds();
    visibleIds.forEach(id => {
      if (!loadedImages.has(id)) {
        const image = imageData.find(img => img.id === id);
        if (image) {
          preloadImage(image.src)
            .then(() => handleImageLoad(id))
            .catch(() => console.warn(`Failed to load image: ${image.src}`));
        }
      }
    });
  }, [currentIndex, getVisibleImageIds, loadedImages, imageData, preloadImage, handleImageLoad]);

  // 스크롤과 리사이즈 이벤트 리스너
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setViewportSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 프레임 갤러리 스타일 계산 (스크롤 반응형, 무한 루프 지원)
  const getFrameGalleryStyle = useCallback((renderIndex) => {
    const { height: viewportHeight } = viewportSize;
    
    // 기본 프레임 크기 (상하로 꽉 차게)
    const baseFrameHeight = viewportHeight * 0.95;
    const baseFrameWidth = baseFrameHeight * (1920 / 1080);
    
    // renderIndex를 기반으로 한 오프셋 계산 (무한 루프 지원)
    const offset = renderIndex - currentIndex;
    
    // 스크롤에 따른 크기 변화 (중앙 기준)
    let scale = 1.0;
    if (Math.abs(offset) === 0) {
      scale = 1.0; // 중앙: 원본 크기
    } else if (Math.abs(offset) === 1) {
      scale = 0.8; // +1: 80% 크기
    } else if (Math.abs(offset) === 2) {
      scale = 0.6; // +2: 60% 크기
    } else {
      scale = 0.4; // 더 멀리: 40% 크기
    }
    
    // 스크롤에 따른 추가 스케일링 (부드러운 변화)
    const scrollScale = Math.max(0.7, 1 - Math.abs(scrollY) / 1000);
    const finalScale = scale * scrollScale;
    
    // 보이는 범위 확장
    const isVisible = Math.abs(offset) <= 3.0;
    
    // 프레임들이 겹치도록 오프셋 조정 (중앙 정렬)
    const overlapOffset = offset * (baseFrameWidth * 0.85); // 15% 겹침
    
    return {
      transform: `translateX(calc(${overlapOffset}px - 50%)) translateY(-50%) scale(${finalScale})`,
      opacity: isVisible ? 1 : 0,
      zIndex: isVisible ? 20 - Math.abs(offset) : 1,
      width: `${baseFrameWidth}px`,
      height: `${baseFrameHeight}px`,
      // 무한 루프를 위해 transition을 조건부로 적용
      transition: Math.abs(offset) <= 3 ? 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
    };
  }, [currentIndex, viewportSize, scrollY]);

  // 현재 보이는 슬라이드들만 렌더링 (무한 루프를 위한 확장된 범위)
  const visibleSlides = useMemo(() => {
    const slides = [];
    
    // 무한 루프를 위해 더 넓은 범위로 확장하고 양 끝 프레임 복제
    for (let i = -6; i <= 6; i++) { // 좌우 6개씩 총 13개 프레임
      const renderIndex = currentIndex + i;
      const index = (renderIndex + 24) % 24;
      
      if (images[index]) {
        slides.push({ 
          ...images[index], 
          index,
          // 무한 루프를 위한 실제 렌더링 인덱스
          renderIndex: renderIndex
        });
      }
    }
    return slides;
  }, [currentIndex, images]);

  if (isLoading) {
    return (
      <div className="background-images-container">
        <div className="background-loading">
          <div className="spinner"></div>
          <p>Loading images...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="frame-gallery-container" ref={containerRef}>
      <div className="frame-gallery-track">
        {visibleSlides.map((image) => {
          const frameStyle = getFrameGalleryStyle(image.renderIndex);
          
          return (
            <div
              key={image.id}
              className="frame-gallery-item"
              style={frameStyle}
            >
              <div className="frame-container">
                {loadedImages.has(image.id) ? (
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="frame-image"
                    loading="lazy"
                    decoding="async"
                    fetchpriority="low"
                    onError={(e) => {
                      // 이미지 로드 실패 시 플레이스홀더 표시
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
              
              {/* 플레이스홀더 */}
              <div 
                className="frame-placeholder" 
                style={{ 
                  display: loadedImages.has(image.id) ? 'none' : 'flex',
                  background: image.placeholder
                }}
              >
                <span className="placeholder-text">{image.title}</span>
              </div>
              
              {/* 프레임 오버레이 */}
              <div className="frame-overlay"></div>
            </div>
          </div>
        );
        })}
      </div>
      
      {/* 프레임 갤러리 인디케이터 */}
      <div className="frame-gallery-indicators">
        {images.map((_, index) => (
          <div
            key={index}
            className={`frame-indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => {
              // 인디케이터 클릭 시 해당 이미지로 이동
              // 이 기능은 부모 컴포넌트에서 처리해야 함
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BackgroundImages;
