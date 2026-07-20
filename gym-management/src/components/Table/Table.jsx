import React from 'react'

const Table = ({ columns, data, className = '' }) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-light)] bg-[var(--bg-gray)]">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--glass-border)]">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-[var(--glass-bg)] transition-colors">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-6 py-4 text-sm text-[var(--text-light)]">
                  {column.render ? column.render(row, rowIndex) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
