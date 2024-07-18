import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EmployeesList from "./pages/EmployeesList";

export default function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/employees-list" element={<EmployeesList />} />
        </Routes>
    </>
  );
}
