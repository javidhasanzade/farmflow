import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

const ChatListMessage = () => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar
          alt="Cindy Baker"
          src="/static/images/avatar/3.jpg"
          className="bg-green-200"
        />
      </ListItemAvatar>
      <ListItemText
        primary="Oui Oui"
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              Sandra Adams
            </Typography>
            {" — Do you have Paris recommendations? Have you ever…"}
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

export default ChatListMessage;
