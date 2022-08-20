import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../style/colors';
import { Button, Logo } from '../style/styledComponents';

const LoginBackground = styled.div`
  height: 100vh;
  background-color: ${colors.bgGray};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
  width: fit-content;
  background-color: white;
  border-radius: 18px;

  padding: 40px 30px;

  & form {
    margin-bottom: 30px;
  }

  & input {
    border: 2px solid ${colors.borderGray};
    border-radius: 8px;
    
    padding: 10px 20px;
    margin-bottom: 20px;
  }
`;

const LoginButton = styled(Button).attrs({
  type: 'submit',
})``;

function Login({ setAuth }) {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputs.user === 'mrainforth0@theguardian.com' && inputs.password === 'm0sah4TV') {
      setAuth(true);
      navigate(from, { replace: true });
    } else {
      // eslint-disable-next-line no-alert
      alert('Login failed');
      e.target.reset();
    }
  };

  const handleChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  return (
    <LoginBackground>
      <LoginContainer>
        <Logo margin={{
          top: 0, right: 'auto', bottom: '40px', left: 'auto',
        }}
        />
        <form onSubmit={handleSubmit}>
          <input type="text" name="user" placeholder="User" onChange={handleChange} />
          <input type="password" name="password" placeholder="Pass" onChange={handleChange} />
          <LoginButton green>Login</LoginButton>
        </form>
        <span>Usuario: mrainforth0@theguardian.com</span>
        <br />
        <span>Contraseña: m0sah4TV</span>
      </LoginContainer>
    </LoginBackground>
  );
}

export default Login;
