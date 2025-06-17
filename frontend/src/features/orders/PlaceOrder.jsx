import { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { ShoppingCart } from "@mui/icons-material";
import ProductCard from "./ProductCard";
import OrderSummary from "./OrderSummary";
import { useGetAllCategoriesQuery } from "../categories/categoryApiSlice";
import { useGetAllProductsQuery } from "../products/productApiSlice";
import { Skeleton, Alert } from "@mui/material";


const PlaceOrder = () => {
  const {
    data: categoriesList,
    isSuccess: isCategoriesSuccess,
    isLoading: isCategoriesLoading,
  } = useGetAllCategoriesQuery();
  const {
    data: productsList,
    isLoading: isProductLoading,
  } = useGetAllProductsQuery();

  const [value, setValue] = useState(
    isCategoriesSuccess && categoriesList[0].id
  );
  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState([]);
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    if (isCategoriesSuccess && categoriesList.length > 0 && !value) {
      setValue(categoriesList[0].id);
    }
  }, [isCategoriesSuccess, categoriesList, value]);

  const handleQtyChange = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleAddToCart = (product) => {
    const qty = quantities[product.id];
    if (!qty || qty < 1) return;

    const exists = cart.find((item) => item.product_id === product.id);
    if (exists) return;

    setCart((prev) => [
      ...prev,
      { product_id: product.id, ...product, quantity: qty },
    ]);
    setQuantities((prev) => ({ ...prev, [product.id]: "" })); // Reset input
  };

  const handleRemoveFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.product_id !== id));
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { sm: "100%", md: "1300px" },
        mx: "auto",
        overflowX: "hidden",
      }}
    >
      <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
        Place Order
      </Typography>

      {
        errMsg && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errMsg}
          </Alert>
        )
      }

      <Grid container spacing={2}>
        {/* Left Section - Categories */}
        <Grid size={8}>
          <Box
            sx={{
              width: "100%",
              typography: "body1",
              maxHeight: "500px",
              overflowY: "auto",
            }}
          >
            {isCategoriesLoading ? (
              <Box sx={{ display: "flex", gap: 2 }}>
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} variant="rounded" width={100} height={40} />
                ))}
              </Box>
            ) : (
              <TabContext value={value}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    position: "sticky",
                    top: 0,
                    zIndex: 2,
                    backgroundColor: "background.paper",
                  }}
                >
                  <TabList
                    onChange={handleTabChange}
                    aria-label="Categories"
                    variant="scrollable"
                    scrollButtons="auto"
                  >
                    {categoriesList.map((category) => (
                      <Tab
                        label={category.categoryName}
                        key={category.id}
                        value={category.id}
                      />
                    ))}
                  </TabList>
                </Box>

                {categoriesList.map((category) => (
                  <TabPanel
                    key={category.id}
                    value={category.id}
                    sx={{ py: 2, px: 1 }}
                  >
                    <Grid container spacing={2}>
                      {isProductLoading
                        ? [...Array(6)].map((_, i) => (
                            <Grid size={4} key={i}>
                              <Skeleton animation="wave" variant="rectangular" width={260} height={110} />
                            </Grid>
                          ))
                        : productsList
                            .filter(
                              (product) =>
                                product.categoryName === category.categoryName && product.active
                            )
                            .map((product) => {
                              const inCart = cart.some(
                                (item) => item.id === product.id
                              );
                              const qty = quantities[product.id] || 0;
                              return (
                                <Grid size={4} key={product.id}>
                                  <ProductCard
                                    key={product.id}
                                    product={product}
                                    handleAddToCart={handleAddToCart}
                                    handleQtyChange={handleQtyChange}
                                    name={product.productName}
                                    price={product.price}
                                    inCart={inCart}
                                    qty={qty}
                                  />
                                </Grid>
                              );
                            })}
                    </Grid>
                  </TabPanel>
                ))}
              </TabContext>
            )}
          </Box>
        </Grid>

        {/* Right Section - Order Summary */}
        <Grid size={4}>
          <OrderSummary
            cart={cart}
            setCart={setCart}
            handleRemoveFromCart={handleRemoveFromCart}
            errMsg={errMsg}
            setErrMsg={setErrMsg}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlaceOrder;
