/**
 * 작품 데이터를 UnifiedWorkLayout 형식으로 변환하는 유틸리티 함수
 */

/**
 * 작품 데이터를 UnifiedWorkLayout에 맞는 형식으로 변환
 * @param {Object} work - 작품 데이터
 * @returns {Object} UnifiedWorkLayout 형식의 데이터
 */
export const convertWorkDataToUnifiedLayout = (work) => {
  if (!work) return null;

  // Hero 이미지: gallery의 첫 번째 이미지 또는 thumbnail
  const heroImage = work.gallery && work.gallery.length > 0 
    ? work.gallery[0].src 
    : work.thumbnail;

  // Bento 데이터: notes의 첫 번째 항목 (title과 description이 있는 경우)
  const bentoData = [];
  if (work.notes && work.notes.length > 0) {
    const firstNote = work.notes[0];
    if (firstNote.title && firstNote.description) {
      bentoData.push({
        title: firstNote.title,
        description: firstNote.description,
        image: work.gallery && work.gallery.length > 1 ? work.gallery[1].src : null
      });
    }
  }

  // Quote 데이터: notes에서 title이 null이고 description이 있는 항목
  let quoteData = null;
  if (work.notes && work.notes.length > 0) {
    const quoteNote = work.notes.find(note => !note.title && note.description);
    if (quoteNote) {
      quoteData = {
        text: quoteNote.description,
        subtitle: quoteNote.subtitle || null,
        content: quoteNote.content || null
      };
    }
  }

  // Feature 이미지: gallery의 세 번째 이미지
  const featureImage = work.gallery && work.gallery.length > 2 
    ? work.gallery[2].src 
    : null;

  // Cards 데이터: notes에서 title과 description이 있는 항목들 (첫 번째 제외)
  const cardsData = [];
  if (work.notes && work.notes.length > 1) {
    const cardNotes = work.notes.slice(1).filter(note => note.title && note.description);
    cardNotes.forEach((note, index) => {
      const galleryIndex = 3 + index; // gallery[3], gallery[4], gallery[5]...
      cardsData.push({
        title: note.title,
        description: note.description,
        image: work.gallery && work.gallery.length > galleryIndex 
          ? work.gallery[galleryIndex].src 
          : null
      });
    });
  }

  return {
    heroImage,
    bentoData,
    quoteData,
    featureImage,
    cardsData
  };
};

