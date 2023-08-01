import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import Link from "next/link";
import React, { useState } from "react";
import Layout from "../components/core/Layout";
import Copyright from "../components/core/Legal/Copyright";
import axios from "axios";
import useToken from "../utils/useToken";
import { useRouter } from "next/router";

const Login = () => {
  const { setToken } = useToken();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [invalidLogin, setInvalidLogin] = useState();
  const linkColor = "#8ac44f";
  const router = useRouter();

  async function loginUser(credentials) {
    if (credentials.password && credentials.username) {
      let data = {
        username: credentials.username,
        password: credentials.password,
      };
      axios
        .post("http://localhost:8010/api/v1/Users/login", data, {})
        .then((response) => {
          setInvalidLogin(false);
          setToken(response.data.result);
          router.push("/marketplace");
        })
        .catch((error) => {
          if (error.code == "400") {
            setInvalidLogin(true);
          }
          console.error(error);
        });
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    if (token) {
      setToken(token);
      setInvalidLogin(false);
    } else {
      setInvalidLogin(true);
    }
  };

  const onPasswordChangeHadler = (e) => {
    setPassword(e.target.value);
    setInvalidLogin(false);
  };
  const onUsernameChangeHadler = (e) => {
    setUserName(e.target.value);
    setInvalidLogin(false);
  };

  return (
    <Layout>
      <Box
        sx={{
          marginTop: 8,
        }}
      >
        <Container className="flex items-center flex-col">
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>aaa</Avatar>
          <Typography component="h2" variant="h2">
            Sign In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              error={!username || invalidLogin}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={onUsernameChangeHadler}
              value={username}
              helperText={username ? "" : "Username is required."}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              error={!password || invalidLogin}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onPasswordChangeHadler}
              value={password}
              helperText={
                password
                  ? invalidLogin
                    ? "Couldn't login password or email is incorrect."
                    : ""
                  : "Password is required"
              }
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Box sx={{ bgcolor: "secondary.light", mt: 3, mb: 2 }}>
              <Button type="submit" fullWidth variant="contained">
                <Typography component="span" variant="subtitle1">
                  Sign In
                </Typography>
              </Button>
            </Box>
            <Grid container>
              <Grid item xs>
                <Link href="/restore-password">
                  <Typography
                    component="span"
                    variant="subtitle1"
                    style={{
                      color: linkColor,
                    }}
                  >
                    Forgot password?
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup">
                  <Typography
                    component="span"
                    variant="subtitle1"
                    style={{
                      color: linkColor,
                    }}
                  >
                    {"Don't have an account? Sign Up"}
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Copyright />
    </Layout>
  );
};

export default Login;
