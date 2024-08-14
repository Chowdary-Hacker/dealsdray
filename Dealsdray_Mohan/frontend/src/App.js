import React from 'react';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import Login from './components/Login'; import EmployeeList from './components/EmployeeList'; import EditEmployee from './components/EditEmployee';
import './App.css'; import AdminDashboard from './components/AdminDashboard'; import CreateEmployee from './components/CreateEmployee';
function App() {
  return (
      <Router>
      <Routes>
      <Route path="/" element={  <Login />} />
      <Route path="/AdminDashboard" element={  <AdminDashboard />} />
      <Route path="/EmployeeList" element={  <EmployeeList />} />
      <Route path="/CreateEmployee" element={  <CreateEmployee />} />
      <Route path="/EditEmployee" element={  <EditEmployee />} />
      </Routes>
      </Router>
    
  );
}

export default App;
