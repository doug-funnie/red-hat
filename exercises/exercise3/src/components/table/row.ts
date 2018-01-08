import glamorous, { CSSProperties } from 'glamorous';
import { rgba } from 'polished';
import { ThemedProps } from 'styles/theme';

type Props = ThemedProps<{
  isHeading?: boolean;
  onClick?(evt: React.MouseEvent<HTMLDivElement>): void;
}>;

const defaultProps: Partial<Props> = {
  isHeading: false,
};

export const Row = glamorous.div<Props>(({
  theme,
  isHeading,
  onClick,
}) => {
  const styles: CSSProperties = {
    alignItems: 'center',
    borderRadius: 4,
    display: 'flex',
    marginBottom: 5,
    transition: 'background-color 150ms ease-in-out',
    backgroundColor: !isHeading && theme.colors.white,
  };

  if (onClick) {
    return {
      cursor: onClick && 'pointer',
      ...styles,
      ':hover': {
        backgroundColor: rgba(theme.colors.red, 0.2),
      },
    };
  }
  return styles;
});

Row.defaultProps = defaultProps;
