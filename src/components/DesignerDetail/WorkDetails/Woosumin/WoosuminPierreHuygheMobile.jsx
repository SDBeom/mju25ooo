import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/WoosuminPierreHuyghe/WoosuminPierreHuygheMobile.css';

// 이미지 임포트
import woosuminWork2_01 from '../../../../assets/우수민/우수민_멀티미디어_작품2_01.webp';
import woosuminWork2_02 from '../../../../assets/우수민/우수민_멀티미디어_작품2_02.webp';
import woosuminWork2_03 from '../../../../assets/우수민/우수민_멀티미디어_작품2_03.webp';
import woosuminWork2_04 from '../../../../assets/우수민/우수민_멀티미디어_작품2_04.webp';
import woosuminWork2_05 from '../../../../assets/우수민/우수민_멀티미디어_작품2_05.webp';
import woosuminWork2_06 from '../../../../assets/우수민/우수민_멀티미디어_작품2_06.webp';
import woosuminWork2_07 from '../../../../assets/우수민/우수민_멀티미디어_작품2_07.webp';
import woosuminWork2_08 from '../../../../assets/우수민/우수민_멀티미디어_작품2_08.webp';
import woosuminWork2_09 from '../../../../assets/우수민/우수민_멀티미디어_작품2_09.webp';
import woosuminWork2_10 from '../../../../assets/우수민/우수민_멀티미디어_작품2_10.webp';
import woosuminWork2_11 from '../../../../assets/우수민/우수민_멀티미디어_작품2_11.webp';
import woosuminWork2_12 from '../../../../assets/우수민/우수민_멀티미디어_작품2_12.webp';
import woosuminWork2_13 from '../../../../assets/우수민/우수민_멀티미디어_작품2_13.webp';
import woosuminWork2_14 from '../../../../assets/우수민/우수민_멀티미디어_작품2_14.webp';
import woosuminWork2_15 from '../../../../assets/우수민/우수민_멀티미디어_작품2_15.webp';

/**
 * 우수민 - Pierre Huyghe: Liminal 가이드앱 UXUI (작품2) Mobile 버전
 * Figma 디자인 기반 구현 (375px)
 */
