import { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AlertMessage from '../layout/AlertMessage';
import { AuthContext } from '../../contexts/AuthContext';

function RegisterFrom() {
  // State from
  const [registerFrom, setRegisterFrom] = useState({
    username: '',
    password: '',
    confirmpassword: ''
  });

  // State Alert
  const [alert, setAlert] = useState(null);

  // Context 
  const { registerUser } = useContext(AuthContext);

  // handler get data from register
  const { username, password, confirmpassword } = registerFrom;

  const onChangeRegisterFrom = e => {
    setRegisterFrom({ ...registerFrom, [e.target.name]: e.target.value });
  }

  // handler onSubmit
  const onSubmitRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setAlert({ type: 'danger', message: 'Passwords do not match' });
      setTimeout(() => setAlert(null), 2500);
      return;
    }

    try {
      const registerData = await registerUser(registerFrom);

      if (!registerData.success) {
        setAlert({ type: 'danger', message: registerData.message });
        setTimeout(() => setAlert(null), 2500);
      }

    } catch (err) {
      console.log(err);
    }
  }


  return (
    <>
      <Form onSubmit={onSubmitRegister}>
        <AlertMessage info={alert} />
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder='Username'
            name='username'
            required
            value={username}
            onChange={onChangeRegisterFrom}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder='Password'
            name='password'
            value={password}
            onChange={onChangeRegisterFrom}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder='Confirm Password'
            name='confirmpassword'
            value={confirmpassword}
            onChange={onChangeRegisterFrom}
            required
          />
        </Form.Group>
        <div className="text-center mb-3">
          <Button
            variant="success"
            type='submit' >Register</Button>
        </div>
      </Form>
      <p className="text-center">Already have an account?
        <Link
          to='/login'
          style={{ marginLeft: '10px' }}><Button variant="success">Login</Button> </Link>
      </p>
    </>
  )
}

export default RegisterFrom
