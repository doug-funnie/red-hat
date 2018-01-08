import { shallow } from 'enzyme';
import * as React from 'react';
import '../../../../../testUtils/addJestMatchers';
import { Entry } from './entry';
import { Props, Table } from './table';

const props: Props<number> = {
  data: [1],
  keyExtractor: jest.fn((v) => v),
  onEntryClick: jest.fn(),
  columns: [{
    id: 1,
    renderLabel: jest.fn(),
    renderCell: jest.fn(),
  }],
};

it('calls keyExtractor', () => {
  shallow(<Table {...props} />);
  expect(props.keyExtractor).toBeCalledWithSnapshot();
});

it('calls renderLabel', () => {
  shallow(<Table {...props} />);
  expect(props.columns[0].renderLabel).toBeCalledWithSnapshot();
});

it('passes onEntry click to the entries', () => {
  const view = shallow(<Table {...props} />);
  expect(view.find(Entry).props().onClick).toBe(props.onEntryClick);
});
