import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { departments, states } from "../assets/data";
import Modal from "custom-success-modal";

export default function HomePage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    startDate: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    department: "",
  });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    employees.push(formData);
    localStorage.setItem("employees", JSON.stringify(employees));

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      startDate: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      department: "",
    });
  };

  return (
    <div>
      <header>
        <h1>HRnet</h1>
        <button>
          <Link to="/employees-list">View Current Employees</Link>
        </button>
        <h2>Create Employee</h2>
      </header>
      <form>
        <Input
          label="First Name"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <Input
          label="Last Name"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <Input
          label="Date of Birth"
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
        <Input
          label="Start Date"
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />

        <Input
          label="Street"
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
        />
        <Input
          label="City"
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
        <Input
          label="State"
          type="select"
          name="state"
          options={states}
          value={formData.state}
          onChange={handleChange}
        />
        <Input
          label="Zip Code"
          type="text"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
        />

        <Input
          label="Department"
          type="select"
          name="department"
          options={departments}
          value={formData.department}
          onChange={handleChange}
        />
      </form>
      <button onClick={handleSubmit}>Save</button>
      {showModal && (
        <Modal content="Employee Created" closeModal={closeModal} />
      )}
    </div>
  );
}
