import { Stack, Typography } from "@mui/material";
import Item from "./Item";
import { PRODUCTS, RESOURCES, Contact, SUPPORT } from "./Menus";

const ItemsContainer = () => {
  return (
    <div className="bg-emerald-300 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16">
      <Item Links={Contact} title="Contact">
        <Stack>
          <Typography variant="body1" component="p">
            Online Support working hours:
          </Typography>
          <Typography variant="subtitle1">
            <span className="text-gray-600">Monday-Friday</span> -{" "}
            <span className="text-gray-600">9:00 – 00:00</span>
          </Typography>
          <Typography variant="subtitle1">
            <span className="text-gray-600">Saturday-Sunday</span> -{" "}
            <span className="text-gray-600">9:00 – 14:00</span>
          </Typography>
        </Stack>
      </Item>
      <Item Links={PRODUCTS} title="PRODUCTS" />
      <Item Links={RESOURCES} title="RESOURCES" />
      <Item Links={SUPPORT} title="SUPPORT" />
    </div>
  );
};

export default ItemsContainer;
