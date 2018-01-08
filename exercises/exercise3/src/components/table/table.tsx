import * as React from 'react';
import { Cell } from './cell';
import { Column } from './column';
import { Entry, EntryClickHandler } from './entry';
import { Row } from './row';

export type KeyExtractor<D> = (props: { data: D, index: number }) => string | number;

export interface Props<D> {
  data: D[];
  columns: Column<D>[];
  keyExtractor: KeyExtractor<D>;
  onEntryClick?: EntryClickHandler<D>;
}

export function Table<D>(props: Props<D>) {
  return (
    <div>
      <Row isHeading>
        {props.columns.map((c, i) => (
          <Cell
            isHeading
            key={c.id}
            grow={c.grow}
            hideOnMobile={c.hideOnMobile}
          >
            {c.renderLabel({ column: c, index: i })}
          </Cell>
        ))}
      </Row>
      {props.data.map((d, i) => (
        <Entry
          key={props.keyExtractor({ data: d, index: i })}
          data={d}
          index={i}
          columns={props.columns}
          onClick={props.onEntryClick}
        />
      ))}
    </div>
  );
}
