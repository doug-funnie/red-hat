import glamorous, { CSSProperties } from 'glamorous';
import { lighten } from 'polished';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ThemedProps } from 'styles/theme';

const linkStyles: CSSProperties = {
  fontWeight: 700,
  textDecoration: 'none',
};

const getLinkStylesFromTheme = ({ theme }: ThemedProps) => ({
  color: theme.colors.red,
  ':hover': {
    color: lighten(0.2, theme.colors.red),
  },
});

export const ExternalLink = glamorous.a(linkStyles, getLinkStylesFromTheme);
export const InternalLink = glamorous(RouterLink)(linkStyles, getLinkStylesFromTheme);

export interface Props {
  to: string;
  isExternal?: boolean;
  css?: CSSProperties;
}

export const Link: React.SFC<Props> = ({ to, isExternal, children, css }) => isExternal
  ? (
    <ExternalLink
      href={to}
      rel='noopener noreferer'
      target='_blank'
      css={css}
    >
      {children}
    </ExternalLink>
  ) : (
    <InternalLink to={to} css={css}>
      {children}
    </InternalLink>
  );
