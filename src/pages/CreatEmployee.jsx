import React from 'react';
import CreateEmployeeForm from '../components/CreatEmployeeForm.jsx';

// fonction CreateEmployee pour afficher la page de création d'employé
export default function CreateEmployee() {
    return (
        <div>
            <h2 className='title_create_employee'>Create Employee</h2>
            <CreateEmployeeForm />
        </div>
    );
}
