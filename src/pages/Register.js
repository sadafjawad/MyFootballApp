import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Changed from useHistory
import { useAuth } from '../context/auth';

const Register = () => {
  const navigate = useNavigate(); // Changed from useHistory
  const { setIsLoggedIn } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    // Placeholder registration logic
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Placeholder registration logic
    // You can add your registration logic here

    // Simulate successful registration and login
    setIsLoggedIn(true);
    navigate('/'); // Changed from history.push
  };

  return (
    <div>
      <h2>Register</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
