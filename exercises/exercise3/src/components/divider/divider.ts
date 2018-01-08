import glamorous from 'glamorous';
import { ThemedProps } from 'styles/theme';

interface Props {
  spacing?: number;
}

const defaultProps: Partial<Props> = {
  spacing: 20,
};

export const Divider = glamorous.hr<ThemedProps<Props>>(({ theme, spacing }) => ({
  borderTop: 'none',
  borderWidth: 1,
  height: 1,
  borderColor: theme.colors.border,
  marginBottom: spacing,
  marginTop: spacing,
}));

Divider.defaultProps = defaultProps;
