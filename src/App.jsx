/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import ComingSoon from './components/ComingSoon/ComingSoon';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainContent from './components/MainContent/MainContent';

const _resolveComingSoonState = () => {
  const preview = import.meta.env.VITE_PREVIEW_MODE;
  if (preview === 'main') return false;
  if (preview === 'comingsoon') return true;

  const envFlag = import.meta.env.VITE_ENABLE_COMING_SOON;
  if (typeof envFlag === 'string') {
    return envFlag.toLowerCase() === 'true';
  }

  // 커밍순 페이지 비활성화 - 메인 화면 표시
  return false;
};

function App() {
  const showComingSoon = _resolveComingSoonState();
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // 화면 크기 기반으로 드래그 범위 설정
  const getScreenBounds = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    return {
      minX: -screenWidth * 2, // 왼쪽으로 2배 화면 너비
      maxX: screenWidth * 2,  // 오른쪽으로 2배 화면 너비
      minY: -screenHeight * 2, // 위로 2배 화면 높이
      maxY: screenHeight * 2   // 아래로 2배 화면 높이
    };
  };

  // 좌표를 범위 내로 제한하고 무한 루프 처리
  const normalizePosition = useCallback((x, y) => {
    const bounds = getScreenBounds();

    // X 좌표 무한 루프 처리
    let normalizedX = x;
    if (x > bounds.maxX) {
      normalizedX = bounds.minX + (x - bounds.maxX);
    } else if (x < bounds.minX) {
      normalizedX = bounds.maxX - (bounds.minX - x);
    }

    // Y 좌표 무한 루프 처리
    let normalizedY = y;
    if (y > bounds.maxY) {
      normalizedY = bounds.minY + (y - bounds.maxY);
    } else if (y < bounds.minY) {
      normalizedY = bounds.maxY - (bounds.minY - y);
    }

    return { x: normalizedX, y: normalizedY };
  }, []);

  const handleMouseDown = (e) => {
    // 헤더나 푸터 영역 클릭은 무시
    if (e.target.closest('.header') || e.target.closest('.footer')) {
      return;
    }
    
    // 링크나 버튼 클릭은 무시
    if (e.target.closest('a') || e.target.closest('button') || e.target.closest('nav')) {
      return;
    }
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;

    // 마우스 버튼이 눌려있지 않으면 드래그 해제
    if (!(e.buttons & 1)) {
      handleMouseUp();
      return;
    }

    const deltaX = (e.clientX - dragStart.x) * 2;
    const deltaY = (e.clientY - dragStart.y) * 2;

    const newX = position.x + deltaX;
    const newY = position.y + deltaY;

    // 드래그 중에도 무한 루프 처리
    const normalized = normalizePosition(newX, newY);
    
    setDragOffset({
      x: normalized.x - position.x,
      y: normalized.y - position.y
    });
  }, [isDragging, dragStart, position, normalizePosition]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;

    const newX = position.x + dragOffset.x;
    const newY = position.y + dragOffset.y;
    
    // 무한 루프 처리
    const normalized = normalizePosition(newX, newY);
    
    setPosition(normalized);
    setDragOffset({ x: 0, y: 0 });
    setIsDragging(false);
  }, [isDragging, position, dragOffset, normalizePosition]);

  const handleTouchStart = (e) => {
    // 헤더나 푸터 영역 터치는 무시
    if (e.target.closest('.header') || e.target.closest('.footer')) {
      return;
    }

    // 링크나 버튼 터치는 무시
    if (e.target.closest('a') || e.target.closest('button') || e.target.closest('nav')) {
      return;
    }

    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({
      x: touch.clientX,
      y: touch.clientY
    });
  };

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;

    // 터치가 없으면 드래그 해제
    if (e.touches.length === 0) {
      handleTouchEnd();
      return;
    }

    const touch = e.touches[0];
    const deltaX = (touch.clientX - dragStart.x) * 2;
    const deltaY = (touch.clientY - dragStart.y) * 2;

    const newX = position.x + deltaX;
    const newY = position.y + deltaY;

    // 드래그 중에도 무한 루프 처리
    const normalized = normalizePosition(newX, newY);
    
    setDragOffset({
      x: normalized.x - position.x,
      y: normalized.y - position.y
    });
  }, [isDragging, dragStart, position, normalizePosition]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;

    const newX = position.x + dragOffset.x;
    const newY = position.y + dragOffset.y;
    
    // 무한 루프 처리
    const normalized = normalizePosition(newX, newY);
    
    setPosition(normalized);
    setDragOffset({ x: 0, y: 0 });
    setIsDragging(false);
  }, [isDragging, position, dragOffset, normalizePosition]);

  // 강제 드래그 해제 함수
  const forceStopDragging = useCallback(() => {
    if (isDragging) {
      const newX = position.x + dragOffset.x;
      const newY = position.y + dragOffset.y;
      const normalized = normalizePosition(newX, newY);
      
      setPosition(normalized);
      setDragOffset({ x: 0, y: 0 });
      setIsDragging(false);
    }
  }, [isDragging, position, dragOffset, normalizePosition]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mouseleave', handleMouseUp); // 마우스가 창을 벗어날 때
      document.addEventListener('contextmenu', forceStopDragging); // 우클릭 시
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseUp);
      document.removeEventListener('contextmenu', forceStopDragging);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, forceStopDragging]);

  // ESC 키로 드래그 강제 해제
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isDragging) {
        forceStopDragging();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDragging, forceStopDragging]);

  const currentX = position.x + dragOffset.x;
  const currentY = position.y + dragOffset.y;

  // 현재 위치 계산 (정규화된 좌표)
  const normalizedCurrent = normalizePosition(currentX, currentY);
  const bounds = getScreenBounds();
  
  // 위치를 0-100% 범위로 변환
  const positionPercentX = ((normalizedCurrent.x - bounds.minX) / (bounds.maxX - bounds.minX)) * 100;
  const positionPercentY = ((normalizedCurrent.y - bounds.minY) / (bounds.maxY - bounds.minY)) * 100;

  // 커밍순 페이지 표시
  if (showComingSoon) {
    return (
      <ErrorBoundary>
        <ComingSoon />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <MainContent />
    </ErrorBoundary>
  );
}

export default App;
