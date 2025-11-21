import React, { useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import WorkDetailContent from './WorkDetails/WorkDetailContent';
import { removeModalOpenState } from '../../shared/utils';
import { MODAL } from '../../shared/constants';
import { videoBadge, gameBadge, multimediaBadge, motionBadge } from '../../data/designerDetailsData';
import './DesignerShowcase.css';

const DesignerShowcase = ({ designer, onBack, initialWorkId, renderOnlyWork }) => {
  // Get badge image based on genre
  const getBadgeForGenre = (genre) => {
    if (!genre) return videoBadge; // Default to video badge
    
    if (genre === '영상 콘텐츠 디자인') {
      return videoBadge;
    } else if (genre === '게임 콘텐츠 디자인') {
      return gameBadge;
    } else if (genre === '멀티미디어 디자인') {
      return multimediaBadge;
    } else if (genre === '모션 디자인') {
      return motionBadge;
    }
    return videoBadge; // Default fallback
  };
  const [selectedWork, setSelectedWork] = useState(null);

  // initialWorkId가 있으면 해당 작품을 자동으로 열기
  useEffect(() => {
    if (initialWorkId && designer?.works) {
      const work = designer.works.find((w) => w.id === initialWorkId);
      if (work) {
        setSelectedWork(work);
      }
    }
  }, [initialWorkId, designer]);

  // 컴포넌트 마운트 시 스크롤을 맨 위로 이동하고 모달 관련 스타일 초기화
  useEffect(() => {
    // 스크롤을 맨 위로 이동
    window.scrollTo(0, 0);
    
    // 모달 관련 스타일 초기화 (이전 페이지에서 모달이 열려있었을 경우 대비)
    removeModalOpenState();
  }, []);

  const openWorkModal = (work) => {
    setSelectedWork(work);
  };

  const closeWorkModal = () => {
    setSelectedWork(null);
  };

  // 모든 작품은 동일한 모달 클래스 사용 (작품별 차별화 불필요)
  const getModalClassForWork = (work) => {
    return MODAL.CLASS_NAMES.MODAL_CONTENT;
  };

  // 모달 열림/닫힘은 Modal 컴포넌트에서 처리

  const getWorkContentProps = (work) => {
    const instagramUrl = work.instagram || designer?.instagram;
    const badgeSrc = getBadgeForGenre(work.genre);
    const badgeAlt = work.genre || 'Content Logo';
    const ctas = [
      {
        label: '디자이너의 다른 작품',
        variant: 'primary',
        onClick: () => {
          closeWorkModal();
          setTimeout(() => {
            const gallery = document.querySelector(`[aria-label="${designer.displayName} 대표 작품"]`);
            gallery?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 200);
        },
      },
    ];

    // 개인 SNS는 '디자이너의 다른 작품' 바로 다음에 추가
    if (instagramUrl) {
      ctas.push({
        label: '개인 SNS',
        variant: 'secondary',
        onClick: () => {
          const cleaned = instagramUrl.startsWith('http')
            ? instagramUrl
            : `https://www.instagram.com/${instagramUrl.replace(/^@/, '')}/`;
          window.open(cleaned, '_blank', 'noopener,noreferrer');
        },
      });
    }

    return { work, designer, badgeSrc, badgeAlt, ctas };
  }

  // renderOnlyWork가 true면 작품 내용만 렌더링 (모달 모드)
  if (renderOnlyWork && selectedWork) {
    const props = getWorkContentProps(selectedWork);
    return <WorkDetailContent {...props} />;
  }

  return (
    <div className="designer-showcase">
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
          <span>디자이너 목록으로 돌아가기</span>
        </button>

        <header className="designer-showcase__header">
          <h1 className="designer-showcase__title">{designer.displayName}</h1>
        </header>

        <section className="designer-showcase__gallery" aria-label={`${designer.displayName} 대표 작품`}>
          {designer.works.map((work) => (
            <article key={work.id} className="work-card">
              <button
                type="button"
                className="work-card__thumb"
                onClick={() => openWorkModal(work)}
                aria-label={`${work.title} 상세 보기`}
              >
                <img src={work.thumbnail} alt={work.title} loading="lazy" />
              </button>
              <div className="work-card__body">
                <h2 className="work-card__title">{work.title}</h2>
                <p className="work-card__summary">{work.summary}</p>
                <button
                  type="button"
                  className="work-card__cta"
                  onClick={() => openWorkModal(work)}
                >
                  상세 보기
                </button>
              </div>
            </article>
          ))}
        </section>
      </div>

      <Modal
        isOpen={!!selectedWork}
        onClose={closeWorkModal}
        designerName={designer?.displayName}
        modalClass={selectedWork ? getModalClassForWork(selectedWork) : undefined}
      >
        {selectedWork && <WorkDetailContent {...getWorkContentProps(selectedWork)} />}
      </Modal>
    </div>
  );
};

export default DesignerShowcase;
