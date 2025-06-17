import { query } from "../../db/db.js";

export const getCategoriesService = async () => {
  const queryTxt = `
  SELECT 
  c.id,
  c.name AS category_name,
  c.created_at,
  COUNT(p.id) AS product_count
  FROM categories c
  LEFT JOIN products p ON p.category_id = c.id
  GROUP BY c.id, c.name
  ORDER BY c.name;`
  const result = await query(queryTxt)

  return result.rows
}

export const getCategoryByCategoryNameService = async (name) => {
  const queryTxt = `
  SELECT * FROM categories
  WHERE name = $1;    
  `
  const values = [name]
  const result = await query(queryTxt, values)
  return result.rows[0]
}

export const createCategoryService = async (name) => {
  const queryTxt = `INSERT INTO categories (name) VALUES ($1) RETURNING *`
  const values = [name]
  const result = await query(queryTxt, values)
  return result.rows[0]
}

export const updateCategoryService = async (id, name) => {
  const queryTxt = `UPDATE categories SET name = $1 WHERE id = $2 RETURNING *;`;
  const values = [name, id]
  const result = await query(queryTxt, values)
  return result.rows[0]
}

export const deleteCategoryService = async (id) => {
  const queryTxt = `DELETE FROM categories WHERE id = $1 RETURNING *;`
  const values = [id]
  const result = await query(queryTxt, values)
  return result.rows[0]
}