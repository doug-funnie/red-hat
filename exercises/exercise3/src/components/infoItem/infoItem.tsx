import { Div } from 'glamorous';
import * as React from 'react';
import { Text, TextSmall } from '../text';

export interface Props {
  label: string;
  value: React.ReactNode;
}

export const InfoItem: React.SFC<Props> = ({ label, value }) => (
  <Div marginBottom={7} display='flex' flexDirection='column'>
    <TextSmall light weight={700}>
      {label}
    </TextSmall>
    <Text>{value}</Text>
  </Div>
);
