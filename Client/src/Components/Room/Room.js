import "./Room.css"
import { useNavigate } from 'react-router';
//Assets
import {ReactComponent as MembersIcon} from "../../Assets/members.svg"
function Room(props) {
    const navigate = useNavigate();
    return (
    <div className="roomCon" onClick={() => navigate(`/room/${props.id}`)}>
        <div className="roomLeftCon">
            <h1>{props.roomName}</h1>
            <h4>@{props.roomCreator}</h4>
        </div>
        <div className="roomRightCon">
            <button>View</button>
            <div className="numOfMembersCon">
                <MembersIcon className = "membersSvg"></MembersIcon>
                <p> {props.membersCount} Members</p>
            </div>
        </div>
    </div>
    );
}

export default Room;