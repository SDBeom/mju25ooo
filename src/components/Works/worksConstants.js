import designerDetailsData from '../../data/designerDetailsData.js';

// designerDetailsData에서 모든 작품 추출
const extractWorksFromDesignerData = () => {
  const works = [];
  Object.values(designerDetailsData).forEach((designer) => {
    if (designer.works && Array.isArray(designer.works)) {
      designer.works.forEach((work) => {
        works.push({
          id: work.id,
          title: work.title,
          designer: designer.displayName,
          genre: work.genre,
          description: work.summary || work.description || '',
          thumbnail: work.thumbnail,
        });
      });
    }
  });
  return works;
};

export const WORKS_LIST = extractWorksFromDesignerData();

export const normalizeTitle = (title = '') =>
  title
    .toLocaleLowerCase('ko')
    .normalize('NFKD')
    .replace(/[^\p{L}\p{N}]+/gu, '');

