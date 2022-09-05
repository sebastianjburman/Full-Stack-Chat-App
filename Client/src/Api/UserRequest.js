import UserApiBaseUrl from "./RequestConfig.js"
import axios from 'axios';

class UserRequest {

    static async createUser(displayName, email, username, password) {
        const body = {
            "id": "",
            "displayName": displayName,
            "email": email,
            "username": username,
            "password": password
        }
        const config = {
            method: 'post',
            url: UserApiBaseUrl + "/api/users",
            data: body
        }

        try {
            const response = await axios(config)
            console.log(response.status)
            if (response.status === 201) {
                alert("Successfully created your account")
                return response
            }
        }
        catch (err) {
            alert("There was an error creating your account")

        }
    }
    static async authenticate(username, password) {
        const body = {
            "id": "",
            "displayName": "",
            "email": "",
            "username": username,
            "password": password
        }
        const config = {
            method: 'post',
            url: UserApiBaseUrl + "/api/Users/authenticate",
            data: body
        }
        try {
            const response = await axios(config)
            if (response.status === 200) {
                return response;
            }
        }
        catch (err) {
            alert("Error Logging In")
        }

    }
    static async getUser(token) {
        const config = {
            method: 'GET',
            url: UserApiBaseUrl + "/api/Users",
            headers: { Authorization: `Bearer ${token}` }
        }
        try {
            const response = await axios(config)
            if (response.status === 200) {
                return response
            }
            else {
                alert("There was an error creating your account")
            }
        }
        catch (err) {
        }
    }
    static async deleteUser(token) {
        const config = {
            method: 'DELETE',
            url: UserApiBaseUrl + "/api/Users",
            headers: { Authorization: `Bearer ${token}` }
        }
        try {
            const response = await axios(config)
            if (response.status === 200) {
                return response
            }
            else {
                alert("There was an error deleting your account")
            }
        }
        catch (err) {
        }
    }
}


export default UserRequest;

