import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
//Pages
import SignInPage from './Pages/SignInPage/SignInPage';
import HomePage from './Pages/HomePage/HomePage';
import SignUpPage from './Pages/SignUpPage/SignUpPage';
import SettingsPage from "./Pages/SettingsPage/SettingsPage"
import RoomViewPage from './Pages/RoomViewPage/RoomViewPage';
//Components
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
//Api
import UserRequest from './Api/UserRequest';
//Theme
import themeSwitch from './Themes/themeObjects';

function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [auth, setAuth] = useState(false);
  const [loggedInUserObject, setLoggedInUserObject] = useState({})


  useEffect(() => {
    const themeString = localStorage.getItem("theme")
    switch(themeString) {
      case "\"light\"":
        themeSwitch("light")
        break;
      case "\"dark\"":
        themeSwitch("dark")
        break;
        default:
        themeSwitch("light")
    }
    if (localStorage.getItem('token') !== null) {
      const token = localStorage.getItem("token");
      if (token) {
        const fetchUser = async () => {
          try {
            const res = await UserRequest.getUser(token)
            console.log("Auth Checked")
            if (res.status === 200) {
              setAuth(true);
              setToken(token)
              navigate("/", { replace: true })
            }
            else if (res.status === 401) {
              localStorage.removeItem("token");
            }
          }
          catch {
            localStorage.removeItem("token");
          }
        }
        fetchUser()
      }
    }
  }, [])
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <PrivateRoute setToken={setToken} token={token} setAuth={setAuth} auth={auth} setLoggedInUserObject={setLoggedInUserObject} loggedInUserObject={loggedInUserObject}>
            <HomePage token={token}/>
          </PrivateRoute>
        } />
        <Route path="/settings" element={
          <PrivateRoute setToken={setToken} token={token} setAuth={setAuth} auth={auth} setLoggedInUserObject={setLoggedInUserObject} loggedInUserObject={loggedInUserObject}>
            <SettingsPage token = {token} setAuth={setAuth}/>
          </PrivateRoute>
        } />
        <Route path="/login" element={
          <SignInPage setToken={setToken} setAuth={setAuth} />
        } />
        <Route path={"/room/:roomId"} element={
          <PrivateRoute setToken={setToken} token={token} setAuth={setAuth} auth={auth} setLoggedInUserObject={setLoggedInUserObject} loggedInUserObject={loggedInUserObject}>
            <RoomViewPage token={token} loggedInUserObject = {loggedInUserObject} />
          </PrivateRoute>
        } />
        <Route path='/signup' element={<SignUpPage></SignUpPage>} />
        {/*Redirects*/}
        <Route path="/" element={<Navigate to="/*" />} />
      </Routes>
    </div>
  );
}

export default App;
