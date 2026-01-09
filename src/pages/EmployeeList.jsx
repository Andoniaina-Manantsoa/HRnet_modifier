import { Link } from 'react-router-dom';
import EmployeeTable from '../components/Table.jsx';
import { useEmployees } from "../context/EmployeeContext";

// fonction EmployeeList pour afficher la liste des employés
export default function EmployeeList() {
    const { employees } = useEmployees();

    return (
        <div>
            <h1>Employee List</h1>
            <EmployeeTable employees={employees} />

            <div className="create-employee-link">
                <Link to="/" className="create-link">
                    + Add New Employee
                </Link>
            </div>
        </div>
    );
}
