import { useEffect, useState } from 'react';
import EmployeeTable from '../components/Table.jsx';

export default function EmployeeList() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
        setEmployees(storedEmployees);
    }, []);

    return (
        <div>
            <h1>Employee List</h1>
            <EmployeeTable employees={employees} />
        </div>
    );
}
