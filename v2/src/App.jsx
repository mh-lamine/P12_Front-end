import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EmployeesList from "./pages/EmployeesList";
import { createContext, useState } from "react";

export const EmployeesContext = createContext();

export default function App() {
  const [employees, setEmployees] = useState([]);
  return (
    <>
      <EmployeesContext.Provider value={{ employees, setEmployees }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/employees-list" element={<EmployeesList />} />
        </Routes>
      </EmployeesContext.Provider>
    </>
  );
}
