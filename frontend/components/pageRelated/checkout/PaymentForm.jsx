import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box, Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

export default function PaymentForm({
  handleBack,
  handleNext,
  setPaymentValues,
  paymentValues,
}) {
  const validationSchema = yup.object().shape({
    cardName: yup.string().required("Card holder Name is required"),
    cardNumber: yup.string().required("Card number is required"),
    expiry: yup.string().required("Card expiry date is required"),
    cvv: yup.string().required("Cvv code is required"),
  });

  const formik = useFormik({
    initialValues: {
      cardName: paymentValues?.cardName ? paymentValues.cardName : "",
      cardNumber: paymentValues?.cardNumber ? paymentValues.cardNumber : "",
      expiry: paymentValues?.expiry ? paymentValues.expiry : "",
      cvv: paymentValues?.cvv ? paymentValues.cvv : "",
    },
    validationSchema,
    onSubmit: (values) => {
      setPaymentValues(values);
      handleNext();
    },
  });

  return (
    <Box
      component="form"
      noValidate
      onSubmit={formik.handleSubmit}
      sx={{ mt: 3 }}
    >
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            value={formik.values.cardName}
            onChange={formik.handleChange}
            error={formik.touched.cardName && Boolean(formik.errors.cardName)}
            helperText={formik.touched.cardName && formik.errors.cardName}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            value={formik.values.cardNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.cardNumber && Boolean(formik.errors.cardNumber)
            }
            helperText={formik.touched.cardNumber && formik.errors.cardNumber}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expiry"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            value={formik.values.expiry}
            onChange={formik.handleChange}
            error={formik.touched.expiry && Boolean(formik.errors.expiry)}
            helperText={formik.touched.expiry && formik.errors.expiry}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            value={formik.values.cvv}
            onChange={formik.handleChange}
            error={formik.touched.cvv && Boolean(formik.errors.cvv)}
            helperText={formik.touched.cvv && formik.errors.cvv}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
          Back
        </Button>
        <Button variant="contained" sx={{ mt: 3, ml: 1 }} type="submit">
          Next
        </Button>
      </Box>
    </Box>
  );
}
