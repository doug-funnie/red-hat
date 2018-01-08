export const smPX = 576;
export const mdPX = 768;
export const lgPX = 992;
export const xlPX = 992;

const minWidthQuery = (size: number) => `@media(min-width: ${size}px)`;
export const minWidthSM = minWidthQuery(smPX);
export const minWidthMD = minWidthQuery(mdPX);
export const minWidthLG = minWidthQuery(lgPX);
export const minWidthXL = minWidthQuery(xlPX);
