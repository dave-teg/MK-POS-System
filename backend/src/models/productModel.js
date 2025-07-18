import { query } from "../../db/db.js";

export const getAllProductsService = async () => {
  const queryTxt = `
  SELECT p.*, c.name AS category_name
  FROM products p
  JOIN categories c ON p.category_id = c.id
  ORDER BY created_at DESC;
  `
  const prodResult = await query(queryTxt)

  return prodResult.rows
}

export const getProductByProductNameService = async (name) => {
  const queryTxt = `
  SELECT * FROM products
  WHERE name = $1;    
  `
  const values = [name]
  const result = await query(queryTxt, values)
  return result.rows[0]
}

export const createProductService = async (name, price, category_id) => {
  const queryTxt = `INSERT INTO products (name, price, category_id) VALUES ($1, $2, $3) RETURNING *`
  const values = [name, price, category_id]
  const result = await query(queryTxt, values)
  return result.rows[0]
}

export const updateProductService = async (productId, fieldsToUpdate = {}) => {
  const {formattedName, price, category_id, is_active} = fieldsToUpdate

   //build the set clause dynamically
  const updates = []
  const values = []
  let index = 1;

  if(formattedName !== undefined) {
    updates.push(`name = $${index++}`)
    values.push(formattedName)
  }

  if(price !== undefined) {
    updates.push(`price = $${index++}`)
    values.push(price)
  }

  if(category_id !== undefined) {
    updates.push(`category_id = $${index++}`)
    values.push(category_id)
  }

  if(is_active !== undefined) {
    updates.push(`is_active = $${index++}`)
    values.push(is_active)
  }

  values.push(productId)

  const queryTxt = `
  UPDATE products 
  SET ${updates.join(', ')}
  WHERE id = $${index}
  RETURNING *;
  `;

  const result = await query(queryTxt, values)
  return result.rows[0]
}

export const deleteProductService = async (id) => {
  const queryTxt = `DELETE FROM products WHERE id = $1 RETURNING *;`
  const values = [id]
  const result = await query(queryTxt, values)
  return result.rows[0]
}