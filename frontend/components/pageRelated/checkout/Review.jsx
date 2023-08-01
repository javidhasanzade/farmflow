import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import useToken from "../../../utils/useToken";
import axios from "axios";
import { Box, Button } from "@mui/material";

export default function Review({
  addressValues,
  paymentValues,
  handleBack,
  handleNext,
}) {
  const [cartProducts, setCartProducts] = React.useState(null);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const { user, token } = useToken();

  const firstName = addressValues?.firstName ? addressValues.firstName : "";
  const lastName = addressValues?.lastName ? addressValues.lastName : "";
  const city = addressValues?.city ? addressValues.city : "";
  const country = addressValues?.country ? addressValues.country : "";
  const zip = addressValues?.zip ? addressValues.zip : "";
  const address = addressValues?.address ? addressValues.address : "";
  const cardName = paymentValues?.cardName ? paymentValues.cardName : "";
  const cardNumber = paymentValues?.cardNumber ? paymentValues.cardNumber : "";
  const expiry = paymentValues?.expiry ? paymentValues.expiry : "";
  const clientName = firstName.concat(" ").concat(lastName);
  const cvv = paymentValues?.cvv ? paymentValues.cvv : "";

  const addresses = [address, city, zip, country];
  const payments = [
    { name: "Card type", detail: "Visa" },
    { name: "Card holder", detail: cardName },
    { name: "Card number", detail: cardNumber },
    { name: "Expiry date", detail: expiry },
  ];

  const getCartItems = async () => {
    if (!user || !token) {
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `http://localhost:8001/api/v1/Basket/${user.email}`,
      config
    );
    const data = response.data;
    setTotalPrice(response.data.totalPrice);
    const updatedCartItems = data.items.map((cartProduct) => {
      return {
        productId: cartProduct.productId,
        name: cartProduct.productName,
        price: cartProduct.price,
        qty: cartProduct.quantity,
      };
    });
    setCartProducts(updatedCartItems);
  };

  const getProductById = async (productId) => {
    const response = await axios.get(
      `http://localhost:8000/api/v1/Catalog/${productId}`
    );
    const item = response.data;
    return item;
  };

  const handlePlaceOrder = async () => {
    const confing = {}; // Not sure if this is intended as "config"
    const products = await Promise.all(
      cartProducts?.map(async (product) => {
        const item = await getProductById(product.productId);
        const productData = {
          productId: product.productId,
          productName: product.name,
          price: item.price,
          quantity: item.quantity,
          seller: item.seller,
          product: item,
        };
        return productData;
      })
    );
    const data = {
      username: user.email,
      totalPrice: totalPrice,
      name: firstName,
      surname: lastName,
      email: user.email,
      address: address,
      country: country,
      state: city,
      zipCode: zip,
      orderDetails: products,
      // cardName: cardName,
      // cardNumber: cardNumber,
      // expiration: expiry,
      // cvv: cvv,
      // paymentMethod: 0,
    };

    console.log(data);
    axios
      .post("http://localhost:8004/api/v1/Orders", data, confing)
      .then((res) => {
        handleNext();
      })
      .catch((err) => {
        console.log("error in request", err);
      });
  };

  const cartItemsContent = () => {
    if (cartProducts) {
      return cartProducts.map((product) => (
        <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
          <ListItemText primary={product.name} />
          <Typography variant="body1">{product.qty}x</Typography>
          <Typography variant="body1">{product.price}</Typography>
        </ListItem>
      ));
    }
  };

  React.useEffect(() => {
    getCartItems();
  }, [, user, token]);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cartItemsContent()}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${totalPrice}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{clientName}</Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
          Back
        </Button>
        <Button
          variant="contained"
          sx={{ mt: 3, ml: 1 }}
          onClick={handlePlaceOrder}
        >
          Place order
        </Button>
      </Box>
    </Box>
  );
}
