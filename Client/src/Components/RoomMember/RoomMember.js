import "./RoomMember.css"
function RoomMember(props) {
    return (
    <h2 className="roomMemberCon">
        @{props.name}
    </h2>);
}

export default RoomMember;