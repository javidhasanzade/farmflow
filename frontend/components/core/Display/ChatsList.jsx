import { Divider, Paper, Stack } from "@mui/material";
import React from "react";
import ChatListMessage from "./ChatListMessage";

const ChatsList = () => {
  return (
    <Stack
      divider={<Divider variant="inset" className="mr-4" />}
      className="w-full border-r h-full"
    >
      <ChatListMessage />
      <ChatListMessage />
      <ChatListMessage />
    </Stack>
  );
};

export default ChatsList;
