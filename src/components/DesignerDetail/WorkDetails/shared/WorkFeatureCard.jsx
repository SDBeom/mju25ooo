import React from 'react';

/**
 * 공통 Feature Card 컴포넌트
 */
const WorkFeatureCard = ({ 
  image,
  note,
  className = '',
  imageClassName = '',
  textClassName = ''
}) => {
  if (!image || !image.src) return null;

  return (
    <div className={`work-detail__card ${className}`}>
      <div className={`work-detail__card-image ${imageClassName}`}>
        <img 
          src={image.src} 
          alt={image.alt || note?.title || ''} 
          loading="lazy" 
        />
      </div>
      {(note?.title || note?.description) && (
        <div className={`work-detail__card-text ${textClassName}`}>
          {note.title && (
            <h5 className="work-detail__card-title">{note.title}</h5>
          )}
          {note.description && <p>{note.description}</p>}
        </div>
      )}
    </div>
  );
};

export default WorkFeatureCard;

