import { createContext, useContext, useState } from "react";
import { mockEmployees } from "../data/mockEmployees";

const EmployeeContext = createContext();

export function EmployeeProvider({ children }) {
    const [employees, setEmployees] = useState(mockEmployees);

    const addEmployee = (employee) => {
        setEmployees((prev) => [...prev, employee]);
    };

    return (
        <EmployeeContext.Provider value={{ employees, addEmployee }}>
            {children}
        </EmployeeContext.Provider>
    );
}

export function useEmployees() {
    const context = useContext(EmployeeContext);

    if (!context) {
        throw new Error("useEmployees must be used within EmployeeProvider");
    }

    return context;
}
