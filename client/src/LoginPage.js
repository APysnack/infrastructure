import { useState } from 'react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

const LoginPage = () => {
  const [showSignup, setShowSignup] = useState(true);

  return (
    <>
      {showSignup ? (
        <SignupForm onSwitchToLogin={() => setShowSignup(false)} />
      ) : (
        <LoginForm onSwitchToSignup={() => setShowSignup(true)} />
      )}
    </>
  );
};

export default LoginPage;
