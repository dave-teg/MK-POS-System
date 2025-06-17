import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Grid, TextField, Typography, Button, Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import {
  useUpdateCategoryMutation,
  useGetAllCategoriesQuery,
} from "./categoryApiSlice";

const EditCategory = () => {
  const { id } = useParams();
  const [updateCategory] = useUpdateCategoryMutation();
  const { data: categories, isSuccess } = useGetAllCategoriesQuery();

  const [formError, setFormError] = useState("");
  const [initialized, setInitialized] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isSuccess && !initialized) {
      const category = categories.filter((c) => c.id === id);
      const existingName = category[0].categoryName;
      reset({ name: existingName });
      setInitialized(true);
    }
  }, [reset, isSuccess, categories, id, initialized]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
    navigate("/dashboard/categories");
  };

  const onSubmit = async (data) => {
    const { name } = data;
    try {
      await updateCategory({ id, name }).unwrap();
      setFormError("");
      setOpen(true);
    } catch (err) {
      setFormError(err?.data?.message);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography component="h2" variant="h5" sx={{ mb: 3 }}>
        Edit category
      </Typography>

      {formError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {formError}
        </Alert>
      )}
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          columnSpacing={2}
          rowSpacing={4}
          columns={12}
          sx={{ mb: 2 }}
        >
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: "name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Name"
                  type="text"
                  variant="outlined"
                  size="small"
                  error={!!errors.name}
                  helperText={errors?.name?.message}
                />
              )}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            type="submit"
            sx={{ textTransform: "none" }}
          >
            Edit
          </Button>
        </Box>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} variant="filled" severity="success">
          Category edited successfully
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EditCategory;
