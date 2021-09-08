import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import logo from 'images/logos/main-logo.svg';
import userDefaultIcon from 'images/user-default.svg';

export default function GeneralNavBar(props) {
  return (
    <Navbar className='' expand='md' variant='light' bg='light'>
      <Container fluid className='d-flex'>
        <Navbar.Brand>
          <img src={logo} alt='The site logo' height='40' />
        </Navbar.Brand>
        <Nav className='nav-group'>
          <Nav.Link className='nav-active'>My Blog</Nav.Link>
          <img src={userDefaultIcon} alt='The site logo' height='35' />
          <NavDropdown title='User' id='user-dropdown'>
            <NavDropdown.Item>Settings</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}
