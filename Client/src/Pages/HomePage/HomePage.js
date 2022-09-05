import "./HomePage.css"
import { useEffect, useState } from "react";
//Components 
import AllRoom from "../../Components/AllRooms/AllRooms"
import RoomsJoined from "../../Components/RoomsJoined/RoomsJoined";
//Api
import RoomRequest from "../../Api/RoomRequest"
function HomePage(props) {
     const [searchedRooms, setSearchdRooms] = useState([])
     const [roomsJoined, setRoomsJoined] = useState([])
     const [roomsCreated, setRoomsCreated] = useState([])
     const [showMoreSearch, setShowMoreSearch] = useState(false)
     const [startStopSearch,setStartStopSearch] = useState(0)
     const token = props.token

     const getRoomsSearchedAsync = async (searchInput) => {
          const res = await RoomRequest.searchForRooms(token, searchInput,0)
          setStartStopSearch(0)
          if (res !== undefined) {
               const rooms = [...res.data];
               //If 11 rooms are returned then show the show more button
               if(res.data.length > 10){
                    rooms.pop()
                    setSearchdRooms(rooms)
                    setShowMoreSearch(true)
               }
               else{
                    setShowMoreSearch(false)
                    setSearchdRooms(rooms)
               }
          }
     }
     const roomSearchLoadMore = async(searchInput)=>{
          console.log("loaded more")
          const res = await RoomRequest.searchForRooms(token, searchInput,startStopSearch+10)
          setStartStopSearch(startStopSearch+10)
          if (res !== undefined) {
               const rooms = [...res.data];
               const updatedRooms = searchedRooms.concat(rooms);
               if(res.data.length > 10){
                    updatedRooms.pop()
                    setShowMoreSearch(true)
               }
               else{
                    setShowMoreSearch(false)
               }
               setSearchdRooms(updatedRooms)
          }
     }
     const getRoomsCreatedAsync = async () => {
          const res = await RoomRequest.getCreatedRooms(token)
          if (res !== undefined) {
               setRoomsCreated(res.data)
          }
     }
     const getRoomsJoinedAsync = async () => {
          const res = await RoomRequest.getJoinedRooms(token)
          if (res !== undefined) {
               setRoomsJoined(res.data)
          }
     }
     useEffect(() => {
          getRoomsCreatedAsync()
          getRoomsJoinedAsync()
          getRoomsSearchedAsync("")
     }, [])
     return (
          <div className="homePageCon">
               <AllRoom searchedRooms={searchedRooms} getRoomsSearchedAsync={getRoomsSearchedAsync} token={props.token} getRoomsCreatedAsync={getRoomsCreatedAsync} showMoreSearch= {showMoreSearch} roomSearchLoadMore = {roomSearchLoadMore} ></AllRoom>
               <RoomsJoined roomsJoined={roomsJoined} roomsCreated={roomsCreated}></RoomsJoined>
          </div>
     );
}

export default HomePage;