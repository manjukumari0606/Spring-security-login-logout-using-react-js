import React, { useEffect, useState } from 'react'
import { UpdateEmployee, createEmployee} from '../services/EmployeeServices'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getEmployee } from '../services/EmployeeServices'
import Header from './Header'
import Footer from './Footer'

const AddEmployee = () => {

    const [firstName, setFirstname] = useState('')
    const [lastName, setLastname] = useState('')
    const [email, setEmail] = useState('')

    const [message, setMessage] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(false); 

    const [error, setError] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })

    const {id} = useParams();

    const navigate = useNavigate()

    useEffect(() =>{
        if(id){
            getEmployee(id).then((response) =>{
                setFirstname(response.data.firstName)
                setLastname(response.data.lastName)
                setEmail(response.data.email)
            }).catch(error =>{
                console.error(error)
            })
        }
    },[id])

    function emailValidation(email) {
        const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let validationMessage;
        if (!email.trim()) {
            validationMessage = 'Email is required';
        } else if (regEx.test(email)) {
            validationMessage = 'Email is valid';
            setIsEmailValid(true); // Set email validity state
        } else {
            validationMessage = 'Email is not valid';
            setIsEmailValid(false); // Set email validity state
        }

        setMessage(validationMessage);

        // Clear the message after 3 seconds (adjust as needed)
        setTimeout(() => {
            setMessage('');
        }, 3000); // 3000 milliseconds = 3 seconds

        return validationMessage === 'Email is valid'; // Return true if email is valid
    }

    function saveOrUpdateEmployee(e) {
        e.preventDefault();

        if (validateForm() && isEmailValid) { // Check if email is valid
            const employee = { firstName, lastName, email }
            console.log(employee)

            if (id) {
                UpdateEmployee(id, employee).then((response) => {
                    console.log(response.data)
                    navigate("/employee")
                }).catch(error => {
                    console.error(error);
                })
            } else {
                createEmployee(employee).then((res) => {
                    console.log(res.data)
                    navigate("/employee")
                }).catch(error => {
                    console.error(error);
                })
            }
        } else {
            console.log('Form validation failed. Please correct the errors.');
        }
    }

    function pageTitle(){
        if(id){
            return  <h3 className='text-center'>Update Employee</h3>
        }
        else{
            return <h3 className='text-center'>Add Employee</h3>
        }
    }

    function validateForm() {
        let valid = true
        const errorsCopy = { ...error }

        if (firstName.trim()) {
            errorsCopy.firstName = '';
        }
        else {
            errorsCopy.firstName = "First name is required"
            valid = false
        }

        if (lastName.trim()) {
            errorsCopy.lastName = '';
        }
        else {
            errorsCopy.lastName = "Last Name is required"
            valid = false;
        }

        if (email.trim()) {
            errorsCopy.email = '';
        }
        else {
            errorsCopy.email = "Email is required"
            valid = false;
        }
        setError(errorsCopy)
        return valid;
    }

    const isSaveDisabled = !firstName.trim() || !lastName.trim() || !email.trim() || !isEmailValid;


    return (
        <div> <Header />
        <div className='container'>
           
            <br /><br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3'>
                    {pageTitle() }               
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label' >First Name {firstName ? null : <span style={{ color: 'red' }}>*</span>}</label>
                                <input
                                    type='text'
                                    placeholder='enter first name'
                                    name='firstName'
                                    value={firstName}
                                    className={`form-control ${error.firstName ? 'is-invalid' : ''}`}
                                    onChange={(event) => setFirstname(event.target.value)}
                                >
                                </input>
                                {error.firstName && <div className='invalid-feedback'>{error.firstName}</div>}


                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Last Name {lastName ? null : <span style={{ color: 'red' }}>*</span>}</label>
                                <input
                                    type='text'
                                    placeholder='enter last name'
                                    name='lastName'
                                    value={lastName}
                                    className={`form-control ${error.lastName ? 'is-invalid' : ''}`}
                                    onChange={(event) => setLastname(event.target.value)}
                                >
                                </input>
                                {error.lastName && <div className='invalid-feedback'>{error.lastName}</div>}

                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Email {email ? null : <span style={{ color: 'red' }}>*</span>}</label>
                                <input
                                    type='email'
                                    placeholder='enter your email (e.g., abc@example.com)'
                                    name='email'
                                    value={email}
                                    className={`form-control ${error.email ? 'is-invalid' : ''}`}
                                    onChange={(event) => setEmail(event.target.value)}
                                >
                                </input>
                                <button type="button"  onClick={() => emailValidation(email)}>Verify Email</button>
                                <div className="text-danger">{message}</div>
                                {error.email && <div className='invalid-feedback'>{error.email}</div>}

                            </div>
                            <button  className={`btn ${isSaveDisabled ? 'disabled-button' : 'enabled-button'}`} onClick={saveOrUpdateEmployee} disabled={isSaveDisabled}>Save</button>
                        </form>
                    </div>
                </div>
            </div></div>
            <Footer />
        </div>
    )
}

export default AddEmployee;
