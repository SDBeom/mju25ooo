import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/KimChaeYoungDoYouBelieveInDestiny/KimChaeYoungDoYouBelieveInDestinyDesktop.css';

// 이미지 임포트
import kimChaeYoungWork1_01 from '../../../../assets/김채영/kimchaeyoung_multimedia_work1_01.webp';
import kimChaeYoungWork1_02 from '../../../../assets/김채영/kimchaeyoung_multimedia_work1_02.webp';
import kimChaeYoungWork1_03 from '../../../../assets/김채영/kimchaeyoung_multimedia_work1_03.webp';
import kimChaeYoungWork1_04 from '../../../../assets/김채영/kimchaeyoung_multimedia_work1_04.webp';
import kimChaeYoungWork1_05 from '../../../../assets/김채영/kimchaeyoung_multimedia_work1_05.webp';
import kimChaeYoungWork1_06 from '../../../../assets/김채영/kimchaeyoung_multimedia_work1_06.webp';
import kimChaeYoungWork1_07 from '../../../../assets/김채영/kimchaeyoung_multimedia_work1_07.webp';
import kimChaeYoungWork1_08 from '../../../../assets/김채영/kimchaeyoung_multimedia_work1_08.webp';
import kimChaeYoungWork1_09 from '../../../../assets/김채영/kimchaeyoung_multimedia_work1_09.webp';
import kimChaeYoungWork1_10 from '../../../../assets/김채영/kimchaeyoung_multimedia_work1_10.webp';
import kimChaeYoungWork1_11 from '../../../../assets/김채영/kimchaeyoung_multimedia_work1_11.webp';
import kimChaeYoungWork1_12 from '../../../../assets/김채영/kimchaeyoung_multimedia_work1_12.webp';

/**
 * 김채영 - 운명을 믿으세요 Desktop 버전
 * Figma 디자인 기반 구현 (1280px)
 */
