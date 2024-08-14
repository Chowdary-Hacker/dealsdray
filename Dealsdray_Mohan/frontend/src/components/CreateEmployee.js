import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';

const CreateEmployee = () => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    designation: 'HR',
    gender: 'Male',
    course: [],
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'course') {
      const courses = [...employee.course];
      if (e.target.checked) {
        courses.push(value);
      } else {
        const index = courses.indexOf(value);
        if (index > -1) {
          courses.splice(index, 1);
        }
      }
      setEmployee({ ...employee, course: courses });
    } else {
      setEmployee({ ...employee, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    setEmployee({ ...employee, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in employee) {
      if (key === 'course') {
        formData.append(key, employee[key].join(','));
      } else {
        formData.append(key, employee[key]);
      }
    }

    try {
      const response = await axios.post('http://localhost:3333/api/employees', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Employee created:', response.data); alert("Employee details has been successfully inserted");
    } catch (error) {
      console.error('There was an error creating the employee!', error);
    }
  };

  return (
    <div>
        <Header/>
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={employee.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={employee.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Mobile Number:</label>
          <input type="text" name="mobileNumber" value={employee.mobileNumber} onChange={handleChange} required />
        </div>
        <div>
          <label>Designation:</label>
          <select name="designation" value={employee.designation} onChange={handleChange} required>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div>
          <label>Gender:</label>
          <label>
            <input type="radio" name="gender" value="Male" checked={employee.gender === 'Male'} onChange={handleChange} />
            Male
          </label>
          <label>
            <input type="radio" name="gender" value="Female" checked={employee.gender === 'Female'} onChange={handleChange} />
            Female
          </label>
          <label>
            <input type="radio" name="gender" value="Other" checked={employee.gender === 'Other'} onChange={handleChange} />
            Other
          </label>
        </div>
        <div>
          <label>Course:</label>
          <label>
            <input type="checkbox" name="course" value="MCA" onChange={handleChange} />
            MCA
          </label>
          <label>
            <input type="checkbox" name="course" value="BCA" onChange={handleChange} />
            BCA
          </label>
          <label>
            <input type="checkbox" name="course" value="BSC" onChange={handleChange} />
            BSC
          </label>
        </div>
        <div>
          <label>Image:</label>
          <input type="file" name="image" onChange={handleImageChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateEmployee;
