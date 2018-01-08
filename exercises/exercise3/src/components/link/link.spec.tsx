import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as React from 'react';
import { Link, Props } from './link';

const props: Props = {
  to: 'to',
};

it('renders internal link by default', () => {
  const view = shallow(<Link {...props} />);
  expect(toJson(view)).toMatchSnapshot();
});

it('renders external link if isExternal is true', () => {
  const view = shallow(<Link {...props} isExternal />);
  expect(toJson(view)).toMatchSnapshot();
});
