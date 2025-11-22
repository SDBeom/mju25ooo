import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Modal from '../Modal/Modal';
import WorkDetailContent from './WorkDetails/WorkDetailContent';
import { removeModalOpenState } from '../../shared/utils';
import { MODAL } from '../../shared/constants';
import { GENRE_TYPES, DEFAULTS, INSTAGRAM, CTA_LABELS, GALLERY_SCROLL_DELAY, SCROLL_BEHAVIOR } from '../../shared/designerConstants';
import { videoBadge, gameBadge, multimediaBadge, motionBadge } from '../../data/designerDetailsData';
import { guardCSSImport } from '../../shared/cssImportGuard';
import './DesignerShowcase.css';

// CSS import 보장 (개발 모드에서만 체크)
guardCSSImport('./DesignerShowcase.css', 'designer-showcase', 'DesignerShowcase');

// 장르별 배지 매핑 (Map 사용으로 성능 개선 및 가독성 향상)
const GENRE_BADGE_MAP = new Map([
  [GENRE_TYPES.VIDEO, videoBadge],
  [GENRE_TYPES.GAME, gameBadge],
  [GENRE_TYPES.MULTIMEDIA, multimediaBadge],
  [GENRE_TYPES.MOTION, motionBadge],
]);

/**
 * 장르에 따른 배지 이미지 반환
 * @param {string} genre - 작품 장르
 * @returns {string} 배지 이미지 경로
 */
const getBadgeForGenre = (genre) => {
  if (!genre) return videoBadge;
  return GENRE_BADGE_MAP.get(genre) || videoBadge;
};

