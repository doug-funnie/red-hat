import * as breakpoints from './breakpoints';
import * as colors from './colors';

export interface Theme {
  colors: typeof colors;
  breakpoints: typeof breakpoints;
}

export const theme: Theme = {
  colors,
  breakpoints,
};

export type ThemedProps<P = {}> = { theme: Theme } & P;
