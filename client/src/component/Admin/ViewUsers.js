import React, { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import '../style/ViewUsers.css';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
 

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:8000/auth/getUsers');
      console.log(response.data); // Add this line
      setUsers(response.data.users);
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/auth/deleteUser /${id}`);
      setUsers(users.filter((user) => user._id !== id));
      toast.success("User  deleted successfully");
    } catch (error) {
      toast.error("Error deleting user");
    }
  };

  return (
    <div className="main">
      <Sidebar/>
    <div className="UserTable">
       <table border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th>S.NO.</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
  { users.map((user, index) => {
    return (
      <tr key={user._id}>
        <td>{index + 1}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>
          <button onClick={() => handleDelete(user._id)}>Delete</button>
        </td>
      </tr>
    )
  })}
</tbody>
        </table>
    </div>
    </div>
  );
};

export default ViewUsers;