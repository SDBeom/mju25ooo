import React, { useEffect, useRef, useState } from 'react';

/**
 * HybridBackground
 * Candycrash.js 효과를 사용한 배경 컴포넌트
 * - 움직이는 볼들이 부드럽게 합쳐지는 블롭 효과
 * - 공의 경계가 유기적으로 변형되며 합쳐지는 자연스러운 애니메이션
 */

const HybridBackground = () => {
  const canvasRef = useRef(null);
  const ballsRef = useRef([]);
  const [isReady, setIsReady] = useState(false);

  // Paper.js 로드 대기
  useEffect(() => {
    if (typeof window !== 'undefined' && window.paper) {
      setIsReady(true);
    } else {
      const checkPaper = setInterval(() => {
        if (typeof window !== 'undefined' && window.paper) {
          setIsReady(true);
          clearInterval(checkPaper);
        }
      }, 100);

      return () => clearInterval(checkPaper);
    }
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const canvas = canvasRef.current;
    if (!canvas || typeof window === 'undefined' || !window.paper) return;

    const paper = window.paper;
    
    // Canvas 크기 설정 (항상 뷰포트 전체에 맞춤)
    const setCanvasSize = () => {
      // 뷰포트 크기 가져오기
      const width = window.innerWidth || document.documentElement.clientWidth || window.screen.width;
      const height = window.innerHeight || document.documentElement.clientHeight || window.screen.height;
      
      // Canvas 실제 픽셀 크기 설정
      canvas.width = width;
      canvas.height = height;
      
      // CSS 크기도 명시적으로 설정 (100vw/100vh 사용)
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      return { width, height };
    };
    
    const { width: canvasWidth, height: canvasHeight } = setCanvasSize();
    
    // PaperJS 초기화
    paper.setup(canvas);
    
    // Paper.js 뷰 크기를 정확히 설정
    paper.view.viewSize = new paper.Size(canvasWidth, canvasHeight);
    paper.view.setViewSize(canvasWidth, canvasHeight);

    // 사용할 색상 팔레트
    const colors = ['#FF7700', '#67C5FF', '#F4F1ED', '#FFFFFF', '#070707'];

    // Ball 클래스 정의
    const Ball = function (r, p, v, color) {
      this.radius = r;
      this.point = p;
      this.vector = v;
      this.maxVec = 7; // 최대 속도 제한
      this.numSegment = Math.floor(r / 3 + 2); // 세그먼트 개수
      this.boundOffset = [];
      this.boundOffsetBuff = [];
      this.sidePoints = [];
      this.color = color; // 색상 저장
      
      // 세그먼트 기반 Path 생성 (Circle이 아닌!)
      this.path = new paper.Path({
        fillColor: color,
        closed: true
      });

      // 각 세그먼트 초기화
      for (let i = 0; i < this.numSegment; i++) {
        this.boundOffset.push(this.radius);
        this.boundOffsetBuff.push(this.radius);
        this.path.add(new paper.Point()); // 빈 포인트 추가
        
        // 각 세그먼트의 방향 벡터 계산
        this.sidePoints.push(new paper.Point({
          angle: (360 / this.numSegment) * i,
          length: 1
        }));
      }
    };

    Ball.prototype = {
      iterate: function () {
        this.checkBorders();
        if (this.vector.length > this.maxVec)
          this.vector.length = this.maxVec;
        
        this.point = this.point.add(this.vector);
        this.updateShape();
      },

      checkBorders: function () {
        const size = paper.view.size;
        if (this.point.x < -this.radius)
          this.point.x = size.width + this.radius;
        if (this.point.x > size.width + this.radius)
          this.point.x = -this.radius;
        if (this.point.y < -this.radius)
          this.point.y = size.height + this.radius;
        if (this.point.y > size.height + this.radius)
          this.point.y = -this.radius;
      },

      updateShape: function () {
        const segments = this.path.segments;
        for (let i = 0; i < this.numSegment; i++)
          segments[i].point = this.getSidePoint(i);

        this.path.smooth();
        
        for (let i = 0; i < this.numSegment; i++) {
          if (this.boundOffset[i] < this.radius / 4)
            this.boundOffset[i] = this.radius / 4;
          
          const next = (i + 1) % this.numSegment;
          const prev = (i > 0) ? i - 1 : this.numSegment - 1;
          let offset = this.boundOffset[i];
          
          offset += (this.radius - offset) / 15;
          offset += ((this.boundOffset[next] + this.boundOffset[prev]) / 2 - offset) / 3;
          
          this.boundOffsetBuff[i] = this.boundOffset[i] = offset;
        }
      },

      updateColor: function (color) {
        if (this.path) {
          this.path.fillColor = color;
          this.color = color;
        }
      },

      react: function (b) {
        const dist = this.point.getDistance(b.point);
        if (dist < this.radius + b.radius && dist !== 0) {
          const overlap = this.radius + b.radius - dist;
          const direc = this.point.subtract(b.point).normalize(overlap * 0.015);
          this.vector = this.vector.add(direc);
          b.vector = b.vector.subtract(direc);

          this.calcBounds(b);
          b.calcBounds(this);
          this.updateBounds();
          b.updateBounds();
        }
      },

      getBoundOffset: function (b) {
        const diff = this.point.subtract(b);
        const angle = (diff.angle + 180) % 360;
        return this.boundOffset[Math.floor(angle / 360 * this.boundOffset.length)];
      },

      calcBounds: function (b) {
        for (let i = 0; i < this.numSegment; i++) {
          const tp = this.getSidePoint(i);
          const bLen = b.getBoundOffset(tp);
          const td = tp.getDistance(b.point);
          if (td < bLen) {
            this.boundOffsetBuff[i] -= (bLen - td) / 2;
          }
        }
      },

      getSidePoint: function (index) {
        return this.point.add(this.sidePoints[index].multiply(this.boundOffset[index]));
      },

      updateBounds: function () {
        for (let i = 0; i < this.numSegment; i++)
          this.boundOffset[i] = this.boundOffsetBuff[i];
      }
    };

    // 볼 생성
    const numBalls = 8;
    const balls = [];
    for (let i = 0; i < numBalls; i++) {
      const position = new paper.Point(
        Math.random() * canvasWidth,
        Math.random() * canvasHeight
      );
      const vector = new paper.Point({
        angle: 360 * Math.random(),
        length: Math.random() * 5 + 2
      });
      // 다양한 크기 (60~100 범위)
      const radius = 60 + Math.random() * 40;
      // 다양한 색상
      const color = colors[Math.floor(Math.random() * colors.length)];
      balls.push(new Ball(radius, position, vector, color));
    }

    ballsRef.current = balls;

    // 애니메이션 루프
    const onFrame = () => {
      for (let i = 0; i < balls.length - 1; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          balls[i].react(balls[j]); // 물리 충돌 + 블롭 효과
        }
      }
      for (let i = 0; i < balls.length; i++) {
        balls[i].iterate(); // 이동 + 모양 업데이트
      }
    };

    paper.view.onFrame = onFrame;
    paper.view.draw();

    // 리사이즈 핸들러 (디바운싱 적용)
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const { width, height } = setCanvasSize();
        paper.view.viewSize = new paper.Size(width, height);
        paper.view.setViewSize(width, height);
        paper.view.draw();
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      paper.view.onFrame = null;
      ballsRef.current.forEach(ball => ball.path.remove());
      window.removeEventListener('resize', handleResize);
    };
  }, [isReady]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        minWidth: '100%',
        minHeight: '100%',
        maxWidth: '100vw',
        maxHeight: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
        margin: 0,
        padding: 0,
        display: 'block'
      }}
    />
  );
};

export default HybridBackground;
