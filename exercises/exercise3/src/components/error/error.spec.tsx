import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as React from 'react';
import { Button } from '../button';
import { Error, Props } from './error';

const props: Props = {
  title: 'Title',
  message: 'Message',
};

it('renders defaults', () => {
  const view = shallow(<Error />);
  expect(toJson(view)).toMatchSnapshot();
});

it('renders title and message props', () => {
  const view = shallow(<Error {...props} />);
  expect(toJson(view)).toMatchSnapshot();
});

it('calls on retry on button click', () => {
  const onRetryMock = jest.fn();
  const view = shallow(<Error {...props} onRetry={onRetryMock}/>);
  view.find(Button).simulate('click');
  expect(onRetryMock).toBeCalled();
});
