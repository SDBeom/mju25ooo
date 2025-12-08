import React, { useEffect, useState, useCallback } from 'react';
import DesignerShowcase from './DesignerShowcase';
import designerDetailsData from '../../data/designerDetailsData';
import { extractDesignerNameFromUrl } from '../../shared/urlUtils';
import { guardCSSImport } from '../../shared/cssImportGuard';
import './DesignerDetail.css';

// CSS import 보장 (개발 모드에서만 체크)
guardCSSImport('./DesignerDetail.css', 'designer-detail', 'DesignerDetail');

const DesignerDetail = () => {
  const [designer, setDesigner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialWorkId, setInitialWorkId] = useState(null);

  /**
   * URL에서 작품 ID 추출
   */
  const extractWorkIdFromUrl = useCallback(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const workId = urlParams.get('work');
      return workId ? decodeURIComponent(workId) : null;
    } catch (error) {
      console.warn('Failed to extract work ID from URL:', error);
      return null;
    }
  }, []);

  /**
   * 디자이너 데이터 로드
   * 가드 절 패턴 적용으로 중첩 제거
   */
  const loadDesigner = useCallback(() => {
    try {
      // URL에서 디자이너 이름 추출
      const designerName = extractDesignerNameFromUrl(window.location.pathname);
      
      // 가드 절: 디자이너 이름이 없으면 조기 리턴
      if (!designerName) {
        setDesigner(null);
        setLoading(false);
        setInitialWorkId(null);
        return;
      }
      
      // 데이터에서 디자이너 찾기
      const foundDesigner = designerDetailsData[designerName];
      
      // 가드 절: 디자이너를 찾지 못하면 조기 리턴
      if (!foundDesigner) {
        console.warn(
          'Designer not found:', 
          designerName, 
          'Available designers:', 
          Object.keys(designerDetailsData)
        );
        setDesigner(null);
        setLoading(false);
        setInitialWorkId(null);
        return;
      }
      
      // URL에서 작품 ID 추출
      const workId = extractWorkIdFromUrl();
      
      setDesigner(foundDesigner);
      setInitialWorkId(workId);
      setLoading(false);
    } catch (error) {
      console.error('Error loading designer:', error);
      setDesigner(null);
      setLoading(false);
      setInitialWorkId(null);
    }
  }, [extractWorkIdFromUrl]);

  useEffect(() => {
    loadDesigner();
    
    // locationchange 이벤트도 처리
    const handleLocationChange = () => {
      setLoading(true);
      loadDesigner();
    };
    
    window.addEventListener('locationchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    
    return () => {
      window.removeEventListener('locationchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, [loadDesigner]);

  const handleBackToDesigners = () => {
    window.history.pushState({}, '', '/designer');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  if (loading) {
    return (
      <div className="designer-detail-loading">
        <div className="loading-spinner" />
        <p>Loading...</p>
      </div>
    );
  }

  if (!designer) {
    return (
      <div className="designer-detail-error">
        <h1>Designer Not Found</h1>
        <p>The designer you&apos;re looking for doesn&apos;t exist.</p>
        <button type="button" onClick={handleBackToDesigners} className="back-button">
          Back to Designers
        </button>
      </div>
    );
  }

  // 모든 디자이너는 DesignerShowcase 사용
  return <DesignerShowcase designer={designer} onBack={handleBackToDesigners} initialWorkId={initialWorkId} />;
};

export default DesignerDetail;
