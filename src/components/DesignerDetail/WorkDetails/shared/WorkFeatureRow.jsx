import React from 'react';
import WorkImageBlock from './WorkImageBlock';

/**
 * 공통 Feature Row 컴포넌트 (이미지 + 텍스트)
 */
const WorkFeatureRow = ({ 
  image,
  note,
  reverse = false,
  className = '',
  imageClassName = '',
  textClassName = ''
}) => {
  if (!image || !image.src) return null;

  const imageBlock = (
    <WorkImageBlock 
      src={image.src} 
      alt={image.alt || note?.title || ''} 
      className={imageClassName}
    />
  );

  const textBlock = note && (note.title || note.description) ? (
    <div className={`work-detail__feature-text ${textClassName}`}>
      {note.title && (
        <h4 className="work-detail__feature-title">{note.title}</h4>
      )}
      {note.description && <p>{note.description}</p>}
    </div>
  ) : null;

  return (
    <div className={`work-detail__feature-row ${reverse ? 'work-detail__feature-row--reverse' : ''} ${className}`}>
      {reverse ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </div>
  );
};

export default WorkFeatureRow;

