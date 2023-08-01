import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const ChatTopPanel = () => {
  return (
    <Stack
      className="h-16 border-b items-center px-5 py-1 w-full"
      direction="row"
    >
      <FiberManualRecordIcon className="mr-10 text-green-500" fontSize="xs" />
      <Avatar
        alt="Janine"
        src="/static/images/avatar/3.jpg"
        className="bg-green-200"
      />
      <Stack direction="column" alignItems="start" justifyContent="center">
        <Typography variant="h4" className="ml-3">
          Janine
        </Typography>
        <Typography variant="subtitle2" className="ml-3">
          Last seen 21 min ago..
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ChatTopPanel;
