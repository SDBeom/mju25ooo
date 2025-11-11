const thumbImports = import.meta.glob('../assets/Thumb/*.webp', {
  eager: true,
  import: 'default',
});

const normalizeKey = (filePath) => filePath.replace(/\\/g, '/');

export const resolveThumbSrc = (file) => {
  if (!file) {
    return '';
  }

  const normalized = normalizeKey(file);
  const directKey = `../assets/Thumb/${normalized}`;

  if (thumbImports[directKey]) {
    return thumbImports[directKey];
  }

  const fallbackKey = Object.keys(thumbImports).find((key) => key.endsWith(`/${normalized}`));
  return fallbackKey ? thumbImports[fallbackKey] : '';
};

export default resolveThumbSrc;

