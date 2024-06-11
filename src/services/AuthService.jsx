import axios from 'axios';

const API_BASE_URL = "http://localhost:9096/api";

class AuthService {
    register(user) {
        return axios.post(`${API_BASE_URL}/register`, user);
    }

    login(credentials) {
        return axios.post(`${API_BASE_URL}/authenticate`, credentials)
            .then(response => {
                const { token, user } = response.data; // Assuming the response contains token and user

                // Debugging: Log the user object to inspect its structure
                console.log("User object received:", user);

                if (token && user) {
                    console.log("JWT Token received:", token); // Debug log
                    localStorage.setItem('authToken', token); // Store the token in local storage
                    localStorage.setItem('isLoggedIn', 'true'); // Set isLoggedIn to true after successful login
                    localStorage.setItem('userName', `${user.firstName} ${user.lastName} ${user.roles} `); // Store user name
                    let roles;
                    if (Array.isArray(user.roles)) {
                        roles = user.roles;
                    } else if (typeof user.roles === 'string') {
                        roles = [user.roles]; // Assuming a single role as a string
                    } else if (typeof user.roles === 'object') {
                        roles = Object.values(user.roles); // Assuming roles are values in an object
                    }

                    if (roles) {
                        localStorage.setItem('roles', roles.join(',')); // Store roles as comma-separated string
                    } else {
                        console.error("Roles structure is unknown:", user.roles);
                    }
                    
                } else {
                    console.error("JWT Token or user details not found in the response");
                }
                return response;
            })
            .catch(error => {
                console.error("Login error:", error);
                throw error;
            });
    }

    isAuthenticated() {
        return localStorage.getItem('isLoggedIn') === 'true';
    }

    logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userName');
        localStorage.removeItem('userRole');
    }
}

export default new AuthService();
