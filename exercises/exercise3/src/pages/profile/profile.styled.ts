import { H5 } from 'components/text';
import glamorous, {  } from 'glamorous';
import { ThemedProps } from 'styles/theme';

export const UserSheet = glamorous.div<ThemedProps>(({ theme }) => ({
  backgroundColor: theme.colors.white,
  borderRadius: 4,
  padding: 20,
}));

export const Summary = glamorous.div({
  textAlign: 'center',
});

export const AvatarContainer = glamorous.div({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: 15,
});

export const InfoWrapper = glamorous.div({
  display: 'flex',
  flexWrap: 'wrap',
});

export const InfoSection = glamorous.div({
  flex: '1 1 50%',
  minWidth: 200,
});

export const InfoSectionTitle = glamorous(H5)({
  fontWeight: 700,
  marginBottom: 5,
});
