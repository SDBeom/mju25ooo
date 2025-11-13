import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './KimYunjungDetail.css';

import workThumbHero from '../../assets/kimyunjung/김윤정_Video_작품1_01.png';
import workThumb02 from '../../assets/kimyunjung/김윤정_Video_작품1_02.png';
import workThumb03 from '../../assets/kimyunjung/김윤정_Video_작품1_03.png';
import workThumb04 from '../../assets/kimyunjung/김윤정_Video_작품1_04.png';
import workThumb05 from '../../assets/kimyunjung/김윤정_Video_작품1_05.png';
import workThumb06 from '../../assets/kimyunjung/김윤정_Video_작품1_06.png';
import work2Thumb01 from '../../assets/kimyunjung/김윤정_Video_작품2_01.png';

const WORKS = [
  {
    id: 'kimyunjung-work-1',
    title: 'Love at Rust Sight',
    summary:
      "함께했던 가족과 헤어지고 거리를 청소하는 미니봇. 미니봇은 자신을 가족으로 받아줄 '친구'를 찾아다닌다.",
    designerName: '김윤정',
    heroImage: workThumbHero,
    heroDescription:
      "함께했던 가족과 헤어지고 거리를 청소하는 미니봇. 미니봇은 자신을 가족으로 받아줄 '친구'를 찾아다닌다.",
    heroButtons: ['디자이너의 다른 작품', '개인 SNS'],
    storyBlocks: [
      {
        type: 'feature',
        image: workThumb02,
        quote:
          '«Love at Rust Sight»는 로봇과 천사가 등장하는 이야기로, 가족에게 버림받은 청소로봇이 우연히 천사를 만난 후 자신을 가족으로 맞이해주길 바라며 죽으려한다는 내용의 2D 애니메이션이다.',
        body:
          "함께했던 가족과 헤어지고 거리를 청소하는 미니봇. 미니봇은 자신을 가족으로 받아줄 '천사'를 찾아다닌다.",
      },
      {
        type: 'text',
        quote:
          '영상이 시작되는 초반부는 한적한 분위기와 주변을 감도는 수묵 느낌으로 감정을 형성시키며 정적인 감정을 표현하고 있다.',
      },
      { type: 'image', content: workThumb03 },
      { type: 'image', content: workThumb04 },
      { type: 'image', content: workThumb05 },
      { type: 'image', content: workThumb06 },
    ],
    thumb: workThumbHero,
  },
  {
    id: 'kimyunjung-work-2',
    title: '작품 2 · Love at Rust Sight: Extension',
    summary:
      '서브 캐릭터 시점으로 확장한 후속편. 파편화된 모듈과 타이포가 감정의 단편을 시각화합니다.',
    designerName: '김윤정',
    description:
      '확장판은 메인 필름의 세계관을 유지하면서도 단편적인 감정 조각을 드러냅니다. 도형을 조합한 그래픽과 절제된 사운드를 사용해 여운 있는 리듬을 만들고, Figma 프레임에서는 카드형 레이아웃으로 주요 스틸을 강조하고 있습니다.',
    details: [
      'Mood — Fragmented Memory',
      'Format — 1440 × 900, 30fps',
      'Tools — After Effects · Audition',
    ],
    thumb: work2Thumb01,
  },
];

const KimYunjungDetail = ({ onBack }) => {
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
    <div className="kim-detail">
      <div className="kim-detail__inner">
        <button type="button" className="kim-detail__back" onClick={onBack}>
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

        <header className="kim-simple-header">
          <h1 className="kim-simple-title">김윤정</h1>
        </header>

        <section className="kim-simple-gallery" aria-label="김윤정 대표 작품">
          {WORKS.map((work) => (
            <article key={work.id} className="kim-work-card">
              <button
                type="button"
                className="kim-work-card__thumb"
                onClick={() => openWorkModal(work)}
                aria-label={`${work.title} 상세 보기`}
              >
                <img src={work.thumb} alt={work.title} loading="lazy" />
              </button>
              <div className="kim-work-card__body">
                <h2 className="kim-work-card__title">{work.title}</h2>
                <p className="kim-work-card__summary">{work.summary}</p>
                <button
                  type="button"
                  className="kim-work-card__cta"
                  onClick={() => openWorkModal(work)}
                >
                  상세 보기
                </button>
              </div>
              </article>
            ))}
        </section>
      </div>

      {selectedWork &&
        createPortal(
          <div className="kim-modal-overlay" role="dialog" aria-modal="true" onClick={closeWorkModal}>
            <div className="kim-modal-wrapper" onClick={(event) => event.stopPropagation()}>
              <div className="kim-modal__topbar">
                <span className="kim-modal__topbar-name">{selectedWork.designerName ?? '김윤정'}</span>
                <button type="button" className="kim-modal__close" onClick={closeWorkModal} aria-label="닫기">
                  <span />
                  <span />
                </button>
              </div>
              {selectedWork.id === 'kimyunjung-work-1' ? (
                <div className="kim-modal kim-work1-modal">
                  <section className="kim-work1-hero">
                    <div className="kim-work1-hero__copy">
                      <h2 className="kim-work1-hero__title">{selectedWork.title}</h2>
                      <p className="kim-work1-hero__description">{selectedWork.heroDescription}</p>
                      {selectedWork.heroButtons?.length > 0 && (
                        <div className="kim-work1-hero__actions">
                          {selectedWork.heroButtons.map((label) => (
                            <button key={label} type="button">
                              {label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <figure className="kim-work1-hero__media">
                      <img src={selectedWork.heroImage ?? selectedWork.thumb} alt={`${selectedWork.title} 대표 이미지`} />
                    </figure>
                  </section>

                {selectedWork.storyBlocks?.map((block, index) => {
                    if (block.type === 'feature') {
                      return (
                        <section key={`feature-${index}`} className="kim-work1-feature">
                          <figure className="kim-work1-feature__image">
                            <img src={block.image} alt={`${selectedWork.title} Feature 1`} />
                          </figure>
                          <div className="kim-work1-feature__text">
                            {block.quote && <p className="kim-work1-quote">{block.quote}</p>}
                            {block.body && <p className="kim-work1-paragraph">{block.body}</p>}
                          </div>
                        </section>
                      );
                    }
                    if (block.type === 'text') {
                      return (
                        <section key={`text-${index}`} className="kim-work1-story-text">
                          {block.quote && <p className="kim-work1-quote">{block.quote}</p>}
                          {block.body && <p className="kim-work1-paragraph">{block.body}</p>}
                        </section>
                      );
                    }
                    if (block.type === 'image') {
                      return (
                        <figure key={`image-${index}`} className="kim-work1-story-image">
                          <img src={block.content} alt={`${selectedWork.title} 스틸 ${index + 1}`} />
                        </figure>
                      );
                    }
                    return null;
                  })}
                </div>
              ) : (
                <div className="kim-modal">
                  <div className="kim-modal__media">
                    <img src={selectedWork.thumb} alt={selectedWork.title} />
                  </div>
                  <div className="kim-modal__content">
                    <h2>{selectedWork.title}</h2>
                    <p>{selectedWork.description}</p>
                    {selectedWork.details?.length > 0 && (
                      <ul className="kim-modal__meta">
                        {selectedWork.details.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default KimYunjungDetail;

