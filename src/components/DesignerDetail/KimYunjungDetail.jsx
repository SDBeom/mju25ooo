import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './KimYunjungDetail.css';

import workThumbHero from '../../assets/김윤정/김윤정_Video_작품1_01.webp';
import workThumb02 from '../../assets/김윤정/김윤정_Video_작품1_02.webp';
import workThumb03 from '../../assets/김윤정/김윤정_Video_작품1_03.webp';
import workThumb04 from '../../assets/김윤정/김윤정_Video_작품1_04.webp';
import workThumb05 from '../../assets/김윤정/김윤정_Video_작품1_05.webp';
import workThumb06 from '../../assets/김윤정/김윤정_Video_작품1_06.webp';
import work2Thumb01 from '../../assets/김윤정/김윤정_Video_작품2_01.webp';
import work2Scene02 from '../../assets/김윤정/김윤정_Video_작품2_02.webp';
import work2Scene06 from '../../assets/김윤정/김윤정_Video_작품2_06.webp';
import work2Scene07 from '../../assets/김윤정/김윤정_Video_작품2_07.webp';
import work2Scene08 from '../../assets/김윤정/김윤정_Video_작품2_08.webp';
import work2Scene09 from '../../assets/김윤정/김윤정_Video_작품2_09.webp';
import work2Scene10 from '../../assets/김윤정/김윤정_Video_작품2_10.webp';
import videoBadge from '../../assets/branding_logo/Video.webp';
import ModalHeroSection from '../ModalHeroSection/ModalHeroSection.jsx';

const WORKS = [
  {
    id: 'kimyunjung-work-1',
    title: 'Love at Rust Sight',
    summary:
      "함께했던 가족과 헤어지고 거리를 청소하는 미니봇. 미니봇은 자신을 가족으로 받아줄 '친구'를 찾아다닌다.",
    designerName: '김윤정',
    thumb: workThumbHero,
    instagram: 'https://www.instagram.com/zlz_300/',
  },
  {
    id: 'kimyunjung-work-2',
    title: '안녕 우주',
    summary: '주인공은 함께 우주비행사가 되기로했던 소꿉친구의 사고사 소식을 듣고 악몽을 꾸기 시작한다.',
    designerName: '김윤정',
    thumb: work2Thumb01,
  },
];

const LoveAtRustSightModalContent = ({ onExploreOtherWorks, onOpenSNS }) => (
  <div className="work-detail">
    <ModalHeroSection
      eyebrowImageSrc={videoBadge}
      eyebrowImageAlt="Video Content 로고"
      eyebrowText="Video Content"
      title="Love at Rust Sight"
      lead="함께했던 가족과 헤어진 후 거리를 청소하는 미니봇. 미니봇은 자신을 가족으로 받아줄 ‘천사’를 찾아다닌다."
      mediaSrc={workThumbHero}
      mediaAlt="Love at Rust Sight 대표 장면"
      ctas={[
        { label: '디자이너의 다른 작품', variant: 'primary', onClick: onExploreOtherWorks },
        { label: '개인 SNS', variant: 'secondary', onClick: onOpenSNS },
      ]}
    />
    <section className="work-detail__section work-detail__feature work-detail__feature--1">
      <div className="work-detail__image-block">
        <img src={workThumb02} alt="Love at Rust Sight 장면 1" loading="lazy" />
      </div>
      <div className="work-detail__feature-text">
        <p>
          «Love at Rust Sight»는 로봇과 천사가 등장하는 이야기로, 가족에게 버림받은 청소로봇이 우연히 천사를 만난 후 자신을 가족으로
          맞이해주길 바라며 죽으려 한다는 내용의 2D 애니메이션이다.
        </p>
        <p>
          함께했던 가족과 헤어지고 거리를 청소하는 미니봇. 미니봇은 자신을 가족으로 받아줄 ‘천사’를 찾아다닌다.
        </p>
      </div>
    </section>
    <section className="work-detail__section work-detail__feature work-detail__feature--2 work-detail__feature--media-only">
      <div className="work-detail__image-block">
        <img src={workThumb03} alt="Love at Rust Sight 장면 2" loading="lazy" />
      </div>
      <p className="work-detail__feature-caption">
        영상이 시작되는 초반부는 한색, 후반부로 진행될수록 난색으로 분위기를 전환시켜 희망적이고 따뜻한 전개를 표현하고자 했습니다.
      </p>
    </section>
    {[workThumb04, workThumb05, workThumb06].map((image, index) => (
      <section
        key={image}
        className={`work-detail__section work-detail__feature work-detail__feature--${index + 3} work-detail__feature--media-only`}
      >
        <div className="work-detail__image-block">
          <img src={image} alt={`Love at Rust Sight 장면 ${index + 3}`} loading="lazy" />
        </div>
      </section>
    ))}
  </div>
);

