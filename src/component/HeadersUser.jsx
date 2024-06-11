import React from 'react'
import {  useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const HeadersUser = () => {


    const Navigate = useNavigate();

    const [show, setShow] = React.useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleLogout = () => {
        // Clear authentication status in local storage
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('authToken'); // Remove the auth token
        localStorage.removeItem('user'); // Remove the user information
        localStorage.removeItem('userRole'); // Remove the user role


        // Redirect to the login page
        Navigate('/login');
    };
    const userName = localStorage.getItem('userName');
    const userRole = localStorage.getItem('userRole');

    return (
        <>
            <nav className="navbar" >
                <div className="container-fluid">
                    <b className="navbar-brand" style={{ marginLeft: '50px', color: 'rgb(227, 218, 218)' }}>List Of Employee</b>
                    <a href='/home' className="navbar-brand1" style={{ marginRight: '950px', textDecoration: 'none', fontWeight: 'bold', color: 'rgb(227, 218, 218)' }}>Home</a>
                    <button className="btn btn-secondary ms-auto" type="button" id="logoutButton" onClick={handleShow}>
                        Logout
                    </button>           
                     </div>
            </nav>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Hello, {userName}!  {userRole}. <p><b>Are you sure you want to logout?</b></p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={handleLogout}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default HeadersUser