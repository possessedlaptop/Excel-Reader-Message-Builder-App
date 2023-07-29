// App.js
import React, { useState } from 'react';
import ExcelUploader from './ExcelUploader';
import './App.css';
import SlothIcon from './Sloth-icon.png'; // Import the Sloth-icon.png image from the src folder

const App = () => {
  // State variables
  const [excelData, setExcelData] = useState([]); // Holds the loaded Excel data
  const [selectedCells, setSelectedCells] = useState([]); // Holds the selected cell values
  const [message, setMessage] = useState(''); // Holds the user input message
  const [outputMessage, setOutputMessage] = useState(''); // Holds the output message with replaced values

  // State variable for toast message
  const [toastMessage, setToastMessage] = useState('');

  // Function to handle data loaded from Excel file
  const handleDataLoaded = (data) => {
    setExcelData(data); // Update the state with the loaded data
  };

  // Function to handle cell selection
  const handleCellSelect = (rowIndex, columnIndex) => {
    const isCellSelected = selectedCells.some(
      (cell) => cell.row === rowIndex && cell.column === columnIndex
    );

    if (isCellSelected) {
      setSelectedCells(selectedCells.filter((cell) => !(cell.row === rowIndex && cell.column === columnIndex)));
    } else {
      setSelectedCells([...selectedCells, { row: rowIndex, column: columnIndex }]);
    }
  };

  // Function to handle the reordering of selected cells
  const handleReorderCells = (startIndex, endIndex) => {
    if (startIndex === endIndex) {
      return;
    }

    const reorderedCells = Array.from(selectedCells);
    const [removedCell] = reorderedCells.splice(startIndex, 1);
    reorderedCells.splice(endIndex, 0, removedCell);

    setSelectedCells(reorderedCells);
  };

  // Function to generate the output message
  const handleGenerateOutput = () => {
    let output = message; // Copy the input message

    // Find all occurrences of '?' in the message and replace them with selected cell values
    selectedCells.forEach((data) => {
      const cellValue = excelData[data.row][data.column];
      output = output.replace('?', cellValue);
    });

    setOutputMessage(output); // Update the state with the output message
  };

  // Function to clear the selected cells
  const handleClearSelection = () => {
    setSelectedCells([]); // Clear the selected cell values from the state
  };

  // Function to remove a variable from the preview list
  const handleRemoveVariable = (index) => {
    const updatedSelectedCells = [...selectedCells];
    updatedSelectedCells.splice(index, 1);
    setSelectedCells(updatedSelectedCells);
  };

  // Function to remove a column from the table
  const handleRemoveColumn = (columnIndex) => {
    if (selectedCells.some((cell) => cell.column === columnIndex)) {
      setToastMessage('Cannot delete a column with selected cells.');
      return;
    }

    setExcelData((prevData) => prevData.map((row) => row.filter((cell, index) => index !== columnIndex)));
  };

  // Function to remove a row from the table
  const handleRemoveRow = (rowIndex) => {
    if (selectedCells.some((cell) => cell.row === rowIndex)) {
      setToastMessage('Cannot delete a row with selected cells.');
      return;
    }

    setExcelData((prevData) => prevData.filter((row, index) => index !== rowIndex));
  };

  // Function to handle the close of the toast message
  const handleCloseToast = () => {
    setToastMessage('');
  };

  return (
    <div className="App">
      <div className="container">
        {/* Title with sloth icon */}
        <div className="title-container">
          {/* Your sloth icon */}
          <div className="sloth-icon-container">
            <img src={SlothIcon} alt="Sloth Icon" /> {/* Use the imported Sloth-icon.png */}
          </div>
          {/* Title */}
          <h1 className="title">Sloth Lazy Mail Builder</h1>
        </div>

        {/* Excel file uploader */}
        <ExcelUploader onDataLoaded={handleDataLoaded} />

        {/* Display the Excel data as a table */}
        <table>
          <tbody>
            {excelData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {/* Button to remove the entire row */}
                <td>
                  <button className="remove-row-button" onClick={() => handleRemoveRow(rowIndex)}>
                    X
                  </button>
                </td>
                {row.map((cell, columnIndex) => (
                  <td
                    key={columnIndex}
                    onClick={() => handleCellSelect(rowIndex, columnIndex)}
                    className={selectedCells.some(
                      (selectedCell) =>
                        selectedCell.row === rowIndex && selectedCell.column === columnIndex
                    )
                      ? 'selected'
                      : ''}
                    draggable // Enable dragging
                    onDragStart={(e) => e.dataTransfer.setData('text/plain', rowIndex + ',' + columnIndex)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      const [startRowIndex, startColumnIndex] = e.dataTransfer.getData('text/plain').split(',');
                      const startIndex = parseInt(startRowIndex);
                      const endIndex = rowIndex;

                      if (startIndex === endIndex) {
                        return;
                      }

                      handleReorderCells(startIndex, endIndex);
                    }}
                  >
                    {cell}
                    {selectedCells.some(
                      (selectedCell) =>
                        selectedCell.row === rowIndex && selectedCell.column === columnIndex
                    ) && (
                      <button className="remove-button" onClick={() => handleCellSelect(rowIndex, columnIndex)}>
                        X
                      </button>
                    )}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              {excelData[0]?.map((_, columnIndex) => (
                // Button to remove the entire column
                <td key={columnIndex}>
                  <button className="remove-column-button" onClick={() => handleRemoveColumn(columnIndex)}>
                    X
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        {/* Input message textarea */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message here..."
        ></textarea>

        {/* Button to generate the output */}
        <button onClick={handleGenerateOutput}>Generate Output</button>

        {/* Button to clear the selection */}
        <button onClick={handleClearSelection}>Clear Selection</button>

        {/* Output message textarea */}
        <textarea value={outputMessage} readOnly placeholder="Your output will appear here..."></textarea>

        {/* Hint for using '?' as variables */}
        <div className="hint">Hint: Use '?' as variables in your message.</div>

        {/* Show selected cells */}
        <div className="selected-cells">
          {selectedCells.map((cell, index) => (
            <div
              key={`${cell.row}-${cell.column}`}
              className="selected-cell"
              draggable // Enable dragging for the variables in the preview list
              onDragStart={(e) => e.dataTransfer.setData('text/plain', index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const startIndex = parseInt(e.dataTransfer.getData('text/plain'));
                const endIndex = index;
                handleReorderCells(startIndex, endIndex);
              }}
            >
              {excelData[cell.row][cell.column]}
              {/* Button to remove the variable */}
              <button className="remove-variable-button" onClick={() => handleRemoveVariable(index)}>
                X
              </button>
            </div>
          ))}
        </div>

        {/* Toast message */}
        {toastMessage && (
          <div className="toast">
            <span>{toastMessage}</span>
            <button className="close-toast-button" onClick={handleCloseToast}>
              X
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