const LoveAtRustSightExtensionModalContent = ({ work, onExploreOtherWorks, onOpenSNS }) => {
  const overviewCopy = [
    '《안녕 우주》는 주인공이 우주비행사가 되기로 꿈꿔왔던 소꿉친구의 사고사 소식을 듣게 된 이후 우주에 홀로 남겨진 악몽을 꾸기 시작하면서,',
    '그녀와의 지난 추억을 회상한다는 내용의 그림책이다.',
  ];

  const insightCards = [
    {
      id: 'card-1',
      image: work2Scene06,
      alt: '안녕 우주 스틸컷 - 기억의 페이지',
      paragraphs: [
        '혼자 마음의 짐을 끌어안은 사람들에게 그 짐을 떨쳐내지 못하더라도 어렵지 않게 안고 살아갈 수 있다는 메시지를 전하고 싶었다.',
      ],
    },
    {
      id: 'card-2',
      image: work2Scene07,
      alt: '안녕 우주 스틸컷 - 친구와의 추억',
      paragraphs: [
        '친구는 즐거움을 주는 존재이기도 하지만 이따금 마음에 상처를 주기도 하는 존재다.',
        "가족보다 가까운 것 같으면서도 한없이 멀어질 때도 있는 '감정'들을 직접 창작한 이야기와 일러스트로 연출하고 싶었다.",
        '친구와의 추억을 회상하는 중간마다 우주를 소재로 등장인물 간의 감정들을 연출하고자 했다.',
      ],
    },
    {
      id: 'card-3',
      image: work2Scene08,
      alt: '안녕 우주 스틸컷 - 스토리보드 장면',
      paragraphs: [
        '단순 일러스트레이션이 아닌 스토리보드를 그린다고 생각하며 제작했다.',
        '이야기 구성과 연출, 드로잉 스타일을 발전시키고 싶었고, 일러스트 제작에 쓰이는 텍스처의 중요성과 활용성에 대한 식견을 넓힐 수 있는 작업이었다.',
      ],
    },
  ];

  const galleryImages = [
    { id: 'gallery-1', src: work2Scene09, alt: '안녕 우주 장면 4' },
    { id: 'gallery-2', src: work2Scene10, alt: '안녕 우주 장면 5' },
    { id: 'gallery-3', src: work2Scene08, alt: '안녕 우주 장면 6' },
  ];

  return (
    <div className="kim-love-modal kim-work2-modal">
      <ModalHeroSection
        eyebrowImageSrc={videoBadge}
        eyebrowImageAlt="Video Content 로고"
        eyebrowText="Video Content"
        title="안녕 우주"
        lead={work.summary}
        mediaSrc={work2Thumb01}
        mediaAlt={`${work.title} 대표 장면`}
        ctas={[
          { label: '디자이너의 다른 작품', variant: 'primary', onClick: onExploreOtherWorks },
          { label: '개인 SNS', variant: 'secondary', onClick: onOpenSNS },
        ]}
      />

      <section className="work-detail__section work-detail__feature">
        <div className="work-detail__image-block">
          <img src={work2Scene02} alt="안녕 우주 장면 1" loading="lazy" />
        </div>
        <div className="work-detail__feature-text">
          {overviewCopy.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="work-detail__section work-detail__cards">
        <ul className="work-detail__cards-grid">
          {insightCards.map((card, index) => (
            <li
              key={card.id}
              className={`work-detail__card work-detail__card--${index + 1}`}
            >
              <div className="work-detail__card-image">
                <img src={card.image} alt={card.alt} loading="lazy" />
              </div>
              <div className="work-detail__card-text">
                {card.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {galleryImages.map((item, index) => (
        <section
          key={item.id}
          className={`work-detail__section work-detail__feature work-detail__feature--media-only work-detail__feature--gallery-${index + 1}`}
        >
          <div className="work-detail__image-block">
            <img src={item.src} alt={item.alt} loading="lazy" />
          </div>
        </section>
        ))}
    </div>
  );
};

const KimYunjungDetail = ({ onBack, designer }) => {
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
    document.addEventListener('visibilitychange', closeWorkModal);
    const handleMouseMove = (event) => {
      const modal = document.querySelector('.kim-love-modal');
      if (!modal) return;
      const rect = modal.getBoundingClientRect();
      const isInside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      if (isInside) {
        document.body.classList.remove('kim-modal-cursor-cross');
      } else {
        document.body.classList.add('kim-modal-cursor-cross');
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

      return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', closeWorkModal);
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.classList.remove('kim-modal-cursor-cross');

      document.body.classList.remove('is-modal-open');
      html.classList.remove('is-modal-open');
      root?.classList.remove('is-modal-open');

      document.body.style.top = '';

      const previousScrollY = Number(document.body.dataset.modalScrollY || '0');
      window.scrollTo(0, previousScrollY);
      delete document.body.dataset.modalScrollY;
    };
  }, [selectedWork]);

  const handleWrapperClick = (event) => {
    if (!selectedWork) {
      return;
    }

    const modalSelector =
      selectedWork.id === 'kimyunjung-work-1' || selectedWork.id === 'kimyunjung-work-2'
        ? '.kim-love-modal'
        : '.kim-modal';
    const modalElement = event.target.closest(modalSelector);

    if (modalElement) {
      event.stopPropagation();
      return;
    }

    closeWorkModal();
  };

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
            <div className="kim-modal-wrapper" onClick={handleWrapperClick}>
              <div className="kim-modal__topbar">
                <span className="kim-modal__topbar-name">{selectedWork.designerName ?? '김윤정'}</span>
              </div>
              {selectedWork.id === 'kimyunjung-work-1' ? (
                <div className="kim-love-modal">
                  <LoveAtRustSightModalContent
                    onExploreOtherWorks={() => {
                      closeWorkModal();
                      setTimeout(() => {
                        document
                          .querySelector('.kim-simple-gallery')
                          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 200);
                    }}
                    onOpenSNS={() => {
                      const url = selectedWork.instagram || designer?.instagram;
                      if (!url) {
                        return;
                      }
                      const cleaned = url.startsWith('http')
                        ? url
                        : `https://www.instagram.com/${url.replace(/^@/, '')}/`;
                      window.open(cleaned, '_blank', 'noopener,noreferrer');
                    }}
                  />
                        </div>
              ) : selectedWork.id === 'kimyunjung-work-2' ? (
                <LoveAtRustSightExtensionModalContent
                  work={selectedWork}
                  onExploreOtherWorks={() => {
                    closeWorkModal();
                    setTimeout(() => {
                      document
                        .querySelector('.kim-simple-gallery')
                        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 200);
                  }}
                  onOpenSNS={() => {
                    const url = selectedWork.instagram || designer?.instagram;
                    if (!url) {
                      return;
                    }
                    const cleaned = url.startsWith('http')
                      ? url
                      : `https://www.instagram.com/${url.replace(/^@/, '')}/`;
                    window.open(cleaned, '_blank', 'noopener,noreferrer');
                  }}
                />
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

