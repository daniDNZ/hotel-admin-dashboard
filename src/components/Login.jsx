import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Login({ setAuth }) {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputs.user === 'admin' && inputs.password === 'admin') {
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
    <>
      <h1>login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="user" placeholder="user" onChange={handleChange} />
        <input type="password" name="password" placeholder="pass" onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
      <span>Usuario: admin</span>
      <br />
      <span>Contraseña: admin</span>
    </>
  );
}

export default Login;
