import { Stack, TextField } from "@mui/material";
import React from "react";

import AttachmentIcon from "@mui/icons-material/Attachment";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const ChatBottomPanel = () => {
  return (
    <Stack
      className="h-16 border-b items-center px-5 py-1 w-full border-t"
      direction="row"
    >
      <AttachmentIcon
        className="mr-10 text-green-500 hover:text-green-600"
        fontSize="large"
      />

      <TextField variant="standard" fullWidth className="mr-4" />
      <Stack direction="row" alignItems="start" justifyContent="center">
        <div className="px-2 py-2 rounded-md mr-4 text-green-500 hover:text-white hover:bg-green-200 transition-all flex items-center justify-center">
          <EmojiEmotionsIcon className="" />
        </div>
        <div className="px-2 py-2 rounded-md  text-green-500 hover:text-white hover:bg-green-200 transition-all flex items-center justify-center">
          <SendIcon className="" />
        </div>
      </Stack>
    </Stack>
  );
};

export default ChatBottomPanel;
