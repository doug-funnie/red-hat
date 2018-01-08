import glamorous from 'glamorous';
import { ThemedProps } from 'styles/theme';

const spacing = 16;

export const Card = glamorous.div<ThemedProps>(({ theme }) => ({
  backgroundColor: theme.colors.white,
  borderRadius: 4,
  paddingBottom: '0.01em', // prevents collapsing margins
  paddingTop: '0.01em', // prevents collapsing margins
  boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
}));

export const CardContent = glamorous.div({
  marginTop: spacing,
  marginBottom: spacing,
  paddingLeft: spacing,
  paddingRight: spacing,
});
