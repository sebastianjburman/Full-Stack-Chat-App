import React from "react";
import { Navigate } from "react-router-dom"
import { useEffect } from "react";
import "./PrivateRoute.css"
//Components
import NavBar from "../NavBar/NavBar"
import BottomNavBar from "../BottomNavBar/BottomNavBar";
//Api 
import UserRequest from "../../Api/UserRequest";


function PrivateRoute(props) {
  useEffect(() => {
    const token = props.token
    if (token) {
      const fetchUser = async () => {
          const res = await UserRequest.getUser(token)
          if(res !== undefined){
            props.setLoggedInUserObject(res.data)
          }
      }
      fetchUser()
    }

  }, [])
  return (props.auth ? <div className="privateRouteCon"><NavBar setToken={props.setToken} setAuth={props.setAuth} loggedInUserObject={props.loggedInUserObject}></NavBar><div className="pagesContainer">{props.children}
  </div><BottomNavBar></BottomNavBar ></div> : <Navigate to="/login" />);
}

export default PrivateRoute;