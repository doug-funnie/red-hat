import glamorous from 'glamorous';
import { lighten } from 'polished';
import { ButtonHTMLAttributes } from 'react';
import { ThemedProps } from 'styles/theme';

type Props = Pick<ButtonHTMLAttributes<HTMLButtonElement>,
  'onClick'
  | 'disabled'
  | 'type'
>;

export const Button = glamorous.button<ThemedProps<Props>>(({ theme, disabled }) => {
  const bg = theme.colors.red;
  const activeBg = lighten(0.2, bg);

  return {
    border: 'none',
    borderRadius: 4,
    fontWeight: 700,
    height: 32,
    lineHeight: '32px',
    outline: 'none',
    padding: '0 10px',
    color: theme.colors.white,
    backgroundColor: bg,
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? 'not-allowed' : 'cursor',
    ':hover': {
      backgroundColor: activeBg,
    },
    ':active': {
      backgroundColor: activeBg,
    },
    ':focus': {
      backgroundColor: activeBg,
    },
  };
});

Button.defaultProps = {
  type: 'button',
};
