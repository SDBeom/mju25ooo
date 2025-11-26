import React from 'react';

/**
 * 공통 이미지 블록 컴포넌트
 */
const WorkImageBlock = ({ 
  src, 
  alt = '', 
  className = '',
  loading = 'lazy',
  onError 
}) => {
  if (!src) return null;

  return (
    <div className={`work-detail__image-block ${className}`}>
      <img 
        src={src} 
        alt={alt} 
        loading={loading}
        onError={onError}
      />
    </div>
  );
};

export default WorkImageBlock;

