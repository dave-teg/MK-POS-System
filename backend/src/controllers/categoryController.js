import asyncHandler from "express-async-handler";
import {
  getCategoriesService,
  createCategoryService,
  updateCategoryService,
  deleteCategoryService,
  getCategoryByCategoryNameService,
} from "../models/categoryModel.js";

//@desc Get all categories paginated
//@route GET /api/categories
//access Private
export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await getCategoriesService();

  if (!categories.length) {
    return res.json({ message: "No categories found" });
  }

  res.json({ data: categories });
});

//@desc Create a category
//@route POST /api/categories
//access Private/Admin
export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const formattedName = name.toLowerCase();

  const existingCategoryName = await getCategoryByCategoryNameService(
    formattedName
  );
  if (existingCategoryName) {
    return res.status(409).json({ message: "Category name already exists" });
  }

  const newCategory = await createCategoryService(formattedName);

  res
    .status(201)
    .json({ message: "New category created successfully", data: newCategory });
});

//@desc Update a category
//@route PATCH /categories/:id
//access Private/Admin
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const formattedName = name.toLowerCase();

  const existingCategoryName = await getCategoryByCategoryNameService(
    formattedName
  );
  if (existingCategoryName && existingCategoryName.id !== id) {
    return res.status(409).json({ message: "Category name already exists" });
  }

  const updatedCategory = await updateCategoryService(id, formattedName);

  if (!updatedCategory) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.json({ message: "Successfully updated category", data: updatedCategory });
});

//@desc Delete a category
//@route DELETE /api/categories/:id
//access Private/admin
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: "Id is required" });

  const deletedCategory = await deleteCategoryService(id);

  if (!deletedCategory) {
    return res.status(404).json({ message: "No category to delete" });
  }

  res.json({ message: "Category deleted successfully", data: deletedCategory });
});
