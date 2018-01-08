import { User } from 'api/users';
import { Avatar } from 'components/avatar/avatar';
import { Card, CardContent } from 'components/card';
import { Divider } from 'components/divider';
import { InfoSection } from 'components/infoSection';
import { Page } from 'components/page';
import { Placeholder } from 'components/placeholder/placeholder';
import { H3, H4 } from 'components/text';
import { Div } from 'glamorous';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { getUsersRoute } from 'routeUtil';
import { FetchStatus, TypedMapDispatchToProps, TypedMapStateToProps } from 'store/state';
import { fetchUser, selectUserById, selectUserError, selectUserFetchStatus } from 'store/users';

type OuterProps = RouteComponentProps<{ id: User['id'] }>;

interface InnerProps {
  userId: User['id'];
  user: User;
  fetchStatus: FetchStatus;
  error: any;
}

interface DispatchProps {
  fetchUser(userId: User['id']): any;
}

export type Props = InnerProps & DispatchProps & OuterProps;

export const mapStateToProps: TypedMapStateToProps<InnerProps, OuterProps> = (state, ownProps): InnerProps  => {
  const userId = ownProps.match.params.id;

  return {
    userId,
    user: selectUserById(state, userId),
    fetchStatus: selectUserFetchStatus(state, userId),
    error: selectUserError(state, userId),
  };
};

export const mapDispatchToProps: TypedMapDispatchToProps<DispatchProps> = (dispatch) => bindActionCreators({
  fetchUser,
}, dispatch);

export class Profile extends React.Component<Props> {
  public componentDidMount() {
    if (!this.props.user && this.props.fetchStatus === FetchStatus.none) {
      this.fetchUser();
    }
  }

  private fetchUser = () => {
    this.props.fetchUser(this.props.userId);
  }

  private handleBackButtonPress = () => {
    this.props.history.push(getUsersRoute());
  }

  public render() {
    const {
      user,
      fetchStatus,
      error,
    } = this.props;

    const isLoading = fetchStatus !== FetchStatus.complete;
    const title = user ? user.name : '';

    return (
      <Page
        error={isLoading ? null : error}
        onBackButtonPress={this.handleBackButtonPress}
        onRetry={this.fetchUser}
        title={title}
      >
        <Card>
          <CardContent>
            <Div display='flex' justifyContent='center' marginBottom={15}>
              <Placeholder type='avatar' size={100} isLoading={isLoading}>
                {() => <Avatar size={100} email={user.email} />}
              </Placeholder>
            </Div>
            <Div textAlign='center'>
              <Placeholder type='text' width={200} height={18} isLoading={isLoading}>
                {() => <H3>{user.name}</H3>}
              </Placeholder>
              <div>
                <Placeholder type='text' width={150} height={16} isLoading={isLoading}>
                  {() => <H4>@{user.username}</H4>}
                </Placeholder>
              </div>
            </Div>
            {!isLoading && (
              <>
                <Divider />
                <Div display='flex' flexWrap='wrap'>
                  <InfoSection
                    title='Contact Info'
                    items={[
                      { label: 'Email', value: user.email },
                      { label: 'Phone Number', value: user.phone },
                      { label: 'Website', value: user.website },
                      user.address && { label: 'City', value: user.address.city },
                    ]}
                  />
                  {!!user.company && (
                    <InfoSection
                      title='Company Info'
                      items={[
                        { label: 'Company', value: user.company.name },
                        { label: 'Description', value: user.company.catchPhrase },
                        { label: 'BS', value: user.company.bs },
                        { label: 'City', value: user.address.city },
                      ]}
                    />
                  )}
                </Div>
              </>
            )}
          </CardContent>
        </Card>
      </Page>
    );
  }
}

const ConnectedProfile = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default ConnectedProfile;
