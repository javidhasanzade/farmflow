import { Stack, Typography } from "@mui/material";
import React from "react";
import ChatMessage from "./ChatMessage";

const ChatWindow = () => {
  return (
    <Stack
      minHeight={400}
      className="h-full w-full py-3 px-10 item overflow-scroll"
      direction="column"
    >
      <ChatMessage my>Can i see the tomatoes?</ChatMessage>
      <ChatMessage my={false}>
        Of course, I'll send you them in a minute
      </ChatMessage>
      <ChatMessage my={false}>
        <img className="w-full h-full object-cover" src="/tomato.svg" />
        {`here are the tomatoes you asked for`}
      </ChatMessage>
    </Stack>
  );
};

export default ChatWindow;
