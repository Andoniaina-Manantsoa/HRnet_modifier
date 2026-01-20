import React, { useState, useMemo } from "react";

// configuration des colonnes (label affiché + clé réelle)
const columns = [
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Start Date", key: "startDate" },
    { label: "Department", key: "department" },
    { label: "Date of Birth", key: "dateOfBirth" },
    { label: "Street", key: "street" },
    { label: "City", key: "city" },
    { label: "State", key: "state" },
    { label: "Zip Code", key: "zipCode" },
];

// fonction EmployeeTable pour afficher les employés dans un tableau avec recherche, tri et pagination
export default function EmployeeTable({ employees }) {
    const [search, setSearch] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Filtrage par recherche
    const filteredEmployees = useMemo(() => {
        return employees.filter(emp =>
            Object.values(emp)
                .join(" ")
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [employees, search]);

    // Tri
    const sortedEmployees = useMemo(() => {
        if (!sortConfig.key) return filteredEmployees;

        return [...filteredEmployees].sort((a, b) => {
            let aValue = a[sortConfig.key];
            let bValue = b[sortConfig.key];

            // gestion des dates
            if (sortConfig.key === "startDate" || sortConfig.key === "dateOfBirth") {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            }

            if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
    }, [filteredEmployees, sortConfig]);

    // Pagination
    // calcul du nombre total de pages
    const totalPages = Math.ceil(sortedEmployees.length / rowsPerPage);

    // mise à jour des employés affichés en fonction de la page courante et du nombre de lignes par page
    const currentEmployees = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        return sortedEmployees.slice(start, start + rowsPerPage);
    }, [sortedEmployees, currentPage, rowsPerPage]);

    // Gestion du clic sur l'entête pour trier
    const requestSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    // Gestion du clavier pour le tri
    const handleKeyDown = (event, key) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            requestSort(key);
        }
    };

    // Détermination de l'état aria-sort pour l'accessibilité
    const getAriaSort = (key) => {
        if (sortConfig.key !== key) return "none";
        return sortConfig.direction === "asc" ? "ascending" : "descending";
    };

    return (
        <div>
            {/* Recherche */}
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1); // reset page on search
                }}
                className="search-input"
            />

            {/* Changement de lignes par page */}
            <select
                value={rowsPerPage}
                onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                }}
                className="rows-select"
            >
                {[5, 10, 20, 50].map(n => (
                    <option key={n} value={n}>{n} per page</option>
                ))}
            </select>

            {/* Tableau */}
            <table className="employee-table">
                <thead>
                    <tr>
                        {columns.map(({ label, key }) => (
                            <th
                                key={key}
                                role="columnheader"
                                tabIndex={0}
                                aria-sort={getAriaSort(key)}
                                onClick={() => requestSort(key)}
                                onKeyDown={(e) => handleKeyDown(e, key)}
                                className="sortable"
                            >
                                <span className="th-content">
                                    <span className="th-label">{label}</span>

                                    <span className="sort-icon">
                                        {sortConfig.key === key
                                            ? sortConfig.direction === "asc"
                                                ? "▲"
                                                : "▼"
                                            : "⇅"}
                                    </span>
                                </span>
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {currentEmployees.map((emp, index) => (
                        <tr key={index} className="border-b">
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

            {/* Pagination */}
            <div className="pagination">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <span>
                    Page {currentPage} / {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
