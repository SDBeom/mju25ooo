import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/LeeDayoungReadyToMerry/LeeDayoungReadyToMerryMobile.css';

// 이미지 임포트
import leedayoungWork1_01 from '../../../../assets/이다영/이다영_멀티미디어_작품1_01.webp';
import leedayoungWork1_02 from '../../../../assets/이다영/이다영_멀티미디어_작품1_02.webp';
import leedayoungWork1_03 from '../../../../assets/이다영/이다영_멀티미디어_작품1_03.webp';
import leedayoungWork1_04 from '../../../../assets/이다영/이다영_멀티미디어_작품1_04.webp';
import leedayoungWork1_05 from '../../../../assets/이다영/이다영_멀티미디어_작품1_05.webp';
import leedayoungWork1_06 from '../../../../assets/이다영/이다영_멀티미디어_작품1_06.webp';
import leedayoungWork1_07 from '../../../../assets/이다영/이다영_멀티미디어_작품1_07.webp';
import leedayoungWork1_08 from '../../../../assets/이다영/이다영_멀티미디어_작품1_08.webp';
import leedayoungWork1_09 from '../../../../assets/이다영/이다영_멀티미디어_작품1_09.webp';
import leedayoungWork1_10 from '../../../../assets/이다영/이다영_멀티미디어_작품1_10.webp';
import leedayoungWork1_11 from '../../../../assets/이다영/이다영_멀티미디어_작품1_11.webp';
import leedayoungWork1_12 from '../../../../assets/이다영/이다영_멀티미디어_작품1_12.webp';

/**
 * 이다영 - Ready to Merry (작품1) Mobile 버전
 * Figma 디자인 기반 구현 (375px)
 */
