import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client/react';
import { SIGN_UP_MUTATION } from '../../utils/graphqlQueries';
import {
  Container,
  Card,
  Title,
  Subtitle,
  Form,
  FormGroup,
  Input,
  PrimaryButton,
  SecondaryButton,
  Divider,
  Alert,
} from './ThemeableComponents';

const SignupForm = ({ onSwitchToLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');

  const [signUp, { loading }] = useMutation(SIGN_UP_MUTATION, {
    onCompleted: (data) => {
      if (data.signUp.success) {
        navigate('/members');
      } else {
        setError(data.signUp.message || 'Failed to sign up');
      }
    },
    onError: (err) => {
      console.error('Sign up error:', err);
      setError(err.message || 'An error occurred during sign up');
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }

    try {
      await signUp({
        variables: { email, password, passwordConfirmation },
      });
    } catch (err) {
      console.error('Error signing up:', err);
      setError(err.message || 'Failed to sign up. Please try again.');
    }
  };

  return (
    <Container>
      <Card>
        <Title>Create Account</Title>
        <Subtitle>Join us today</Subtitle>

        {error && <Alert>{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </FormGroup>

          <FormGroup>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </FormGroup>

          <FormGroup>
            <Input
              type="password"
              placeholder="Confirm Password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
              disabled={loading}
            />
          </FormGroup>

          <PrimaryButton type="submit" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </PrimaryButton>
        </Form>

        <Divider>
          <span>or</span>
        </Divider>

        <SecondaryButton type="button" onClick={onSwitchToLogin} disabled={loading}>
          Already registered? Log in here
        </SecondaryButton>
      </Card>
    </Container>
  );
};

export default SignupForm;
