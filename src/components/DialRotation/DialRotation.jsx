import React, { useState, useEffect, useRef } from 'react';
import { useBreakpointContext } from '../../contexts/BreakpointContext';
import './DialRotation.css';

const DialRotation = ({ onNavigate }) => {
  const { isMobile } = useBreakpointContext();
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, rotation: 0 });
  const dialRef = useRef(null);

  // 다이얼 항목들
  const dialItems = [
    { id: 'main', label: '메인', icon: '🏠', path: '/' },
    { id: 'designer', label: '디자이너', icon: '👨‍🎨', path: '/designer' },
    { id: 'works', label: '작품', icon: '🎨', path: '/works' },
    { id: 'about', label: '소개', icon: 'ℹ️', path: '/about' }
  ];

  // 마우스/터치 이벤트 핸들러
  const handleStart = (e) => {
    setIsDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX, y: clientY, rotation });
  };

  const handleMove = (e) => {
    if (!isDragging) return;
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const deltaX = clientX - dragStart.x;
    const deltaY = clientY - dragStart.y;
    
    // 회전 각도 계산 (더 민감하게)
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    const newRotation = dragStart.rotation + angle;
    
    setRotation(newRotation);
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  // 자동 회전 애니메이션
  useEffect(() => {
    if (!isDragging) {
      const interval = setInterval(() => {
        setRotation(prev => prev + 0.5);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isDragging]);

  // 항목 클릭 핸들러
  const handleItemClick = (item) => {
    if (onNavigate) {
      onNavigate(item.path);
    } else {
      window.history.pushState({}, '', item.path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  // 항목 위치 계산
  const getItemPosition = (index, total) => {
    const angle = (360 / total) * index;
    const radius = isMobile ? 60 : 80;
    const x = Math.cos((angle + rotation) * Math.PI / 180) * radius;
    const y = Math.sin((angle + rotation) * Math.PI / 180) * radius;
    return { x, y };
  };

  return (
    <div className="dial-rotation-container">
      <div 
        ref={dialRef}
        className="dial-rotation"
        style={{
          transform: `rotate(${rotation}deg)`,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleStart}
        onTouchStart={handleStart}
        onMouseMove={handleMove}
        onTouchMove={handleMove}
        onMouseUp={handleEnd}
        onTouchEnd={handleEnd}
        onMouseLeave={handleEnd}
      >
        {/* 중앙 원 */}
        <div className="dial-center">
          <div className="dial-center-icon">🎯</div>
        </div>

        {/* 다이얼 항목들 */}
        {dialItems.map((item, index) => {
          const position = getItemPosition(index, dialItems.length);
          return (
            <div
              key={item.id}
              className="dial-item"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) rotate(${-rotation}deg)`
              }}
              onClick={() => handleItemClick(item)}
            >
              <div className="dial-item-icon">{item.icon}</div>
              <div className="dial-item-label">{item.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DialRotation;
