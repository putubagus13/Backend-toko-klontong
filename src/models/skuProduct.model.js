const db = require("../helpers/db.halper");
const table = "skuProduct";

exports.addSku = async (data) => {
  const query = `
      INSERT INTO "${table}" (
        "sku", 
        "width", 
        "weight", 
        "length", 
        "height")
      VALUES ($1, $2, $3, $4, $5) RETURNING *
      `;
  const values = [data.sku, data.width, data.weight, data.length, data.height];
  const { rows } = await db.query(query, values);
  return rows[0];
};

exports.updateSku = async (sku, data) => {
  const query = `
    UPDATE "${table}"
    SET
    "sku" = COALESCE(NULLIF($2, ''), "sku"), 
    "width" = COALESCE(NULLIF($3::INTEGER, NULL), "width"), 
    "weight" = COALESCE(NULLIF($4::INTEGER, NULL), "weight"), 
    "length" = COALESCE(NULLIF($5::INTEGER, NULL), "length"), 
    "height" = COALESCE(NULLIF($6::INTEGER, NULL), "height")
    WHERE "sku"=$1
    RETURNING *`;

  const values = [
    sku,
    data.sku,
    data.width,
    data.weight,
    data.length,
    data.height,
  ];
  const { rows } = await db.query(query, values);
  return rows[0];
};

exports.destroy = async (id) => {
  const query = `
    DELETE FROM "${table}" WHERE id=$1 RETURNING *`;

  const values = [id];
  const { rows } = await db.query(query, values);
  return rows[0];
};
