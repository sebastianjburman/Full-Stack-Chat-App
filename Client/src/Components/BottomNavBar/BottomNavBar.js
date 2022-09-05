import "./BottomNavBar.css"
import { useNavigate, useLocation } from 'react-router';
//Assets
import {ReactComponent as HomeIcon} from "../../Assets/home.svg"
import {ReactComponent as SettingsIcon} from "../../Assets/settingsIcon.svg"
function BottomNavBar(props) {
    const navigate = useNavigate();
    const route = useLocation();
    console.log(route.pathname)
    return (
        <div className="bottomNavBarCon">
            <button onClick = {()=>navigate("../")}>
                <HomeIcon style={(route.pathname === "/")?{ fill:"var(--complimentcolor)" }:{ fill:"grey" }}></HomeIcon>
            </button>
            <button onClick = {()=>navigate("/settings")}>
                <SettingsIcon style={(route.pathname === "/settings")?{ fill:"var(--complimentcolor)" }:{ fill:"grey" }}></SettingsIcon>
            </button>

        </div>
    );
}

export default BottomNavBar;