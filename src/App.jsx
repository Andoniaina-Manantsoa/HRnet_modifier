// src/App.jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CreateEmployee from './pages/CreatEmployee.jsx';
import EmployeeList from './pages/EmployeeList.jsx';

function App() {
  return (
    <BrowserRouter>
      <h1 className='title'>HRnet</h1>
      <Link to="/employees" className='lien_tableau'>View Current Employees</Link>
      
      <Routes>
        <Route path="/" element={<CreateEmployee />} />
        <Route path="/employees" element={<EmployeeList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;