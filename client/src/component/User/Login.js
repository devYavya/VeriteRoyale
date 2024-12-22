import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Updated to use useNavigate
import '../style/Login.css'; 
// import axios  from 'axios';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../Utils';

function Login ()  {

    const[data,setData] = useState({
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
        const {email, password} = data;
        if( !email|| !password)
        {
            return handleError('All Fields are required')
        }
        
              
        try {
          const url = "https://veriteroyale.onrender.com/auth/Login";
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
          const {sucess, message,jwttoken, name,error,userId} = result;

        //   console.log(sucess, message);
        //   console.log(result);
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

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        const email = data.email;
        if (!email) {
            return handleError('Please enter your email address');
        }

        try {
            const url = "https://veriteroyale.onrender.com/auth/reset-password";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email})
            });

            const result = await response.json();
            const { success, message } = result;

            if (success) {
                handleSuccess("Password reset link has been sent to your email");
            } else {
                handleError(message || "Failed to send reset link");
            }

        } catch (err) {
            handleError("Something went wrong. Please try again later.");
        }
    };
      
    
    return (
        <div className="auth-container">
            <h2>Welcome Back!!</h2>
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
                <button className="reset-password-button" onClick={handlePasswordReset}> Reset Password </button>

                <span> Wanna Join us ?
                    <Link to="/Regster">Register</Link>
                </span>
                <span><Link to="/AdminLogin">Admin</Link></span>
            </form>
            <ToastContainer/>
        </div>
    );
};

export default Login;
