import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';


const Header = () => {

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
                    {/* <b className="navbar-brand " style={{marginLeft :'50px', color: 'rgb(227, 218, 218)'}} >List Of Employee</b> */}
                    <img src="https://media-exp1.licdn.com/dms/image/C4E0BAQEBuiSpqQhU7w/company-logo_200_200/0/1628839610535?e=2147483647&v=beta&t=OJYM7aqUb0QFnhvDKZR0Jb_F_Ptqe3A8RHjX6whFbAA"
                        style={{ marginLeft: '50px', color: 'rgb(227, 218, 218)' }} id="image">
                    </img>
                    <a href='/employee' className="navbar-brand1" style={{ marginLeft: '20px', textDecoration: 'none', fontWeight: 'bold', color: 'rgb(227, 218, 218)' }} id="a2">
                        Employee
                    </a>
                    <div className="ms-auto d-flex align-items-center">
                        
                        <Button className="btn btn-secondary" onClick={handleShow}>
                            Logout
                        </Button>
                    </div>
               
                </div>
            </nav>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Hello, {userName}!{userRole} .<p> <b>Are you sure you want to logout?</b></p>
                </Modal.Body>                <Modal.Footer>
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

export default Header