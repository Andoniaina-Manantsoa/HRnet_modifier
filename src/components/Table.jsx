import React, { useState, useMemo } from "react";

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
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
    }, [filteredEmployees, sortConfig]);

    // Pagination
    const totalPages = Math.ceil(sortedEmployees.length / rowsPerPage);
    const currentEmployees = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        return sortedEmployees.slice(start, start + rowsPerPage);
    }, [sortedEmployees, currentPage, rowsPerPage]);

    const requestSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
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

            <table className="employee-table">
                <thead>
                    <tr>
                        {["First Name", "Last Name", "Start Date", "Department", "Date of Birth", "Street", "City", "State", "Zip Code"].map((key) => (
                            <th
                                key={key}
                                onClick={() => requestSort(key)}
                                className="sortable"
                            >
                                {key}
                                {sortConfig.key === key}
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
