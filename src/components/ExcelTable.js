// ExcelTable.js
import React from 'react';

const ExcelTable = ({
  excelData,
  selectedCells,
  handleRemoveRow,
  handleCellSelect,
  handleReorderCells,
}) => {
        {/* Margin between the table and the uploader */}
        <div className="mt-6">
          {/* Display the Excel data as a table */}
          <table className="w-full table-auto mb-6">
            <tbody>
              {excelData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {/* Button to remove the entire row */}
                  <td className="text-center p-1">
                    <button
                      onClick={() => handleRemoveRow(rowIndex)}
                      className="remove-row-button bg-red-500 text-white rounded px-2 py-1"
                    >
                      Remove
                    </button>
                  </td>
                  {row.map((cell, columnIndex) => (
                    <td
                      key={columnIndex}
                      onClick={() => handleCellSelect(rowIndex, columnIndex)}
                      className={`px-4 py-2 border border-gray-300 ${
                        selectedCells.some(
                          (selectedCell) =>
                            selectedCell.row === rowIndex && selectedCell.column === columnIndex
                        ) ? 'bg-yellow-200' : ''}`}
                      draggable // Enable dragging
                      onDragStart={(e) => e.dataTransfer.setData('text/plain', rowIndex + ',' + columnIndex)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        const [startRowIndex] = e.dataTransfer.getData('text/plain').split(',');
                        const startIndex = parseInt(startRowIndex);
                        const endIndex = rowIndex;

                        if (startIndex === endIndex) {
                          return;
                        }

                        handleReorderCells(startIndex, endIndex);
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
};

export default ExcelTable;
