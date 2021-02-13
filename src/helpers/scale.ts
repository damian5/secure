
const { innerWidth, innerHeight } = window;

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const fnScale = (size) => (innerWidth / guidelineBaseWidth) * size;
const fnVerticalScale = (size) => (innerHeight / guidelineBaseHeight) * size;
const fnModerateScale = (size, factor = 0.5) => fnScale(size) * factor;

export { fnScale, fnVerticalScale, fnModerateScale };
