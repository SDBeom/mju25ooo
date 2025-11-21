import React, { useEffect, useState } from 'react';
import DesignerShowcase from './DesignerShowcase';
import designerDetailsData from '../../data/designerDetailsData';
import './DesignerDetail.css';

const DesignerDetail = () => {
  const [designer, setDesigner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 페이지 진입 시 스크롤을 맨 위로 이동
    window.scrollTo(0, 0);
    
    const fullPath = window.location.href;
    const pathWithoutQuery = fullPath.split('?')[0];
    const pathParts = pathWithoutQuery.replace(window.location.origin, '').split('/');
    const encodedName = pathParts[2];
    const designerName = encodedName ? decodeURIComponent(encodedName) : '';
    const foundDesigner = designerDetailsData[designerName];
    setDesigner(foundDesigner || null);
    setLoading(false);
  }, []);

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
  return <DesignerShowcase designer={designer} onBack={handleBackToDesigners} />;
};

export default DesignerDetail;
