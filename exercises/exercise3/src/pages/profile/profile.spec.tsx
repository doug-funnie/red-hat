// import { User } from 'api/users';
// import { Page } from 'components/page/Page';
// import { UserTable } from 'components/userTable/userTable';
import { User } from 'api/users';
import { Page } from 'components/page';
import { Placeholder } from 'components/placeholder/placeholder';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { InfoSection } from 'pages/profile/profile.styled';
import * as React from 'react';
import { FetchStatus } from 'store/state';
import '../../../../../testUtils/addJestMatchers';
import { Profile, Props } from './profile';

const user = {
  id: 1,
  name: 'User 1',
} as User;

const props: Props = {
  user,
  userId: user.id,
  fetchStatus: FetchStatus.complete,
  error: null,
  fetchUser: jest.fn(),
  match: {} as any,
  location: {} as any,
  history: {
    push: jest.fn(),
  } as any,
};

it('fetches user if no user is available and fetchStatus is none', () => {
  shallow(<Profile {...props} user={undefined} fetchStatus={FetchStatus.none} />);
  expect(props.fetchUser).toBeCalledWith(props.userId);
});

it('sets page title to empty string while loading user', () => {
  const view = shallow(<Profile {...props} user={undefined} fetchStatus={FetchStatus.inProgress} />);
  expect(view.find(Page).props().title).toBe('');
});

it('sets page title to empty string while loading user', () => {
  const view = shallow(<Profile {...props} user={undefined} fetchStatus={FetchStatus.inProgress} />);
  expect(view.find(Page).props().title).toBe('');
});

it('does not render info sections while loading', () => {
  const view = shallow(<Profile {...props} fetchStatus={FetchStatus.inProgress} />);
  expect(view.find(InfoSection).length).toBe(0);
});

it('does not render info sections while loading', () => {
  const view = shallow(<Profile {...props} fetchStatus={FetchStatus.inProgress} />);
  expect(toJson(view.find(Placeholder))).toMatchSnapshot();
});

it('calls fetchUser on Page retry', () => {
  const view = shallow(<Profile {...props} />);
  view.find(Page).props().onRetry();
  expect(props.fetchUser).toBeCalledWith(props.userId);
});

it('navigated to user list on back', () => {
  const view = shallow(<Profile {...props} />);
  view.find(Page).props().onBackButtonPress();
  expect(props.history.push).toBeCalledWithSnapshot();
});
