import React from "react";

export interface TableColumn<T> {
  header: string;
  accessor?: keyof T;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (row: T, index: number) => React.ReactNode;
}

interface CommonTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

const CommonTable = <T extends object>({
  columns,
  data,
  loading = false,
  emptyMessage = "No Records Found",
  className = "",
}: CommonTableProps<T>) => {
  return (
    <div className={`overflow-x-auto rounded-xl border border-gray-200 bg-white ${className}`}>
      <table className="min-w-full border-collapse">
        {/* Header */}
        <thead className="bg-sky-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                style={{ width: column.width }}
                className={`px-4 py-3 text-sm font-semibold text-gray-700 border-b border-gray-200 ${
                  column.align === "center"
                    ? "text-center"
                    : column.align === "right"
                    ? "text-right"
                    : "text-left"
                }`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={columns.length}
                className="py-8 text-center text-gray-500"
              >
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="py-8 text-center text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-gray-100 hover:bg-gray-50 transition"
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-4 py-3 text-sm text-gray-600 ${
                      column.align === "center"
                        ? "text-center"
                        : column.align === "right"
                        ? "text-right"
                        : "text-left"
                    }`}
                  >
                    {column.render
                      ? column.render(row, rowIndex)
                      : String(row[column.accessor as keyof T] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CommonTable;