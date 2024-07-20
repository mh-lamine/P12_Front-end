import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { rowsPerPageOptions } from "../assets/data";
import Table from "../components/Table";
import { EmployeesContext } from "../App";

export default function EmployeesList() {
  const { employees, setEmployees } = useContext(EmployeesContext);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [search, setSearch] = useState("");
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
    return Math.ceil(employees.length / rowsPerPage);
  };

  useEffect(() => {
    setFilteredEmployees(employees);
  }, []);

  useEffect(() => {
    function displayEmployees() {
      const start = currentPage * rowsPerPage;
      const end = start + rowsPerPage;
      return employees

        .filter((employee) => {
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
        .slice(start, end);
    }

    setFilteredEmployees(displayEmployees());
  }, [search, employees, currentPage, rowsPerPage]);

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
      <Table
        sortTable={sortTable}
        sortConfig={sortConfig}
        filteredEmployees={filteredEmployees}
      />
      <section className="table-footer">
        <p>
          Showing {filteredEmployees.length} of {employees.length} entries
        </p>
        <div className="pagination">
          <button
            onClick={() => {
              currentPage > 0 && setCurrentPage(currentPage - 1);
            }}
          >
            Previous
          </button>
          <span>{`${currentPage + 1} / ${numberOfPages()}`}</span>
          <button
            onClick={() => {
              currentPage + 1 < numberOfPages() &&
                setCurrentPage(currentPage + 1);
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
