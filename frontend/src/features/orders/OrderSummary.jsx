import { useRef } from "react";
import { format } from "date-fns";
import SingleItemCard from "./SingleItemCard";
import {
  Box,
  Typography,
  Divider,
  Grid,
  Button,
  Checkbox,
  Paper,
  Stack,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { Delete, DeleteForever, ContentCopy } from "@mui/icons-material";
import ThermalReceipt from "./ThermalReceipt";
import { usePlaceOrderMutation } from "./ordersApiSlice";
import useAuth from '../../hooks/useAuth'

const capitalizeWords = (string) => {
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

const OrderSummary = ({ cart, setCart, handleRemoveFromCart, setErrMsg }) => {
  const [placeOrder] = usePlaceOrderMutation();
  const printRef = useRef(null);

  const {fullname} = useAuth()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalQuantity = cart.length;

  /*  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  }); */

  const handlePlaceOrderAndPrint = async () => {
    if (cart.length === 0) return;
    try {
      await placeOrder({ cartItems: cart }).unwrap();
      setErrMsg("");
      setTimeout(() => {
        printRef.current && window.print();
        setCart([]);
      }, 1000);
    } catch (err) {
      setErrMsg(err?.data?.message);
      console.log(err);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2.5,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: 400,
        height: "490px",
        borderBottom: "1px solid",
      }}
    >
      {/* Header Section */}
      <Box sx={{ mb: 1 }}>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="subtitle2" fontWeight="bold">
            Cashier Name
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {capitalizeWords(fullname)}
          </Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {format(new Date(), "MMMM d, yyyy hh:mm a")}
        </Typography>
      </Box>
      <Divider sx={{ mb: 1 }} />
      <Box sx={{ maxHeight: "300px", overflowY: "auto", flexGrow: 1 }}>
        {/* Order Details Title */}
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
          Order Details
        </Typography>

        {cart.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No items in order.
          </Typography>
        ) : (
          <Stack direction="column" spacing={1.3}>
            {/* Order Items */}
            {cart.map((product) => (
              <SingleItemCard
                key={product.id}
                product={product}
                handleRemoveFromCart={handleRemoveFromCart}
              />
            ))}
          </Stack>
        )}
      </Box>
      <Divider sx={{ my: 2 }} />
      {/* Totals Section */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="body1" fontWeight={700}>
          {`Total (${totalQuantity} ${totalQuantity === 1 ? "item" : "items"})`}
        </Typography>
        <Typography variant="body1" fontWeight={700}>
          ${total.toFixed(2)}
        </Typography>
      </Stack>
      {/* Action Buttons */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          variant="contained"
          fullWidth
          sx={{ py: 1 }}
          disabled={cart.length === 0}
          onClick={handlePlaceOrderAndPrint}
        >
           Place Order & Print Receipt
        </Button>
      </Box>

      {/* Receipt component hidden from view but available to print */}
      <div
        id="thermal-receipt"
        style={{
          width: "80mm",
          fontSize: "12px",
          padding: "10px",
          fontFamily: "monospace",
          visibility: "hidden", // until print
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <div ref={printRef}>
          <ThermalReceipt
            cart={cart}
            total={total}
            cashier={capitalizeWords(fullname)}
            totalQuantity={totalQuantity}
          />
        </div>
      </div>
    </Paper>
  );
};

export default OrderSummary;
