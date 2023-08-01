import React from "react";

import blob1 from "../../public/blob1.svg";
import blob2 from "../../public/blob2.svg";
import Image from "next/image";

const BackgroundShapes = () => {
  return (
    <>
      <Image
        src={blob1}
        width={200}
        height={200}
        style={{
          position: "absolute",
          height: "15.5rem",
          width: "15.5rem",
          left: "-0.5rem",
          top: "2rem",
        }}
        className="blob"
      ></Image>
      <Image
        src={blob1}
        width={200}
        height={200}
        style={{
          position: "absolute",
          height: "15.5rem",
          width: "15.5rem",
          left: "-0.5rem",
          top: "2rem",
        }}
        className="blob-glow"
      ></Image>
      <Image
        src={blob2}
        width={200}
        height={200}
        style={{
          position: "absolute",
          height: "15.5rem",
          width: "15.5rem",
          left: "1.2rem",
          top: "-1.2rem",
        }}
        className="blob"
      ></Image>
      <Image
        src={blob2}
        width={200}
        height={200}
        style={{
          position: "absolute",
          height: "15.5rem",
          width: "15.5rem",
          left: "1.2rem",
          top: "-1.2rem",
        }}
        className="blob-glow"
      ></Image>
    </>
  );
};

export default BackgroundShapes;
