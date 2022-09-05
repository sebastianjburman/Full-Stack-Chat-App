import "./NavBar.css"
import { useState } from "react";
import { useNavigate } from 'react-router';
//Assets
import {ReactComponent as DropDownSvg} from "../../Assets/dropdown.svg"
import Logo from "../../Assets/logo.svg.svg"
function Navbar(props){
    const navigate = useNavigate();
    const [openTopNavButton, setOpenTopNavButton] = useState(false)

    function logout(){
        localStorage.removeItem("token")
        props.setToken("")
        props.setAuth(false)
        navigate("./")
    }

    return(
    <div className="navBarCon">
        <img className = "logoImg" src={Logo}></img>
        <h1>TetraRoom</h1>
        <div className="navBarConButtonDiv" onClick={()=>setOpenTopNavButton(!openTopNavButton)} style={openTopNavButton ? {height: "200px"}:{height: "50px"}}>
            <DropDownSvg className = "dropDownSvg"></DropDownSvg>
            {openTopNavButton ? <h3 className="userDisplayNameDropdown">{props.loggedInUserObject.DisplayName}</h3>:null}
            {openTopNavButton ? <button className="navBarConButtonDivButton" style={{borderTopRightRadius:"6px",borderTopLeftRadius:"6px"}} onClick={() => navigate("/")}>Home</button>:null}
            {openTopNavButton ? <button className="navBarConButtonDivButton" onClick={() => navigate("/settings")}>Settings</button>:null}
            {openTopNavButton ? <button className="navBarConButtonDivButtonLogout" style={{borderBottomRightRadius:"6px",borderBottomLeftRadius:"6px"}} onClick={() => logout()}>Logout</button>:null}
        </div>
    </div>
    )
}

export default Navbar