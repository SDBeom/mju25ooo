import React, { useEffect, useState } from 'react';
import './KimJaeEunDetail.css';

import workThumb01 from '../../assets/김재은/김재은_Video_작품1_01.webp';
import workThumb02 from '../../assets/김재은/김재은_Video_작품2_01.webp';

const WORKS = [
  {
    id: 'kimjaeeun-work-1',
    title: '작품 1 · Motion Graphic Teaser',
    summary:
      '브랜드 컬러를 활용해 리듬감 있게 전개되는 30초 티저 영상. 도형과 타이포가 음악에 맞춰 전환되며 분위기를 끌어올립니다.',
    description:
      '그래픽 모듈을 분해·재조합해 브랜드 아이덴티티를 감각적으로 보여 주는 티저입니다. 짧은 러닝타임 안에 서사를 압축하고, 모션 그래픽과 사운드를 정밀하게 싱크시켜 완성도 높은 인상을 남깁니다.',
    details: [
      'Mood — Electric Pop / Dynamic Branding',
      'Format — 1920 × 1080, 30fps',
      'Tools — After Effects · Illustrator',
    ],
    thumb: workThumb01,
  },
  {
    id: 'kimjaeeun-work-2',
    title: '작품 2 · Extended Campaign Film',
    summary:
      '티저의 세계관을 확장한 메인 필름. 공간 연출과 리얼 푸티지를 더해 브랜드 감성을 서사적으로 풀어냈습니다.',
    description:
      '서브 필름은 실제 로케이션과 그래픽을 결합해 브랜드 스토리를 단계적으로 전개합니다. 씬마다 다른 컬러 팔레트를 적용해 챕터 구성을 분명하게 만들고, 텍스처와 타이포를 적극 활용해 몰입도를 높였습니다.',
    details: [
      'Mood — Cinematic Storytelling',
      'Format — 2560 × 1440, 24fps',
      'Tools — Premiere Pro · After Effects · DaVinci Resolve',
    ],
    thumb: workThumb02,
  },
];

const KimJaeEunDetail = ({ onBack }) => {
  const [selectedWork, setSelectedWork] = useState(null);

  const openWorkModal = (work) => {
    setSelectedWork(work);
  };

  const closeWorkModal = () => {
    setSelectedWork(null);
  };

  useEffect(() => {
    if (!selectedWork) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeWorkModal();
      }
    };

    const html = document.documentElement;
    const root = document.getElementById('root');
    const scrollY = window.scrollY;

    document.body.dataset.modalScrollY = String(scrollY);
    document.body.style.top = `-${scrollY}px`;

    document.body.classList.add('is-modal-open');
    html.classList.add('is-modal-open');
    root?.classList.add('is-modal-open');

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);

      document.body.classList.remove('is-modal-open');
      html.classList.remove('is-modal-open');
      root?.classList.remove('is-modal-open');

      document.body.style.top = '';

      const previousScrollY = Number(document.body.dataset.modalScrollY || '0');
      window.scrollTo(0, previousScrollY);
      delete document.body.dataset.modalScrollY;
    };
  }, [selectedWork]);

  return (
    <div className="kimjaeeun-detail">
      <div className="kimjaeeun-detail__inner">
        <button type="button" className="kimjaeeun-detail__back" onClick={onBack}>
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

        <header className="kimjaeeun-header">
          <h1 className="kimjaeeun-title">김재은 · Motion Works</h1>
          <p className="kimjaeeun-subtitle">
            브랜드의 감성을 시각적으로 풀어낸 대표 영상 두 편입니다. 각 썸네일을 통해 스타일과 스토리를 간단히 살펴볼 수
            있습니다.
          </p>
        </header>

        <section className="kimjaeeun-gallery" aria-label="김재은 대표 작품">
          {WORKS.map((work) => (
            <article key={work.id} className="kimjaeeun-card">
              <button
                type="button"
                className="kimjaeeun-card__thumb"
                onClick={() => openWorkModal(work)}
                aria-label={`${work.title} 상세 보기`}
              >
                <img src={work.thumb} alt={work.title} loading="lazy" />
              </button>
              <div className="kimjaeeun-card__body">
                <h2 className="kimjaeeun-card__title">{work.title}</h2>
                <p className="kimjaeeun-card__summary">{work.summary}</p>
                <button
                  type="button"
                  className="kimjaeeun-card__cta"
                  onClick={() => openWorkModal(work)}
                >
                  상세 보기
                </button>
              </div>
            </article>
          ))}
        </section>
      </div>

      {selectedWork && (
        <div className="kimjaeeun-modal-overlay" role="dialog" aria-modal="true" onClick={closeWorkModal}>
          <div
            className="kimjaeeun-modal"
            role="document"
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="kimjaeeun-modal__close" onClick={closeWorkModal} aria-label="닫기">
              <span />
              <span />
            </button>
            <div className="kimjaeeun-modal__media">
              <img src={selectedWork.thumb} alt={selectedWork.title} />
            </div>
            <div className="kimjaeeun-modal__content">
              <h2>{selectedWork.title}</h2>
              <p>{selectedWork.description}</p>
              {selectedWork.details?.length > 0 && (
                <ul className="kimjaeeun-modal__meta">
                  {selectedWork.details.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KimJaeEunDetail;





