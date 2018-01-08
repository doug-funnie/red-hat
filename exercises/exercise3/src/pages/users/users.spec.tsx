import { User } from 'api/users';
import { Page } from 'components/page/Page';
import { UserTable } from 'components/userTable/userTable';
import { shallow } from 'enzyme';
import * as React from 'react';
import { FetchStatus } from 'store/state';
import '../../../../../testUtils/addJestMatchers';
import { Props, Users } from './users';

const props: Props = {
  users: [{
    id: 1,
  } as any],
  fetchStatus: FetchStatus.none,
  fetchUsers: jest.fn(),
  match: {} as any,
  location: {} as any,
  history: {
    push: jest.fn(),
  } as any,
};

it('only calls fetchUsers if fetchStatus is none', () => {
  shallow(<Users {...props} fetchStatus={FetchStatus.complete} />);
  shallow(<Users {...props} fetchStatus={FetchStatus.inProgress} />);
  expect(props.fetchUsers).not.toBeCalled();
  shallow(<Users {...props} />);
  expect(props.fetchUsers).toBeCalled();
});

it('renders title as Users', () => {
  const view = shallow(<Users  {...props} />);
  expect(view.find(Page).props().title).toBe('Users');
});

it('calls history.push onUserClick', () => {
  const view = shallow(<Users  {...props} />);
  view.find(UserTable).props().onUserClick({ id: 1 } as User);
  expect(props.history.push).toBeCalledWithSnapshot();
});
