import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { MuiFileInput } from "mui-file-input";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import useToken from "../../../utils/useToken";
import { savePhotoToFirebase } from "../../../utils/firebaseUtils";

const OrderProofDialog = ({ open, handleClose, order }) => {
  const [proofPhoto, setProofPhoto] = React.useState(null);
  const [proofPhotoUrl, setProofPhotoUrl] = React.useState(null);
  const [sendDisabled, setSendDisabled] = React.useState(true);

  const { user } = useToken();

  const onProofPhotoChange = (newFile) => {
    const reader = new FileReader();
    setProofPhoto(newFile);

    reader.onload = () => {
      setProofPhotoUrl(reader.result);
    };

    if (newFile) {
      if (newFile.type.startsWith("image/")) {
        setSendDisabled(false);
        reader.readAsDataURL(newFile);
      }
    }
  };

  const handleSumbit = () => {
    const data = {
      orderId: order.id + 1,
      userId: user.id,
      proofImageUrl: proofPhoto.name,
      status: "Pending",
    };
    console.log(data);
    axios
      .post("http://localhost:8004/api/v1/OrderProofs", data, {})
      .then((res) => {
        savePhotoToFirebase(proofPhoto);
        handleClose();
      })
      .catch((err) => {
        console.log("error in request", err);
      });
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Send the proof for the order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To verify that the order was indeed sent, we ask you to provide us
            with a confirmation photo, it shouldn't take more than 3 minutes.
          </DialogContentText>
          <MuiFileInput
            autoFocus
            required
            id="proof"
            name="proof"
            label="Photo proof"
            value={proofPhoto}
            onChange={onProofPhotoChange}
            className="w-4/5 mx-auto mt-4 mb-2"
            accept="image/jpeg, image/png, image/gif, image/webp"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSumbit}
            disabled={sendDisabled}
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OrderProofDialog;
