import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Layout from "../components/core/Layout";
import { DateField } from "@mui/x-date-pickers";
import { useFormik } from "formik";
import * as yup from "yup";
import { MuiFileInput } from "mui-file-input";
import axios from "axios";
import { useRouter } from "next/router";
import { useStateContext } from "../utils/Store";
import { savePhotoToFirebase } from "../utils/firebaseUtils";
import CountryPicker from "../components/core/Inputs/CountryPicker";

export default function SignUp() {
  const router = useRouter();
  const [avatarFile, setAvatarFile] = useState(null);

  const onAvatarFileChange = (newFile) => {
    setAvatarFile(newFile);
  };

  const validationSchema = yup.object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    dateOfBirth: yup.date().required("Date of Birth is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must include at least one lowercase letter, one uppercase letter, and one alphanumeric character"
      )
      .required("Password is required"),
    phoneNumber: yup
      .string()
      .matches(
        /^(?:\+|00)(\d{1,3})\s?(\d{3})\s?(\d{3})\s?(\d{2})\s?(\d{2})$/,
        "Invalid phone number"
      )
      .required("Phone number is required"),
    country: yup.string().required("Country is required"),
    city: yup.string().required("City is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      savePhotoToFirebase(avatarFile);
      let data = {
        email: values.email,
        name: values.firstName,
        surname: values.lastName,
        phoneNumber: values.phoneNumber,
        city: values.city,
        country: values.country,
        dateOfBirth: `${values.dateOfBirth}`,
        avatarUrl: avatarFile.name,
        password: values.password,
        role: "string",
      };
      console.log(data);
      axios
        .post("http://localhost:8010/api/v1/Users/register", data, {})
        .then((res) => {
          router.push("/login");
          console.log("logged in");
        })
        .catch((err) => {
          console.log("error in request", err);
        });
    },
  });

  return (
    <Layout>
      <Box
        sx={{
          marginTop: 8,
        }}
      >
        <Container className="flex items-center flex-col">
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h3" variant="h3" color="primary.main">
            Sign up
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  name="city"
                  label="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                />
              </Grid>
              <Grid item xs={12}>
                <CountryPicker
                  required
                  fullWidth
                  id="country"
                  name="country"
                  label="Country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.country && Boolean(formik.errors.country)
                  }
                  helperText={formik.touched.country && formik.errors.country}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.phoneNumber &&
                    Boolean(formik.errors.phoneNumber)
                  }
                  helperText={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <DateField
                  required
                  fullWidth
                  id="dateOfBirth"
                  name="dateOfBirth"
                  label="Date of Birth"
                  value={formik.values.dateOfBirth}
                  onChange={(date) => formik.setFieldValue("dateOfBirth", date)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={5}>
                <MuiFileInput
                  required
                  label="Your profile picture"
                  style={{ width: "100%" }}
                  value={avatarFile}
                  onChange={onAvatarFileChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Box sx={{ bgcolor: "secondary.light", mt: 3, mb: 2 }}>
              <Button type="submit" fullWidth variant="contained">
                <Typography component="span" variant="subtitle1">
                  Sign Up
                </Typography>
              </Button>
            </Box>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
}
