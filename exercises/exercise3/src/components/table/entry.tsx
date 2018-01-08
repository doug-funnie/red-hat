import * as React from 'react';
import { Cell } from './cell';
import { Column } from './column';
import { Row } from './row';

export type EntryClickHandler<D> = (props: { data: D, index: number, event: React.MouseEvent<HTMLDivElement> }) => void;

export interface Props<D = any> {
  data: D;
  index: number;
  columns: Column<D>[];
  onClick: EntryClickHandler<D>;
}

export class Entry extends React.Component<Props> {
  private handleRowClick = (event: React.MouseEvent<HTMLDivElement>) => {
   this.props.onClick({
      event,
      data: this.props.data,
      index: this.props.index,
    });
  }

  public render() {
    const {
      data,
      index,
      columns,
      onClick,
    } = this.props;

    return (
      <Row onClick={onClick ? this.handleRowClick : undefined}>
        {columns.map((column) => (
          <Cell key={column.id} grow={column.grow} hideOnMobile={column.hideOnMobile}>
            {column.renderCell({ data, index , column })}
          </Cell>
        ))}
      </Row>
    );
  }
}
