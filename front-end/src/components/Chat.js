import { React, useState, useEffect } from "react";
import AgoraRTM from "agora-rtm-sdk";
import { Form, Input, Button } from "antd";
const { Search } = Input;

function Chat({ userInfo }) {
  const [channelMessage, setChannelMessage] = useState();
  const [peerId, setPeerId] = useState();
  const [peerMessage, setPeerMessage] = useState();
  let username = userInfo.username;
  let options = {
    uid: "",
    token: "",
  };
  let joinedChannel = false;
  let chatEnabled = false;
  let locked = false;

  const appID = "e230be4125e6457bb6380e036fb2a2c6";
  options.appID = appID;
  options.token = "";

  const client = AgoraRTM.createInstance(appID);
  client.on("MessageFromPeer", function (message, peerId) {
    document
      .getElementById("log")
      .appendChild(document.createElement("div"))
      .append("Message from: " + peerId + " Message: " + message.text);
  });
  client.on("ConnectionStateChanged", function (state, reason) {
    document
      .getElementById("log")
      .appendChild(document.createElement("div"))
      .append("State changed To: " + state + " Reason: " + reason);
  });

  let channel = client.createChannel("PublicChat");

  channel.on("ChannelMessage", function (message, memberId) {
    document
      .getElementById("log")
      .appendChild(document.createElement("div"))
      .append(
        "Public message received from: " +
          memberId +
          " Message: " +
          message.text
      );
  });
  channel.on("MemberJoined", function (memberId) {
    document
      .getElementById("log")
      .appendChild(document.createElement("div"))
      .append(memberId + " joined the channel");
  });
  channel.on("MemberLeft", function (memberId) {
    document
      .getElementById("log")
      .appendChild(document.createElement("div"))
      .append(memberId + " left the channel");
  });
  async function Login() {
    console.log(options.uid);
    if (!chatEnabled && !locked) {
      await client.login({ uid: username }).then(() => {
        chatEnabled = true;
        locked = false;
      });
    }
  }
  async function Logout() {
    if (chatEnabled && !locked) {
      locked = true;
      await client.logout().then(() => {
        chatEnabled = false;
        joinedChannel = false;
        locked = false;
      });
    } else {
      document
        .getElementById("log")
        .appendChild(document.createElement("div"))
        .append("Chat already disabled");
    }
  }
  async function Join() {
    // Channel event listeners
    // Display channel messages
    if (chatEnabled && !joinedChannel && !locked) {
      locked = true;
      await channel.join().then(() => {
        document
          .getElementById("log")
          .appendChild(document.createElement("div"))
          .append("You have successfully joined " + channel.channelId);
        joinedChannel = true;
        locked = false;
      });
    } else {
      document
        .getElementById("log")
        .appendChild(document.createElement("div"))
        .append("Chat not enabled");
    }
  }
  async function Leave() {
    if (joinedChannel && !locked) {
      locked = true;
      await channel.leave().then(() => {
        document
          .getElementById("log")
          .appendChild(document.createElement("div"))
          .append("Left Public Chat");
        joinedChannel = false;
        locked = false;
      });
    } else {
      document
        .getElementById("log")
        .appendChild(document.createElement("div"))
        .append("You haven't joined Public Chat");
    }
  }
  async function SendPeerMessage() {
    // let peerId = document.getElementById("peerId").value.toString();
    // let peerMessage = document.getElementById("peerMessage").value.toString();
    await client
      .sendMessageToPeer({ text: peerMessage }, peerId)
      .then((sendResult) => {
        if (sendResult.hasPeerReceived) {
          document
            .getElementById("log")
            .appendChild(document.createElement("div"))
            .append(
              "Message has been received by: " +
                peerId +
                " Message: " +
                peerMessage
            );
        } else {
          document
            .getElementById("log")
            .appendChild(document.createElement("div"))
            .append("Message sent to: " + peerId + " Message: " + peerMessage);
        }
      })
      .catch((error) => {
        // console.warn(error);
        document
          .getElementById("log")
          .appendChild(document.createElement("div"))
          .append(error);
      });
  }
  async function SendChannelMessage() {
    // let channelMessage = document
    //   .getElementById("channelMessage")
    //   .value.toString();
    if (joinedChannel && !locked) {
      locked = true;
      await channel.sendMessage({ text: channelMessage }).then(() => {
        document
          .getElementById("log")
          .appendChild(document.createElement("div"))
          .append(
            "Channel message: " + channelMessage + " from " + channel.channelId
          );
        locked = false;
      });
    } else {
      document
        .getElementById("log")
        .appendChild(document.createElement("div"))
        .append("You haven't joined Public Chat");
    }
  }
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 14 },
  };
  return (
    <div className="groupitem">
      <h1>ChatRoom</h1>
      <Form name="control-ref" {...formItemLayout} size="middle">
        <Form.Item label="User ID:">{username}</Form.Item>
        <Form.Item label="Chat:">
          <Button type="primary" onClick={Login}>
            Enable Chat
          </Button>
          <Button onClick={Logout} className="left16">
            Disable Chat
          </Button>
        </Form.Item>
        <Form.Item label="PublicChat:">
          <Button type="primary" onClick={Join}>
            JOIN
          </Button>
          <Button onClick={Leave} className="left16">
            LEAVE
          </Button>
        </Form.Item>
        <Form.Item label="Public Message:">
          <Search
            allowClear
            enterButton="SEND"
            value={channelMessage}
            placeholder="channel message"
            onChange={(e) => {
              setChannelMessage(e.target.value);
            }}
            size="large"
            onSearch={SendChannelMessage}
          />
        </Form.Item>
        <Form.Item label="Peer Id:">
          <Input
            allowClear
            size="large"
            value={peerId}
            placeholder="peer id"
            onChange={(e) => {
              setPeerId(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="Peer Message:">
          <Search
            allowClear
            enterButton="SEND"
            value={peerMessage}
            placeholder="peer message"
            onChange={(e) => {
              setPeerMessage(e.target.value);
            }}
            size="large"
            onSearch={SendPeerMessage}
          />
        </Form.Item>
      </Form>
      <div id="log"></div>
      {/*  <h1 class="left-align">ChatRoom</h1>
     <form id="loginForm">
        <div class="col">
          <div class="card">
            <div class="row card-content">
              <div class="input-field">
                <label>User ID: {username}</label>
                <input type="hidden" value={username} id="userID" />
              </div>
              <div class="row">
                <div>
                  <button type="button" id="login" onClick={Login}>
                    Enable Chat
                  </button>
                  <button type="button" id="logout" onClick={Logout}>
                    Disable Chat
                  </button>
                </div>
              </div>
              <div class="input-field">
                <label>PublicChat</label>
              </div>
              <div class="row">
                <div>
                  <button type="button" id="join" onClick={Join}>
                    JOIN
                  </button>
                  <button type="button" id="leave" onClick={Leave}>
                    LEAVE
                  </button>
                </div>
              </div>
              <div class="input-field channel-padding">
                <label>Public Message</label>
                <input
                  type="text"
                  placeholder="channel message"
                  id="channelMessage"
                />
                <button
                  type="button"
                  id="send_channel_message"
                  onClick={SendChannelMessage}
                >
                  SEND
                </button>
              </div>
              <div class="input-field">
                <label>Peer Id</label>
                <input type="text" placeholder="peer id" id="peerId" />
              </div>

              <div class="input-field channel-padding">
                <label>Peer Message</label>
                <input
                  type="text"
                  placeholder="peer message"
                  id="peerMessage"
                />
                <button
                  type="button"
                  id="send_peer_message"
                  onClick={SendPeerMessage}
                >
                  SEND
                </button>
              </div>
            </div>
          </div>
        </div>
      </form> 
       <hr />
      <div id="log" style={{ overflow: "auto" }}></div> */}
    </div>
  );
}

export default Chat;
