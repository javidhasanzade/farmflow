import React from "react";
import { Container, Grid, Paper, Stack } from "@mui/material";
import Layout from "../components/core/Layout";
import ChatsList from "../components/core/Display/ChatsList";
import ChatTopPanel from "../components/core/Display/ChatTopPanel";
import ChatWindow from "../components/core/Display/ChatWindow";
import ChatBottomPanel from "../components/core/Display/ChatBottomPanel";

const chat = () => {
  return (
    <Layout>
      <Container maxWidth="lg">
        <Paper>
          <Grid container>
            <Grid item xs={3}>
              <ChatsList />
            </Grid>
            <Grid item xs={9}>
              <Stack direction="column" style={{ height: "85vh" }}>
                <ChatTopPanel />
                <ChatWindow />
                <ChatBottomPanel />
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Layout>
  );
};

export default chat;
