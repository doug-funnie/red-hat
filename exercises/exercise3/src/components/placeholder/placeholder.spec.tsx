import { shallow } from 'enzyme';
import * as React from 'react';
import { AvatarPlaceholder, Placeholder, Props, TextPlaceholder } from './placeholder';

const props: Props = {
  type: 'text',
  isLoading: true,
  size: 20,
  height: 20,
  width: 100,
  children: jest.fn(() => 'children'),
};

it('renders children if loading is false', () => {
  shallow(<Placeholder {...props} isLoading={false} />);
  expect(props.children).toBeCalled();
});

it('renders children if type is unknown', () => {
  shallow(<Placeholder {...props} type={'other' as any} />);
  expect(props.children).toBeCalled();
});

it('renders text placeholder if type is text', () => {
  const view = shallow(<Placeholder {...props} type='text' />);
  const textPlaceholder = view.find(TextPlaceholder);
  expect(textPlaceholder.props().height).toBe(props.height);
  expect(textPlaceholder.props().width).toBe(props.width);
});

it('renders avatar placeholder if type is text', () => {
  const view = shallow(<Placeholder {...props} type='avatar' />);
  const avatarPlaceholder = view.find(AvatarPlaceholder);
  expect(avatarPlaceholder.props().size).toBe(props.height);
});
