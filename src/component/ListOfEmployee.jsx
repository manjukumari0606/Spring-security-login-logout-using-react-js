import React, { useEffect, useState } from 'react';
import { ListOfEmp, deleteEmployee } from '../services/EmployeeServices';
import { useNavigate } from 'react-router-dom';

import Footer from './Footer';
import HeadersUser from './HeadersUser';

const ListOfEmployee = () => {
    const [emp, setEmp] = useState([]);
    const [firstName, setUserName] = useState('');
    const [roles, setUserRole] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getAllEmployee();
        const storedUserName = localStorage.getItem('firstName');
        const storedUserRole = localStorage.getItem('roles');
        if (storedUserName) setUserName(storedUserName);
        if (storedUserRole) setUserRole(storedUserRole);
    }, []);

    function getAllEmployee() {
        ListOfEmp().then(res => {
            setEmp(res.data);

        }).catch(error => {
            console.error(error);

        });
    }

    function addNewEmployee() {
        navigate("/add-employee");
    }

    function updateEmployee(id) {
        navigate(`/edit-employee/${id}`);
    }

    function removeEmployee(id) {
        const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
        if (!confirmDelete) {
            return; // If the user cancels, exit the function
        }

        deleteEmployee(id).then(() => {
            getAllEmployee();
        }).catch(error => {
            console.error(error);
        });
    }

    return (
        <div><HeadersUser />
            <div className='container'>
                <br />
                {roles.includes('ROLE_ADMIN') && (
                    <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
                )}
                <table className='table table-striped table-bordered'>
                    <thead className='table-dark'>
                        <tr>
                            <th>Employee Id</th>
                            <th>Employee First Name</th>
                            <th>Employee Last Name</th>
                            <th>Employee Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emp.map(result => (
                            <tr key={result.id}>
                                <td>{result.id}</td>
                                <td>{result.firstName}</td>
                                <td>{result.lastName}</td>
                                <td>{result.email}</td>
                                <td>
                                    {roles.includes('ROLE_ADMIN') && (
                                        <>
                                            <button className='btn btn-info mr-3' onClick={() => updateEmployee(result.id)}>Update</button>
                                            <button className='btn btn-danger' onClick={() => removeEmployee(result.id)} style={{ marginLeft: '10px' }}>Delete</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
}

export default ListOfEmployee;
