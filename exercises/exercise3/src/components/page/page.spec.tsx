import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as React from 'react';
import { Button } from '../button';
import { Error } from '../error';
import { Page, Props } from './page';

const content = <div>content</div>;

const props: Props = {
  title: 'Title',
  children: content,
};

it('renders children if no error is present', () => {
  const view = shallow(<Page {...props} />);
  expect(toJson(view)).toMatchSnapshot();
});

it('renders error if error is present', () => {
  const view = shallow(<Page {...props} error='error' />);
  expect(view.find(Error).length).toBe(1);
});
