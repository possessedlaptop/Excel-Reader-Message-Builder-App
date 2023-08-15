import React from 'react';

const SelectedCells = ({ selectedCells, excelData, handleRemoveVariable, handleReorderCells }) => {
  return (
    <div className="selected-cells mt-4 flex">
      {selectedCells.map((cell, index) => (
        <div
          key={`${cell.row}-${cell.column}`}
          className="selected-cell bg-yellow-200 px-2 py-1 border border-gray-300 rounded flex items-center mr-2 mb-2"
        >
          {excelData[cell.row][cell.column]}
          <button
            onClick={() => handleRemoveVariable(index)}
            className="remove-variable-button ml-2 bg-red-500 text-white rounded px-1 py-1"
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default SelectedCells;
