import React from 'react';
import {Link } from 'react-router-dom';
import './Header.css';

function Header(props) {
    var name = "admin"
  return (
    <header className="header">
      <img src="https://is2-ssl.mzstatic.com/image/thumb/Purple114/v4/b5/60/9b/b5609b14-e928-3f4d-0a34-6ead78a0ada4/source/512x512bb.jpg
" alt="Logo" className="logo" />
      <nav>
        <ul className="nav-links">
            
          <li><Link to={{ pathname: "/AdminDashboard", state: { userName: name } }}>Home</Link></li>
          <li><Link to={{ pathname: "/EmployeeList", state: { userName: name } }}>Employee List</Link></li>
          <li>{name}</li>
          <li><Link to="/">Logout</Link></li>

        </ul>
      </nav>
    </header>
  );
}

export default Header;
