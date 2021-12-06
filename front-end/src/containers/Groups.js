import React from "react";
import Chat from "../components/Chat";
import LiveStream from "../components/LiveStream";

function Groups({ userInfo }) {
  //TODO: Ask Flask to send a list of avaliable groups.
  return (
    <div className="containerWrapper">
      <h1>Groups</h1>
      <div className="groupsWrapper">
        <Chat userInfo={userInfo}></Chat>
        <LiveStream userInfo={userInfo}></LiveStream>
      </div>
    </div>
  );
}

export default Groups;
