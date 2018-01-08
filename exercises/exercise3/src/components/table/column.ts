export type CellRenderer<D> = (props: {
  data: D;
  index: number;
  column: Column<D>;
}) => React.ReactNode;

export type LabelRenderer<D> = (props: { column: Column<D>, index: number }) => React.ReactNode;

export type KeyExtractor<D> = (props: { data: D, index: number }) => string | number;

export type RowClickHandler<D> = (props: { data: D, index: number, event: React.MouseEvent<HTMLDivElement> }) => void;

export interface Column<D> {
  id: string | number;
  renderCell: CellRenderer<D>;
  renderLabel: LabelRenderer<D>;
  grow?: number;
  hideOnMobile?: boolean;
}
