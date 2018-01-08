import glamorous, { CSSProperties } from 'glamorous';
import { ThemedProps } from 'styles/theme';

interface TextProps {
  light?: boolean;
  weight?: CSSProperties['fontWeight'];
}

const getTextStylesFromProps = ({ light, theme, weight = 400 }: ThemedProps<TextProps>): CSSProperties => ({
  color: light
    ? theme.colors.textLight
    : theme.colors.text,
  fontWeight: weight,
});

const baseTextStyles: CSSProperties = {
  margin: 0,
};

export const TextSmall = glamorous.span<TextProps>({
  ...baseTextStyles,
  fontSize: 12,
}, getTextStylesFromProps);

export const Text = glamorous.span<TextProps>({
  ...baseTextStyles,
  fontSize: 14,
}, getTextStylesFromProps);

export const H1 = glamorous.h1<TextProps>({
  ...baseTextStyles,
  fontSize: 48,
}, getTextStylesFromProps);

export const H2 = glamorous.h2<TextProps>({
  ...baseTextStyles,
  fontSize: 36,
}, getTextStylesFromProps);

export const H3 = glamorous.h3<TextProps>({
  ...baseTextStyles,
  fontSize: 28,
}, getTextStylesFromProps);

export const H4 = glamorous.h4<TextProps>({
  ...baseTextStyles,
  fontSize: 18,
}, getTextStylesFromProps);

export const H5 = glamorous.h4<TextProps>({
  ...baseTextStyles,
  fontSize: 16,
}, getTextStylesFromProps);