const KimChaeYoungDoYouBelieveInDestinyDesktop = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--kim-chae-young-do-you-believe-in-destiny-desktop">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--kim-chae-young-do-you-believe-in-destiny-desktop">
        <div className="work-detail__hero-content work-detail__hero-content--kim-chae-young-do-you-believe-in-destiny-desktop">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--kim-chae-young-do-you-believe-in-destiny-desktop">운명을 믿으세요</h2>
            <div className="work-detail__lead work-detail__lead--kim-chae-young-do-you-believe-in-destiny-desktop">
              <p>운명과 선택 그리고 인생에 대한 보드게임</p>
            </div>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--kim-chae-young-do-you-believe-in-destiny-desktop">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--kim-chae-young-do-you-believe-in-destiny-desktop`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--kim-chae-young-do-you-believe-in-destiny-desktop">
          <img
            src={kimChaeYoungWork1_01}
            alt={work.title || '운명을 믿으세요'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, kimChaeYoungWork1_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
      </section>

      {/* Feature Section - Project Overview */}
      <section className="work-detail__section work-detail__feature work-detail__feature--kim-chae-young-do-you-believe-in-destiny-desktop">
        <div className="work-detail__feature-image-wrapper">
          <img
            src={kimChaeYoungWork1_02}
            alt="프로젝트 개요"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, kimChaeYoungWork1_02, work.id, 'feature-overview')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <h4 className="work-detail__feature-title">프로젝트 개요</h4>
          <div className="work-detail__feature-description">
            <p>이 프로젝트는 '선택'이 정말 나의 것일까, 아니면 이미 정해진 운명의 일부일까 라는 질문에서 출발했다. 사람들은 로의 의지를 믿지만, 사실 우리의 결정은 사회적 규범, 타인의 시선, 그리고 우연한 사건들 속에서 끊임없이 흔들린다. 또 어떤 운명은 어떤 선택에 의해 변하기도 한다. 《운명을 믿으세요》는 인간이 인생에서 반복적으로 마주하는 가치관의 딜레마를 플레이 구조로 전환한 보드게임이다. 이 작업은 단순히 게임의 재미를 설계하는 과정이 아니라, '선택'이라는 행위를 다시 생각해보는 과정이었다. 우리는 선택을 통해 자신을 증명하려 하지만, 동시에 그 선택이 우리를 제한하기도 한다. 이 모순된 구조를 유쾌하고 키치한 세계관으로 비틀어 표현함으로써, 철학적 질문을 무겁지 않게 다루고자 했다. 결국 관객들은 게임을 통해 결국 운명이 존재할지언정, 선택은 그것을 바꿀 수 있으며 어떤 선택이든 결국 의미없는 선택이 없다는 것을 느낄 수 있다.</p>
          </div>
        </div>
      </section>

      {/* Feature Cards Section 1 */}
      <ul className="work-detail__section work-detail__feature-cards work-detail__feature-cards--kim-chae-young-do-you-believe-in-destiny-desktop">
        <li className="work-detail__feature-card">
          <div className="work-detail__feature-card-image-wrapper">
            <img
              src={kimChaeYoungWork1_03}
              alt="이타 카드"
              className="work-detail__feature-card-image"
              onError={(e) => handleImageError(e, kimChaeYoungWork1_03, work.id, 'card-altruism')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-card-text">
            <h5 className="work-detail__feature-card-title">이타 카드</h5>
            <div className="work-detail__feature-card-description">
              <p>붉은색과 분홍색 선이 여러 겹으로 교차하며 외부로 뻗어 나가는 확산형 구조를 가진다. 선들이 중심보다는 주변으로 향하며 서로 얽히는 형태는, 개인보다 타인에게 향하는 관계적 에너지를 시각적으로 표현한다.</p>
            </div>
          </div>
        </li>
        <li className="work-detail__feature-card">
          <div className="work-detail__feature-card-image-wrapper">
            <img
              src={kimChaeYoungWork1_04}
              alt="안정 카드"
              className="work-detail__feature-card-image"
              onError={(e) => handleImageError(e, kimChaeYoungWork1_04, work.id, 'card-stability')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-card-text">
            <h5 className="work-detail__feature-card-title">안정 카드</h5>
            <div className="work-detail__feature-card-description">
              <p>굵은 붉은 선들이 일정한 간격으로 반복되어 격자형 구조를 만든다. 형태가 균일하고 밀도가 높아 시각적으로 무게감과 질서를 준다.</p>
            </div>
          </div>
        </li>
        <li className="work-detail__feature-card">
          <div className="work-detail__feature-card-image-wrapper">
            <img
              src={kimChaeYoungWork1_05}
              alt="인내 카드"
              className="work-detail__feature-card-image"
              onError={(e) => handleImageError(e, kimChaeYoungWork1_05, work.id, 'card-patience')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-card-text">
            <h5 className="work-detail__feature-card-title">인내 카드</h5>
            <div className="work-detail__feature-card-description">
              <p>형광 초록과 보라색 선이 대칭적인 축을 중심으로 얽혀 있으며, 하단에서 상단으로 단단히 세워진 구조를 가진다. 형태가 수직적으로 세워져 있어 '지속'과 '견딤'을 연상시킨다.</p>
            </div>
          </div>
        </li>
      </ul>

      {/* Feature Cards Section 2 */}
      <ul className="work-detail__section work-detail__feature-cards work-detail__feature-cards--kim-chae-young-do-you-believe-in-destiny-desktop">
        <li className="work-detail__feature-card">
          <div className="work-detail__feature-card-image-wrapper">
            <img
              src={kimChaeYoungWork1_06}
              alt="이기 카드"
              className="work-detail__feature-card-image"
              onError={(e) => handleImageError(e, kimChaeYoungWork1_06, work.id, 'card-egoism')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-card-text">
            <h5 className="work-detail__feature-card-title">이기 카드</h5>
            <div className="work-detail__feature-card-description">
              <p>노란색과 주황색 선이 원형으로 반복 회전하며 중심을 강조한다. 강한 색 대비와 회전형 구조가 자기 중심적인 에너지와 팽창된 힘을 시각화한다.</p>
            </div>
          </div>
        </li>
        <li className="work-detail__feature-card">
          <div className="work-detail__feature-card-image-wrapper">
            <img
              src={kimChaeYoungWork1_07}
              alt="모험 카드"
              className="work-detail__feature-card-image"
              onError={(e) => handleImageError(e, kimChaeYoungWork1_07, work.id, 'card-adventure')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-card-text">
            <h5 className="work-detail__feature-card-title">모험 카드</h5>
            <div className="work-detail__feature-card-description">
              <p>푸른 회색 선이 불규칙한 궤적을 따라 흩어지며 복잡한 공간감을 형성한다. 형태의 예측 불가능성과 열린 구조가 실험과 탐색의 이미지를 만든다.</p>
            </div>
          </div>
        </li>
        <li className="work-detail__feature-card">
          <div className="work-detail__feature-card-image-wrapper">
            <img
              src={kimChaeYoungWork1_08}
              alt="쾌락 카드"
              className="work-detail__feature-card-image"
              onError={(e) => handleImageError(e, kimChaeYoungWork1_08, work.id, 'card-pleasure')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-card-text">
            <h5 className="work-detail__feature-card-title">쾌락 카드</h5>
            <div className="work-detail__feature-card-description">
              <p>청록과 파란색 선이 부드럽게 휘어지며 느슨하게 얽혀 있다. 형태가 유동적이고 규칙이 약해 시각적으로 자유롭고 감각적인 인상을 준다.</p>
            </div>
          </div>
        </li>
      </ul>

      {/* Feature Row - Question Card */}
      <section className="work-detail__section work-detail__feature-row work-detail__feature-row--kim-chae-young-do-you-believe-in-destiny-desktop">
        <div className="work-detail__feature-row-image">
          <img
            src={kimChaeYoungWork1_09}
            alt="질문카드"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, kimChaeYoungWork1_09, work.id, 'feature-question-card')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-row-content">
          <h4 className="work-detail__feature-title">질문카드</h4>
          <div className="work-detail__feature-description">
            <p>총 90장으로 이루어져 있으며 각각의 속성쌍과 대응한다. 게임의 가장 큰 진행을 도와준다.</p>
          </div>
        </div>
      </section>

      {/* Feature Row - Trap Card */}
      <section className="work-detail__section work-detail__feature-row work-detail__feature-row--kim-chae-young-do-you-believe-in-destiny-desktop">
        <div className="work-detail__feature-row-image">
          <img
            src={kimChaeYoungWork1_10}
            alt="함정카드"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, kimChaeYoungWork1_10, work.id, 'feature-trap-card')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-row-content">
          <h4 className="work-detail__feature-title">함정카드</h4>
          <div className="work-detail__feature-description">
            <p>게임의 경쟁 속성에 속하는 카드. 프로젝트의 주제를 극대화 할 수 있는 장치로 쓰인다.</p>
          </div>
        </div>
      </section>

      {/* Feature Row - Destiny Sheet */}
      <section className="work-detail__section work-detail__feature-row work-detail__feature-row--kim-chae-young-do-you-believe-in-destiny-desktop">
        <div className="work-detail__feature-row-image">
          <img
            src={kimChaeYoungWork1_11}
            alt="운명시트"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, kimChaeYoungWork1_11, work.id, 'feature-destiny-sheet')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-row-content">
          <h4 className="work-detail__feature-title">운명시트</h4>
          <div className="work-detail__feature-description">
            <p>주사위를 통해 결정되며, 게임의 주요 포인트 중 하나이다.</p>
          </div>
        </div>
      </section>

      {/* Feature Row - Board */}
      <section className="work-detail__section work-detail__feature-row work-detail__feature-row--kim-chae-young-do-you-believe-in-destiny-desktop">
        <div className="work-detail__feature-row-image">
          <img
            src={kimChaeYoungWork1_12}
            alt="보드판"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, kimChaeYoungWork1_12, work.id, 'feature-board')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-row-content">
          <h4 className="work-detail__feature-title">보드판</h4>
          <div className="work-detail__feature-description">
            <p>검은 점과 얇은 선으로 이루어진 네트워크는 '인생의 선택'과 그로 인한 '결과의 연결'을 시각화한 구조이다. 각 점은 하나의 선택, 혹은 개인의 결정 순간을 의미하며, 선은 그 선택들이 이어지며 만들어내는 인과의 흐름을 나타낸다. 배경에 겹쳐진 반복적인 곡선 형태는 삶의 복잡성과 예측 불가능성을 표현한다. 이 곡선 위에서 점들이 규칙적으로 배치되지 않은 이유는, 인생의 선택이 결코 단일한 방향으로 이어지지 않음을 드러내기 위함이다.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KimChaeYoungDoYouBelieveInDestinyDesktop;

