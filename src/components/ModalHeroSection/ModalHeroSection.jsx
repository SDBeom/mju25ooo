import React from 'react';

const ModalHeroSection = ({
  eyebrowImageSrc,
  eyebrowImageAlt = '',
  eyebrowText,
  title,
  lead,
  mediaSrc,
  mediaAlt = '',
  ctas = [],
}) => (
  <section className="work-detail__section work-detail__hero">
    <div className="work-detail__hero-text">
      {(eyebrowImageSrc || eyebrowText) && (
        <span className="work-detail__eyebrow">
          {eyebrowImageSrc && (
            <img src={eyebrowImageSrc} alt={eyebrowImageAlt} loading="lazy" />
          )}
          {eyebrowText && <span className="work-detail__eyebrow-text">{eyebrowText}</span>}
        </span>
      )}
      <div className="work-detail__text-group">
        <h2 className="work-detail__title">{title}</h2>
        <p className="work-detail__lead">{lead}</p>
      </div>
      {ctas.length > 0 && (
        <div className="work-detail__ctas">
          {ctas.map(({ label, onClick, variant = 'primary', type = 'button' }) => (
            <button
              key={label}
              type={type}
              className={`work-detail__cta work-detail__cta--${
                variant === 'secondary' ? 'secondary' : 'primary'
              }`}
              onClick={onClick}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
    {mediaSrc && (
      <div className="work-detail__hero-media">
        <img src={mediaSrc} alt={mediaAlt} loading="lazy" />
      </div>
    )}
  </section>
);

export default ModalHeroSection;


