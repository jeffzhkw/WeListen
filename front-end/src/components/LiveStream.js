import { React, useState, useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import $ from "jquery";
import { Form, Input, Button } from "antd";

function LiveStream({ userInfo }) {
  const [name, setName] = useState();
  const [disabledhost, setDisabledhost] = useState(false);
  const [disabledaudience, setDisabledaudience] = useState(false);
  const [disabledLeave, setDisabledLeave] = useState(true);

  let username = userInfo.username;
  var client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
  var localTracks = {
    videoTrack: null,
    audioTrack: null,
  };
  var remoteUsers = {};
  // Agora client options
  var options = {
    appid: "e5b697ba1c184a06bb5783e933699a4c",
    channel: null,
    uid: username,
    token: null,
    role: "audience", // host or audience
    audienceLatency: 2,
  };

  // the demo can auto join channel with params in url
  // $(() => {
  //     var urlParams = new URL(location.href).searchParams;
  //     options.appid = urlParams.get("appid");
  //     options.channel = urlParams.get("channel");
  //     options.token = urlParams.get("token");
  //     options.uid = urlParams.get("uid");
  //     if (options.appid && options.channel) {
  //         $("#uid").val(options.uid);
  //         $("#appid").val(options.appid);
  //         $("#token").val(options.token);
  //         $("#channel").val(options.channel);
  //         $("#join-form").submit();
  //     }
  // })

  //   $("#host-join").on("click", function (e) {
  //     options.role = "host";
  //   });

  //   $("#audience-join").on("click", function (e) {
  //     options.role = "audience";
  //     options.audienceLatency = 2;
  //     $("#join-form").trigger("submit");
  //   });
  // $("#lowLatency").on("click", function (e) {
  //     options.role = "audience"
  //     options.audienceLatency = 1
  //     $("#join-form").trigger("submit")
  // })

  // $("#ultraLowLatency").on("click", function (e) {
  //     options.role = "audience"
  //     options.audienceLatency = 2
  //     $("#join-form").trigger("submit")
  // })

  //   $("#join-form").on("submit", async function (e) {
  //     e.preventDefault();
  //     $("#host-join").attr("disabled", true);
  //     $("#audience-join").attr("disabled", true);
  //     try {
  //       options.channel = $("#channel").val();
  //       await join();
  //       if (options.role === "host") {
  //         $("#success-alert a").attr(
  //           "href",
  //           `index.html?appid=${options.appid}&channel=${options.channel}&token=${options.token}`
  //         );
  //         if (options.token) {
  //           $("#success-alert-with-token").css("display", "block");
  //         } else {
  //           $("#success-alert a").attr(
  //             "href",
  //             `index.html?appid=${options.appid}&channel=${options.channel}&token=${options.token}`
  //           );
  //           $("#success-alert").css("display", "block");
  //         }
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       $("#leave").attr("disabled", false);
  //     }
  //   });

  //   $("#leave").on("click", function (e) {
  //     leave();
  //   });

  async function join() {
    // create Agora client

    console.log(options.role)
    if (options.role === "audience") {
      client.setClientRole(options.role, { level: options.audienceLatency });
      // add event listener to play remote tracks when remote user publishs.
      client.on("user-published", handleUserPublished);
      client.on("user-unpublished", handleUserUnpublished);
    } else {
      client.setClientRole(options.role);
    }

    // join the channel
    options.uid = await client.join(
      options.appid,
      options.channel,
      options.token || null,
      options.uid || null
    );

    if (options.role === "host") {
      // create local audio and video tracks
      localTracks.audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      localTracks.videoTrack = await AgoraRTC.createCameraVideoTrack();
      // play local video track
      localTracks.videoTrack.play("local-player");
      $("#local-player-name").text(`localTrack(${options.uid})`);
      // publish local tracks to channel
      await client.publish(Object.values(localTracks));
      console.log("publish success");
    }
  }

  async function leave() {
    let trackName;
    for (trackName in localTracks) {
      var track = localTracks[trackName];
      if (track) {
        track.stop();
        track.close();
        localTracks[trackName] = undefined;
      }
    }

    // remove remote users and player views
    remoteUsers = {};
    $("#remote-playerlist").html("");

    // leave the channel
    await client.leave();

    $("#local-player-name").text("");
    // $("#host-join").attr("disabled", false);
    // $("#audience-join").attr("disabled", false);
    // $("#leave").attr("disabled", true);
    setDisabledhost(false);
    setDisabledaudience(false);
    setDisabledLeave(true);
    console.log("client leaves channel success");
  }
  async function Joinhost() {
    options.role = "host";
  }
  async function Joinaudience() {
    options.role = "audience";
    options.audienceLatency = 2;
    joinform();
  }
  async function joinform() {
    setDisabledhost(true);
    setDisabledaudience(true);
    try {
      options.channel = name;
      await join();
      if (options.role === "host") {
        $("#success-alert a").attr(
          "href",
          `index.html?appid=${options.appid}&channel=${options.channel}&token=${options.token}`
        );
        if (options.token) {
          $("#success-alert-with-token").css("display", "block");
        } else {
          $("#success-alert a").attr(
            "href",
            `index.html?appid=${options.appid}&channel=${options.channel}&token=${options.token}`
          );
          $("#success-alert").css("display", "block");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDisabledLeave(false);
    }
  }

  async function subscribe(user, mediaType) {
    const uid = user.uid;
    // subscribe to a remote user
    await client.subscribe(user, mediaType);
    console.log("subscribe success");
    if (mediaType === "video") {
      const player = $(`
          <div id="player-wrapper-${uid}">
            <p class="player-name">remoteUser(${uid})</p>
            <div id="player-${uid}" class="player"></div>
          </div>
        `);
      $("#remote-playerlist").append(player);
      user.videoTrack.play(`player-${uid}`, { fit: "contain" });
    }
    if (mediaType === "audio") {
      user.audioTrack.play();
    }
  }

  function handleUserPublished(user, mediaType) {
    const id = user.uid;
    remoteUsers[id] = user;
    subscribe(user, mediaType);
  }

  function handleUserUnpublished(user, mediaType) {
    if (mediaType === "video") {
      const id = user.uid;
      delete remoteUsers[id];
      $(`#player-wrapper-${id}`).remove();
    }
  }
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 14 },
  };

  return (
    <div className="groupitem">
      <h1>LiveStream</h1>

      <div class="container-fluid banner">
        <a
          class="Header-link "
          href="https://github.com/AgoraIO/API-Examples-Web/tree/main/Demo"
        >
          <svg
            class="octicon octicon-mark-github v-align-middle"
            height="32"
            viewBox="0 0 16 16"
            version="1.1"
            width="32"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
            ></path>
          </svg>
        </a>
      </div>
      <div
        id="success-alert"
        class="alert alert-success alert-dismissible fade show livestreamcalsss"
        role="alert"
      >
        <div>Congratulations!</div>
        <span> You can invite others to watch your live by click </span>
        <div style={{marginBottom:'10px'}}>
          <a href="" target="_blank" class="bigclass">
            here
          </a>
        </div>

        <div>
          Please enter the room number that you want to create or join in
        </div>
      </div>
      <Form name="control-ref" {...formItemLayout} size="middle">
        <Form.Item label="Room Name:">
          <Input
            allowClear
            size="large"
            value={name}
            placeholder="enter room name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="Create:">
          <Button
            type="primary"
            onClick={Joinhost}
            size="large"
            disabled={disabledhost}
          >
            Create your own room
          </Button>
        </Form.Item>
        <Form.Item label="Join Leave:">
          <Button
            type="primary"
            onClick={Joinaudience}
            size="large"
            disabled={disabledaudience}
          >
            Join as audience
          </Button>
          <Button
            type="primary"
            onClick={leave}
            size="large"
            disabled={disabledLeave}
            className="left16"
          >
            Leave
          </Button>
        </Form.Item>
      </Form>
      {/* <div class="container-fluid banner">
        <p class="banner-text">Basic Live</p>
        <a
          class="Header-link "
          href="https://github.com/AgoraIO/API-Examples-Web/tree/main/Demo"
        >
          <svg
            class="octicon octicon-mark-github v-align-middle"
            height="32"
            viewBox="0 0 16 16"
            version="1.1"
            width="32"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
            ></path>
          </svg>
        </a>
      </div>

      <div
        id="success-alert"
        class="alert alert-success alert-dismissible fade show"
        role="alert"
      >
        <strong>Congratulations!</strong>
        <span> You can invite others to watch your live by click </span>
        <a href="" target="_blank">
          here
        </a>
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div> */}

      <div class="container">
        {/* <form id="join-form" name="join-form">
          <div class="row join-info-group">
            <div class="col-sm">
              <p class="join-info-text">Room Name</p>
              <input
                id="channel"
                type="text"
                placeholder="enter room name"
                required
              />
            </div>
          </div>

          <div class="button-group">
            <button id="host-join" type="submit" class="btn btn-primary btn-sm">
              Join as host
            </button>
            <div class="btn-group">
              <button
                id="audience-join"
                type="button"
                class="btn btn-primary btn-sm"
              >
                Join as audience
              </button>
            </div>
            <button
              id="leave"
              type="button"
              class="btn btn-primary btn-sm"
              disabled
            >
              Leave
            </button>
          </div>
        </form> */}
        <div class="row video-group">
          <div class="col">
            <p id="local-player-name" class="player-name"></p>
            <div id="local-player" class="player"></div>
          </div>
          <div class="w-100"></div>
          <div class="col">
            <div id="remote-playerlist"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveStream;
