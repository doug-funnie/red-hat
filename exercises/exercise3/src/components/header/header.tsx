// tslint:disable:max-line-length
import glamorous from 'glamorous';
import * as React from 'react';
import { white } from 'styles/colors';
import { ThemedProps } from 'styles/theme';

export const height = 60;

export interface Props {
  title?: string;
  onBackButtonPress?(): void;
}

const defaultProps: Partial<Props> = {
  title: 'Red Hat User App',
  onBackButtonPress: undefined,
};

export const HeaderElement = glamorous.header<ThemedProps>(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme.colors.red,
  display: 'flex',
  height,
  left: 0,
  padding: '0 15px',
  position: 'fixed',
  right: 0,
  top: 0,
}));

export const IconButton = glamorous.div<ThemedProps<{ onClick?(): void }>>({
  alignItems: 'center',
  borderRadius: '50%',
  cursor: 'pointer',
  display: 'flex',
  height: 35,
  justifyContent: 'center',
  marginRight: 10,
  width: 35,
  ':hover': {
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

export const Title = glamorous.div<ThemedProps>(({ theme }) => ({
  color: theme.colors.white,
  fontSize: 18,
}));

export const Header: React.SFC<Props> = ({ title, onBackButtonPress }) => {
  return (
    <HeaderElement>
      {!!onBackButtonPress && (
        <IconButton onClick={onBackButtonPress} role='button'>
          <svg width={20} height={20} viewBox='0 0 24.00 24.00'>
            <path
              fill={white}
              fillOpacity='1'
              strokeWidth='0.2'
              strokeLinejoin='round'
              d='M 20,11L 20,13L 7.98958,13L 13.4948,18.5052L 12.0806,19.9194L 4.16116,12L 12.0806,4.08058L 13.4948,5.49479L 7.98958,11L 20,11 Z '
            />
          </svg>
        </IconButton>
      )}
      <Title>{title}</Title>
    </HeaderElement>
  );
};

Header.defaultProps = defaultProps;
