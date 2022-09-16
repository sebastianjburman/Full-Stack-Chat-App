import "./RoomsJoined.css"
import { useEffect, useState } from "react";
//Components
import Room from "../Room/Room";
import LoadingRoom from "../LoadingRoom/LoadingRoom";
function RoomsJoined(props) {
    return (
        <div className="joinedRoomsCon" id="joinedRooms">
            <h1 className="roomYouHaveJoinedH1"> Recent Room You Have Joined</h1>
            {props.roomsJoinedLoading ?
                <div className="loadingRoomsCon">
                    <LoadingRoom></LoadingRoom>
                    <LoadingRoom></LoadingRoom>
                    <LoadingRoom></LoadingRoom>
                </div> : null}
            {[...props.roomsJoined].reverse().map((room) => {
                return <Room key={room.id} id={room.id} roomName={room.roomName} roomCreator={room.creatorDisplayName} membersCount={(room.joinedUsersDisplayNames.length) + 1} ></Room>
            })}
            {(props.roomsJoined.length === 0) ? <h2>Joined Room Will Show Here</h2> : null}
            <h1 className="roomYouHaveJoinedH1">Recent Rooms You Have Created</h1>
            {props.roomsCreatedLoading ?
                <div className="loadingRoomsCon">
                    <LoadingRoom></LoadingRoom>
                    <LoadingRoom></LoadingRoom>
                    <LoadingRoom></LoadingRoom>
                </div> : null}
            {[...props.roomsCreated].reverse().map((room) => {
                return <Room key={room.id} id={room.id} roomName={room.roomName} roomCreator={room.creatorDisplayName} membersCount={(room.joinedUsersDisplayNames.length) + 1}></Room>
            })}
            {(props.roomsCreated.length === 0) ? <h2>Created Room Will Show Here</h2> : null}
        </div>
    );
}

export default RoomsJoined;