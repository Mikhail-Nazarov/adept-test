import { FC, memo, useContext } from "react";
import { CompaniesContext } from "../CompaniesTable/CompaniesTable";

type RowProps = {
  id: any;
  active: boolean;
  values: {
    name: string;
    value: string;
  }[];
  onToggleActiveRow: (key: any, value: boolean) => void;
};

export const TableRow: FC<RowProps> = ({
  id,
  active,
  values,
  onToggleActiveRow,
}) => {
  const onToggleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    onToggleActiveRow(id, e.target.checked);
  };

  const { onUpdate } = useContext(CompaniesContext);

  return (
    <div
      className={`table-row${active ? " active" : ""}`}
      style={{
        gridTemplateColumns: `min-content repeat(${values.length}, 1fr)`,
      }}
    >
      <div className="table-cell">
        <input
          checked={active}
          type="checkbox"
          onChange={onToggleCheckbox}
          title="Выделить строку"
        />
      </div>
      {values.map((value) => (
        <input
          onChange={(e) => onUpdate(id, value.name, e.target.value)}
          id={`${id}-${value.name}`}
          key={value.name}
          className="table-cell"
          value={value.value}
        />
      ))}
    </div>
  );
};

export const MemoizedTableRow = memo(TableRow, (prev, next) => {
  for (let i = 0; i < next.values.length; i++) {
    if (
      JSON.stringify(next.values) !== JSON.stringify(prev.values) ||
      prev.active !== next.active ||
      !Object.is(prev.onToggleActiveRow, next.onToggleActiveRow)
    ) {
      return false;
    }
  }
  return true;
});
