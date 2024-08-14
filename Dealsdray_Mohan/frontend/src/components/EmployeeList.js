import React, { useState, useEffect } from 'react'; import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import './EmployeeList.css';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const nav = useNavigate();
  const userName = "admin";
  useEffect(() => {
    // Fetch employees from the API
    axios.get('http://localhost:3333/emplist')
      .then(response => {
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      })
      .catch(error => console.error('Error fetching the employee list:', error));
  }, []);

  useEffect(() => {
    // Filter employees based on the search term
    setFilteredEmployees(
      employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, employees]);

  return (
    <div>
      <Header name={userName} />
      <div className="employee-list-container">
        <div className="employee-list-header">
          <h1>Employee List</h1>
          <button className="create-employee-button" onClick={() => nav('/CreateEmployee')}>Create Employee</button>
        </div>
        <div className="employee-list-actions">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <p>Total Employees: {filteredEmployees.length}</p>
        </div>
        <table className="employee-table">
          <thead>
            <tr>
              <th>Unique ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Create Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(employee => (
              <tr key={employee.uniqueId}>
                <td>{employee.uniqueId}</td>
                <td><img src={`http://localhost:3333/${employee.image}`} alt={employee.name} className="employee-image" /></td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.mobileNumber}</td>
                <td>{employee.designation}</td>
                <td>{employee.gender}</td>
                <td>{employee.course}</td>
                <td>{employee.createDate}</td>
                <td>
                  <button className="edit-button" onClick={() => nav('/EditEmployee', {state:{id:employee.uniqueId}})}>Edit</button>
                  <button className="delete-button" onClick={() => {axios.delete('http://localhost:3333/api/employees/'+employee.uniqueId).then(res => {if(res.status===200){alert("Record has been deleted successfully");}})}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeList;
