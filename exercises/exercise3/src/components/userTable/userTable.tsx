import { User } from 'api/users';
import { Avatar } from 'components/avatar';
import { CellRenderer, Column, EntryClickHandler, KeyExtractor, LabelRenderer, Table } from 'components/table';
import { Div } from 'glamorous';
import * as React from 'react';

type TypedColumn = Column<User>;
type TypedLabelRenderer = LabelRenderer<User>;
type TypedCellRenderer = CellRenderer<User>;
type TypedKeyExtrator = KeyExtractor<User>;
type TypedEntryClickHandler = EntryClickHandler<User>;

interface Props {
  users: User[];
  onUserClick(user: User): void;
}

const nameLabelRenderer: TypedLabelRenderer = () => 'Name';
const nameCellRenderer: TypedCellRenderer =  ({ data }) => (
  <Div display='flex' alignItems='center'>
    <Avatar email={data.email} size={30} />
    <div style={{ marginLeft: 10 }}>
      {data.name}
    </div>
  </Div>
);

const usernameLabelRenderer: TypedLabelRenderer = () => 'Username';
const usernameCellRenderer: TypedCellRenderer = ({ data }) => data.username;

const emailLabelRenderer: TypedLabelRenderer = () => 'Email';
const emailCellRenderer: TypedCellRenderer = ({ data }) => data.email;

const addressLabelRenderer: TypedLabelRenderer = () => 'Address';
const addressCellRenderer: TypedCellRenderer = ({ data }) => (
  <>
    <div>{data.address.street}, {data.address.suite}</div>
    <div>{data.address.city}, {data.address.zipcode}</div>
  </>
);
const columns: TypedColumn[] = [
  { id: 'Name', renderCell: nameCellRenderer, renderLabel: nameLabelRenderer, grow: 2 },
  { id: 'Username', renderCell: usernameCellRenderer, renderLabel: usernameLabelRenderer },
  { id: 'Email', renderCell: emailCellRenderer, renderLabel: emailLabelRenderer, hideOnMobile: true },
  { id: 'Address', renderCell: addressCellRenderer, renderLabel: addressLabelRenderer, grow: 2, hideOnMobile: true },
];
const keyExtractor: TypedKeyExtrator = ({ data }) => data.id;

export class UserTable extends React.Component<Props> {
  private handleEntryClick: TypedEntryClickHandler = ({ data }) => {
    this.props.onUserClick(data);
  }

  public render() {
    return (
      <Table
        data={this.props.users}
        keyExtractor={keyExtractor}
        onEntryClick={this.handleEntryClick}
        columns={columns}
      />
    );
  }
}
