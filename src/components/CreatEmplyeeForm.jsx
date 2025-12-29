// src/components/CreateEmployeeForm.jsx
import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import DatePickerInput from "../components/DatePickerInput";
import SelectInput from "../components/SelectInput";
import { states } from "../data/states";

const departments = [
    { value: "Sales", label: "Sales" },
    { value: "Marketing", label: "Marketing" },
    { value: "Engineering", label: "Engineering" },
    { value: "Human Resources", label: "Human Resources" },
    { value: "Legal", label: "Legal" },
];

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
                <label>
                    <p>First Name</p>
                    <input name="firstName" value={formData.firstName} onChange={handleChange} required />
                </label>

                <label>
                    <p>Last Name</p>
                    <input name="lastName" value={formData.lastName} onChange={handleChange} required />
                </label>

                <label>
                    <DatePickerInput
                        label="Date of Birth"
                        id="dateOfBirth"
                        selectedDate={formData.dateOfBirth}
                        onChange={(date) => handleDateChange("dateOfBirth", date)}
                    />
                </label>

                <label>
                    <DatePickerInput
                        label="Start Date"
                        id="startDate"
                        selectedDate={formData.startDate}
                        onChange={(date) => handleDateChange("startDate", date)}
                    />
                </label>

                <fieldset className='adress'>
                    <legend>Address</legend>

                    <label>
                        <p>Street</p>
                        <input name="street" value={formData.street} onChange={handleChange} />
                    </label>

                    <label>
                        <p>City</p>
                        <input name="city" value={formData.city} onChange={handleChange} />
                    </label>

                    <label>
                        <SelectInput
                            label="State"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            options={states}
                        />
                    </label>

                    <label>
                        <p>Zip Code</p>
                        <input name="zipCode" value={formData.zipCode} onChange={handleChange} />
                    </label>
                </fieldset>

                <label>
                    <SelectInput
                        label="Department"
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        options={departments}
                    />
                </label>

                <button type="submit">Save</button>
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
