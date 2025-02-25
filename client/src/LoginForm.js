import React, { useState } from 'react';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      user: {
        email,
        password,
        password_confirmation: passwordConfirmation,
      },
    };

    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log('Signup response:', data);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div style={{ width: '300px', margin: '50px auto', textAlign: 'center' }}>
      <h2>Sign Up</h2>
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
