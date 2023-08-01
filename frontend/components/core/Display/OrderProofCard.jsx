import {
  Card,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { loadPhotoFromFirebase } from "../../../utils/firebaseUtils";
import axios from "axios";
const OrderProofCard = ({ orderProof }) => {
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState();

  const toggleFullscreen = () => {
    setOpen(!open);
  };

  const loadImage = async () => {
    if (orderProof?.proofImageUrl) {
      const loadedImage = await loadPhotoFromFirebase(orderProof.proofImageUrl);
      setImage(loadedImage);
    }
  };

  useEffect(() => {
    loadImage();
  }, [, orderProof]);

  const handleAccept = async () => {
    const data = {
      ...orderProof,
      status: "Accepted",
    };
    console.log(data);
    axios
      .post("http://localhost:8004/api/v1/OrderProofs", data, {})
      .then((res) => {})
      .catch((err) => {
        console.log("error in request", err);
      });
  };

  const handleDecline = async () => {
    const data = {
      ...orderProof,
      status: "Declined",
    };
    console.log(data);
    axios
      .post("http://localhost:8004/api/v1/OrderProofs", data, {})
      .then((res) => {})
      .catch((err) => {
        console.log("error in request", err);
      });
  };

  return (
    <Card className="w-80 h-max p-3">
      <Stack alignItems="center" direction="column" className="h-full w-full">
        <div>
          <img
            src={image}
            onClick={toggleFullscreen}
            className="w-48 h-48 mt-3 object-contain bg-green-200 rounded-md shadow-md"
          />

          <Dialog
            open={open}
            onClose={toggleFullscreen}
            maxWidth="md"
            fullWidth
          >
            <DialogContent>
              <img
                src={image}
                onClick={toggleFullscreen}
                className="w-36 h-36 object-contain bg-green-200 rounded-md shadow-md"
              />
            </DialogContent>
          </Dialog>
        </div>

        <Typography variant="subtitle1">createdDate</Typography>
        <Stack className="my-6 w-4/5" alignItems="start" rowGap={0}>
          <Typography variant="subtitle1">id - {orderProof?.id}</Typography>
          <Typography variant="subtitle1">
            createdBy - {orderProof?.createdBy}
          </Typography>
          <Typography variant="subtitle1">
            createdDate - {orderProof?.createdDate}
          </Typography>
          <Typography variant="subtitle1">
            user id - {orderProof.userId}
          </Typography>
          <Typography variant="subtitle1">
            totalPrice - {orderProof.totalPrice}
          </Typography>
          <Typography variant="subtitle1" className="mb-1 mt-4">
            Order:
          </Typography>
          <Typography variant="subtitle1">
            name - {orderProof?.order?.name}
          </Typography>
          <Typography variant="subtitle1">
            surname - {orderProof?.order?.surname}
          </Typography>
          <Typography variant="subtitle1">
            email - {orderProof?.order?.email}
          </Typography>
          <Typography variant="subtitle1">
            address - {orderProof?.order?.address}
          </Typography>
          <Typography variant="subtitle1">
            country - {orderProof?.order?.country}
          </Typography>
          <Typography variant="subtitle1">
            state - {orderProof?.order?.state}
          </Typography>
          <Typography variant="subtitle1">
            zipCode - {orderProof?.order?.zipCode}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-around"
          className="mt-auto h-12 w-full"
        >
          <IconButton>
            <DoneIcon
              fontSize="large"
              className="text-white bg-green-200 rounded-xl shadow-md"
              onClick={() => {
                handleAccept();
              }}
            />
          </IconButton>
          <IconButton>
            <CloseIcon
              fontSize="large"
              className="text-white bg-red-400 rounded-xl shadow-md"
              onClick={() => {
                handleDecline();
              }}
            />
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  );
};

export default OrderProofCard;
