import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'

function LoginFrom() {
  // Context
  const { loginUser } = useContext(AuthContext)

  // Localstate
  const [loginFrom, setLoginFrom] = useState({
    username: '',
    password: '',
  })

  // Alert
  const [alert, setAlert] = useState(null)

  const { username, password } = loginFrom

  const onChangeLoginFrom = (e) =>
    setLoginFrom({ ...loginFrom, [e.target.name]: e.target.value })
  const onLogin = async (e) => {
    e.preventDefault()
    try {
      const loginData = await loginUser(loginFrom)

      if (!loginData.success) {
        setAlert({ type: 'danger', message: loginData.message })
        setTimeout(() => setAlert(null), 2500)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Form onSubmit={onLogin}>
        <AlertMessage info={alert} />
        <Form.Group className='mb-3'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Username'
            name='username'
            required
            value={username}
            onChange={onChangeLoginFrom}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            required
            value={password}
            onChange={onChangeLoginFrom}
          />
        </Form.Group>
        <div className='text-center mb-3'>
          <Button
            variant='success'
            type='submit'>
            Login
          </Button>
        </div>
      </Form>
      <p className='text-center'>
        Don't have an account?
        <Link
          to='/register'
          style={{ marginLeft: '10px' }}>
          <Button variant='success'>Register</Button>
        </Link>
      </p>
    </>
  )
}

export default LoginFrom
