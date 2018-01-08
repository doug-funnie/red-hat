import glamorous, { Main } from 'glamorous';
import * as React from 'react';
import { Error } from '../error';
import { Header, height as headerHeight } from '../header';

export interface Props {
  title?: string;
  children?: React.ReactNode;
  error?: any;
  onBackButtonPress?(): void;
  onRetry?(): void;
}

const Wrapper = glamorous.div({
  margin: '0 auto',
  maxWidth: 800,
  paddingBottom: 25,
  paddingTop: 15,
  width: '100%',
});

export const Page: React.SFC<Props> = ({
  children,
  title,
  onBackButtonPress,
  error,
  onRetry,
}) => (
  <>
    <Header onBackButtonPress={onBackButtonPress} title={error ? 'Error' : title} />
    <Main marginTop={headerHeight}>
      <Wrapper>
        {!!error ? <Error onRetry={onRetry} /> : children}
      </Wrapper>
    </Main>
  </>
);
