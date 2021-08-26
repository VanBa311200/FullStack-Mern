import React, { useContext } from 'react'
import LoginFrom from '../components/auth/LoginFrom';
import RegisterFrom from '../components/auth/RegisterFrom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';
import { Redirect } from 'react-router-dom';

function Auth(props) {
  const { authState: { authLoading, isAuthenticated } } = useContext(AuthContext);

  let body;
  if (authLoading) {
    body = <>
      <div className="d-flex justify-content-center mt-3">
        <Spinner
          animation='border'
          variant='infor' />
      </div>
    </>
  } else if (isAuthenticated) {
    return <Redirect to='/dashboard' />

  } else {
    body =
      <>
        {props.authRoute === 'login' && <LoginFrom />}
        {props.authRoute === 'register' && <RegisterFrom />}
      </>;
  }



  return (
    <>
      <div className="center-wrapper">
        <Container>
          <Row className='justify-content-center'>
            <Col
              md={4}
              xs={8}>
              <h2 className='text-center'> Learn It</h2>
              {body}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Auth
