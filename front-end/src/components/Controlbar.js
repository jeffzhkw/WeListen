import React from "react";

function ControlBar() {
  var audioStream =
    "https://r3---sn-ab5l6nzr.googlevideo.com/videoplayback?expire=1636169970&ei=kqSFYdnTGdDFgwPq0IXoDQ&ip=216.165.95.191&id=o-AIcUp01wMJwGJmO6pHuBx7zK_kDxGt3FafaET9EfQU-M&itag=140&source=youtube&requiressl=yes&mh=IK&mm=31%2C29&mn=sn-ab5l6nzr%2Csn-ab5szn7y&ms=au%2Crdu&mv=m&mvi=3&pl=19&initcwndbps=2976250&vprv=1&mime=audio%2Fmp4&ns=m3Yd85aETB1cIVzhJ1jhv9MG&gir=yes&clen=3402416&dur=210.187&lmt=1607904036725382&mt=1636148215&fvip=3&keepalive=yes&fexp=24001373%2C24007246&c=WEB&txp=5531432&n=uNWj2TMVvsizTjYP&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIhAOcKU_JrqpIi1xq45KCaIwlrRchxlR7HP1P3-3kmFd3VAiAMw2UMjFZGHjuoYjfKoQ_L4e0QcJFALN5bRwV1CNcV6g%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRgIhAK9C-uaeZGc9EosZC0Ph_l6i1Ios8NILyxfIC5Jd9nI-AiEAtnEarVakCB_9j_zToUxM0_GnP6nFzxiEzBaGQPpWQ4w%3D";

  return (
    <div className="controlBarWrapper">
      <div className="musicPlayer">
        <audio controls src={audioStream}>
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      </div>
      <div className="channelDetail">
        <div className="listener"></div>
        <div className="channelAdmin"></div>
      </div>
    </div>
  );
}

export default ControlBar;
