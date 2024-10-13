import { FC, useCallback, useState } from "react";
import "../../styles/table.scss";
import { MemoizedTableRow } from "./TableRow";
import { Modal } from "../UI/Modal";

export type TableProps<TItems extends object> = {
  keyName: string;
  columns: IColumn[];
  items: TItems[];
  formik: any;
  onDelete: (activeItems: Map<string, any>) => void;
};

export interface IColumn {
  name: string;
  title: string;
}

export const CustomTable: FC<TableProps<any>> = ({
  keyName,
  columns,
  items,
  onDelete,
  formik,
}) => {
  const [activeItems, setActiveItems] = useState<Map<typeof keyName, any>>(
    new Map()
  );
  const [showModal, setShowModal] = useState<boolean>(false);

  const onToggleActiveRow = useCallback((key: any, value: boolean) => {
    setActiveItems((prev) => {
      const clone = structuredClone(prev);
      if (!value) clone.delete(key);
      else clone.set(key, items[key]);
      return clone;
    });
  }, []);

  const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked)
      setActiveItems(new Map(items.map((item) => [item.id, item])));
    else setActiveItems(new Map());
  };

  const deleteItems = () => {
    onDelete(activeItems);
    setActiveItems(new Map());
  };

  return (
    <>
      <div className="buttons-wrapper">
        <button onClick={() => setShowModal(true)}>Добавить</button>
        <button onClick={deleteItems}>Удалить</button>
      </div>
      <div className="custom-table">
        <div
          className="table-header"
          style={{
            gridTemplateColumns: ` min-content repeat(${columns.length}, 1fr)`,
          }}
        >
          <div className="table-cell">
            <input
              type="checkbox"
              title="Выделить все"
              onChange={toggleSelectAll}
            />
          </div>
          {columns.map((column) => (
            <div key={column.name} className="table-cell">
              {column.title}
            </div>
          ))}
        </div>
        {items.map((item) => (
          <MemoizedTableRow
            id={item[keyName]}
            key={item[keyName]}
            active={activeItems.has(item[keyName])}
            values={columns.map((column) => ({
              name: column.name,
              value: item[column.name],
            }))}
            onToggleActiveRow={onToggleActiveRow}
          />
        ))}
      </div>
      <Modal show={showModal} setShow={setShowModal}>
        <form
          onSubmit={(e) => {
            setShowModal(false);
            formik.handleSubmit(e);
          }}
        >
          {columns.map((column) => (
            <div key={column.name}>
              <label htmlFor={column.name}>{column.title}:</label>
              <input
                id={column.name}
                name={column.name}
                onChange={formik.handleChange}
                value={formik.values[column.name]}
                required={true}
              />
            </div>
          ))}
          <button type="submit">Создать</button>
        </form>
      </Modal>
    </>
  );
};
