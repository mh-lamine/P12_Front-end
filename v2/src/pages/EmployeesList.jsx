import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import {
  rowsPerPageOptions,
  paginationOptions,
  tableHeaders,
} from "../assets/data";
import UpArrow from "../components/UpArrow";
import DownArrow from "../components/DownArrow";

export default function EmployeesList() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({ from: 1, to: 10, label: 10 });
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  const sortTable = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedEmployees = [...filteredEmployees].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setFilteredEmployees(sortedEmployees);
  };

  const numberOfPages = () => {
    return Math.ceil(filteredEmployees.length / rowsPerPage);
  };

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(storedEmployees);
    setFilteredEmployees(storedEmployees);
  }, []);

  useEffect(() => {
    setFilteredEmployees(
      employees.filter((employee) => {
        return (
          employee.firstName.toLowerCase().includes(search.toLowerCase()) ||
          employee.lastName.toLowerCase().includes(search.toLowerCase()) ||
          employee.startDate.toLowerCase().includes(search.toLowerCase()) ||
          employee.department.toLowerCase().includes(search.toLowerCase()) ||
          employee.dateOfBirth.toLowerCase().includes(search.toLowerCase()) ||
          employee.street.toLowerCase().includes(search.toLowerCase()) ||
          employee.city.toLowerCase().includes(search.toLowerCase()) ||
          employee.state.toLowerCase().includes(search.toLowerCase()) ||
          employee.zipCode.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  }, [search, employees]);

  return (
    <>
      <header>
        <h1>Current Employees</h1>
      </header>
      <section className="table-header">
        <div>
          Show
          <Input
            type="select"
            name="rowsPerPage"
            value={rowsPerPage}
            options={rowsPerPageOptions}
            onChange={(e) => setRowsPerPage(e.target.value)}
          />
          entries
        </div>
        <Input
          label="Search"
          type="text"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>
      <table>
        <thead>
          <tr>
            {tableHeaders.map((header, index) => (
              <th key={index} onClick={() => sortTable(header.key)}>
                {header.label}
                <span className="sort-arrows">
                  {sortConfig.key === header.key ? (
                    sortConfig.direction === "asc" ? (
                      <UpArrow size={16} />
                    ) : (
                      <DownArrow size={16} />
                    )
                  ) : (
                    <>
                      <UpArrow size={16} />
                      <DownArrow size={16} />
                    </>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees
              .slice(pagination.from - 1, pagination.from - 1 + rowsPerPage)
              .map((employee, index) => (
                <tr key={index}>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.startDate}</td>
                  <td>{employee.department}</td>
                  <td>{employee.dateOfBirth}</td>
                  <td>{employee.street}</td>
                  <td>{employee.city}</td>
                  <td>{employee.state}</td>
                  <td>{employee.zipCode}</td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="9">No data available in table</td>
            </tr>
          )}
        </tbody>
      </table>
      <section className="table-footer">
        <p>
          Showing {filteredEmployees.length} of {employees.length} entries
        </p>
        <div className="pagination">
          <button
            onClick={() => {
              currentPage > 0 &&
                (setCurrentPage(currentPage - 1),
                setPagination(paginationOptions[currentPage - 1]));
            }}
          >
            Previous
          </button>
          <span>{`${currentPage + 1} / ${numberOfPages()}`}</span>
          <button
            onClick={() => {
              currentPage + 1 < numberOfPages() &&
                (setCurrentPage(currentPage + 1),
                setPagination(paginationOptions[currentPage + 1]));
            }}
          >
            Next
          </button>
        </div>
      </section>
      <div>
        <Link to="/">Home</Link>
      </div>
    </>
  );
}
