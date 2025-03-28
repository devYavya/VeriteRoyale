import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import '../style/ResetPassword.css';
import { handleError, handleSuccess } from '../Utils';
import { ToastContainer } from 'react-toastify';



const ResetPassword = () => {
//   const [searchParams] = useSearchParams();
  const token = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://veriteroyale.onrender.com/auth/reset-password/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({token, newPassword: password }),
      });

      if (response.ok) {
        handleSuccess('Password reset successful! You can now log in.');
        navigate('/Login');
      } else {
        const errorData = await response.json();
        handleError(errorData.message || 'Error resetting password.');
      }
    } catch (error) {
    //   console.error('Error resetting password:', error);
      handleError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-page">
      <h1>Reset Your Password</h1>
      {message && <p className="message">{message}</p>}

      <form onSubmit={handlePasswordReset} className="reset-password-form">
        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default ResetPassword;
