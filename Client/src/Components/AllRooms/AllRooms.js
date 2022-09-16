import "./AllRooms.css"
import { useState, useEffect } from "react";
//Components
import Room from "../Room/Room";
import LoadMore from "../LoadMore/LoadMore"
import LoadingRoom from "../LoadingRoom/LoadingRoom";
//Assets
import { ReactComponent as SearchIcon } from "../../Assets/searchIcon.svg"
//Api
import RoomRequest from "../../Api/RoomRequest";
function AllRooms(props) {
  const [searchInput, setSearchInput] = useState("")
  const [prevSearch, setPrevSearch] = useState("")
  const [creatingRoom, setCreatingRoom] = useState(false)
  const [newRoomInput, setNewRoomInput] = useState("")

  async function search(e) {
    if ((e.key === 'Enter') && (searchInput !== prevSearch)) {
      await props.getRoomsSearchedAsync(searchInput)
      setPrevSearch(searchInput)
    }
  }
  async function createRoom() {
    if (newRoomInput.trim().length > 0 && newRoomInput.length <=22) {
      const token = props.token
      const res = await RoomRequest.createRoom(token, newRoomInput)
      if (res !== undefined) {
        setCreatingRoom(false)
        setNewRoomInput("")
        await props.getRoomsSearchedAsync("")
        await props.getRoomsCreatedAsync()
      }
    }
    else{
      alert("Room name must be less than 22 characters and greater than 0")
    }
  }
  return (
    <div className="allRoomsAndSearchCon" id="allRooms">
      <div className="searchRoomsInputCon">
        <SearchIcon className="searchIconSvg"></SearchIcon>
        <input className="searchRoomsInput" placeholder="Search for rooms" onKeyPress={(e) => search(e)} value={searchInput} onChange={(e) => { setSearchInput(e.target.value) }}></input>
      </div>
      <div className="createRoomHeaderBtnCon">
        <div className="createRoomHeaderCon">
          <h2>ROOMS</h2>
          <h4>{props.searchedRooms.length} Rooms Available</h4>
        </div>
        <button onClick={() => { setCreatingRoom(!creatingRoom) }}>Create Room</button>
      </div>
      {creatingRoom ? <div className="searchRoomCon">
        <input placeholder="Room Name" value={newRoomInput} onChange={(e) => setNewRoomInput(e.target.value)}></input>
        <button onClick={() => { createRoom() }}>Create</button>
      </div> : null}
      {props.searchedRoomsLoading?
      <div className="loadingRoomsCon">
      <LoadingRoom></LoadingRoom>
      <LoadingRoom></LoadingRoom>
      <LoadingRoom></LoadingRoom>
      <LoadingRoom></LoadingRoom>
      </div>:null}
      {props.searchedRooms.map((room) => {
        return <Room key={room.id} id={room.id} roomName={room.roomName} roomCreator={room.creatorDisplayName} membersCount={(room.joinedUsersDisplayNames.length) + 1}></Room>
      })}
      {props.showMoreSearch ? <LoadMore roomSearchLoadMore={props.roomSearchLoadMore} searchInput={searchInput}></LoadMore> : null}
    </div>
  );
}

export default AllRooms;