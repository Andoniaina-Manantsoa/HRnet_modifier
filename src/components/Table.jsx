import React from 'react';

// Composant Table pour les employés
export default function EmployeeTable({ employees }) {
    if (!employees || employees.length === 0) {
        return <p>No employees found.</p>;
    }

    return (
        <table className="employee-table">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Start Date</th>
                    <th>Department</th>
                    <th>Date of Birth</th>
                    <th>Street</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Zip Code</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((emp, index) => (
                    <tr key={index}>
                        <td>{emp.firstName}</td>
                        <td>{emp.lastName}</td>
                        <td>{emp.startDate}</td>
                        <td>{emp.department}</td>
                        <td>{emp.dateOfBirth}</td>
                        <td>{emp.street}</td>
                        <td>{emp.city}</td>
                        <td>{emp.state}</td>
                        <td>{emp.zipCode}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
