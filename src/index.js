// Import necessary modules and styles
import React from 'react';
import ReactDOM from 'react-dom'; // Use ReactDOM instead of ReactDOM from 'react-dom/client'
import './index.css'; // Import custom CSS styles
import './tailwind.css'; // Import the Tailwind CSS file
import App from './App'; // Import the main App component
import reportWebVitals from './reportWebVitals'; // Import the reportWebVitals function

// Create a root for ReactDOM
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component within React.StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
