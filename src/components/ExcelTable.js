import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ExcelTable = ({ excelData, selectedCells, handleRemoveRow, handleCellSelect, handleReorderCells }) => {
  return (
    <div>
      <h1>Excel App</h1>

      {/* Table to display the data */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {/* Render the column names */}
              {excelData[0].map((column, columnIndex) => (
                <TableCell key={columnIndex}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Render the rows and cells */}
            {excelData.slice(1).map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {/* Button to remove the entire row */}
                <TableCell className="text-center p-1">
                  <button
                    onClick={() => handleRemoveRow(rowIndex + 1)} // Adjust the index for data offset
                    className="remove-row-button bg-red-500 text-white rounded px-2 py-1"
                  >
                    Remove
                  </button>
                </TableCell>
                {row.map((cell, columnIndex) => (
                  <TableCell
                    key={columnIndex}
                    onClick={() => handleCellSelect(rowIndex + 1, columnIndex)} // Adjust the index for data offset
                    className={`px-4 py-2 border border-gray-300 ${
                      selectedCells.some(
                        (selectedCell) =>
                          selectedCell.row === rowIndex + 1 && selectedCell.column === columnIndex
                      ) ? 'bg-yellow-200' : ''}`}
                    draggable // Enable dragging
                    onDragStart={(e) => e.dataTransfer.setData('text/plain', (rowIndex + 1) + ',' + columnIndex)} // Adjust the index for data offset
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      const [startRowIndex] = e.dataTransfer.getData('text/plain').split(',');
                      const startIndex = parseInt(startRowIndex);
                      const endIndex = rowIndex + 1; // Adjust the index for data offset

                      if (startIndex === endIndex) {
                        return;
                      }

                      handleReorderCells(startIndex, endIndex);
                    }}
                  >
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ExcelTable;
