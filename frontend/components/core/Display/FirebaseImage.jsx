import Image from "next/image";
import React, { useEffect, useState } from "react";
import { loadPhotoFromFirebase } from "../../../utils/firebaseUtils";
import { Skeleton } from "@mui/material";

const FirebaseImage = ({ url, width, height }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const fetchFile = async () => {
      const newUrl = await loadPhotoFromFirebase(`${url}`);
      if (newUrl != null) {
        setImageUrl(newUrl);
      }
    };
    fetchFile();
  }, []);

  const loadHandler = () => {
    console.log("loaded");
    setIsImageLoaded(true);
  };

  return (
    <>
      {imageUrl ? (
        <img
          width={width ? width : 120}
          height={height ? height : 240}
          src={imageUrl}
          loading="lazy"
          className="pointer-events-none p-1 border rounded-md"
          style={{
            objectFit: "cover",
            width: width ? width : width,
            height: height ? height : height,
          }}
          onLoad={loadHandler}
        />
      ) : (
        <Skeleton
          variant="rectangular"
          className="w-full h-full"
          width={width ? width : 120}
          height={height ? height : 240}
        />
      )}
    </>
  );
};

export default FirebaseImage;
