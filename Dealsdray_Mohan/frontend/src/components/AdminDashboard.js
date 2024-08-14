import React, { useEffect, useState } from 'react';
import './Login.css'; import Header from './Header';
import {useNavigate, useLocation } from 'react-router-dom';
function AdminDashboard() {
    const nav = useNavigate();
    const location = useLocation();
    const name = "admin";
  return (
    <div style={{textAlign:'center'}}>
        <Header userName={name}/>
        <h1>Welcome Admin Panel</h1>
    </div>
  );
}

export default AdminDashboard;
