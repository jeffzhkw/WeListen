import React from "react";
import Chat from "../components/Chat";
import LiveStream from "../components/LiveStream";

function Groups({ userInfo }) {
  //TODO: Ask Flask to send a list of avaliable groups.
  return (
    <div className="containerWrapper groupsClass">
      <Chat userInfo={userInfo}></Chat>
      {/* <h1>Groups</h1>
      <div className="groupsWrapper">
      </div> */}
      <LiveStream userInfo={userInfo}></LiveStream>
    </div>
  );
}

export default Groups;
