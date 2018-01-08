import { getUserAvatarUrl, User } from 'api/users';
import glamorous, { Img } from 'glamorous';
import * as React from 'react';
import { ThemedProps } from 'styles/theme';

interface Props {
  email: User['email'];
  size?: number;
}

const defaultProps: Partial<Props> = {
  size: 25,
};

const AvatarWrapper = glamorous.div<ThemedProps<Pick<Props, 'size'>>>(({ theme, size }) => ({
  borderRadius: '50%',
  display: 'inline-block',
  backgroundColor: theme.colors.grayDark,
  height: size,
  width: size,
}));

export const Avatar: React.SFC<Props> = ({ size, email }) => (
  <AvatarWrapper size={size}>
    <Img
      src={getUserAvatarUrl(email, size)}
      width={size}
      height={size}
      borderRadius='50%'
    />
  </AvatarWrapper>
);

Avatar.defaultProps = defaultProps;
