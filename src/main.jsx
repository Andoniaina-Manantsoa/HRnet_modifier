import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';
import './styles/employeeTable.css';
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { EmployeeProvider } from "./context/EmployeeContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <EmployeeProvider>
        <App />
      </EmployeeProvider>
    </ThemeProvider>
  </React.StrictMode>
);
