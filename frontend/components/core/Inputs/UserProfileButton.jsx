import { Avatar, Box, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import useToken from "../../../utils/useToken";
import Image from "next/image";
import { loadPhotoFromFirebase } from "../../../utils/firebaseUtils";

const UserProfileButton = () => {
  const { user } = useToken();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchFile = async () => {
      if (user != null) {
        const url = await loadPhotoFromFirebase(user.avatarUrl);
        if (url != null) {
          setImageUrl(url);
        }
      }
    };
    fetchFile();
  }, [user]);

  return (
    <IconButton size="small">
      <Avatar sx={{ width: 32, height: 32 }} src={imageUrl}>
        M
      </Avatar>
    </IconButton>
  );
};

export default UserProfileButton;
