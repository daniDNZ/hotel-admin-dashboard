import { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../style/colors.ts';
import { Button, Logo } from '../style/styledComponents.ts';
import usersData from '../assets/data/users.json';
import { AuthContext } from '../context/AuthContextProvider.tsx';

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
    width: 100%;
    border: 2px solid ${colors.borderGray};
    border-radius: 8px;
    
    padding: 10px 20px;
    margin-bottom: 20px;
  }
`;

const LoginButton = styled(Button).attrs({
  type: 'submit',
})``;

function Login() {
  const { dispatchAuth } = useContext(AuthContext);
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = usersData.find((object) => object.email === inputs.user);
    if (userData !== undefined) {
      dispatchAuth({ type: 'LOGIN', value: { username: userData.fullName, email: userData.email } });
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
