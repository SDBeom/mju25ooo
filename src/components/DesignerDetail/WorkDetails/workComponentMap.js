/**
 * 작품 컴포넌트 맵
 * 작품 ID나 layout에 따라 적절한 컴포넌트를 반환
 */

// Import all work components
import SeoDongbeomHiFive from './SeoDongbeom/SeoDongbeomHiFive';
import ParkHaeinChrome4Seasons from './ParkHaein/ParkHaeinChrome4Seasons';
import KimYunjungHelloUniverse from './KimYunjung/KimYunjungHelloUniverse';
import KimYunjungLoveAtRustSight from './KimYunjung/KimYunjungLoveAtRustSight';
import SongDaheeACardOfLove from './SongDahee/SongDaheeACardOfLove';
import SongDaheePeony from './SongDahee/SongDaheePeony';
import HeoJihoonMasterImagination from './HeoJihoon/HeoJihoonMasterImagination';
import HeoJihoonEternalVision from './HeoJihoon/HeoJihoonEternalVision';
import ChoHaneulYouthDream from './ChoHaneul/ChoHaneulYouthDream';
import ChoHaneulTheReasonThatILive from './ChoHaneul/ChoHaneulTheReasonThatILive';
import JungJiminTheGothic from './JungJimin/JungJiminTheGothic';
import JungJiminTheWeapon from './JungJimin/JungJiminTheWeapon';
import AhnSeonminDotDotDot from './AhnSeonmin/AhnSeonminDotDotDot';
import DoTienHongSeeTinhIsometic from './DoTienHong/DoTienHongSeeTinhIsometic';
import DoTienHongSeeTinhAnimatedMv from './DoTienHong/DoTienHongSeeTinhAnimatedMv';
import ParkJinaCrossCooty from './ParkJina/ParkJinaCrossCooty';
import ParkJinaRemain from './ParkJina/ParkJinaRemain';
import ParkHeechanPledge from './ParkHeechan/ParkHeechanPledge';
import ParkHeechan2025AnimationReel from './ParkHeechan/ParkHeechan2025AnimationReel';
import ShimSungbinLinked from './ShimSungbin/ShimSungbinLinked';
import ShimSungbinBoom from './ShimSungbin/ShimSungbinBoom';
import SeoRinRavenX from './SeoRin/SeoRinRavenX';
import SeoRinKaron from './SeoRin/SeoRinKaron';
import LeeUnLayered from './LeeUn/LeeUnLayered';
import LeeUn9e9e9e from './LeeUn/LeeUn9e9e9e';
import LeeJiminVeneti from './LeeJimin/LeeJiminVeneti';
import LeeJiminLeLabo from './LeeJimin/LeeJiminLeLabo';
import LeeDayoungReadyToMerry from './LeeDayoung/LeeDayoungReadyToMerry';
import LeeDayoungPlottingRoom from './LeeDayoung/LeeDayoungPlottingRoom';
import KimJinaCaravan from './KimJina/KimJinaCaravan';
import KimJinaCellestial from './KimJina/KimJinaCellestial';
import KimJaeeunPetrichor from './KimJaeeun/KimJaeeunPetrichor';
import KimJaeeunGoFetch from './KimJaeeun/KimJaeeunGoFetch';
import KimChaeYoungDoYouBelieveInDestiny from './KimChaeYoung/KimChaeYoungDoYouBelieveInDestiny';
import KimChaeYoungCyberJesasang from './KimChaeYoung/KimChaeYoungCyberJesasang';
import JeongitaeDolorSaga from './Jeongitae/JeongitaeDolorSaga';
import JeongitaeWarOrb from './Jeongitae/JeongitaeWarOrb';
import WoosuminSasindo from './Woosumin/WoosuminSasindo';
import WoosuminPierreHuyghe from './Woosumin/WoosuminPierreHuyghe';
import WoosuminLiminal from './Woosumin/WoosuminLiminal';

// Import LeeGabi components
import LeeGabiOvercooked from './LeeGabi/LeeGabiOvercooked';
import LeeGabiAbyssRacing from './LeeGabi/LeeGabiAbyssRacing';

/**
 * 작품 ID나 layout에 따라 적절한 컴포넌트를 반환
 * @param {Object} work - 작품 데이터
 * @returns {React.Component|null} 작품 컴포넌트 또는 null
 */
