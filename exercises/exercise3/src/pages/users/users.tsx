import { User } from 'api/users';
import { Page } from 'components/page';
import { UserTable } from 'components/userTable';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getUserProfileRoute } from 'routeUtil';
import { FetchStatus, TypedMapDispatchToProps, TypedMapStateToProps } from 'store/state';
import { fetchUsers, selectUserListFetchStatus, selectUserListSorted } from 'store/users';

type OuterProps = RouteComponentProps<{ id: string }>;

interface InnerProps {
  users: User[];
  fetchStatus: FetchStatus;
}

interface DispatchProps {
  fetchUsers(): any;
}

export type Props = InnerProps & DispatchProps & OuterProps;

export const mapStateToProps: TypedMapStateToProps<InnerProps, OuterProps> = (state) => ({
  users: selectUserListSorted(state),
  fetchStatus: selectUserListFetchStatus(state),
});

export const mapDispatchToProps: TypedMapDispatchToProps<DispatchProps> = (dispatch) => bindActionCreators(
  { fetchUsers },
  dispatch,
);

export class Users extends React.Component<Props> {
  public componentDidMount() {
    if (this.props.fetchStatus === FetchStatus.none) {
      this.props.fetchUsers();
    }
  }

  private handleUserClick = (user) => {
    this.props.history.push(getUserProfileRoute(user));
  }

  public render() {
    return (
      <Page title='Users'>
        <UserTable
          users={this.props.users}
          onUserClick={this.handleUserClick}
        />
      </Page>
    );
  }
}

const ConnectedUsers = connect(mapStateToProps, mapDispatchToProps)(Users);

export default ConnectedUsers;
