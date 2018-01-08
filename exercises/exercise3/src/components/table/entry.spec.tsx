import { shallow } from 'enzyme';
import * as React from 'react';
import '../../../../../testUtils/addJestMatchers';
import { Entry, Props } from './entry';
import { Row } from './row';

const props: Props<number> = {
  data: 1,
  index: 0,
  onClick: jest.fn(),
  columns: [{
    id: 1,
    renderLabel: jest.fn(),
    renderCell: jest.fn(),
  }],
};

it('calls renderCell for column', () => {
  shallow(<Entry {...props} />);
  expect(props.columns[0].renderCell).toBeCalledWithSnapshot();
});

it('calls onClick on row click', () => {
  const view = shallow(<Entry {...props} />);
  view.find(Row).simulate('click', 'event');
  expect(props.onClick).toBeCalledWithSnapshot();
});
