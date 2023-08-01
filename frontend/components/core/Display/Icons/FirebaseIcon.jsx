import Image from "next/image";
import React, { useEffect, useState } from "react";
import { loadPhotoFromFirebase } from "../../../../utils/firebaseUtils";

const FirebaseIcon = ({ url }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchFile = async () => {
      const newUrl = await loadPhotoFromFirebase(`${url}.svg`);
      if (newUrl != null) {
        setImageUrl(newUrl);
      }
    };
    fetchFile();
  }, []);

  return <>{imageUrl && <img src={imageUrl} className="w-7 h-7" />}</>;
};

export default FirebaseIcon;
