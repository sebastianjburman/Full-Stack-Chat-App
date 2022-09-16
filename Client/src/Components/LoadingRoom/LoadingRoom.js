import "./LoadingRoom.css"
//Assets
import {ReactComponent as MembersIcon} from "../../Assets/members.svg"

function LoadingRoom() {
    return (
        <div className="loadingRoomCon">
            <div className = "skeletonLoadingDivOne"></div>
            <div className = "skeletonLoadingDivTwo"></div>
        </div>)
}

export default LoadingRoom