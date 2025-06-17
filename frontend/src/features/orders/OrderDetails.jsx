import React from "react";
import { Box, Typography, Tooltip, Grid } from "@mui/material";
import OrderDetailsGrid from "./OrderDetailsGrid"
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
        Order Details
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={12}>
          <OrderDetailsGrid id={id} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderDetails;
