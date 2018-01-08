import { Div } from 'glamorous';
import * as React from 'react';
import { Button } from '../button';
import { H2, H3 } from '../text';

export interface Props {
  title?: string;
  message?: string;
  icon?: string;
  onRetry?(): void;
}

const defaultProps: Partial<Props> = {
  icon: '😒',
  title: 'Oops!',
  message: 'Something went wrong.',
};

export const Error: React.SFC<Props> = ({
  title,
  message,
  icon,
  onRetry,
}) => (
  <Div display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
    <Div fontSize={75}>{icon}</Div>
    <Div marginBottom={15} textAlign='center'>
      <H2>{title}</H2>
      <H3>{message}</H3>
    </Div>
    {!!onRetry && (
      <Button onClick={onRetry}>
        Give it another go
      </Button>
    )}
  </Div>
);

Error.defaultProps = defaultProps;
