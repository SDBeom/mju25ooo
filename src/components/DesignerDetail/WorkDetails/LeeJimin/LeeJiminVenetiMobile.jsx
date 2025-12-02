import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/LeeJiminVeneti/LeeJiminVenetiMobile.css';

// 이미지 임포트
import leejiminWork1_01 from '../../../../assets/이지민/leejimin_multimedia_work1_01.webp';
import leejiminWork1_02 from '../../../../assets/이지민/leejimin_multimedia_work1_02.webp';
import leejiminWork1_03 from '../../../../assets/이지민/leejimin_multimedia_work1_03.webp';
import leejiminWork1_04 from '../../../../assets/이지민/leejimin_multimedia_work1_04.webp';
import leejiminWork1_05 from '../../../../assets/이지민/leejimin_multimedia_work1_05.webp';
import leejiminWork1_06 from '../../../../assets/이지민/leejimin_multimedia_work1_06.webp';
import leejiminWork1_07 from '../../../../assets/이지민/leejimin_multimedia_work1_07.webp';
import leejiminWork1_08 from '../../../../assets/이지민/leejimin_multimedia_work1_08.webp';
import leejiminWork1_09 from '../../../../assets/이지민/leejimin_multimedia_work1_09.webp';
import leejiminWork1_10 from '../../../../assets/이지민/leejimin_multimedia_work1_10.webp';
import leejiminWork1_11 from '../../../../assets/이지민/leejimin_multimedia_work1_11.webp';
import leejiminWork1_12 from '../../../../assets/이지민/leejimin_multimedia_work1_12.webp';
import leejiminWork1_13 from '../../../../assets/이지민/leejimin_multimedia_work1_13.webp';
import leejiminWork1_14 from '../../../../assets/이지민/leejimin_multimedia_work1_14.webp';
import leejiminWork1_15 from '../../../../assets/이지민/leejimin_multimedia_work1_15.webp';
import leejiminWork1_16 from '../../../../assets/이지민/leejimin_multimedia_work1_16.webp';

/**
 * 이지민 - Veneti (작품1) Mobile 버전
 * Figma 디자인 기반 구현 (375px)
 */
