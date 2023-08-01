import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const StatCard = ({ icon, statName, statValue }) => {
  return (
    <Card sx={{ width: "100%", height: "7rem" }}>
      <CardContent sx={{ height: "100%" }}>
        <Stack
          direction="row"
          alignItems="center"
          sx={{ height: "100%" }}
          spacing={6.5}
        >
          <div
            style={{
              background: "#b4d3b2",
              borderRadius: "50%",
              padding: "0.6rem",
            }}
            className="flex items-center justify-center"
          >
            {icon}
          </div>
          <Stack direction="column" alignItems="start" spacing={0.1}>
            <Typography variant="h4" color="primary.main">
              {statValue}
            </Typography>
            <Typography variant="subtitle1" color="primary.light">
              {statName}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default StatCard;
