import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Changed from useHistory
import { useAuth } from '../context/auth';

const Login = () => {
  const navigate = useNavigate(); // Changed from useHistory
  const { setIsLoggedIn } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    // Placeholder authentication logic
    if (username === 'admin' && password === 'admin') {
      // Simulating successful login
      setIsLoggedIn(true);
      navigate('/'); // Changed from history.push
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
