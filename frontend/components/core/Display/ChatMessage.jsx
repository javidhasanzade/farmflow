import { Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";

const ChatMessage = ({ children, my }) => {
  const messageStyle = my
    ? `rounded-xl rounded-bl-none`
    : `rounded-xl rounded-br-none ml-auto bg-green-300`;

  //   if (typeof children === "string") {
  //     return <div>{children}</div>;
  //   }

  // Check if the `children` prop is an image element
  let text = "";
  const imageArray = [];

  React.Children.forEach(children, (child) => {
    if (typeof child === "string") {
      text += child;
    } else if (React.isValidElement(child) && child.type === "img") {
      imageArray.push(child);
    }
  });

  return (
    <Paper
      className={`max-w-xs w-max px-1 border ${messageStyle}`}
      elevation={0}
      style={{ minWidth: 100 }}
    >
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        className="p-2"
      >
        {imageArray.map((image, index) => (
          <div
            key={index}
            className="w-full h-full max-h-80 max-w-80 flex items-center justify-center"
          >
            {image}
          </div>
        ))}
        {text}
      </Stack>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="end"
        className="max-h-min"
      >
        <Typography variant="subtitle2" className="text-right mr-1">
          9:00
        </Typography>
        {/* {!my && <DoneIcon fontSize="xs" />} */}
      </Stack>
    </Paper>
  );
};

export default ChatMessage;
