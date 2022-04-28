export const numberWithCommas = (value: any) => {
  return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : value;
};
