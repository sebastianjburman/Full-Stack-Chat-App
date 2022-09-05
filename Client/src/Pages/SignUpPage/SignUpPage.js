import "./SignUpPage.css"
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router';
import { useState } from "react";

//Api
import UserRequest from "../../Api/UserRequest"

//Assets
import Logo from "../../Assets/logo.svg.svg"

function SignUpPage() {
  const [emailInput, setEmailInput] = useState("")
  const [displayNameInput, setDisplayNameInput] = useState("")
  const [usernameInput, setUsernameInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [passwordConInput, setPasswordConInput] = useState("")

  const navigate = useNavigate();

  async function SignUp() {
    if (formValidation()) {
      const res = await UserRequest.createUser(displayNameInput, emailInput, usernameInput, passwordInput)
      if (res !== undefined) {
        navigate("/login")
      }
      else {
        setEmailInput("")
        setDisplayNameInput("")
        setUsernameInput("")
        setPasswordInput("")
        setPasswordConInput("")
      }
    }
  }
  function formValidation() {
    const lengthValidation = emailInput.length >=5 && displayNameInput.length >= 5 && usernameInput.length>=5&&passwordInput.length>=5 && displayNameInput.length<=14;
    const passwordCon = passwordInput === passwordConInput
    if(!lengthValidation){
      alert("All fields must be 5 or more characters and Display Name can't be more than 14 characters")
      return false
    }
    else if(!passwordCon){
      alert("Passwords do not match")
      return false
    }
    return true
  }

  return (
    <div className="signUpPageCon">
      <div className="signUpCon">
        <div className="signUplogoNameCon">
          <img src={Logo}></img>
          <h1>TetraRoom</h1>
        </div>
        <div className="signUpInputCon">
          <label>Email</label>
          <input value={emailInput} onChange={(e) => setEmailInput(e.target.value)}></input>
        </div>
        <div className="signUpInputCon">
          <label>Display Name</label>
          <input value={displayNameInput} onChange={(e) => setDisplayNameInput(e.target.value)}></input>
        </div>
        <div className="signUpInputCon">
          <label>Username</label>
          <input value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)}></input>
        </div>
        <div className="signUpInputCon">
          <label>Password</label>
          <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)}></input>
        </div>
        <div className="signUpInputCon">
          <label>Password Confirmation</label>
          <input type="password" value={passwordConInput} onChange={(e) => setPasswordConInput(e.target.value)}></input>
        </div>
        <button className="signUpLoginButton" onClick={() => SignUp()}>Sign Up</button>
        <div className="loginLinkTextCon">
          <p>Already have an account</p>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;