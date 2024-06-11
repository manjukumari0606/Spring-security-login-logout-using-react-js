import axios from 'axios';

const REST_API_BASEURL = "http://localhost:9096/employee";

const getAuthHeader = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
        return { Authorization: `Bearer ${token}` };
    } else {
        return {};
    }
};

export const ListOfEmp = () => {
    return axios.get(REST_API_BASEURL, { headers: getAuthHeader(), withCredentials: true });
};

export const createEmployee = (employee) => {
    return axios.post(`${REST_API_BASEURL}/save`, employee, { headers: getAuthHeader(), withCredentials: true });
};

export const getEmployee = (employeeId) => {
    return axios.get(`${REST_API_BASEURL}/${employeeId}`, { headers: getAuthHeader(), withCredentials: true });
};

export const UpdateEmployee = (employeeId, employee) => {
    return axios.put(`${REST_API_BASEURL}/edit/${employeeId}`, employee, { headers: getAuthHeader(), withCredentials: true });
};

export const deleteEmployee = (employeeId) => {
    return axios.delete(`${REST_API_BASEURL}/delete/${employeeId}`, { headers: getAuthHeader(), withCredentials: true });
};


// export const ListOfEmp = () => axios.get(REST_API_BASEURL, { withCredentials: true });

// export const createEmployee = (employee) => axios.post(`${REST_API_BASEURL}/save`, employee, { withCredentials: true });

// export const getEmployee = (employeeId) => axios.get(`${REST_API_BASEURL}/${employeeId}`, { withCredentials: true });

// export const UpdateEmployee = (employeeId, employee) => axios.put(`${REST_API_BASEURL}/edit/${employeeId}`, employee, { withCredentials: true });

// export const deleteEmployee = (employeeId) => axios.delete(`${REST_API_BASEURL}/delete/${employeeId}`, { withCredentials: true });
