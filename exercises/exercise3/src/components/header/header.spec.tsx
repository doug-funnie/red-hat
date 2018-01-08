import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as React from 'react';
import { Header, IconButton, Props, Title } from './header';

const props: Props = {
  title: '',
  onBackButtonPress: jest.fn(),
};

it('calls onBackButtonPress', () => {
  const view = shallow(<Header {...props} />);
  view.find(IconButton).simulate('click');
  expect(props.onBackButtonPress).toBeCalled();
});

it('does not render IconButton if onBackButtonPress is not provided', () => {
  const view = shallow(<Header {...props} onBackButtonPress={undefined} />);
  expect(view.find(IconButton).length).toBe(0);
});

it('defaults title', () => {
  const view = shallow(<Header {...props} title={undefined} />);
  expect(toJson(view.find(Title))).toMatchSnapshot();
});