const WoosuminPierreHuygheMobile = ({ work, designer, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--woosumin-pierre-huyghe-mobile">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--woosumin-pierre-huyghe-mobile">
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--woosumin-pierre-huyghe-mobile">
          <img
            src={woosuminWork2_01}
            alt={work.title || 'Pierre Huyghe: Liminal 가이드앱 UXUI'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, woosuminWork2_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
        <div className="work-detail__hero-content work-detail__hero-content--woosumin-pierre-huyghe-mobile">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--woosumin-pierre-huyghe-mobile">
              <span className="block mb-0">Pierre Huyghe: Liminal</span>
              <span className="block">가이드앱 UXUI</span>
            </h2>
            <div className="work-detail__lead work-detail__lead--woosumin-pierre-huyghe-mobile">
              <p className="mb-0">리미널 전시를 위한 전시 가이드 UXUI로, 전시 정보·동선 안내·인터랙티브 체험을 제공한다. 사용자 중심 설계로 몰입도를 높이며 전통적 안내를 넘어 새로운 전시 경험을 제안한다.</p>
              <p>&nbsp;</p>
            </div>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--woosumin-pierre-huyghe-mobile">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--woosumin-pierre-huyghe-mobile`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Feature Section */}
      <section className="work-detail__section work-detail__feature work-detail__feature--woosumin-pierre-huyghe-mobile">
        <div className="work-detail__feature-image-wrapper">
          <img
            src={woosuminWork2_02}
            alt="그냥 '보는 것'만으로 전시를 이해할 수 있을까"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, woosuminWork2_02, work.id, 'feature')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-content">
          <div className="work-detail__text-group">
            <h4 className="work-detail__feature-title">
              <span className="block mb-0">그냥 '보는 것'만으로</span>
              <span className="block">전시를 이해할 수 있을까</span>
            </h4>
            <div className="work-detail__feature-description">
              <p className="mb-0">기분 좋은 데이트로,</p>
              <p className="mb-0">혹은 잠시 생긴 여유 속에 찾은 전시장.</p>
              <p className="mb-0">하지만 막상 마주한 전시 공간과 작품들은 낯설고 어렵기만 하다.</p>
              <p className="mb-0">실험적이고 복잡한 전시의 세계,</p>
              <p>과연 제대로 보고, 느끼고 있는 것일까!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pull Quote Section */}
      <section className="work-detail__section work-detail__quote work-detail__quote--woosumin-pierre-huyghe-mobile">
        <figure className="work-detail__quote-content">
          <div className="work-detail__quote-text">
            <p className="mb-0">전시를 이해하고,</p>
            <p className="mb-0">참여하다!</p>
            <p className="mb-0">작품 정보부터</p>
            <p>전시 안내, 그리고 당신만을 위한 특별한 체험까지. "리미널 가이드"</p>
          </div>
          <p className="work-detail__quote-attribution">
            <span className="work-detail__quote-attribution--bold">인간과 비인간이 공존하며 반응하고 진화하는 설치 전시 &lt;피에르 위그: 리미널&gt;,</span>
            <span> 이 앱은 실험적이고 복잡한 전시 특성에 맞춰 작품별 해설과 공간 안내는 물론, 남녀노소 누구나 참여할 수 있는 인터랙티브 체험을 제공한다.</span>
          </p>
        </figure>
      </section>

      {/* Feature Cards Section 1 */}
      <ul className="work-detail__section work-detail__cards work-detail__cards--woosumin-pierre-huyghe-mobile">
        <li className="work-detail__card work-detail__card--woosumin-pierre-huyghe-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={woosuminWork2_03}
              alt="리미널 가이드와 함께 전시 시작!"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, woosuminWork2_03, work.id, 'card-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">리미널 가이드와 함께 전시 시작!</h5>
            <p className="work-detail__card-description">리움 로그인으로 빠르게 티켓 확인</p>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--woosumin-pierre-huyghe-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={woosuminWork2_04}
              alt="간편한 티켓 등록"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, woosuminWork2_04, work.id, 'card-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">간편한 티켓 등록</h5>
            <p className="work-detail__card-description">오프라인에서 구매한 티켓도 QR 스타일을캔 한 번으로 간편하게 등록</p>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--woosumin-pierre-huyghe-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={woosuminWork2_05}
              alt="전시장 맵과 동선 안내"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, woosuminWork2_05, work.id, 'card-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">전시장 맵과 동선 안내</h5>
            <p className="work-detail__card-description">전시장 내 방향과 관람 순서는 물론, 작품 설명까지 자동 표시</p>
          </div>
        </li>
      </ul>

      {/* Feature Cards Section 2 */}
      <ul className="work-detail__section work-detail__cards work-detail__cards--feature work-detail__cards--woosumin-pierre-huyghe-mobile">
        <li className="work-detail__card work-detail__card--feature work-detail__card--woosumin-pierre-huyghe-mobile">
          <div className="work-detail__card-content">
            <div className="work-detail__card-text">
              <h5 className="work-detail__card-title">AI 피에르 위그 채팅</h5>
              <p className="work-detail__card-description">키워드로 질문하거나 사진을 전송, 음성으로 대화하며 AI 작가와 자유롭게 소통 가능</p>
            </div>
            <div className="work-detail__card-image-wrapper work-detail__card-image-wrapper--phone">
              <img
                src={woosuminWork2_06}
                alt="AI 피에르 위그 채팅"
                className="work-detail__card-image"
                onError={(e) => handleImageError(e, woosuminWork2_06, work.id, 'card-feature-1')}
                loading="lazy"
              />
            </div>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--feature work-detail__card--woosumin-pierre-huyghe-mobile">
          <div className="work-detail__card-content">
            <div className="work-detail__card-text">
              <h5 className="work-detail__card-title">나만의 Liminal 생명체</h5>
              <p className="work-detail__card-description">간단한 스타일을케치로 개성 있는 형태를 만들고, 색상과 질감, 악세서리까지 자유롭게 커스타일을텀 가능</p>
            </div>
            <div className="work-detail__card-image-wrapper work-detail__card-image-wrapper--phone">
              <img
                src={woosuminWork2_07}
                alt="나만의 Liminal 생명체"
                className="work-detail__card-image"
                onError={(e) => handleImageError(e, woosuminWork2_07, work.id, 'card-feature-2')}
                loading="lazy"
              />
            </div>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--feature work-detail__card--woosumin-pierre-huyghe-mobile">
          <div className="work-detail__card-content">
            <div className="work-detail__card-text">
              <h5 className="work-detail__card-title">나의 전시 감상 감정 변화</h5>
              <p className="work-detail__card-description">어떤 작품에서 어떤 감정을 느꼈는지, 오늘의 전시에서 가장 강하게 느껴진 감정은 무엇이었는지 한눈에 확인</p>
            </div>
            <div className="work-detail__card-image-wrapper work-detail__card-image-wrapper--phone">
              <img
                src={woosuminWork2_08}
                alt="나의 전시 감상 감정 변화"
                className="work-detail__card-image"
                onError={(e) => handleImageError(e, woosuminWork2_08, work.id, 'card-feature-3')}
                loading="lazy"
              />
            </div>
          </div>
        </li>
      </ul>

      {/* Testimonial Wall Section */}
      <section className="work-detail__section work-detail__testimonial work-detail__testimonial--woosumin-pierre-huyghe-mobile">
        <div className="work-detail__testimonial-header">
          <h3 className="work-detail__testimonial-title">
            <span className="block mb-0">리미널 가이드의</span>
            <span className="block">또 다른 기능들</span>
          </h3>
          <p className="work-detail__testimonial-description">전시의 깊이 있는 경험을 위한 다양한 콘텐츠</p>
        </div>
        <ul className="work-detail__testimonial-grid">
          <li className="work-detail__testimonial-column">
            <article className="work-detail__testimonial-card">
              <div className="work-detail__testimonial-author">
                <div className="work-detail__testimonial-avatar">
                  <img
                    src={woosuminWork2_09}
                    alt="전시 소개"
                    className="work-detail__testimonial-avatar-image"
                    onError={(e) => handleImageError(e, woosuminWork2_09, work.id, 'testimonial-1')}
                    loading="lazy"
                  />
                </div>
                <div className="work-detail__testimonial-author-text">
                  <p className="work-detail__testimonial-author-name">전시 소개</p>
                  <p className="work-detail__testimonial-author-role">리움 공식 홈페이지 제공 전시 정보</p>
                </div>
              </div>
              <p className="work-detail__testimonial-text">번거롭게 검색하고 찾아볼 필요 없이 전시 정보 확인 가능</p>
            </article>
            <article className="work-detail__testimonial-card">
              <div className="work-detail__testimonial-author">
                <div className="work-detail__testimonial-avatar">
                  <img
                    src={woosuminWork2_11}
                    alt="작품 정보"
                    className="work-detail__testimonial-avatar-image"
                    onError={(e) => handleImageError(e, woosuminWork2_11, work.id, 'testimonial-2')}
                    loading="lazy"
                  />
                </div>
                <div className="work-detail__testimonial-author-text">
                  <p className="work-detail__testimonial-author-name">작품 정보</p>
                  <p className="work-detail__testimonial-author-role">
                    <span className="block mb-0">작품 사진, 작품 이름,</span>
                    <span className="block">작품 설명</span>
                  </p>
                </div>
              </div>
              <p className="work-detail__testimonial-text">작품의 의미와 전시 방식을 쉽게 이해하고 고화질 이미지를 통해 세부까지 감상 가능</p>
            </article>
          </li>
          <li className="work-detail__testimonial-column">
            <article className="work-detail__testimonial-card">
              <div className="work-detail__testimonial-author">
                <div className="work-detail__testimonial-avatar">
                  <img
                    src={woosuminWork2_14}
                    alt="위그 인터뷰"
                    className="work-detail__testimonial-avatar-image"
                    onError={(e) => handleImageError(e, woosuminWork2_14, work.id, 'testimonial-3')}
                    loading="lazy"
                  />
                </div>
                <div className="work-detail__testimonial-author-text">
                  <p className="work-detail__testimonial-author-name">위그 인터뷰</p>
                  <p className="work-detail__testimonial-author-role">피에르 위그의 단독 인터뷰</p>
                </div>
              </div>
              <p className="work-detail__testimonial-text">인간과 비인간의 경계를 넘나드는 작가, 피에르 위그의 작품 가치관을 직접 들을 수 있는 인터뷰 콘텐츠</p>
            </article>
            <article className="work-detail__testimonial-card">
              <div className="work-detail__testimonial-author">
                <div className="work-detail__testimonial-avatar">
                  <img
                    src={woosuminWork2_10}
                    alt="위그 타임랩스타일을"
                    className="work-detail__testimonial-avatar-image"
                    onError={(e) => handleImageError(e, woosuminWork2_10, work.id, 'testimonial-4')}
                    loading="lazy"
                  />
                </div>
                <div className="work-detail__testimonial-author-text">
                  <p className="work-detail__testimonial-author-name">위그 타임랩스타일을</p>
                  <p className="work-detail__testimonial-author-role">피에르 위그의 전시 역사</p>
                </div>
              </div>
              <p className="work-detail__testimonial-text">그동안의 피에르 위그의 작품 여정을 담은 타임랩스 통해 그의 예술 세계를 더욱 깊이 있게 이해 가능</p>
            </article>
            <article className="work-detail__testimonial-card">
              <div className="work-detail__testimonial-author">
                <div className="work-detail__testimonial-avatar">
                  <img
                    src={woosuminWork2_12}
                    alt="큐레이터 아티클"
                    className="work-detail__testimonial-avatar-image"
                    onError={(e) => handleImageError(e, woosuminWork2_12, work.id, 'testimonial-5')}
                    loading="lazy"
                  />
                </div>
                <div className="work-detail__testimonial-author-text">
                  <p className="work-detail__testimonial-author-name">큐레이터 아티클</p>
                  <p className="work-detail__testimonial-author-role">전시 관련 큐레이터 아티클</p>
                </div>
              </div>
              <p className="work-detail__testimonial-text">큐레이터 아티클을 통해 전시와 피에르 위그에 관한 다양한 담론과 관점 확인</p>
            </article>
          </li>
          <li className="work-detail__testimonial-column">
            <article className="work-detail__testimonial-card">
              <div className="work-detail__testimonial-author">
                <div className="work-detail__testimonial-avatar">
                  <img
                    src={woosuminWork2_15}
                    alt="뉴스타일을 기사"
                    className="work-detail__testimonial-avatar-image"
                    onError={(e) => handleImageError(e, woosuminWork2_15, work.id, 'testimonial-6')}
                    loading="lazy"
                  />
                </div>
                <div className="work-detail__testimonial-author-text">
                  <p className="work-detail__testimonial-author-name">뉴스타일을 기사</p>
                  <p className="work-detail__testimonial-author-role">전시 관련 뉴스타일을 기사</p>
                </div>
              </div>
              <p className="work-detail__testimonial-text">단순 관람을 넘어, 피에르 위그를 향한 세계의 관심을 한눈에 파악</p>
            </article>
            <article className="work-detail__testimonial-card">
              <div className="work-detail__testimonial-author">
                <div className="work-detail__testimonial-avatar">
                  <img
                    src={woosuminWork2_13}
                    alt="AR 카메라"
                    className="work-detail__testimonial-avatar-image"
                    onError={(e) => handleImageError(e, woosuminWork2_13, work.id, 'testimonial-7')}
                    loading="lazy"
                  />
                </div>
                <div className="work-detail__testimonial-author-text">
                  <p className="work-detail__testimonial-author-name">AR 카메라</p>
                  <p className="work-detail__testimonial-author-role">전시장 내 사용 가능한 AR 카메라</p>
                </div>
              </div>
              <p className="work-detail__testimonial-text">나만의 Liminal 생명체를 제작하고 B1 전시 공간에서 AR 카메라로 실제 살아숨쉬는 생명체 모습 체험</p>
            </article>
          </li>
        </ul>
      </section>

      {/* Footer Text */}
      <div className="work-detail__footer-text">
        <p>당신의 감각은 리미널에 접속합니다.</p>
      </div>
    </div>
  );
};

export default WoosuminPierreHuygheMobile;

