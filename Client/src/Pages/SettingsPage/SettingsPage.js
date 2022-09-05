import "./SettingsPage.css"
//Assets
import { ReactComponent as LightModeIcon } from "../../Assets/lightmode.svg"
import { ReactComponent as DarkModeIcon } from "../../Assets/darkmode.svg"
import { ReactComponent as CloseIcon } from "../../Assets/delete.svg"
//Custom Hooks
import useLocalStorage from '../../CustomHooks/useLocalStorage';
//Themes
import themeSwitch from "../../Themes/themeObjects";
import { useState } from "react";
//Api
import UserRequest from "../../Api/UserRequest";

function SettingsPage(props) {
    const [theme, setTheme] = useLocalStorage("theme", "light")
    const [deleteModal, setDeleteModal] = useState(false)

    function switchTheme(theme) {
        if (theme === "dark") {
            themeSwitch(theme)
            setTheme(theme)
        }
        else {
            themeSwitch(theme)
            setTheme("light")
        }
    }
    function themeHighlighter(expectedTheme) {
        if (theme === expectedTheme) {
            return "themeButtonHighlighted"
        }
    }
    function toggleDeleteModal() {
        setDeleteModal(!deleteModal)
    }
    function deleteAccount() {
        const res = UserRequest.deleteUser(props.token)
        if (res !== undefined) {
            alert("Your account has been succesfully deleted")
            props.setAuth(false)
        }
    }

    return (
        <div className="settingsPageCon">
            {deleteModal ? <div className="deleteModalBackground">
                <div className="deleteModalCon">
                    <CloseIcon className="closeIcon" onClick={() => toggleDeleteModal()}></CloseIcon>
                    <h2>Are you sure you want to delete your account? This change is not reverseable.</h2>
                    <div className="deleteModalBtnCon">
                        <button className="cancelBtn" onClick={() => toggleDeleteModal()}>Cancel</button>
                        <button className="deleteBtn" onClick={() => deleteAccount()}>Delete</button>
                    </div>
                </div>
            </div> : null}
            <h1>Theme</h1>
            <div className="themeBtnCon">
                <button className="themeButton" onClick={() => switchTheme("light")}>
                    <LightModeIcon className={themeHighlighter("light")}></LightModeIcon>
                </button>
                <button className="themeButton">
                    <DarkModeIcon className={themeHighlighter("dark")} onClick={() => switchTheme("dark")}></DarkModeIcon>
                </button>
            </div>
            <h1>Account Management</h1>
            <button className="deleteAccountBtn" onClick={() => toggleDeleteModal()}>Delete Account</button>
            <h1>Version 1.0</h1>
        </div>
    );
}

export default SettingsPage;