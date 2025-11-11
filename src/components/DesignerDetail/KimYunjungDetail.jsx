import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './KimYunjungDetail.css';

import heroMain from '../../assets/kimyunjung/hero-main.png';
import feature02 from '../../assets/kimyunjung/feature-02.png';
import feature03 from '../../assets/kimyunjung/feature-03.png';
import feature04 from '../../assets/kimyunjung/feature-04.png';
import feature05 from '../../assets/kimyunjung/feature-05.png';
import feature06 from '../../assets/kimyunjung/feature-06.png';

const infoStats = [
  { label: 'Role', value: 'Animation Director · Illustrator' },
  { label: 'Duration', value: '06′ 40″' },
  { label: 'Tools', value: 'TVPaint, After Effects, Photoshop' },
];

const conceptTags = ['2D Animation', 'Narrative', 'Sci-Fi', 'Character Study'];

const overviewParagraphs = [
  'Love at Rust Sight는 버려진 청소 로봇이 다시 “가족”을 찾고 싶어 하는 마음을 섬세한 감정선으로 그려낸 2D 애니메이션입니다. 로봇과 천사가 등장하는 세계관 속에서 “사랑”과 “주체성”이라는 주제를 희망적으로 풀어냅니다.',
  "차갑고 메마른 도시 배경에서 시작해 점차 난색으로 물드는 색채감은 주인공 미니봇의 감정 변화를 시각적으로 표현합니다. 청소라는 반복된 일상과 천사를 만나는 결정적 순간이 대비되며, 관객이 미니봇에게 쉽게 감정이입할 수 있도록 유도합니다.",
];

const highlightBullets = [
  '한색 → 난색으로 전환되는 컬러 팔레트로 시간의 흐름과 감정 곡선을 시각화',
  "‘가족’의 의미를 재해석하며, 인간과 비인간 사이의 관계성을 따뜻하게 묘사",
  'TVPaint 기반의 핸드 드로잉 스타일과 그래픽적 배경을 결합하여 독창적 톤 구축',
];

const galleryItems = [
  {
    src: feature02,
    title: 'City Top View',
    description: '버려진 도시를 내려다보는 숏. 거대한 스케일 대비를 통해 미니봇의 고독함을 강조합니다.',
  },
  {
    src: feature03,
    title: 'Street Encounter',
    description: '모노톤의 도시 안에서 미니봇이 새로운 희망을 발견하는 순간을 포착했습니다.',
  },
  {
    src: feature04,
    title: 'Emotional Close-up',
    description: '감정선이 극대화되는 중반부 클로즈업 씬. 감정 표현을 위해 라인과 색의 밀도를 조절했습니다.',
  },
  {
    src: feature05,
    title: 'Cloud Dream',
    description: '천사와 함께 날아오르는 장면으로, 노이즈와 그라디언트 텍스처로 꿈결 같은 무드를 만들었습니다.',
  },
  {
    src: feature06,
    title: 'Studio Interior',
    description: '최종 장면의 실내 배경. 긴 그림자와 빛의 결을 활용해 따뜻한 마무리를 전달합니다.',
  },
];

const timelineProjects = [
  {
    id: 1,
    title: 'Love at Rust Sight',
    description: '졸업 전시 메인 애니메이션. 사랑과 정체성을 다루는 2D 시네마틱 작품.',
  },
  {
    id: 2,
    title: 'Rust City Visual Bible',
    description: '애니메이션의 미술 세계관을 담은 비주얼 바이블 북 제작 프로젝트.',
  },
  {
    id: 3,
    title: 'Angel Motion Test',
    description: '천사 캐릭터의 움직임을 탐구한 모션 테스트 클립 시리즈.',
  },
];

const modalOverviewParagraphs = [
  "함께했던 가족과 헤어지고 거리를 청소하는 미니봇. 미니봇은 자신을 가족으로 받아줄 '천사'를 찾아다닌다.",
  '영상이 시작되는 초반부는 한색, 후반부로 진행될수록 난색으로 분위기를 전환시켜 희망적인 엔딩을 예고합니다.',
];

