import asyncHandler from "express-async-handler";
import {
  getAllProductsService,
  createProductService,
  updateProductService,
  deleteProductService,
  getProductByProductNameService,
} from "../models/productModel.js";

//@desc Get all products paginated
//@route GET /api/products
//access Private
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await getAllProductsService();

  if (!products.length) {
    return res.json({ message: "No products found" });
  }

  res.json({
    data: products,
  });
});

//@desc Create a product
//@route POST /api/products
//access Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const { name, price, category_id } = req.body;
  if (!name || !price || !category_id) {
    return res.status(400).json({ message: "All fields required" });
  }

  const formattedName = name.toLowerCase()

  const existingProductName = await getProductByProductNameService(formattedName)
  if(existingProductName) {
    return res.status(409).json({ message: "Product name already exists" });
  }

  const newProduct = await createProductService(formattedName, price, category_id);

  res
    .status(201)
    .json({ message: "New product created successfully", data: newProduct });
});

//@desc Update a product
//@route PATCH /products/:id
//access Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, price, category_id, is_active } = req.body;

  if (!name || !price || !category_id || typeof is_active !== "boolean") {
    return res.status(400).json({ message: "All fields are required" });
  }

  const formattedName = name.toLowerCase();
  
  const existingProductName = await getProductByProductNameService(formattedName)
  if(existingProductName && existingProductName.id !== id) {
    return res.status(409).json({ message: "Product name already exists" });
  }

  const fieldsToUpdate = { formattedName, price, category_id, is_active };

  const updatedProduct = await updateProductService(id, fieldsToUpdate);

  if (!updatedProduct) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json({ message: "Successfully updated product", data: updatedProduct });
});

//@desc Delete a product
//@route DELETE /api/products/:id
//access Private/admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: "Id is required" });

  const deletedProduct = await deleteProductService(id);

  if (!deletedProduct) {
    return res.status(404).json({ message: "No category to delete" });
  }

  res.json({ message: "Product deleted successfully", data: deletedProduct });
});
