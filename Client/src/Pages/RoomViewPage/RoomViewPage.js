import "./RoomViewPage.css"
import { useParams } from "react-router-dom";
import { useEffect, useState, componentWillUnmount } from "react";
import { useNavigate } from 'react-router';
import { HubConnectionBuilder } from '@microsoft/signalr';
import UserApiBaseUrl from "../../Api/RequestConfig";
//Components
import Message from "../../Components/Message/Message";
import RoomMember from "../../Components/RoomMember/RoomMember";
//Api
import RoomRequest from "../../Api/RoomRequest";
function RoomViewPage(props) {
    const [roomObject, setRoomObject] = useState({})
    const [messageInput, setMessageInput] = useState("")
    const navigate = useNavigate();
    const { roomId } = useParams()
    const token = props.token
    const loggedInUserObject = props.loggedInUserObject
    const isCreator = checkIfUserIsCreator()
    const isMember = checkIfUserIsInRoom()
    const isNotMember = checkIfUserIsNotInRoom()


    const getRoom = async () => {
        const res = await RoomRequest.getRoom(token, roomId)
        if (res !== undefined) {
            setRoomObject(res.data)
        }
    }
    function checkIfUserIsCreator() {
        if (loggedInUserObject.DisplayName === roomObject.creatorDisplayName) {
            return true
        }
        return false
    }
    function checkIfUserIsInRoom() {
        if (checkIfUserIsCreator()) {
            return false
        }
        const inRoom = roomObject.joinedUsersDisplayNames?.includes(loggedInUserObject.DisplayName)
        if (inRoom) {
            return true
        }
        else {
            return false
        }
    }
    function checkIfUserIsNotInRoom() {
        if (checkIfUserIsCreator()) {
            return false
        }
        const inRoom = roomObject.joinedUsersDisplayNames?.includes(loggedInUserObject.DisplayName)
        if (!inRoom) {
            return true
        }
        else {
            return false
        }
    }
    async function joinRoom() {
        const res = await RoomRequest.joinRoom(token, roomObject.id)
        if (res !== undefined) {
            getRoom()
        }
    }
    async function leaveRoom() {
        const res = await RoomRequest.leaveRoom(token, roomObject.id)
        navigate("../")
    }

    async function deleteRoom() {
        const res = await RoomRequest.deleteRoom(token, roomObject.id)
        navigate("../")
    }
    async function sendMessage() {
        if(messageInput.length >0 && messageInput.trim().length >0){
            await RoomRequest.sendMessage(token, roomObject.id, messageInput)
            setMessageInput("")
        }
        else{
            alert("Message can't be blank or 0 characters")
        }
    }

    useEffect(() => {
        getRoom()
        const connection = new HubConnectionBuilder()
            .withUrl(`${UserApiBaseUrl}/hubs/chat`)
            .withAutomaticReconnect()
            .build();
        connection.start().then(res => {
            connection.invoke("JoinGroup", roomId)
        }).then(result => {
            console.log('Connected!');

            connection.on('ReceiveMessage', room => {
                setRoomObject(room)
            });
        })
            .catch(e => console.log('Connection failed: ', e));
        return function cleanup() {
            connection.off('ReceiveMessage')
        };
    }, [])
    useEffect(() => {
        var element = document.getElementById("dummy");
        element.scrollIntoView({ behavior: "smooth" });
    }, [roomObject])


    return (
        <div className="roomViewPageCon">
            <div id="dummy"></div>
            <div className="roomChatCon">
                <div className="chatInfoCon">
                    <h1>{roomObject.roomName}</h1>
                    {isCreator ? <button className="deleteRoomBtn" onClick={() => deleteRoom()}>Delete</button> : null}
                    {isMember ? <button className="leaveRoomBtn" onClick={() => leaveRoom()}>Leave</button> : null}
                    {isNotMember ? <button className="joinRoomBtn" onClick={() => joinRoom()}>Join</button> : null}
                </div>
                <div className="chatCon">
                    {roomObject.roomMessages?.slice(0).reverse().map((message, index) => {
                        let userMessage = false
                        if (message.senderDisplayName === loggedInUserObject.DisplayName) {
                            userMessage = true
                        }
                        return <Message key={index} usersMessage={userMessage} messageContent={message.messageContent} senderDisplayName={message.senderDisplayName}></Message>
                    })}
                </div>
                {(isMember || isCreator)? <div className="chatInputCon">
                    <input placeholder="Message" value={messageInput} onChange={(e) => setMessageInput(e.target.value)}></input>
                    <button onClick={() => { sendMessage() }}>Send</button>
                </div>:null}

            </div>
            <div className="roomChatMembers">
                <h1>Host</h1>
                <RoomMember name={roomObject.creatorDisplayName}></RoomMember>
                <h1>Members</h1>
                {roomObject.joinedUsersDisplayNames?.map(displayname => {
                    return <RoomMember key={displayname} name={displayname}></RoomMember>
                })}
            </div>
        </div>);
}

export default RoomViewPage;