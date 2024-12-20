import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Updated to use useNavigate
import '../style/Login.css'; 
import axios  from 'axios';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../Utils';

function Register ()  {

    const[data,setData] = useState({
        name: " ",
        email: "",
        password:""

    });
    const navigate  = useNavigate();

    const handleChange = (e) =>
    {
        const {name, value} = e.target;
        // console.log(name, value);
         const copyData = {...data};
         copyData[name] = value;
        setData(copyData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = data;
        if(!name|| !email|| !password)
        {
            return handleError('All Fields are required');
        }
        
              
        try {
          const url = "http://localhost:8000/auth/regster";
          const response = await fetch(url, {
            method:"POST",
            headers:
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

            
            // validateStatus: (status) => status >= 200 && status < 600, // catch all errors
          });
          const result = await response.json();
        //   const {sucess, message, error} = result;
          const {sucess, message,jwttoken, name,error,userId} = result;

          if(sucess)
          {
            handleSuccess(message);
            localStorage.setItem('token',jwttoken);
            localStorage.setItem('LoggedInUser',name);
            localStorage.setItem('userId',userId);

            setTimeout(()=>
            {
                navigate('/');
            },1000);
          }
          else if(error)
          {
            const details = error?.details[0].message;
            handleError(details);
          }
          else if(!sucess)
          {
            handleError(message);
          }

        } catch (err) {
          handleError(err);
        }
      };

    
    return (
        <div className="auth-container">
            <h2>Join VÉRITÉ ROYALE</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={data.name}
                        name='name'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={data.email}
                        name='email'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={handleChange}
                        name='password'
                        required
                    />
                </div>
               
                <button type="submit" >Register</button>
                <span> Already have an Account ?
                    <Link to="/Login">Login</Link>
                </span>

            </form>
            <ToastContainer/>
        </div>
    );
};

export default Register;
