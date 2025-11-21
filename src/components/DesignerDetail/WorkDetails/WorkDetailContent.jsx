import React from 'react';
import LoveAtRustSight from './LoveAtRustSight';
import HelloUniverse from './HelloUniverse';
import GoFetch from './GoFetch';
import Petrichor from './Petrichor';
import Caravan from './Caravan';
import LeeJiminVeneti from './LeeJiminVeneti';
import LeeJiminLeLabo from './LeeJiminLeLabo';
import DefaultWorkLayout from './DefaultWorkLayout';
import '../DesignerShowcase.css';

/**
 * 작품 ID나 layout에 따라 적절한 작품 상세 컴포넌트를 렌더링하는 라우터 컴포넌트
 * 
 * @param {Object} work - 작품 데이터
 * @param {Object} designer - 디자이너 데이터
 * @param {string} badgeSrc - 배지 이미지 소스
 * @param {string} badgeAlt - 배지 이미지 alt 텍스트
 * @param {Array} ctas - CTA 버튼 배열
 * @returns {JSX.Element} 작품 상세 컴포넌트
 */
const WorkDetailContent = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  if (!work) return null;

  // 김윤정 작품1 (Love at Rust Sight)
  if (work.id === 'kimyunjung-love-at-rust-sight') {
    return (
      <LoveAtRustSight
        work={work}
        designer={designer}
        badgeSrc={badgeSrc}
        badgeAlt={badgeAlt}
        ctas={ctas}
      />
    );
  }

  // 김윤정 작품2 (안녕 우주)
  if (work.id === 'kimyunjung-hello-universe') {
    return (
      <HelloUniverse
        work={work}
        designer={designer}
        badgeSrc={badgeSrc}
        badgeAlt={badgeAlt}
        ctas={ctas}
      />
    );
  }

  // 김재은 작품1 (Go Fetch)
  if (work.id === 'kimjaeeun-go-fetch' || work.layout === 'gofetch') {
    return (
      <GoFetch
        work={work}
        designer={designer}
        badgeSrc={badgeSrc}
        badgeAlt={badgeAlt}
        ctas={ctas}
      />
    );
  }

  // 김재은 작품2 (PETRICHOR)
  if (work.id === 'kimjaeeun-petrichor' || work.layout === 'petrichor') {
    return (
      <Petrichor
        work={work}
        designer={designer}
        badgeSrc={badgeSrc}
        badgeAlt={badgeAlt}
        ctas={ctas}
      />
    );
  }

  // 김지나 작품1 (Caravan)
  if (work.id === 'kimjina-caravan' || work.layout === 'caravan') {
    return (
      <Caravan
        work={work}
        designer={designer}
        badgeSrc={badgeSrc}
        badgeAlt={badgeAlt}
        ctas={ctas}
      />
    );
  }

  // 이지민 작품1 (Veneti)
  if (work.id === 'leejimin-veneti-character' || work.layout === 'leejimin-veneti') {
    return (
      <LeeJiminVeneti
        work={work}
        designer={designer}
        badgeSrc={badgeSrc}
        badgeAlt={badgeAlt}
        ctas={ctas}
      />
    );
  }

  // 이지민 작품2 (LE LABO)
  if (work.id === 'leejimin-veneti-perfume' || work.layout === 'leejimin-lelabo') {
    return (
      <LeeJiminLeLabo
        work={work}
        designer={designer}
        badgeSrc={badgeSrc}
        badgeAlt={badgeAlt}
        ctas={ctas}
      />
    );
  }

  // 기본 레이아웃: 대부분의 작품이 사용하는 표준 레이아웃
  // 특별한 레이아웃이 필요한 작품은 위에서 개별 컴포넌트로 처리
  return (
    <DefaultWorkLayout
      work={work}
      designer={designer}
      badgeSrc={badgeSrc}
      badgeAlt={badgeAlt}
      ctas={ctas}
    />
  );
};

export default WorkDetailContent;

