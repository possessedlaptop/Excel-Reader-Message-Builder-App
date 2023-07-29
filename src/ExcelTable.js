import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import * as XLSX from 'xlsx'; // Import all exports from XLSX

const ExcelTable = () => {
  // State variable for the message input
  const [message, setMessage] = useState('');

  // Sample data for the table
  const columns = ['ID', 'Name', 'Age'];
  const rows = [
    [1, 'John Doe', 28],
    [2, 'Jane Smith', 34],
    // Add more rows as needed
  ];

  // Function to handle export button click
  const handleExport = () => {
    // Create a worksheet using the data
    const worksheet = XLSX.utils.aoa_to_sheet([columns, ...rows]);

    // Create a new workbook and add the worksheet to it
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Save the workbook as 'data.xlsx'
    XLSX.writeFile(workbook, 'data.xlsx');
  };

  return (
    <div>
      <h1>Excel App</h1>

      {/* Textarea for user input */}
      <textarea
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      {/* Button to export the data to Excel */}
      <Button variant="contained" onClick={handleExport}>
        Export to Excel
      </Button>

      {/* Table to display the data */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {/* Render the column names */}
              {columns.map((column) => (
                <TableCell key={column}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Render the rows and cells */}
            {rows.map((row) => (
              <TableRow key={row[0]}>
                {row.map((cell, index) => (
                  <TableCell key={index}>{cell}</TableCell>
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
