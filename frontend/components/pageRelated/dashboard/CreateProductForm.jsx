import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { MuiFileInput } from "mui-file-input";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductPreviewCard from "../../decorative/ProductPreviewCard";
import { useStateContext } from "../../../utils/Store";
import useToken from "../../../utils/useToken";
import axios from "axios";
import { savePhotoToFirebase } from "../../../utils/firebaseUtils";
import { v4 as uuidv4 } from "uuid";
import CountryPicker from "../../core/Inputs/CountryPicker";
import { DatePicker } from "@mui/x-date-pickers";

const monnthOptions = [
  { value: "January", label: "January" },
  { value: "February", label: "February" },
  { value: "April", label: "April" },
  { value: "March", label: "March" },
  { value: "May", label: "May" },
  { value: "June", label: "June" },
  { value: "July", label: "July" },
  { value: "August", label: "August" },
  { value: "September", label: "September" },
  { value: "October", label: "October" },
  { value: "November", label: "November" },
  { value: "December", label: "December" },
];
const units = [
  { value: "Kg", label: "Kilo" },
  { value: "1 Pc", label: "Pieces" },
  { value: "Doz", label: "Doz" },
];

const getMonthInNumber = (monthString) => {
  switch (monthString) {
    case "January":
      return 1;
      break;
    case "February":
      return 2;
      break;
    case "April":
      return 3;
      break;
    case "March":
      return 4;
      break;
    case "May":
      return 5;
      break;
    case "June":
      return 6;
      break;
    case "July":
      return 7;
      break;
    case "August":
      return 8;
      break;
    case "September":
      return 9;
      break;
    case "October":
      return 10;
      break;
    case "November":
      return 11;
      break;
    case "December":
      return 12;
      break;
  }
};

function getCurrentDateTime() {
  const currentDateTime = new Date();
  const day = currentDateTime.getDate();
  const month = currentDateTime.getMonth() + 1; // Months are zero-based, so we add 1
  const year = currentDateTime.getFullYear();
  const hours = currentDateTime.getHours();
  const minutes = currentDateTime.getMinutes();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const formattedDateTime = `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes}`;

  return formattedDateTime;
}

function getFormattedTime() {
  const currentDateTime = new Date().toISOString();
  return currentDateTime;
}

