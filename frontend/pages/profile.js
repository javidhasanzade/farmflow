import React, { useEffect, useState } from "react";
import Layout from "../components/core/Layout";
import useToken from "../utils/useToken";
import {
  Avatar,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import { loadPhotoFromFirebase } from "../utils/firebaseUtils";
import { useStateContext } from "../utils/Store";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";

const profile = () => {
  const defaultStarPictureSource = "/Star.svg"; // Star 5 can be added, to your taste
  const activeStarPictureSource = "/Star 3.svg";

  const { user } = useToken();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchFile = async () => {
      if (user != null) {
        console.log(user);
        const url = await loadPhotoFromFirebase(user.avatarUrl);
        console.log(url);
        if (url != null) {
          setImageUrl(url);
        }
      }
    };
    fetchFile();
  }, [user]);

  return (
    <Layout>
      {user && (
        <Container className="flex">
          <Grid container spacing={10}>
            <Grid item xs={4}>
              <Image
                src={imageUrl}
                width={200}
                height={200}
                style={{
                  width: "100%",
                  height: "50%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </Grid>
            <Grid item xs={6} alignItems="flex-end">
              <Stack direction="column" spacing={1}>
                <Stack direction="row" columnGap={3}>
                  <Typography
                    variant="h1"
                    component="h1"
                    sx={{ color: "primary.main" }}
                  >
                    {user.name}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <LocationOnIcon
                      fontSize="medium"
                      sx={{ color: "primary.dark" }}
                    />
                    <Typography
                      variant="subtitle1"
                      component="span"
                      sx={{ color: "primary.main" }}
                    >
                      Berlin
                      {/* {user.location} */}
                    </Typography>
                    <Stack
                      className="w-24 h-12 items-center p-1"
                      direction="row"
                      columnGap={1}
                    >
                      <IconButton className="w-10 h-10">
                        <EditIcon fontSize="large" className="text-slate-800" />
                      </IconButton>
                      <IconButton className="w-10 h-10">
                        <LogoutIcon
                          fontSize="large"
                          className="text-slate-800"
                        />
                      </IconButton>
                    </Stack>
                  </Stack>
                </Stack>
                <Typography
                  variant="subtitle1"
                  component="span"
                  sx={{ color: "primary.disabled" }}
                >
                  id: {user.id}
                </Typography>
                <Stack direction="column" spacing={1}>
                  <Stack direction="row" spacing={0.3}>
                    {Array.from({ length: 3 }).map((_, index) => (
                      <Image
                        width={25}
                        height={25}
                        key={index}
                        src={activeStarPictureSource}
                      />
                    ))}
                    {Array.from({ length: 2 }).map((_, index) => (
                      <Image
                        width={25}
                        height={25}
                        key={index}
                        src={defaultStarPictureSource}
                      />
                    ))}
                  </Stack>
                  <Typography
                    variant="subtitle1"
                    component="span"
                    sx={{ color: "primary.main" }}
                  >
                    Successfull orders : 17
                  </Typography>
                </Stack>

                <Divider textAlign="left">
                  <Typography
                    variant="h6"
                    component="h6"
                    sx={{ color: "primary.main" }}
                  >
                    About
                  </Typography>
                </Divider>
                <Typography
                  variant="subtitle1"
                  component="p"
                  sx={{ color: "primary.main" }}
                >
                  Meet Bob, the quintessential farmer seller, whose life
                  revolves around the land and its bountiful produce. With a
                  rugged charm and a weather-beaten smile, Bob is a picture of
                  hard work and dedication, epitomizing the timeless values of
                  the farming community. Early each morning, as the sun begins
                  to paint the horizon with hues of gold, Bob rises with the
                  roosters to embrace the day's tasks. His hands, calloused and
                  strong from years of toil, are a testament to his tireless
                  efforts on the fertile soil he tends with love. Dressed in
                  faded denim overalls and a worn-out straw hat that has seen
                  countless seasons, he embodies the rustic essence of farm
                  life.
                </Typography>
                <Divider textAlign="left">
                  <Typography
                    variant="subtitle1"
                    component="span"
                    sx={{ color: "primary.main" }}
                  >
                    Contact info
                  </Typography>
                </Divider>
                <List
                  sx={{
                    width: "100%",
                    bgcolor: "primary.lists",
                    borderRadius: "8px",
                  }}
                >
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <PhoneIphoneIcon sx={{ color: "primary.dark" }} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Phone number"
                      secondary={user.phoneNumber}
                      sx={{ color: "primary.main" }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <EmailIcon sx={{ color: "primary.dark" }} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Email"
                      secondary={user.email}
                      sx={{ color: "primary.main" }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <BadgeIcon sx={{ color: "primary.dark" }} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Full name"
                      secondary={`${user.name} ${user.surname}`}
                      sx={{ color: "primary.main" }}
                    />
                  </ListItem>
                </List>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      )}
    </Layout>
  );
};

export default profile;
