import React, { useState } from 'react';
import { registerUser } from './utils/api';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess(false);

  try {
    const data = await registerUser(email, password, passwordConfirmation);
    console.log('Signup response:', data);
    
    if (data.code === 200 || data.data) {
      setSuccess(true);
      setEmail('');
      setPassword('');
      setPasswordConfirmation('');
    }
  } catch (err) {
    console.error('Error signing up:', err);
    setError(err.message || 'Failed to sign up. Please try again.');
  }
};


  return (
    <div style={{ width: '300px', margin: '50px auto', textAlign: 'center' }}>
      <h2>Sign Up</h2>
      {success && <p style={{ color: 'green' }}>Signup successful! You are now logged in.</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type='password'
            placeholder='Confirm Password'
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;
