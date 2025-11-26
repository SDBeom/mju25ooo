import React from 'react';
import UnifiedWorkLayout from './UnifiedWorkLayout';
import { convertWorkDataToUnifiedLayout } from './utils/workDataConverter';
import SeoDongbeomHiFive from './SeoDongbeom/SeoDongbeomHiFive';
import ParkHaeinChrome4Seasons from './ParkHaein/ParkHaeinChrome4Seasons';
import KimYunjungHelloUniverse from './KimYunjung/KimYunjungHelloUniverse';
import KimYunjungLoveAtRustSight from './KimYunjung/KimYunjungLoveAtRustSight';
import '../DesignerShowcase.css';

/**
 * 작품 ID나 layout에 따라 적절한 작품 상세 컴포넌트를 렌더링하는 라우터 컴포넌트
 * 
 * @param {Object} work - 작품 데이터
 * @param {Object} designer - 디자이너 데이터
 * @param {string} badgeSrc - 배지 이미지 소스타일을
 * @param {string} badgeAlt - 배지 이미지 alt 텍스타일을트
 * @param {Array} ctas - CTA 버튼 배열
 * @returns {JSX.Element} 작품 상세 컴포넌트
 */
const WorkDetailContent = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  if (!work) return null;

  // 서동범 작품 (HiFive) - 기존 레이아웃 유지 (참고용)
  if (work.id === 'seodongbeom-hifive' || work.layout === 'hifive' || work.title === 'HiFive') {
    return (
      <SeoDongbeomHiFive
        work={work}
        designer={designer}
        badgeSrc={badgeSrc}
        badgeAlt={badgeAlt}
        ctas={ctas}
      />
    );
  }

  // 박해인 작품 (Chrome 4: Seasons) - 기존 레이아웃 유지
  if (work.id === 'parkhaein-chrome4' || work.layout === 'parkhaein-chrome4') {
    return (
      <ParkHaeinChrome4Seasons
        work={work}
        designer={designer}
        badgeSrc={badgeSrc}
        badgeAlt={badgeAlt}
        ctas={ctas}
      />
    );
  }

  // 김윤정 작품 (Hello Universe) - 기존 레이아웃 유지
  if (work.id === 'kimyunjung-hello-universe' || work.layout === 'hello-universe') {
    return (
      <KimYunjungHelloUniverse
        work={work}
        designer={designer}
        badgeSrc={badgeSrc}
        badgeAlt={badgeAlt}
        ctas={ctas}
      />
    );
  }

  // 김윤정 작품 (Love at Rust Sight) - 기존 레이아웃 유지
  if (work.id === 'kimyunjung-love-at-rust-sight' || work.layout === 'love-at-rust-sight') {
    return (
      <KimYunjungLoveAtRustSight
        work={work}
        designer={designer}
        badgeSrc={badgeSrc}
        badgeAlt={badgeAlt}
        ctas={ctas}
      />
    );
  }

  // 모든 다른 작품은 통일된 레이아웃 사용
  const layoutData = convertWorkDataToUnifiedLayout(work);
  
  return (
    <UnifiedWorkLayout
      work={work}
      designer={designer}
      ctas={ctas}
      heroImage={layoutData?.heroImage}
      bentoData={layoutData?.bentoData || []}
      quoteData={layoutData?.quoteData || null}
      featureImage={layoutData?.featureImage || null}
      cardsData={layoutData?.cardsData || []}
    />
  );
};

export default WorkDetailContent;