const DesignerShowcase = ({ designer, onBack, initialWorkId, renderOnlyWork }) => {
  const [selectedWork, setSelectedWork] = useState(null);

  // CSS 로드 확인 및 강제 적용 (개발 모드)
  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    const checkAndForceCSS = () => {
      const stylesheets = Array.from(document.styleSheets);
      const hasDesignerShowcaseCSS = stylesheets.some(sheet => {
        try {
          return sheet.href && sheet.href.includes('DesignerShowcase.css');
        } catch {
          return false;
        }
      });
      
      if (!hasDesignerShowcaseCSS) {
        console.error('[DesignerShowcase] CSS 파일이 로드되지 않았습니다!');
        
        // CSS 파일 강제 로드 시도
        const existingLink = document.querySelector('link[href*="DesignerShowcase.css"]');
        if (!existingLink) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.type = 'text/css';
          link.href = '/src/components/DesignerDetail/DesignerShowcase.css';
          link.onerror = () => {
            console.error('[DesignerShowcase] CSS 파일을 로드할 수 없습니다.');
          };
          document.head.appendChild(link);
        }
      }
      
      // designer-showcase 요소에 스타일 강제 적용
      const showcaseElement = document.querySelector('.designer-showcase');
      if (showcaseElement) {
        showcaseElement.style.minHeight = '100vh';
        showcaseElement.style.background = '#f8f6f4';
        showcaseElement.style.color = '#1a1a1a';
        showcaseElement.style.position = 'relative';
        showcaseElement.style.zIndex = '1';
        showcaseElement.style.width = '100%';
        showcaseElement.style.boxSizing = 'border-box';
        showcaseElement.style.margin = '0';
        showcaseElement.style.padding = '0';
      }
    };
    
    const timeoutId = setTimeout(checkAndForceCSS, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  // initialWorkId가 있으면 해당 작품을 자동으로 열기
  useEffect(() => {
    if (!initialWorkId || !designer?.works) return;
    
      const work = designer.works.find((w) => w.id === initialWorkId);
      if (work) {
        setSelectedWork(work);
    }
  }, [initialWorkId, designer]);

  // 컴포넌트 마운트 시 스크롤을 맨 위로 이동하고 모달 관련 스타일 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
    removeModalOpenState();
  }, []);

  /**
   * 작품 모달 열기
   */
  const openWorkModal = useCallback((work) => {
    if (!work) return;
    setSelectedWork(work);
  }, []);

  /**
   * 작품 모달 닫기
   */
  const closeWorkModal = useCallback(() => {
    setSelectedWork(null);
  }, []);

  /**
   * 갤러리로 스크롤하는 핸들러
   */
  const scrollToGallery = useCallback(() => {
    closeWorkModal();
    setTimeout(() => {
      const gallery = document.querySelector(`[aria-label="${designer?.displayName || ''} 대표 작품"]`);
      gallery?.scrollIntoView({ 
        behavior: SCROLL_BEHAVIOR.SMOOTH, 
        block: SCROLL_BEHAVIOR.BLOCK 
      });
    }, GALLERY_SCROLL_DELAY);
  }, [designer?.displayName, closeWorkModal]);

  /**
   * Instagram URL 정규화 및 검증 (XSS 방지)
   * @param {string} url - Instagram URL 또는 사용자명
   * @returns {string|null} 정규화된 Instagram URL 또는 null
   */
  const normalizeInstagramUrl = useCallback((url) => {
    if (!url || typeof url !== 'string') return null;
    
    // XSS 방지: 위험한 문자 제거
    const sanitized = url.trim().replace(/[<>"']/g, '');
    
    if (sanitized.startsWith('http')) {
      // 전체 URL인 경우 검증
      try {
        const urlObj = new URL(sanitized);
        if (urlObj.hostname.includes('instagram.com')) {
          return sanitized;
        }
      } catch {
        return null;
      }
    }
    
    // 사용자명만 있는 경우 (영문, 숫자, 점, 언더스코어만 허용)
    const username = sanitized.replace(/^@/, '').replace(/[^a-zA-Z0-9._]/g, '');
    if (!username) return null;
    
    return `${INSTAGRAM.BASE_URL}${username}/`;
  }, []);

  /**
   * Instagram 링크 열기
   */
  const openInstagramLink = useCallback((url) => {
    const normalizedUrl = normalizeInstagramUrl(url);
    if (normalizedUrl) {
      window.open(normalizedUrl, '_blank', 'noopener,noreferrer');
    }
  }, [normalizeInstagramUrl]);

  /**
   * 작품 ID를 기반으로 모달 클래스 이름 생성
   * @param {Object} work - 작품 데이터
   * @returns {string} 모달 클래스 이름
   */
  const getModalClassForWork = useCallback((work) => {
    if (!work) return MODAL.CLASS_NAMES.MODAL_CONTENT;
    
    const baseClass = MODAL.CLASS_NAMES.MODAL_CONTENT;
    
    // work.layout이 있으면 우선 사용
    if (work.layout) {
      return `${baseClass} modal-content--${work.layout}`;
    }
    
    // work.id를 기반으로 클래스 이름 생성
    if (work.id) {
      // work.id에서 작품별 식별자 추출
      // 예: "kimjina-caravan" -> "caravan", "leejimin-veneti-character" -> "veneti-character"
      const workIdentifier = work.id
        .split('-')
        .slice(1) // 첫 번째 부분(디자이너 이름) 제거
        .join('-'); // 나머지 부분을 하이픈으로 연결
      
      if (workIdentifier) {
        return `${baseClass} modal-content--${workIdentifier}`;
      }
    }
    
    return baseClass;
  }, []);

  /**
   * 작품 상세 콘텐츠 Props 생성
   */
  const getWorkContentProps = useCallback((work) => {
    if (!work || !designer) {
      return { 
        work: null, 
        designer: null, 
        badgeSrc: null, 
        badgeAlt: DEFAULTS.BADGE_ALT, 
        ctas: [] 
      };
    }

    const instagramUrl = work.instagram || designer?.instagram;
    const badgeSrc = getBadgeForGenre(work.genre);
    const badgeAlt = work.genre || DEFAULTS.BADGE_ALT;
    
    const ctas = [
      {
        label: CTA_LABELS.VIEW_OTHER_WORKS,
        variant: 'primary',
        onClick: scrollToGallery,
      },
    ];

    if (instagramUrl) {
      ctas.push({
        label: CTA_LABELS.PERSONAL_SNS,
        variant: 'secondary',
        onClick: () => openInstagramLink(instagramUrl),
      });
    }

    return { work, designer, badgeSrc, badgeAlt, ctas };
  }, [designer, scrollToGallery, openInstagramLink]);

  /**
   * 작품 목록 메모이제이션 (불필요한 리렌더링 방지)
   */
  const worksList = useMemo(() => {
    if (!designer?.works || !Array.isArray(designer.works) || designer.works.length === 0) {
      return null;
    }
    return designer.works;
  }, [designer?.works]);

  // designer가 없으면 null 반환 (Hooks 호출 후)
  if (!designer) {
    return null;
  }

  // renderOnlyWork가 true면 작품 내용만 렌더링 (모달 모드)
  if (renderOnlyWork && selectedWork) {
    const props = getWorkContentProps(selectedWork);
    return <WorkDetailContent {...props} />;
  }

  return (
    <div 
      className="designer-showcase"
      style={{
        minHeight: '100vh',
        background: '#f8f6f4',
        color: '#1a1a1a',
        position: 'relative',
        zIndex: 1,
        width: '100%',
        boxSizing: 'border-box',
        margin: 0,
        padding: 0
      }}
    >
      <div className="designer-showcase__inner">
        <button type="button" className="designer-showcase__back" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M19 12H5M12 19l-7-7 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{CTA_LABELS.BACK_TO_LIST}</span>
        </button>

        <header className="designer-showcase__header">
          <h1 className="designer-showcase__title">{designer.displayName}</h1>
        </header>

        <section className="designer-showcase__gallery" aria-label={`${designer.displayName} 대표 작품`}>
          {worksList ? (
            worksList.map((work) => (
            <article key={work.id} className="work-card">
              <button
                type="button"
                className="work-card__thumb"
                onClick={() => openWorkModal(work)}
                  aria-label={`${work.title || DEFAULTS.WORK_TITLE} ${CTA_LABELS.VIEW_DETAILS}`}
              >
                  <img 
                    src={work.thumbnail} 
                    alt={work.title || DEFAULTS.WORK_IMAGE_ALT} 
                    loading="lazy" 
                  />
              </button>
              <div className="work-card__body">
                  <h2 className="work-card__title">{work.title || DEFAULTS.WORK_TITLE}</h2>
                  <p className="work-card__summary">{work.summary || ''}</p>
                <button
                  type="button"
                  className="work-card__cta"
                  onClick={() => openWorkModal(work)}
                >
                    {CTA_LABELS.VIEW_DETAILS}
                </button>
              </div>
            </article>
            ))
          ) : (
            <p className="designer-showcase__no-works">작품이 없습니다.</p>
          )}
        </section>
      </div>

      <Modal
        isOpen={!!selectedWork}
        onClose={closeWorkModal}
        designerName={designer?.displayName || DEFAULTS.DESIGNER_NAME}
        modalClass={selectedWork ? getModalClassForWork(selectedWork) : MODAL.CLASS_NAMES.MODAL_CONTENT}
      >
        {selectedWork && <WorkDetailContent {...getWorkContentProps(selectedWork)} />}
      </Modal>
    </div>
  );
};

export default DesignerShowcase;
