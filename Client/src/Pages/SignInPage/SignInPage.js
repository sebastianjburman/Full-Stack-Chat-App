import "./SignInPage.css"
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router';
import { useState } from "react";
//Api
import UserRequest from "../../Api/UserRequest"
//Assets
import Logo from "../../Assets/logo.svg.svg"
import loadingLogin from "../../Assets/loginLoading.svg"


function SignInPage(props) {
  const navigate = useNavigate();
  const [usernameInput, setUsernameInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [loggingIn, setLoggingIn] = useState(false)

  async function login() {
      setLoggingIn(true)
      if(formValidation()){
        const response = await UserRequest.authenticate(usernameInput, passwordInput)
        if (response !== undefined) {
          const token = response.data
          if (token === "User not found") {
            setUsernameInput("")
            setPasswordInput("")
            alert("User not found")
          }
          else {
            props.setToken(token)
            props.setAuth(true)
            localStorage.setItem("token", token)
            navigate("/", { replace: true })
          }
        }
      }
      setLoggingIn(false)
  }
  function formValidation(){
    return true
  }

  return (
    <div className="signInPageCon">
      {loggingIn ? <img src={loadingLogin}></img>:<div className="loginCon">
        <div className="logoNameCon">
          <img src={Logo}></img>
          <h1>TetraRoom</h1>
        </div>
        <div className="inputCon">
          <label>Username</label>
          <input value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)}></input>
        </div>
        <div className="inputCon">
          <label>Password</label>
          <input value={passwordInput} type="password" onChange={(e) => setPasswordInput(e.target.value)}></input>
        </div>
        <button className="loginButton" onClick={() => login()}>Login</button>
        <div className="signUpLinkTextCon">
          <p>Don't have an account</p>
          <Link to="/signup">Create an Account</Link>
        </div>
      </div>}
    </div>
  );
}

export default SignInPage