export const getWorkComponent = (work) => {
  if (!work) return null;

  // 정지민 작품
  if (work.id === 'jungjimin-the-gothic' || work.layout === 'jungjimin-the-gothic' || work.title === 'The Gothic') {
    return JungJiminTheGothic;
  }
  if (work.id === 'jungjimin-the-weapon' || work.layout === 'jungjimin-the-weapon' || work.title === 'The Weapon') {
    return JungJiminTheWeapon;
  }

  // 조하늘 작품
  if (work.id === 'johaneul-youth-dream' || work.layout === 'johaneul-youth-dream') {
    return ChoHaneulYouthDream;
  }
  if (work.id === 'johaneul-the-reason-that-i-live' || work.layout === 'johaneul-the-reason-that-i-live' || work.id === 'johaneul-the-reason' || work.layout === 'johaneul-the-reason' || work.title === 'The Reason that I Live') {
    return ChoHaneulTheReasonThatILive;
  }

  // 서동범 작품
  if (work.id === 'seodongbeom-hifive' || work.layout === 'hifive' || work.title === 'HiFive') {
    return SeoDongbeomHiFive;
  }

  // 박해인 작품
  if (work.id === 'parkhaein-chrome4' || work.layout === 'parkhaein-chrome4') {
    return ParkHaeinChrome4Seasons;
  }

  // 박진아 작품
  if (work.id === 'parkjina-cross-cooty' || work.layout === 'parkjina-cross-cooty') {
    return ParkJinaCrossCooty;
  }
  if (work.id === 'parkjina-remains' || work.layout === 'parkjina-remains' || work.title === 'REMAIN') {
    return ParkJinaRemain;
  }

  // 박희찬 작품
  if (work.id === 'parkheechan-pledge' || work.layout === 'parkheechan-pledge' || work.title === 'PLEDGE') {
    return ParkHeechanPledge;
  }
  if (work.id === 'parkheechan-animation-reel' || work.layout === 'parkheechan-animation-reel' || work.title === '2025 Animation reel') {
    return ParkHeechan2025AnimationReel;
  }

  // 김윤정 작품
  if (work.id === 'kimyunjung-hello-universe' || work.layout === 'hello-universe' || work.title === '안녕 우주') {
    return KimYunjungHelloUniverse;
  }
  if (work.id === 'kimyunjung-love-at-rust-sight' || work.layout === 'love-at-rust-sight' || work.title === 'Love at Rust Sight') {
    return KimYunjungLoveAtRustSight;
  }

  // 김재은 작품
  if (work.id === 'kimjaeeun-go-fetch' || work.layout === 'gofetch' || work.title === 'Go Fetch!') {
    return KimJaeeunGoFetch;
  }
  if (work.id === 'kimjaeeun-petrichor' || work.layout === 'petrichor' || work.title === 'PETRICHOR') {
    return KimJaeeunPetrichor;
  }

  // 김지나 작품
  if (work.id === 'kimjina-caravan' || work.layout === 'caravan' || work.title === 'Caravan') {
    return KimJinaCaravan;
  }
  if (work.id === 'kimjina-cellestial' || work.layout === 'cellestial' || work.title === 'Cellestial') {
    return KimJinaCellestial;
  }

  // 김채영 작품
  if (work.id === 'kimchaeyoung-fate-boardgame' || work.layout === 'fate-boardgame' || work.title === '운명을 믿으세요?') {
    return KimChaeYoungDoYouBelieveInDestiny;
  }
  if (work.id === 'kimchaeyoung-cyber-jesasang' || work.layout === 'cyber-jesasang' || work.title === '사이버 제사상') {
    return KimChaeYoungCyberJesasang;
  }

  // 도티엔홍 작품
  if (work.id === 'dotianhong-see-tinh-isometric' || work.layout === 'dotianhong-isometric' || work.title === '"SEE TINH" ISOMETIC') {
    return DoTienHongSeeTinhIsometic;
  }
  if (work.id === 'dotianhong-see-tinh-animated' || work.layout === 'dotianhong-animated' || work.title === '"SEE TINH" ANIMATED MV') {
    return DoTienHongSeeTinhAnimatedMv;
  }

  // 송다희 작품
  if (work.id === 'songdahee-card-of-love' || work.layout === 'songdahee-card-of-love' || work.title === 'A Card of Love') {
    return SongDaheeACardOfLove;
  }
  if (work.id === 'songdahee-peony' || work.layout === 'songdahee-peony' || work.title === 'Peony') {
    return SongDaheePeony;
  }

  // 심성빈 작품
  if (work.id === 'simseongbin-linked' || work.layout === 'simseongbin-linked' || work.title === 'Linked') {
    return ShimSungbinLinked;
  }
  if (work.id === 'simseongbin-boom' || work.layout === 'simseongbin-boom' || work.title === 'BOOM') {
    return ShimSungbinBoom;
  }

  // 서린 작품
  if (work.id === 'jeonseorin-raven-x' || work.layout === 'jeonseorin-raven-x' || work.title === 'Raven X') {
    return SeoRinRavenX;
  }
  if (work.id === 'jeonseorin-karon' || work.layout === 'jeonseorin-karon' || work.title === 'Karon') {
    return SeoRinKaron;
  }

  // 이은 작품
  if (work.id === 'leeun-layered' || work.layout === 'leeun-layered' || work.title === 'Layered') {
    return LeeUnLayered;
  }
  if (work.id === 'leeun-9e9e9e' || work.layout === 'leeun-9e9e9e' || work.title === '9e9e9e') {
    return LeeUn9e9e9e;
  }

  // 이지민 작품
  if (work.id === 'leejimin-veneti-character' || work.layout === 'leejimin-veneti' || work.title === 'Veneti') {
    return LeeJiminVeneti;
  }
  if (work.id === 'leejimin-veneti-perfume' || work.layout === 'leejimin-lelabo' || work.title === 'Le Labo') {
    return LeeJiminLeLabo;
  }

  // 이가비 작품
  if (work.id === 'leegabi-overcooked' || work.layout === 'leegabi-overcooked' || work.title === 'OVERCOOKED: 카페 대소동') {
    return LeeGabiOvercooked;
  }
  if (work.id === 'leegabi-abyss-racing' || work.layout === 'leegabi-abyss-racing' || work.title === 'Abyss Racing: 세이렌의 보물') {
    return LeeGabiAbyssRacing;
  }

  // 이다영 작품
  if (work.id === 'leedayoung-ready-to-merry' || work.layout === 'leedayoung-ready-to-merry' || work.title === 'Ready to Merry') {
    return LeeDayoungReadyToMerry;
  }
  if (work.id === 'leedayoung-plotting-room' || work.layout === 'leedayoung-plotting-room' || work.title === 'Plotting Room') {
    return LeeDayoungPlottingRoom;
  }

  // 우수민 작품
  if (work.id === 'woosumin-sasindo' || work.layout === 'woosumin-sasindo' || work.title === '사신도') {
    return WoosuminSasindo;
  }
  // 작품 2: Pierre Huyghe (실제 데이터: id='woosumin-liminal-guide', layout='woosumin-liminal', title='Pierre Huyghe: Liminal 가이드앱 UXUI')
  if (work.id === 'woosumin-liminal-guide' || work.layout === 'woosumin-liminal' || work.title === 'Pierre Huyghe: Liminal 가이드앱 UXUI' || work.title?.includes('Pierre Huyghe')) {
    return WoosuminPierreHuyghe;
  }
  // 작품 3: Liminal Guide (다른 작품이 있을 경우를 대비 - 우선순위 낮음)
  if (work.id === 'woosumin-pierre-huyghe' || work.layout === 'woosumin-pierre-huyghe' || work.title === 'Liminal Guide') {
    return WoosuminLiminal;
  }

  // 정이태 작품
  if (work.id === 'jeongitae-dolor-saga' || work.layout === 'jeongitae-dolor-saga' || work.title === 'Dolor Saga') {
    return JeongitaeDolorSaga;
  }
  if (work.id === 'jeongitae-war-orb' || work.layout === 'jeongitae-war-orb' || work.title === 'War Orb') {
    return JeongitaeWarOrb;
  }

  // 안선민 작품
  if (work.id === 'anseonmin-dots' || work.layout === 'anseonmin-dots' || work.title === '점점점') {
    return AhnSeonminDotDotDot;
  }

  // 허지훈 작품
  if (work.id === 'heo-jihoon-master-imagination' || work.layout === 'heo-jihoon-master-imagination' || work.title === 'Master your Imagination') {
    return HeoJihoonMasterImagination;
  }
  if (work.id === 'heo-jihoon-eternal-vision' || work.layout === 'heo-jihoon-eternal-vision' || work.title === 'Eternal Vision') {
    return HeoJihoonEternalVision;
  }

  // 매칭되는 컴포넌트가 없으면 null 반환
  return null;
};
