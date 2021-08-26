import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import logo from '../../assets/logo.svg'
import logoutIcon from '../../assets/logout.svg'
import { AuthContext } from '../../contexts/AuthContext';

function NavbarMenu() {
  const { authState: { user: { username } }, logOut } = useContext(AuthContext);

  return (

    <Navbar
      expand='lg'
      bg='primary'
      variant='dark'
      className='shadow'>
      <Container bg='primary'>
        <Navbar.Brand
          className='fw-bold text-white'
        >
          <img
            src={logo}
            alt="learnItLogo"
            width='32'
            height='32'
            className='mr-2' />
          LearnIt
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="fw-bold text-white" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              className='fw-bold text-white'
              to='/dashboard'
              as={Link}>Dashboard</Nav.Link>
            <Nav.Link
              className='fw-bold text-white'
              to='/about'
              as={Link}>About</Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            <Nav.Link
              className='fw-bold text-white'
              disabled>
              Welcome {username}
            </Nav.Link>
            <Button
              variant="secondary"
              className='fw-bold text-white'
              onClick={logOut}>
              <img
                src={logoutIcon}
                alt="Logout"
                width='32'
                height='32'
                className='mr-2' />
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarMenu
