import React, { useState, useEffect, useRef, useCallback } from 'react';
import BackgroundImages from '../BackgroundImages/BackgroundImages';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import './DialRotation.css';

const DialRotation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, rotation: 0 });
  const dialRef = useRef(null);
  const totalItems = 24;
  const breakpoint = useBreakpoint();

  // 화면 크기에 따른 반지름 계산
  const getRadius = useCallback(() => {
    switch (breakpoint) {
      case 'mobile':
        return 120; // 모바일: 작은 반지름
      case 'tablet':
        return 200; // 태블릿: 중간 반지름
      case 'desktop':
      default:
        return 300; // 데스크탑: 큰 반지름
    }
  }, [breakpoint]);

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
      setRotation(prev => {
        const rotationDelta = delta * (360 / totalItems);
        // 무한 회전을 위해 각도를 누적 (360도 제한 없음)
        return prev + rotationDelta;
      });
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
    
    // 회전 각도 계산 (더 부드러운 회전을 위해 감도 조정)
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) * 0.5;
    const newRotation = dragStart.rotation + angle;
    
    setRotation(newRotation);
    
    // 회전에 따른 인덱스 업데이트 (무한 회전 지원)
    const rotationPerItem = 360 / totalItems;
    // 무한 회전을 위해 각도를 정규화하지 않고 직접 계산
    const newIndex = Math.round(newRotation / rotationPerItem);
    setCurrentIndex((newIndex % totalItems + totalItems) % totalItems);
  }, [isDragging, dragStart, totalItems]);

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // 항목 클릭 핸들러
  const handleItemClick = useCallback((index) => {
    setCurrentIndex(index);
    // 현재 회전 각도를 기준으로 가장 가까운 회전 각도 계산
    const targetRotation = index * (360 / totalItems);
    setRotation(prev => {
      // 현재 각도에서 목표 각도까지의 최단 경로 계산
      const currentNormalized = ((prev % 360) + 360) % 360;
      const targetNormalized = ((targetRotation % 360) + 360) % 360;
      const diff = targetNormalized - currentNormalized;
      
      // 최단 경로로 회전 (180도 이상 차이나면 반대 방향으로 회전)
      if (Math.abs(diff) > 180) {
        return prev + (diff > 0 ? diff - 360 : diff + 360);
      }
      return prev + diff;
    });
  }, [totalItems]);

  // 항목 위치 계산
  const getItemPosition = useCallback((index) => {
    const angle = (360 / totalItems) * index;
    const radius = getRadius(); // 화면 크기에 따른 동적 반지름
    // 무한 회전을 위해 각도를 정규화하지 않고 직접 사용
    const x = Math.cos((angle + rotation) * Math.PI / 180) * radius;
    const y = Math.sin((angle + rotation) * Math.PI / 180) * radius;
    return { x, y };
  }, [rotation, totalItems, getRadius]);

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
    <>
      {/* 배경 이미지 - 스크롤과 다이얼 회전에 반응 */}
      <BackgroundImages
        currentIndex={currentIndex}
        rotation={rotation}
      />

      <div className="dial-rotation-container">
        {/* 중앙 원과 텍스트 - 회전하지 않도록 밖으로 분리 */}
        <div className="dial-center">
          <div className="dial-center-circle">
            <div className="dial-center-text">
              {currentIndex + 1}/{totalItems}
            </div>
          </div>
        </div>

        <div 
          ref={dialRef}
          className="dial-rotation"
          style={{
            transform: `rotate(${rotation}deg)`,
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
        >
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
                <div className="dial-item-content">
                  {item.id}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DialRotation;