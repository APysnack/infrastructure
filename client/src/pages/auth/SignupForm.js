import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../utils/api';
import ThemeSelector from '../../components/ThemeSelector';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = await registerUser(email, password, passwordConfirmation);
      console.log('Signup response:', data);
      
      if (data.code === 200 || data.data) {
        navigate('/members');
      }
    } catch (err) {
      console.error('Error signing up:', err);
      setError(err.message || 'Failed to sign up. Please try again.');
    }
  };

  return (
    <Container>
      <ThemeSelector />
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
            />
          </FormGroup>
          
          <FormGroup>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Input
              type="password"
              placeholder="Confirm Password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
            />
          </FormGroup>

          <PrimaryButton type="submit">
            Sign Up
          </PrimaryButton>
        </Form>

        <Divider>
          <span>or</span>
        </Divider>

        <SecondaryButton type="button" onClick={onSwitchToLogin}>
          Already registered? Log in here
        </SecondaryButton>
      </Card>
    </Container>
  );
};

export default SignupForm;
