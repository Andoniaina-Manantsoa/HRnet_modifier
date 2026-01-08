import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CreateEmployee from "./pages/CreatEmployee.jsx";
import EmployeeList from "./pages/EmployeeList.jsx";
import { useTheme } from "./context/ThemeContext.jsx";

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <BrowserRouter>
      <div>
        <header className="app-header">
          <h1 className="title">HRnet</h1>

          <div className="header-actions">
            <Link to="/employees" className="lien_tableau">
              View Current Employees
            </Link>
          </div>
        </header>

        <div className="app-container">
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === "light" ? "🌙 Dark mode" : "☀️ Light mode"}
          </button>
        </div>

        <Routes>
          <Route path="/" element={<CreateEmployee />} />
          <Route path="/employees" element={<EmployeeList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
