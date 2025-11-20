import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client/react';
import { SIGN_IN_MUTATION, GET_CURRENT_USER } from '../../utils/graphqlQueries';
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

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [signIn, { loading }] = useMutation(SIGN_IN_MUTATION, {
    refetchQueries: [{ query: GET_CURRENT_USER }],
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      if (data.signIn.success) {
        navigate('/members');
      } else {
        setError(data.signIn.message || 'Failed to sign in');
      }
    },
    onError: (err) => {
      console.error('Sign in error:', err);
      setError(err.message || 'An error occurred during sign in');
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signIn({
        variables: { email, password },
      });
    } catch (err) {
      console.error('Error signing in:', err);
      setError(err.message || 'Failed to sign in. Please try again.');
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

          <PrimaryButton type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Log In'}
          </PrimaryButton>
        </Form>

        <Divider>
          <span>or</span>
        </Divider>

        <SecondaryButton type="button" onClick={() => navigate('/register')} disabled={loading}>
          Don't have an account? Sign up here
        </SecondaryButton>
      </Card>
    </Container>
  );
};

export default LoginForm;