const KimYunjungProjectModalContent = () => (
  <div className="project-modal__scroller">
    <section className="project-modal__hero">
      <div className="project-modal__hero-text">
        <span className="project-modal__label">Love at Rust Sight</span>
        <h1>졸업작품 상세</h1>
        <p>
          함께했던 가족에게 버림받은 미니봇이 다시 사랑을 찾아 나서는 여정을 그린 2D 애니메이션. 감정을 담은 색채와
          직관적인 레이아웃으로 관객의 몰입을 유도합니다.
        </p>
        <div className="project-modal__hero-meta">
          <div>
            <span>Duration</span>
            <strong>06′ 40″</strong>
          </div>
          <div>
            <span>Technique</span>
            <strong>TVPaint · After Effects</strong>
          </div>
        </div>
      </div>
      <figure className="project-modal__hero-media">
        <img src={heroMain} alt="Love at Rust Sight 대표 장면" />
      </figure>
    </section>

    <div className="project-modal__divider">영상</div>

    <section className="project-modal__section">
      <figure className="project-modal__visual">
        <img src={feature02} alt="도시 배경 씬" />
      </figure>
      <div className="project-modal__copy">
        {modalOverviewParagraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>

    <section className="project-modal__section project-modal__section--side">
      <figure className="project-modal__visual">
        <img src={feature03} alt="거리 장면" />
      </figure>
      <p className="project-modal__note">
        “사람 사이의 온도차”를 대비시키기 위해 모노톤 배경 위에 포인트 컬러를 배치하였습니다. 천사를 만난 이후에는
        따뜻한 색감으로 전환되어 감정선의 변화를 전달합니다.
      </p>
    </section>

    <section className="project-modal__section project-modal__section--grid">
      <figure>
        <img src={feature04} alt="클로즈업 장면" />
      </figure>
      <figure>
        <img src={feature05} alt="구름 장면" />
      </figure>
      <figure className="project-modal__full">
        <img src={feature06} alt="실내 장면" />
      </figure>
    </section>
  </div>
);

const KimYunjungDetail = ({ designer = null, onBack }) => {
  const [modalRoot, setModalRoot] = useState(null);
  const [isProjectModalOpen, setProjectModalOpen] = useState(false);
  const closeButtonRef = useRef(null);
  const modalRef = useRef(null);
  const lastFocusedRef = useRef(null);

  useEffect(() => {
    const root = document.getElementById('modal-root') || document.body;
    setModalRoot(root);
  }, []);

  useEffect(() => {
    if (isProjectModalOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
          setProjectModalOpen(false);
        } else if (event.key === 'Tab' && modalRef.current) {
          const focusableSelectors =
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
          const focusable = Array.from(modalRef.current.querySelectorAll(focusableSelectors));
          if (!focusable.length) {
            event.preventDefault();
            return;
          }
          const firstElement = focusable[0];
          const lastElement = focusable[focusable.length - 1];
          const isShift = event.shiftKey;
          const active = document.activeElement;

          if (!isShift && active === lastElement) {
            event.preventDefault();
            firstElement.focus();
          } else if (isShift && active === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      requestAnimationFrame(() => closeButtonRef.current?.focus());

      return () => {
        document.body.style.overflow = originalOverflow;
        document.removeEventListener('keydown', handleKeyDown);
        lastFocusedRef.current?.focus();
      };
    }
    return undefined;
  }, [isProjectModalOpen]);

  const handleViewOtherWorks = () => {
    window.history.pushState({}, '', '/designer');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleOpenInstagram = () => {
    if (designer?.instagram) {
      window.open(designer.instagram, '_blank', 'noopener,noreferrer');
    }
  };

  const openProjectModal = (event) => {
    event.preventDefault();
    lastFocusedRef.current = event.currentTarget;
    setProjectModalOpen(true);
  };

  const closeProjectModal = () => {
    setProjectModalOpen(false);
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

        <section className="kim-hero" aria-labelledby="kim-hero-heading">
          <div className="kim-hero__content">
            <span className="kim-hero__badge">2025 MJU MCD Graduation Showcase</span>
            <h1 id="kim-hero-heading" className="kim-hero__title">
              Love at Rust Sight
            </h1>
            <p className="kim-hero__lead">
              버려진 청소 로봇이 스스로의 운명을 다시 써 내려가는 여정. 차갑던 도시가 난색으로 물들어 가는 순간을
              섬세한 2D 애니메이션으로 담아낸 졸업작품입니다.
            </p>

            <div className="kim-hero__tags">
              {conceptTags.map((tag) => (
                <span key={tag} className="kim-tag">
                  {tag}
                </span>
              ))}
            </div>

            <dl className="kim-hero__stats">
              {infoStats.map(({ label, value }) => (
                <div key={label} className="kim-stat">
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>

            <div className="kim-hero__actions">
              <button type="button" className="kim-button kim-button--primary" onClick={openProjectModal}>
                작품 상세 보기
              </button>
              <button type="button" className="kim-button kim-button--secondary" onClick={handleViewOtherWorks}>
                디자이너의 다른 작품
              </button>
            </div>
          </div>

          <figure className="kim-hero__visual">
            <img src={heroMain} alt="Love at Rust Sight 메인 비주얼" />
          </figure>
        </section>

        <section className="kim-section" aria-labelledby="kim-overview">
          <div className="kim-section__header">
            <h2 id="kim-overview">Overview</h2>
            <p className="kim-section__subtitle">스토리 컨셉과 감정선을 따라가는 작품 소개</p>
          </div>
          <div className="kim-section__body">
            {overviewParagraphs.map((paragraph, index) => (
              <p key={index} className="kim-paragraph">
                {paragraph}
              </p>
            ))}
            <div className="kim-highlights">
              <h3>Highlights</h3>
              <ul className="kim-highlight-list">
                {highlightBullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="kim-section kim-section--projects" aria-labelledby="kim-projects">
          <div className="kim-section__header">
            <h2 id="kim-projects">Project Timeline</h2>
            <p className="kim-section__subtitle">프로세스별 산출물과 연계 프로젝트</p>
          </div>
          <div className="kim-project-grid">
            {timelineProjects.map((project) => (
              <article key={project.id} className="kim-project-card">
                <div className="kim-project-card__content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                <button type="button" className="kim-project-card__cta" onClick={openProjectModal}>
                  상세 보기
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="kim-section" aria-labelledby="kim-gallery">
          <div className="kim-section__header">
            <h2 id="kim-gallery">Visual Gallery</h2>
            <p className="kim-section__subtitle">프로덕션 과정에서 추출한 주요 장면</p>
          </div>
          <div className="kim-gallery">
            {galleryItems.map(({ src, title, description }) => (
              <figure key={title} className="kim-gallery__item">
                <button type="button" className="kim-gallery__thumb" onClick={openProjectModal}>
                  <img src={src} alt={title} />
                </button>
                <figcaption className="kim-gallery__meta">
                  <h3>{title}</h3>
                  <p>{description}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </div>

      {isProjectModalOpen && modalRoot &&
        createPortal(
          <div className="project-modal-overlay" role="dialog" aria-modal="true" onClick={closeProjectModal}>
            <div className="project-modal" role="document" onClick={(event) => event.stopPropagation()} ref={modalRef}>
              <button
                type="button"
                className="project-modal__close"
                aria-label="닫기"
                onClick={closeProjectModal}
                ref={closeButtonRef}
              >
                <span></span>
                <span></span>
              </button>
              <KimYunjungProjectModalContent />
            </div>
          </div>,
          modalRoot,
        )}
    </div>
  );
};

export default KimYunjungDetail;