const LeeDayoungReadyToMerryMobile = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--leedayoung-ready-to-merry-mobile">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--leedayoung-ready-to-merry-mobile">
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--leedayoung-ready-to-merry-mobile">
          <img
            src={leedayoungWork1_01}
            alt={work.title || 'Ready to Merry'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, leedayoungWork1_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
        <div className="work-detail__hero-content work-detail__hero-content--leedayoung-ready-to-merry-mobile">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--leedayoung-ready-to-merry-mobile">
              Ready to Merry
            </h2>
            <div className="work-detail__lead work-detail__lead--leedayoung-ready-to-merry-mobile">
              <p className="mb-0">&lt;Ready to Merry&gt;는 크리마스</p>
              <p className="mb-0">주제로 한 케이팝 음악을 아카이빙한</p>
              <p className="mb-0">앨범이다. 크리마스 앞둔 일주일 동안</p>
              <p className="mb-0">하루에 한 곡씩, 총 일곱 곡으로 이어지는</p>
              <p className="mb-0">곡들은 다가올 날에 대한 설렘을 점차</p>
              <p className="mb-0">고조시킨다.</p>
              <p>&nbsp;</p>
            </div>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--leedayoung-ready-to-merry-mobile">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--leedayoung-ready-to-merry-mobile`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Text Section */}
      <section className="work-detail__section work-detail__text-section work-detail__text-section--leedayoung-ready-to-merry-mobile">
        <div className="work-detail__text-section-header">
          <p className="work-detail__text-section-label">Christmas Carol Archiving Album</p>
          <h3 className="work-detail__text-section-title">COUNTDOWN TO WISHFUL CHRISTMAS</h3>
        </div>
        <div className="work-detail__text-section-description">
          <p className="mb-0">그래픽 디자인 능력 향상을 목표로, 서로 다른</p>
          <p className="mb-0">특징을 지닌 곡들의 분위기를 다양하게 재해석</p>
          <p className="mb-0">하였다. 이를 위해 실사 이미지는 배제하고, 타이틀 레터링부터 굿즈까지 전 과정을 그래픽으로만</p>
          <p className="mb-0">구성하였다.</p>
          <p className="mb-0">&nbsp;</p>
          <p className="mb-0">디자인된 굿즈는 3D로 구현하여, 현재 트렌드에 맞게 앨범의 실사 패키징 영상을 제작하였으며</p>
          <p className="mb-0">이를 통해 앨범의 구성 요소를 더욱 직관적으로</p>
          <p className="mb-0">전달하고자 하였다. 패키지는 '소원을 담는 산타의 우편함'이라는 콘셉트로, 내부는 서랍형 구조로</p>
          <p className="mb-0">구성되어 각 곡의 굿즈를 개별적으로 담을 수</p>
          <p>있도록 디자인된 형태이다.</p>
        </div>
      </section>

      {/* Feature Section */}
      <section className="work-detail__section work-detail__feature work-detail__feature--leedayoung-ready-to-merry-mobile">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--leedayoung-ready-to-merry-mobile">
          <img
            src={leedayoungWork1_02}
            alt="Are you ready to Merry"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, leedayoungWork1_02, work.id, 'feature-1')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <h4 className="work-detail__feature-title">Are you ready to Merry</h4>
          <p className="work-detail__feature-description">크리마스 앞둔 일주일, 하루에 한 곡씩, 케이팝 캐롤과 함께하는 7일간의 여정을 담았다.</p>
        </div>
      </section>

      {/* Text Row Section */}
      <ul className="work-detail__section work-detail__text-rows work-detail__text-rows--leedayoung-ready-to-merry-mobile">
        <li className="work-detail__text-block">
          <h5 className="work-detail__text-block-title">재해석한 곡들의 분위기를 담은 굿즈</h5>
          <div className="work-detail__text-block-description">
            <p className="mb-0">수록된 7곡을 재해석하여 서로 다른 분위기를 담아 굿즈를 디자인하였다. 구성작품은 엽서,</p>
            <p>가사지, 티커, 키링으로 구성하였다.</p>
          </div>
        </li>
        <li className="work-detail__text-block">
          <h5 className="work-detail__text-block-title">다양한 형태의 포터</h5>
          <div className="work-detail__text-block-description">
            <p className="mb-0">3종으로 구성된 포터는 각각 다른방식으로</p>
            <p>앨범의 콘셉트를 담아냈다. 뜯어내는 전단지형, 캘린더형, 그리고 앨범의 구성요소를 보여주는 사양 포터로 이루어져있다.</p>
          </div>
        </li>
        <li className="work-detail__text-block">
          <h5 className="work-detail__text-block-title">앨범 3D 패키징 영상</h5>
          <div className="work-detail__text-block-description">
            <p className="mb-0">트렌드에 맞춘 앨범 실사 패키징 영상에</p>
            <p className="mb-0">수록곡의 일부를 담아 하이라이트 메들리</p>
            <p>형식으로 연출하였다. 이를 통해 패키지의 구성 요소를 보다 직관적으로 확인할 수 있다.</p>
          </div>
        </li>
      </ul>

      {/* Feature Rows Section 1 - Postcard & Lyrics Paper */}
      <ul className="work-detail__section work-detail__feature-rows work-detail__feature-rows--leedayoung-ready-to-merry-mobile-1">
        <li className="work-detail__feature-row work-detail__feature-row--leedayoung-ready-to-merry-mobile">
          <div className="work-detail__feature-image-wrapper">
            <img
              src={leedayoungWork1_03}
              alt="Postcard"
              className="work-detail__feature-image"
              onError={(e) => handleImageError(e, leedayoungWork1_03, work.id, 'feature-postcard')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-content">
            <div className="work-detail__text-group">
              <h4 className="work-detail__feature-title">Postcard</h4>
              <div className="work-detail__feature-description">
                <p className="mb-0">W 100 X H 150 (mm) / 7ea</p>
                <p className="mb-0"> </p>
                <p className="mb-0">재해석한 곡의 분위기를 토대로 제작된</p>
                <p className="mb-0">레터링을 포함하여 디자인되었다. 앞면은</p>
                <p>그래픽 디자인 위주로, 뒷면은 편지를 쓸 수 있는 공간을 위주로 구성하였다.</p>
              </div>
            </div>
          </div>
        </li>
        <li className="work-detail__feature-row work-detail__feature-row--leedayoung-ready-to-merry-mobile">
          <div className="work-detail__feature-image-wrapper">
            <img
              src={leedayoungWork1_04}
              alt="Lyrics Paper"
              className="work-detail__feature-image"
              onError={(e) => handleImageError(e, leedayoungWork1_04, work.id, 'feature-lyrics')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-content">
            <div className="work-detail__text-group">
              <h4 className="work-detail__feature-title">Lyrics Paper</h4>
              <div className="work-detail__feature-description">
                <p className="mb-0">W 200 X H 150 (mm) / 7ea</p>
                <p className="mb-0"> </p>
                <p className="mb-0">엽서의 주요 그래픽을 모티프로 한 2단</p>
                <p className="mb-0">접지형 가사지이다. 표지는 엽서와의</p>
                <p>통일성을 유지하면서도 차별화된 포인트를 더했으며, 내지는 전형적인 가사지의 형태를 벗어나 개성적인 디자인을 시도하였다.</p>
              </div>
            </div>
          </div>
        </li>
      </ul>

      {/* Feature Rows Section 2 - Sticker Pack & Acrylic Keyring */}
      <ul className="work-detail__section work-detail__feature-rows work-detail__feature-rows--leedayoung-ready-to-merry-mobile-2">
        <li className="work-detail__feature-row work-detail__feature-row--leedayoung-ready-to-merry-mobile">
          <div className="work-detail__feature-image-wrapper">
            <img
              src={leedayoungWork1_05}
              alt="Sticker Pack"
              className="work-detail__feature-image"
              onError={(e) => handleImageError(e, leedayoungWork1_05, work.id, 'feature-sticker')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-content">
            <div className="work-detail__text-group">
              <h4 className="work-detail__feature-title">Sticker Pack</h4>
              <div className="work-detail__feature-description">
                <p className="mb-0">W 100 X H 150 (mm) / 6ea X 7set</p>
                <p className="mb-0"> </p>
                <p className="mb-0">수록곡의 제목과 가사, 포인트 그래픽을</p>
                <p className="mb-0">녹여냈다. 레터링 디자인과 타이포그래피,</p>
                <p>그래픽적 요소를 다양하게 담고자 하였다.</p>
              </div>
            </div>
          </div>
        </li>
        <li className="work-detail__feature-row work-detail__feature-row--leedayoung-ready-to-merry-mobile">
          <div className="work-detail__feature-image-wrapper">
            <img
              src={leedayoungWork1_06}
              alt="Acrylic Keyring"
              className="work-detail__feature-image"
              onError={(e) => handleImageError(e, leedayoungWork1_06, work.id, 'feature-keyring')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-content">
            <div className="work-detail__text-group">
              <h4 className="work-detail__feature-title">Acrylic Keyring</h4>
              <div className="work-detail__feature-description">
                <p className="mb-0">W 40 X H 40 (mm) / 7ea</p>
                <p className="mb-0"> </p>
                <p className="mb-0">곡의 분위기와 어울리는 오브제를 선정해</p>
                <p>레터링과 함께 구성했다. 크리마 트리에 장식 오너먼트로 활용할 수 있다.</p>
              </div>
            </div>
          </div>
        </li>
      </ul>

      {/* Feature Cards Section - Posters */}
      <ul className="work-detail__section work-detail__cards work-detail__cards--leedayoung-ready-to-merry-mobile">
        <li className="work-detail__card work-detail__card--leedayoung-ready-to-merry-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={leedayoungWork1_07}
              alt="전단지형 포터"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, leedayoungWork1_07, work.id, 'card-poster-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">전단지형 포터</h5>
            <div className="work-detail__card-description">
              <p className="mb-0">크리마까지 7일간의 카운트다운을</p>
              <p className="mb-0">효과적으로 담아내기 위해 상단에는 시계형태를, 하단에는 곡별로 선택해 뜯어낼 수 있는 구조로</p>
              <p>디자인하였다.</p>
            </div>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--leedayoung-ready-to-merry-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={leedayoungWork1_08}
              alt="캘린더형 포터"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, leedayoungWork1_08, work.id, 'card-poster-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">캘린더형 포터</h5>
            <div className="work-detail__card-description">
              <p className="mb-0">수록곡과 함께하는 7일동안의 여정을</p>
              <p className="mb-0">표현하고자 캘린더 형식를 차용해 디자인</p>
              <p className="mb-0">하였다. 날짜와 디데이, 그리고 각 곡의</p>
              <p>포인트 그래픽을 함께 담았다.</p>
            </div>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--leedayoung-ready-to-merry-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={leedayoungWork1_09}
              alt="앨범 사양 포터"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, leedayoungWork1_09, work.id, 'card-poster-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">앨범 사양 포터</h5>
            <div className="work-detail__card-description">
              <p className="mb-0">앨범 패키지에 포함된 구성 요소를 한눈에</p>
              <p>보기 쉽게 정리해 디자인하였다.</p>
            </div>
          </div>
        </li>
      </ul>

      {/* Bento Section - 3D Packaging Video */}
      <ul className="work-detail__section work-detail__bento work-detail__bento--leedayoung-ready-to-merry-mobile">
        <li className="work-detail__bento-grid">
          <div className="work-detail__bento-column">
            <div className="work-detail__bento-card work-detail__bento-card--leedayoung-ready-to-merry-mobile">
              <div className="work-detail__bento-text">
                <h5 className="work-detail__bento-title">앨범 굿즈 형태를 직관적으로</h5>
                <p className="work-detail__bento-description">패키지가 열리며 굿즈가 나오고 펼쳐지는 모션을 적용했다.</p>
              </div>
              <div className="work-detail__bento-image-wrapper">
                <img
                  src={leedayoungWork1_10}
                  alt="앨범 굿즈 형태를 직관적으로"
                  className="work-detail__bento-image"
                  onError={(e) => handleImageError(e, leedayoungWork1_10, work.id, 'bento-1')}
                  loading="lazy"
                />
              </div>
            </div>
            <div className="work-detail__bento-card work-detail__bento-card--leedayoung-ready-to-merry-mobile">
              <div className="work-detail__bento-text">
                <h5 className="work-detail__bento-title">곡의 분위기를 직접 느낄 수 있도록</h5>
                <p className="work-detail__bento-description">곡의 정보와 하이라이트 부분을 함께 보고 들을 수 있도록  제작하였다.</p>
              </div>
              <div className="work-detail__bento-image-wrapper">
                <img
                  src={leedayoungWork1_11}
                  alt="곡의 분위기를 직접 느낄 수 있도록"
                  className="work-detail__bento-image"
                  onError={(e) => handleImageError(e, leedayoungWork1_11, work.id, 'bento-2')}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <div className="work-detail__bento-card work-detail__bento-card--large work-detail__bento-card--leedayoung-ready-to-merry-mobile">
            <div className="work-detail__bento-text">
              <h5 className="work-detail__bento-title">앨범의 콘셉트를 보다 명확하게</h5>
              <p className="work-detail__bento-description">산타의 우편함이라는 콘셉트를 명확히 전달하기 위해 패키지 디자인, 배경, 그리고 이펙트에 중점을 뒀다.</p>
            </div>
            <div className="work-detail__bento-image-wrapper">
              <img
                src={leedayoungWork1_12}
                alt="앨범의 콘셉트를 보다 명확하게"
                className="work-detail__bento-image"
                onError={(e) => handleImageError(e, leedayoungWork1_12, work.id, 'bento-3')}
                loading="lazy"
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default LeeDayoungReadyToMerryMobile;
