import React from 'react';
import { Form, Nav, Navbar, Container } from 'react-bootstrap';
import { BiLogOut } from 'react-icons/bi';
import { IconContext } from 'react-icons';
import { useNavigate } from 'react-router-dom';

const UserNavbar = ({onSearch}) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <Navbar>
    <Container fluid>
      <Navbar.Brand href="#" className='nav-title' style={{color: '#fff', fontWeight: '800', marginLeft: '5%'}}>Medical Centers</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
        </Nav>
        <Form className="d-flex serach-bar">
          <Form.Control
            type="search"
            placeholder="Search..."
            className="me-2 input-search"
            aria-label="Search"
            onChange={(e)=>{onSearch(e.target.value)}}
          />
          <IconContext.Provider value={{ color: '#fff' }}>
          <BiLogOut style={{marginRight: '5%', fontSize: '50px', cursor: 'pointer'}}
                    onClick={handleLogout} />
          </IconContext.Provider>
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default UserNavbar
