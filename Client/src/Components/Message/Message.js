import "./Message.css"
function Message(props) {
    return (
    <div>
        <p className={props.usersMessage ? "messageUserName":"messageOtherName"}>@{props.senderDisplayName}</p>
        <p className = {props.usersMessage ? "messageUser":"messageOther"}>
        {props.messageContent}
    </p>
    </div>);
}

export default Message;