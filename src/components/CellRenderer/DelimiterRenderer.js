const DelimiterRenderer = (item) => {
  const { firstField, secondField, useInnerFlight } = item;
  const { data } = item;
  let dataIn = { ...data };
  if (useInnerFlight) {
    dataIn = { ...data.flight };
  }
  if (!dataIn && !dataIn[firstField] && !dataIn[secondField]) {
    return '';
  }
  let firstText = '-';
  let secondText = '-';
  if (dataIn[firstField]) {
    firstText = dataIn[firstField];
  }
  if (dataIn[secondField]) {
    secondText = dataIn[secondField];
  }
  return `${firstText} / ${secondText}`;
};

export default DelimiterRenderer;
