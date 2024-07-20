import { tableHeaders } from "../assets/data";
import DownArrow from "./DownArrow";
import UpArrow from "./UpArrow";

export default function Table({sortTable, sortConfig, filteredEmployees}) {
  return (
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
          filteredEmployees.map((employee, index) => {
            return (
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
            );
          })
        ) : (
          <tr>
            <td colSpan="9">No data available in table</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
