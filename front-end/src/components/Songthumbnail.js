import axios from "@aws-amplify/storage/node_modules/axios";
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
const { REACT_APP_API_URL } = process.env;

// function SongThumbnail({ songID, handlePlay }) {
//   const [songDetail, setSongDetail] = useState();
//   console.log(songID);
//   useEffect(
//     (songID) => {
//       axios
//         .get(`${REACT_APP_API_URL}/youtubeDetail?songID=${songID}`)
//         .then((response) => {
//           setSongDetail(response.data);
//         })
//         // TODO: Fix youtubeDetail 500 Error code (Chirs Xu)
//         .catch((error) => {
//           console.warn(error);
//         });
//     },
//     [songID]
//   );
//   return (
//     <div className="square">
//       {songDetail ? (
//         <>
//           <h3>{songDetail.title}</h3>
//           <h4>{songDetail.artist}</h4>
//           <img src={songDetail.default.url} alt="the album cover"></img>
//           <p>
//             <Link to={"/song/" + songID}>To Song detail page</Link>
//           </p>
//           <p>
//             <Link to={"/activity/?urlSongID=" + songID}>
//               Share this Song to activity
//             </Link>
//           </p>
//           <button
//             onClick={() => {
//               handlePlay(
//                 songDetail.video_title,
//                 songDetail.artist,
//                 songDetail.stream
//               );
//             }}
//           >
//             Play
//           </button>
//         </>
//       ) : (
//         <></>
//       )}
//     </div>
//   );
// }

function SongThumbnail({ title, artist, album, stream, handlePlay }) {
  return (
    <div className="square">
      <h3>{title}</h3>
      <h4>{artist}</h4>
      <img src={album} alt="the album cover"></img>
      <p>
        <Link to={"/song/" + title}>To Song detail page</Link>
      </p>
      <p>
        <Link to={"/activity/" + title}>Share this song</Link>
      </p>
      <button
        onClick={() => {
          handlePlay(title, artist, stream);
        }}
      >
        Play
      </button>
    </div>
  );
}

export default SongThumbnail;
