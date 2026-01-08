import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EmployeeTable from '../components/Table.jsx';

// fonction EmployeeList pour afficher la liste des employés
export default function EmployeeList() {
    const [employees, setEmployees] = useState([]);

    // useEffect pour charger les employés depuis le localStorage au montage du composant
    useEffect(() => {
        const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
        setEmployees(storedEmployees);
    }, []);

    return (
        <div>
            <h1>Employee List</h1>
            <EmployeeTable employees={employees} />

            {/* Lien vers la page de création d'employé */}
            <div className="create-employee-link">
                <Link to="/" className="create-link">
                    + Add New Employee
                </Link>
            </div>
        </div>
    );
}
