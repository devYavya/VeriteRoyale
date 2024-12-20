import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Updated to use useNavigate
import '../style/AdminLogin.css'; 
import axios  from 'axios';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../Utils';

function Adminlogin ()  {

    const[data,setData] = useState({
        email: "",
        password:""

    });
     
    const navigate  = useNavigate();

    const handleChange = (e) =>
    {
        const {name, value} = e.target;
        console.log(name, value);
         const copyData = {...data};
         copyData[name] = value;
        setData(copyData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {email, password} = data;
        if( !email|| !password)
        {
            return handleError('All Fields are required')
        }
        
              
        try {
          const url = "http://localhost:8000/auth/adminLogin";
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
          const {sucess, message,jwttoken, email,error} = result;

          // console.log(sucess, message);
          // console.log(result);
          if(sucess)
          {
            handleSuccess("Hello Admin..!");
            localStorage.setItem('admintoken',jwttoken);
            localStorage.setItem('LoggedInAdmin',email);

            setTimeout(()=>
            {
                navigate('/Dashboard');
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
            <h2>Welcome Admin!!</h2>
            <form onSubmit={handleSubmit}>
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
               
                <button type="submit" >Login</button>
               
            </form>
            <ToastContainer/>
        </div>
    );
};

export default Adminlogin;
