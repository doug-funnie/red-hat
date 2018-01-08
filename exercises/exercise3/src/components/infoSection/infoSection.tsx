import glamorous, { Div } from 'glamorous';
import * as React from 'react';
import { InfoItem, InfoItemProps } from '../infoItem';
import { H5 } from '../text';

interface Props {
  title: string;
  items: InfoItemProps[];
}

const Title = glamorous(H5)({
  marginBottom: 5,
  fontWeight: 700,
});

export const InfoSection: React.SFC<Props> = ({ title, items }) => (
  <Div flex='1 1 100px' minWidth={200}>
    <Title>{title}</Title>
    {items.map((item, i) => (
      !!item && <InfoItem key={i} {...item} />
    ))}
  </Div>
);
