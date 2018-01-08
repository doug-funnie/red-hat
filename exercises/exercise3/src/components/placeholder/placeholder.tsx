import { keyframes } from 'glamor';
import glamorous from 'glamorous';
import * as React from 'react';
import { ThemedProps } from 'styles/theme';

export interface Props {
  isLoading: boolean;
  type: 'avatar' | 'text';
  size?: number;
  height?: number;
  width?: number;
  children?(): React.ReactNode;
}

const shimmer = keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0.6 },
});

type AvatarPlaceholderProps = ThemedProps<Pick<Props, 'size'>>;

export const AvatarPlaceholder = glamorous.div<AvatarPlaceholderProps>(({ size, theme }) => ({
  display: 'inline-block',
  borderRadius: '50%',
  animation: `${shimmer} 1s infinite ease-in-out alternate`,
  height: size,
  width: size,
  backgroundColor: theme.colors.grayDark,
}));

type TextPlaceholderProps = ThemedProps<Pick<Props, 'height' | 'width'>>;

export const TextPlaceholder = glamorous.span<TextPlaceholderProps>(({
  height,
  width,
  theme,
}) => ({
  display: 'inline-block',
  borderRadius: 3,
  animation: `${shimmer} 1s infinite ease-in-out alternate`,
  height,
  width,
  backgroundColor: theme.colors.grayDark,
}));

export const Placeholder: React.SFC<Props> = (props) => {
  if (!props.isLoading) {
    return props.children();
  }

  switch (props.type) {
    case 'avatar':
      return <AvatarPlaceholder size={props.size} /> as any;
    case 'text':
    return <TextPlaceholder height={props.height} width={props.width} /> as any;
  }

  return props.children();
};
