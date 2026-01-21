import { createContext, useContext, useState } from "react";
import { mockEmployees } from "../data/mockEmployees";

/**
 * EmployeeContext permet de gérer et d'accéder aux données des employés dans toute l'application.
 * Il comprend une liste des employés et une fonction pour en ajouter de nouveaux.
 */
const EmployeeContext = createContext();

    /**
     * Fournit le contexte des employés à ses composants enfants.
     * Le Provider maintient l'état des employés et offre une fonction pour en ajouter.
     * @param {*} param0 
     * @returns 
     */
export function EmployeeProvider({ children }) {
    // etat initial des employés
    const [employees, setEmployees] = useState(mockEmployees);

    // fonction pour ajouter un employé
    const addEmployee = (employee) => {
        setEmployees((prev) => [...prev, employee]); //pour eviter la mutation directe ou effet de bord
    };

    return (
        <EmployeeContext.Provider value={{ employees, addEmployee }}>
            {children}
        </EmployeeContext.Provider>
    );
}

/**
 * Hook personnalisé pour accéder au contexte des employés.
 * Pour éviter d'utiliser useContext directement dans les composants.
 * @returns 
 */
export function useEmployees() {
    const context = useContext(EmployeeContext);

    //Empêche l'utilisation en dehors du provider
    if (!context) {
        throw new Error("useEmployees must be used within EmployeeProvider");
    }

    return context;
}
