// src/components/CreateEmployeeForm.jsx
import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import DatePickerInput from "./DatePickerInput";
import SelectInput from "./SelectInput";
import { states } from "../data/states";

const departments = [
    { value: "Sales", label: "Sales" },
    { value: "Marketing", label: "Marketing" },
    { value: "Engineering", label: "Engineering" },
    { value: "Human Resources", label: "Human Resources" },
    { value: "Legal", label: "Legal" },
];

const stateOptions = states.map((state) => ({
    value: state.name,
    label: state.name,
}));

export default function CreateEmployeeForm() {
    const [employees, setEmployees] = useLocalStorage('employees', []);
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: null,
        startDate: null,
        street: "",
        city: "",
        state: "Alabama",
        zipCode: "",
        department: "Sales",
    });

    const handleDateChange = (name, date) => {
        setFormData((prev) => ({
            ...prev,
            [name]: date,
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const employee = {
            ...formData,
            dateOfBirth: formData.dateOfBirth?.toISOString(),
            startDate: formData.startDate?.toISOString(),
        };

        setEmployees([...employees, employee]);
        setShowModal(true);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="employee-form">
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required/>

                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />

                <label htmlFor="dateOfBirth">Date of Birth</label>
                    <DatePickerInput
                        id="dateOfBirth"
                        selectedDate={formData.dateOfBirth}
                        onChange={(date) => handleDateChange("dateOfBirth", date)}
                    />

                <label htmlFor="startDate">Start Date</label>
                    <DatePickerInput
                        id="startDate"
                        selectedDate={formData.startDate}
                        onChange={(date) => handleDateChange("startDate", date)}
                    />

                <fieldset className='adress'>
                    <legend>Address</legend>

                    <label htmlFor="street">Street</label>
                        <input name="street" value={formData.street} onChange={handleChange} />
                    

                    <label htmlFor="city">City</label>
                        <input name="city" value={formData.city} onChange={handleChange} />

                    <label htmlFor="zipCode">Zip Code</label>
                    <input name="zipCode" value={formData.zipCode} onChange={handleChange} />

                    <label htmlFor="state">State</label>
                        <SelectInput
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            options={stateOptions}
                        />

                    <label htmlFor="zipCode">Zip Code</label>
                        <input name="zipCode" value={formData.zipCode} onChange={handleChange} />
                    
                </fieldset>

                <label htmlFor="department">Department</label>
                    <SelectInput
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        options={departments}
                    />

                <button type="submit" className='button_save'>Save</button>
            </form>

            {showModal && (
                <div className="modal">
                    <p>Employee Created!</p>
                    <button onClick={() => setShowModal(false)}>Close</button>
                </div>
            )}
        </>
    );
}
