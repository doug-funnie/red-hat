import glamorous, { CSSProperties } from 'glamorous';
import { ThemedProps } from 'styles/theme';

type Props = ThemedProps<{
  grow?: number;
  isHeading?: boolean;
  hideOnMobile?: boolean;
}>;

const defaultProps: Partial<Props> = {
  grow: 1,
  isHeading: false,
  hideOnMobile: false,
};

export const Cell = glamorous.div<Props>(({
  theme,
  grow,
  hideOnMobile,
  isHeading,
}) => {
  const styles: CSSProperties = {
    color: theme.colors.textLight,
    flex: `${grow} 0 100px`,
    fontSize: 14,
    fontWeight: isHeading ? 500 : 400,
    overflow: 'hidden',
    padding: 10,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  if (hideOnMobile) {
    styles.display = 'none';
    styles[theme.breakpoints.minWidthSM] = {
      display: 'block',
    };
  }

  return styles;
});

Cell.defaultProps = defaultProps;
