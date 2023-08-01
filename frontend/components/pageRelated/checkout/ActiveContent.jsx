import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React from "react";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { useFormik } from "formik";
import * as Yup from "yup";
import AddressForm from "./AddressForm";

const steps = ["Shipping address", "Payment details", "Review your order"];
const ActiveContent = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [addressValues, setAddressValues] = React.useState();
  const [paymentValues, setPaymentValues] = React.useState();

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <AddressForm
            hn={handleNext}
            setAddressValues={setAddressValues}
            addressValues={addressValues}
          />
        );
      case 1:
        return (
          <PaymentForm
            handleBack={handleBack}
            handleNext={handleNext}
            setPaymentValues={setPaymentValues}
            paymentValues={paymentValues}
          />
        );
      case 2:
        return (
          <Review
            addressValues={addressValues}
            paymentValues={paymentValues}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmitButton = () => {
    setSubmitting(true);
  };

  return (
    <>
      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography variant="h5" gutterBottom>
            Thank you for your order.
          </Typography>
          <Typography variant="subtitle1">
            Your order number is #2001539. We have emailed your order
            confirmation, and will send you an update when your order has
            shipped.
          </Typography>
        </>
      ) : (
        <>
          {getStepContent(activeStep)}
          {/* <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                Back
              </Button>
            )}
            <Button variant="contained" sx={{ mt: 3, ml: 1 }} type="submit">
              {activeStep === steps.length - 1 ? "Place order" : "Next"}
            </Button>
          </Box> */}
        </>
      )}
    </>
  );
};

export default ActiveContent;