const CreateProductForm = ({ windowHandler }) => {
  const router = useRouter();
  const { isDarkTheme } = useStateContext();
  const [productPrimaryImage, setProductPrimaryImage] = useState(null);
  const [productPrimaryImageUrl, setProductPrimaryImageUrl] = useState(null);
  const [primaryImageErrorMessage, setPrimaryImageErrorMessage] = useState(
    "Please select an image "
  );
  const [secondaryProductImages, setSecondaryProductImages] = useState([]);
  const [categories, setCategories] = useState(null);
  const [aiPrice, setAiPrice] = useState(0);

  const { user } = useToken();

  const onProductSecondaryImagesChange = (e) => {
    const files = Array.from(e);
    setSecondaryProductImages(files);
  };

  const onProductPrimaryImageChange = (newFile) => {
    const reader = new FileReader();
    setProductPrimaryImage(newFile);
    formik.setFieldValue("primaryImage", newFile);

    reader.onload = () => {
      setProductPrimaryImageUrl(reader.result);
    };

    if (newFile) {
      if (newFile.type.startsWith("image/")) {
        setPrimaryImageErrorMessage(null);
        reader.readAsDataURL(newFile);
      } else {
        setPrimaryImageErrorMessage(
          "Invalid file type, please select an image"
        );
      }
    } else {
    }
  };

  const getFormattedPrice = (priceString) => {
    const price = parseFloat(priceString.replace(/[^0-9.-]+/g, ""));
    const formattedPrice = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
    return formattedPrice;
  };

  const getAiPrediction = async (name, unit, month) => {
    console.log(
      `http://localhost:8005/api/v1/predict?product=${name}&unit=${unit}&month=${month}`
    );
    try {
      axios
        .get(
          `http://localhost:8005/api/v1/predict?product=${name}&unit=${unit}&month=${month}`
        )
        .then((res) => {
          setAiPrice(res.data.price);
          console.log(res.data.price);
        })
        .catch((err) => {
          console.log("error in request", err);
        });
    } catch (E) {
      console.log(E);
    }
  };

  const validationSchema = yup.object({
    name: yup.string().required("Product name is required"),
    price: yup.number().required("Product price is required"),
    description: yup.string().required("Product description is required"),
    quantity: yup.number().required("Product quantity is required"),
    monthPicked: yup.string().required("The month of harvest is required"),
    category: yup.string().required("Product category is required"),
    country: yup.string().required("Country is required"),
    city: yup.string().required("City is required"),
    unit: yup.string().required("Unit is required"),
    primaryImage: yup.mixed().required("Product's primary image is required"),
  });

  const loadCategories = async () => {
    const categoriesResponse = await axios.get(
      `http://localhost:8000/api/v1/Catalog/categories`
    );
    const categories = [...new Set(categoriesResponse.data)];
    const mappedCategories = categories.map((category) => {
      return {
        value: category.name,
        label: category.name,
      };
    });
    setCategories(mappedCategories);
  };

  const formik = useFormik({
    initialValues: {
      price: 0,
      quantity: 0,
      name: "Name",
      country: "Country",
      city: "City",
      description: "Description",
      category: "",
      monthPicked: "",
      unit: "",
      primaryImage: null,
    },
    validationSchema,
    onChange: () => {
      if (
        formik.values.name != "" &&
        formik.values.unit != "" &&
        formik.values.monthPicked != 0
      ) {
        getAiPrediction(
          formik.values.name,
          formik.values.unit,
          getMonthInNumber(formik.values.monthPicked)
        );
      }
    },
    onSubmit: (values) => {
      savePhotoToFirebase(productPrimaryImage);
      secondaryProductImages.forEach((item) => {
        savePhotoToFirebase(item);
      });
      const imageFiles = [
        values.primaryImage.name,
        ...secondaryProductImages.map((image) => image.name),
      ];
      let data = {
        id: uuidv4(),
        name: values.name,
        category: values.category,
        description: values.description,
        seller: user.email,
        quantity: parseInt(values.quantity),
        imageFile: imageFiles,
        price: parseFloat(values.price),
        country: values.country,
        city: values.city,
        postedOn: getFormattedTime(),
        unit: values.unit,
      };
      axios
        .post("http://localhost:8000/api/v1/Catalog", data, {})
        .then((res) => {
          formik.resetForm();
          console.log("gud");
          windowHandler();
        })
        .catch((err) => {
          console.log("error in request", err);
        });
    },
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const formWindowHandler = () => {
    windowHandler();
  };

  if (!user) {
    return <CircularProgress />;
  }

  return (
    <Container flui className="flex flex-col py-3 px-3">
      <Paper elevation={2} style={{ marginLeft: "auto" }}>
        <Button onClick={formWindowHandler}>Close</Button>
      </Paper>
      <Stack direction="column" alignItems="center" spacing={8} sx={{ p: 4 }}>
        <ProductPreviewCard
          name={formik.values.name}
          price={formik.values.price}
          description={formik.values.description}
          user={user}
          country={formik.values.country}
          city={formik.values.city}
          postedOn={getCurrentDateTime()}
          image={
            productPrimaryImageUrl === null ||
            productPrimaryImageUrl === undefined
              ? isDarkTheme
                ? "/white.png"
                : "/black.png"
              : productPrimaryImageUrl
          }
          scale={0.9}
        />
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {formik.values.name != "" &&
                formik.values.unit != "" &&
                formik.values.monthPicked != 0 &&
                getAiPrediction(
                  formik.values.name,
                  formik.values.unit,
                  getMonthInNumber(formik.values.monthPicked)
                ) && (
                  <Typography variant="h4">
                    AI suggested price: &nbsp;
                    {aiPrice
                      ? getFormattedPrice(aiPrice)
                      : " Sorry, no suggestion could be found..."}
                  </Typography>
                )}

              {(formik.values.name == "" || formik.values.monthPicked == 0) && (
                <Typography variant="h5">
                  Enter the name, unit and month of harvest, to get the AI
                  suggested price
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="name"
                name="name"
                label="Product name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="price"
                name="price"
                label="Product price"
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="quantity"
                name="quantity"
                label="Product quantity"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                error={
                  formik.touched.quantity && Boolean(formik.errors.quantity)
                }
                helperText={formik.touched.quantity && formik.errors.quantity}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CountryPicker
                required
                fullWidth
                id="country"
                name="country"
                label="Country"
                value={formik.values.country}
                onChange={formik.handleChange}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="city"
                name="city"
                label="Product city"
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                required
                error={formik.touched.monthPicked && formik.errors.monthPicked}
              >
                <InputLabel>Month of harvest</InputLabel>
                <Select
                  id="monthPicked"
                  name="monthPicked"
                  label="Month of harvest"
                  value={formik.values.monthPicked}
                  onChange={formik.handleChange}
                >
                  {monnthOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.monthPicked && formik.errors.monthPicked && (
                  <FormHelperText>{formik.errors.monthPicked}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                required
                error={formik.touched.category && formik.errors.category}
              >
                <InputLabel>Category</InputLabel>
                <Select
                  id="category"
                  name="category"
                  label="Category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                >
                  {categories &&
                    categories?.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  {!categories && (
                    <Stack className="w-full h-full items-center justify-center">
                      <CircularProgress>Loading...</CircularProgress>
                    </Stack>
                  )}
                </Select>
                {formik.touched.category && formik.errors.category && (
                  <FormHelperText>{formik.errors.category}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                required
                error={formik.touched.category && formik.errors.category}
              >
                <InputLabel>Unit</InputLabel>
                <Select
                  id="unit"
                  name="unit"
                  label="Unit"
                  value={formik.values.unit}
                  onChange={formik.handleChange}
                >
                  {units &&
                    units?.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  {!units && (
                    <Stack className="w-full h-full items-center justify-center">
                      <CircularProgress>Loading...</CircularProgress>
                    </Stack>
                  )}
                </Select>
                {formik.touched.units && formik.errors.units && (
                  <FormHelperText>{formik.errors.units}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="description"
                name="description"
                label="Prdouct description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Grid>

            <Grid item xs={6}>
              <MuiFileInput
                required
                id="primaryImage"
                name="primaryImage"
                label="Main product image"
                style={{ width: "100%" }}
                value={formik.values.primaryImage}
                onChange={onProductPrimaryImageChange}
                error={
                  formik.touched.primaryImage &&
                  primaryImageErrorMessage !== null
                }
                helperText={
                  formik.touched.primaryImage &&
                  formik.errors.primaryImage &&
                  primaryImageErrorMessage
                }
              />
            </Grid>
            <Grid item xs={6}>
              <MuiFileInput
                multiple
                required
                label="Other product images"
                style={{ width: "100%" }}
                value={secondaryProductImages}
                onChange={onProductSecondaryImagesChange}
                // error={}
                // helperText={}
              />
            </Grid>
          </Grid>
          <Box sx={{ bgcolor: "secondary.light", mt: 3, mb: 2 }}>
            <Button type="submit" fullWidth variant="contained">
              <Typography component="span" variant="subtitle1">
                Place product
              </Typography>
            </Button>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default CreateProductForm;
