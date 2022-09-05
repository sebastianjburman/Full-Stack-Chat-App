import UserApiBaseUrl from "./RequestConfig.js"
import axios from 'axios';

class RoomRequest {

    static async getJoinedRooms(token) {
        const config = {
            method: 'GET',
            url: UserApiBaseUrl + "/api/Rooms/joinedrooms",
            headers: { Authorization: `Bearer ${token}` }
        }
        try {
            const response = await axios(config)
            if (response.status === 200) {
                return response;
            }
            else {
                alert("Error getting joined rooms")
            }
        }
        catch (err) {
            alert("Error getting joined rooms")
        }
    }
    static async getCreatedRooms(token) {
        const config = {
            method: 'GET',
            url: UserApiBaseUrl + "/api/Rooms/createdrooms",
            headers: { Authorization: `Bearer ${token}` }
        }
        try {
            const response = await axios(config)
            if (response.status === 200) {
                return response;
            }
            else {
                alert("Error getting created rooms")
            }
        }
        catch (err) {
            alert("Error getting created rooms")
        }
    }
    static async searchForRooms(token, searchString,start) {
        const body = searchString
        const config = {
            method: 'POST',
            url: UserApiBaseUrl + "/api/Rooms/searchroom",
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            params: {
                start:start
            },
            data: body
        }
        try {
            const response = await axios(config)
            if (response.status === 200) {
                return response;
            }
            else {
                alert("Error searching for rooms")
            }
        }
        catch (err) {
            alert("Error searching for rooms")
        }
    }
    static async createRoom(token, roomName) {
        const body = roomName
        const config = {
            method: 'POST',
            url: UserApiBaseUrl + "/api/Rooms",
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            data: body
        }
        try {
            const response = await axios(config)
            if (response.status === 201) {
                return response;
            }
        }
        catch (err) {
            alert("Error creating room. You can't create more than 10 rooms.")
        }
    }
    static async getRoom(token, roomId) {
        const config = {
            method: 'GET',
            url: UserApiBaseUrl + "/api/Rooms/" + roomId,
            headers: { Authorization: `Bearer ${token}` }
        }
        try {
            const response = await axios(config)
            if (response.status === 200) {
                return response;
            }
            else{
                alert("Error getting room data")
            }
        }
        catch (err) {
            alert("Error getting room data")
        }
    }
    static async joinRoom(token, roomId) {
        const config = {
            method: 'PUT',
            url: UserApiBaseUrl + `/api/Rooms/joinroom/${roomId}`,
            headers: { Authorization: `Bearer ${token}` },
        }
        try {
            const response = await axios(config)
            if (response.status === 200) {
                return response;
            }
            else{
                alert("Error joining room")
            }
        }
        catch (err) {
            alert("Error joining room")
        }
    }
    static async leaveRoom(token, roomId) {
        const config = {
            method: 'PUT',
            url: UserApiBaseUrl + `/api/Rooms/leaveroom/${roomId}`,
            headers: { Authorization: `Bearer ${token}` },
        }
        try {
            const response = await axios(config)
            if(response.status === 200){
                return response;
            }
            else{
                alert("Error leaving room")
            }
        }
        catch (err) {
            alert("Error leaving room")
        }
    }
    static async deleteRoom(token, roomId) {
        const config = {
            method: 'DELETE',
            url: UserApiBaseUrl + `/api/Rooms/${roomId}`,
            headers: { Authorization: `Bearer ${token}` },
        }
        try {
            const response = await axios(config)
            if(response.status === 200){
                return response;
            }
            else{
                alert("Error deleting room")
            }
        }
        catch (err) {
            alert("Error deleting room")
        }
    }
    static async sendMessage(token, roomId, messageContent) {
        const body = messageContent
        const config = {
            method: 'POST',
            url: UserApiBaseUrl + `/api/Rooms/${roomId}/sendmessage`,
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            data: body
        }
        try {
            const response = await axios(config)
            if(response.status === 200){
                return response;
            }
            else{
                alert("Error sending message")
            }
        }
        catch (err) {
            alert("Error sending message")
        }
    }
}


export default RoomRequest;
