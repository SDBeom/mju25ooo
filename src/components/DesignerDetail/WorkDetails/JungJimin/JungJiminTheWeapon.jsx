import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import JungJiminTheWeaponDesktop from './JungJiminTheWeaponDesktop';
import JungJiminTheWeaponTablet from './JungJiminTheWeaponTablet';
import JungJiminTheWeaponMobile from './JungJiminTheWeaponMobile';

/**
 * ���- The Weapon (�작품2)
 * 반응형 작품 상세 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const JungJiminTheWeapon = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  if (!work || !designer) {
    return null;
  }

  // Mobile 버전 �더�
  if (isMobile) {
    return (
      <JungJiminTheWeaponMobile
        work={work}
        designer={designer}
        badgeSrc={badgeSrc}
        badgeAlt={badgeAlt}
        ctas={ctas}
      />
    );
  }

  // Tablet 버전 �더�
  if (isTablet) {
    return (
      <JungJiminTheWeaponTablet
        work={work}
        designer={designer}
        badgeSrc={badgeSrc}
        badgeAlt={badgeAlt}
        ctas={ctas}
      />
    );
  }

  // Desktop 버전 �더�(기본�
  return (
    <JungJiminTheWeaponDesktop
      work={work}
      designer={designer}
      badgeSrc={badgeSrc}
      badgeAlt={badgeAlt}
      ctas={ctas}
    />
  );
};

export default JungJiminTheWeapon;

