export const formatNumber = number => `${number < 10 ? '0' : ''}${number}`;

export const snapTop = (number, resolution) => {
  const snapped = Math.ceil(number / resolution) * resolution;
  return snapped;
};
