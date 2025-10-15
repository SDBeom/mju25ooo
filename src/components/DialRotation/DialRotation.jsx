import React, { useState, useEffect, useRef, useCallback } from 'react';
import './DialRotation.css';

const DialRotation = ({ onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, rotation: 0 });
  const dialRef = useRef(null);
  const totalItems = 24;

  // 24개 사진 데이터 (실제로는 이미지 경로를 사용해야 함)
  const imageItems = Array.from({ length: totalItems }, (_, index) => ({
    id: index + 1,
    image: `/images/designer-${index + 1}.jpg`, // 실제 이미지 경로
    alt: `Designer ${index + 1}`
  }));

  // 스크롤 이벤트 핸들러
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 1 : -1;
    setCurrentIndex(prev => {
      const newIndex = (prev + delta + totalItems) % totalItems;
      setRotation(prev => prev + (delta * (360 / totalItems)));
      return newIndex;
    });
  }, [totalItems]);

  // 마우스/터치 이벤트 핸들러
  const handleStart = useCallback((e) => {
    setIsDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX, y: clientY, rotation });
  }, [rotation]);

  const handleMove = useCallback((e) => {
    if (!isDragging) return;
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const deltaX = clientX - dragStart.x;
    const deltaY = clientY - dragStart.y;
    
    // 회전 각도 계산
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    const newRotation = dragStart.rotation + angle;
    
    setRotation(newRotation);
    
    // 회전에 따른 인덱스 업데이트
    const rotationPerItem = 360 / totalItems;
    const newIndex = Math.round((newRotation % 360) / rotationPerItem);
    setCurrentIndex((newIndex + totalItems) % totalItems);
  }, [isDragging, dragStart, totalItems]);

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // 항목 클릭 핸들러
  const handleItemClick = useCallback((index) => {
    setCurrentIndex(index);
    const targetRotation = index * (360 / totalItems);
    setRotation(targetRotation);
  }, [totalItems]);

  // 항목 위치 계산
  const getItemPosition = useCallback((index) => {
    const angle = (360 / totalItems) * index;
    const radius = 200; // 원형 반지름
    const x = Math.cos((angle + rotation) * Math.PI / 180) * radius;
    const y = Math.sin((angle + rotation) * Math.PI / 180) * radius;
    return { x, y };
  }, [rotation, totalItems]);

  // 이벤트 리스너 등록
  useEffect(() => {
    const dialElement = dialRef.current;
    if (dialElement) {
      dialElement.addEventListener('wheel', handleWheel, { passive: false });
      dialElement.addEventListener('mousedown', handleStart);
      dialElement.addEventListener('mousemove', handleMove);
      dialElement.addEventListener('mouseup', handleEnd);
      dialElement.addEventListener('mouseleave', handleEnd);
      dialElement.addEventListener('touchstart', handleStart, { passive: false });
      dialElement.addEventListener('touchmove', handleMove, { passive: false });
      dialElement.addEventListener('touchend', handleEnd);
    }

    return () => {
      if (dialElement) {
        dialElement.removeEventListener('wheel', handleWheel);
        dialElement.removeEventListener('mousedown', handleStart);
        dialElement.removeEventListener('mousemove', handleMove);
        dialElement.removeEventListener('mouseup', handleEnd);
        dialElement.removeEventListener('mouseleave', handleEnd);
        dialElement.removeEventListener('touchstart', handleStart);
        dialElement.removeEventListener('touchmove', handleMove);
        dialElement.removeEventListener('touchend', handleEnd);
      }
    };
  }, [handleWheel, handleStart, handleMove, handleEnd]);

  return (
    <div className="dial-rotation-container">
      <div 
        ref={dialRef}
        className="dial-rotation"
        style={{
          transform: `rotate(${rotation}deg)`,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
      >
        {/* 중앙 원과 텍스트 */}
        <div className="dial-center">
          <div className="dial-center-circle">
            <div className="dial-center-text">
              {currentIndex + 1}/{totalItems}
            </div>
          </div>
        </div>

        {/* 24개 사진들이 원형으로 배치 */}
        {imageItems.map((item, index) => {
          const position = getItemPosition(index);
          const isActive = index === currentIndex;
          
          return (
            <div
              key={item.id}
              className={`dial-item ${isActive ? 'active' : ''}`}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) rotate(${-rotation}deg)`
              }}
              onClick={() => handleItemClick(index)}
            >
              <div className="dial-item-image">
                <img 
                  src={item.image} 
                  alt={item.alt}
                  onError={(e) => {
                    // 이미지 로드 실패 시 플레이스홀더 표시
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="image-placeholder" style={{ display: 'none' }}>
                  {item.id}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DialRotation;