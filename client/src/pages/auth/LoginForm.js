import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../utils/api';
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
} from './SignupForm.styles';

const LoginForm = ({ onSwitchToSignup }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = await loginUser(email, password);
      console.log('Login response:', data);
      
      if (data.code === 200 || data.data) {
        navigate('/members');
      }
    } catch (err) {
      console.error('Error logging in:', err);
      setError(err.message || 'Failed to log in. Please try again.');
    }
  };

  return (
    <Container>
      <Card>
        <Title>Welcome Back</Title>
        <Subtitle>Log in to your account</Subtitle>

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

          <PrimaryButton type="submit">
            Log In
          </PrimaryButton>
        </Form>

        <Divider>
          <span>or</span>
        </Divider>

        <SecondaryButton type="button" onClick={onSwitchToSignup}>
          Don't have an account? Sign up here
        </SecondaryButton>
      </Card>
    </Container>
  );
};

export default LoginForm;