const LeeJiminVenetiMobile = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--leejimin-veneti-mobile">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--leejimin-veneti-mobile">
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--leejimin-veneti-mobile">
          <img
            src={leejiminWork1_01}
            alt={work.title || 'Veneti'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, leejiminWork1_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
        <div className="work-detail__hero-content work-detail__hero-content--leejimin-veneti-mobile">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--leejimin-veneti-mobile">
              Veneti
            </h2>
            <div className="work-detail__lead work-detail__lead--leejimin-veneti-mobile">
              <p className="mb-0">문어마녀 우르슬라를 현대적인 시선으로 재해석해 제작한 캐릭터로, 3D 모델링을 통해 턴테이블 영상과 2D 일러트를 수록한</p>
              <p>아트북을 제작했다.</p>
            </div>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--leejimin-veneti-mobile">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--leejimin-veneti-mobile`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Text Section - Dream of freedom */}
      <section className="work-detail__section work-detail__text-section work-detail__text-section--leejimin-veneti-mobile">
        <div className="work-detail__text-section-header">
          <p className="work-detail__text-section-label">The story of an octopus witch</p>
          <h3 className="work-detail__text-section-title">Dream of freedom</h3>
        </div>
        <div className="work-detail__text-section-description">
          <p className="mb-0">이 프로젝트는 3D 컬프팅 실력과 인체 이해도를 향상시키고, 블렌더를 활용해 캐릭터 제작을</p>
          <p className="mb-0">완성하는 것을 목표로 기획했다. 월트 디즈니</p>
          <p className="mb-0">튜디오의 애니메이션 영화 '인어공주'에</p>
          <p className="mb-0">등장하는 마녀 우르슬라를 현대적인 시선으로</p>
          <p className="mb-0">재해석하여 새로운 캐릭터로 탄생시켰으며,</p>
          <p className="mb-0">'자유를 찾아 떠나는 여정' 이라는 토리를</p>
          <p className="mb-0">바탕으로 캐릭터가 꿈꾸는 자유를 상징하기 위해 케이트보드를 타는 설정을 부여했다.</p>
          <p className="mb-0"> </p>
          <p className="mb-0">또한 캐릭터의 활기찬 모습을 표현하기 위해 리깅 후 역동적인 포즈를 연출하였고, 세계관의</p>
          <p className="mb-0">완성도를 높이기 위해 러프한 2D 아트워크부터</p>
          <p className="mb-0">세부 디자인까지 과정을 정리해 아트북으로</p>
          <p>제작했다.</p>
        </div>
      </section>

      {/* Feature Section - Book cover */}
      <section className="work-detail__section work-detail__feature work-detail__feature--leejimin-veneti-mobile">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--leejimin-veneti-mobile">
          <img
            src={leejiminWork1_02}
            alt="Book cover"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, leejiminWork1_02, work.id, 'feature-1')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <h4 className="work-detail__feature-title">Book cover</h4>
          <p className="mb-0">에너지가 느껴지는 색상을 활용해 캐릭터의</p>
          <p>활기찬 이미지를 담은 책 표지를 디자인하였다.</p>
        </div>
      </section>

      {/* Feature Cards Section - 3 Cards */}
      <ul className="work-detail__section work-detail__cards work-detail__cards--leejimin-veneti-mobile">
        <li className="work-detail__card work-detail__card--leejimin-veneti-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={leejiminWork1_03}
              alt="Poster"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, leejiminWork1_03, work.id, 'card-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">Poster</h5>
            <p className="mb-0">2D 일러트와 3D 모델링의 역동적인 자세로</p>
            <p>동일한 디자인의 포터를 제작하였다.</p>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--leejimin-veneti-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={leejiminWork1_04}
              alt="Postcard"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, leejiminWork1_04, work.id, 'card-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">Postcard</h5>
            <p>눈에 띄는 마젠타로 시선을 끌고 SNS와 연동 되는 큐알 코드와 함께 2D 일러트로 엽서를 디자인 하였다.</p>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--leejimin-veneti-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={leejiminWork1_05}
              alt="Illustration"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, leejiminWork1_05, work.id, 'card-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">Illustration</h5>
            <p className="mb-0">2D 일러트를 통해 포터와 엽서</p>
            <p>디자인을 진행하고 아트북에 수록하였다.</p>
          </div>
        </li>
      </ul>

      {/* Feature Bento Section */}
      <ul className="work-detail__section work-detail__feature-bento work-detail__feature-bento--leejimin-veneti-mobile">
        <li className="work-detail__feature-bento-grid-item">
          <div className="work-detail__feature-bento-column work-detail__feature-bento-column--1">
            <div className="work-detail__feature-bento-card work-detail__feature-bento-card--1">
              <div className="work-detail__feature-bento-card-image-wrapper">
                <img
                  src={leejiminWork1_06}
                  alt=""
                  className="work-detail__feature-bento-card-image"
                  onError={(e) => handleImageError(e, leejiminWork1_06, work.id, 'bento-card-1')}
                  loading="lazy"
                />
              </div>
            </div>
            <div className="work-detail__feature-bento-card work-detail__feature-bento-card--2">
              <div className="work-detail__feature-bento-card-image-wrapper">
                <img
                  src={leejiminWork1_07}
                  alt="Skate board"
                  className="work-detail__feature-bento-card-image"
                  onError={(e) => handleImageError(e, leejiminWork1_07, work.id, 'bento-card-2')}
                  loading="lazy"
                />
              </div>
              <div className="work-detail__feature-bento-card-text">
                <h5 className="work-detail__feature-bento-card-title">Skate board</h5>
                <p>케이트보드 텍쳐로 캐릭터의 개성이 느껴지는 그라피티를 디자인 하였고, 이를 실물로 제작에 전시하였다.</p>
              </div>
            </div>
          </div>
          <div className="work-detail__feature-bento-column work-detail__feature-bento-column--2">
            <div className="work-detail__feature-bento-card work-detail__feature-bento-card--3">
              <div className="work-detail__feature-bento-card-text">
                <h5 className="work-detail__feature-bento-card-title">Character</h5>
                <p>메인 캐릭터와 서브 케릭터를 모델링 하여 함께 회전하는 영상을 제작했다.</p>
              </div>
              <div className="work-detail__feature-bento-card-image-wrapper">
                <img
                  src={leejiminWork1_08}
                  alt="Character"
                  className="work-detail__feature-bento-card-image"
                  onError={(e) => handleImageError(e, leejiminWork1_08, work.id, 'bento-card-3')}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </li>
      </ul>

      {/* Gallery Section - Artbook */}
      <section className="work-detail__section work-detail__gallery work-detail__gallery--leejimin-veneti-mobile">
        <div className="work-detail__gallery-header">
          <h3 className="work-detail__gallery-title">Artbook</h3>
          <p>캐릭터의 제작 과정부터 세계관 가이드, 2D 일러트와 3D 모델링까지 모두 수록한 아트북을 제작하였다.</p>
        </div>
        <div className="work-detail__gallery-grid">
          <div className="work-detail__gallery-column work-detail__gallery-column--1">
            <div className="work-detail__gallery-item">
              <img
                src={leejiminWork1_09}
                alt="Artbook 1"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, leejiminWork1_09, work.id, 'gallery-1')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={leejiminWork1_10}
                alt="Artbook 2"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, leejiminWork1_10, work.id, 'gallery-2')}
                loading="lazy"
              />
            </div>
          </div>
          <div className="work-detail__gallery-column work-detail__gallery-column--2">
            <div className="work-detail__gallery-item">
              <img
                src={leejiminWork1_11}
                alt="Artbook 3"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, leejiminWork1_11, work.id, 'gallery-3')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={leejiminWork1_12}
                alt="Artbook 4"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, leejiminWork1_12, work.id, 'gallery-4')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={leejiminWork1_13}
                alt="Artbook 5"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, leejiminWork1_13, work.id, 'gallery-5')}
                loading="lazy"
              />
            </div>
          </div>
          <div className="work-detail__gallery-column work-detail__gallery-column--3">
            <div className="work-detail__gallery-item">
              <img
                src={leejiminWork1_14}
                alt="Artbook 6"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, leejiminWork1_14, work.id, 'gallery-6')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={leejiminWork1_15}
                alt="Artbook 7"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, leejiminWork1_15, work.id, 'gallery-7')}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="work-detail__section work-detail__quote work-detail__quote--leejimin-veneti-mobile">
        <div className="work-detail__quote-text">
          <h3 className="mb-0">"이 캐릭터가 단순한 조형물이 아닌, 살아 숨</h3>
          <h3 className="mb-0">쉬는 존재로 확장되는</h3>
          <h3 className="mb-0">그날을 꿈꾸며 이 여정을</h3>
          <h3>이어갈 것입니다."</h3>
        </div>
        <div className="work-detail__quote-author">
          <div className="work-detail__quote-author-avatar">
            <img
              src={leejiminWork1_16}
              alt={designer.name || '이지민'}
              className="work-detail__quote-author-image"
              onError={(e) => handleImageError(e, leejiminWork1_16, work.id, 'quote-author')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__quote-author-info">
            <p className="work-detail__quote-author-name">{designer.name || '이지민'}</p>
            <p className="work-detail__quote-author-title">제 24회 영상애니메이션디자인전공 졸업생</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LeeJiminVenetiMobile;
