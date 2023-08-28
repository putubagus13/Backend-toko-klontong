const db = require("../helpers/db.halper");
const table = "products";

exports.insert = async (data) => {
  const query = `
    INSERT INTO "${table}" (
      "image", 
      "name", 
      "description", 
      "categoryId", 
      "price", 
      "skuId")
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `;
  const values = [
    data.image,
    data.name,
    data.description,
    data.categoryId,
    data.price,
    data.skuId,
  ];
  const { rows } = await db.query(query, values);
  return rows[0];
};

exports.update = async (id, data) => {
  const query = `
      UPDATE "${table}" 
      SET 
      "image"= COALESCE(NULLIF($2,''), "image"),
      "name"= COALESCE(NULLIF($3,''), "name"),
      "description"= COALESCE(NULLIF($4, ''), "description"),
      "categoryId"= COALESCE(NULLIF($5::INTEGER, NULL), "categoryId"),
      "price"= COALESCE(NULLIF($6::INTEGER, NULL), "price"),
      "skuId"= COALESCE(NULLIF($7::INTEGER, NULL), "skuId")
      WHERE "id"=$1
      RETURNING * `;
  const values = [
    id,
    data.image,
    data.name,
    data.description,
    data.categoryId,
    data.price,
    data.skuId,
  ];
  const { rows } = await db.query(query, values);
  return rows[0];
};

exports.destroy = async (id) => {
  const query = `
    DELETE FROM "${table}" WHERE "id"=$1 RETURNING * `;

  const values = [id];
  const { rows } = await db.query(query, values);
  return rows[0];
};

exports.findAll = async (search, page, sortBy, sort, category, sku, limit) => {
  search = search || "";
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 20;
  sortBy = sortBy || "DESC";
  sort = sort || "id";
  category = category || "";
  sku = sku || "";
  const offset = (page - 1) * limit;

  const countQuery = `
  SELECT COUNT(*)::INTEGER
  FROM "${table}"
  WHERE "name" ILIKE $1`;

  const countvalues = [`%${search}%`];
  const { rows: countRows } = await db.query(countQuery, countvalues);

  const query = `
    SELECT 
    "p"."id",
    "p"."name",
    "p"."image",
    "p"."price" as "harga",
    "p"."description",
    "c"."name" as "categoryName",
    "c"."id" as "categoryId",
    "s"."sku",
    "s"."weight",
    "s"."length",
    "s"."height",
    "s"."width"
    FROM "${table}" "p"
    JOIN "categories" "c" ON "c"."id" = "p"."categoryId"
    JOIN "skuProduct" "s" ON "s"."id" = "p"."skuId"
    WHERE "p"."name" ILIKE $1
    AND "c"."name" ILIKE $2
    AND "s"."sku" ILIKE $3
    ORDER BY ${sort} ${sortBy} 
    LIMIT $4 OFFSET $5`;

  const values = [`%${search}%`, `%${category}%`, `%${sku}%`, limit, offset];
  const { rows } = await db.query(query, values);
  return {
    rows,
    pageInfo: {
      totalData: countRows[0].count,
      page: page,
      limit: limit,
      totalPage: Math.ceil(countRows[0].count / limit),
    },
  };
};

exports.fineOne = async (id) => {
  const query = `    
    SELECT 
    "p"."id",
    "p"."name",
    "p"."image",
    "p"."price" as "harga",
    "p"."description",
    "c"."name" as "categoryName",
    "c"."id" as "categoryId",
    "s"."sku",
    "s"."id" as "skuId",
    "s"."weight",
    "s"."length",
    "s"."height",
    "s"."width"
    FROM "${table}" "p"
    JOIN "categories" "c" ON "c"."id" = "p"."categoryId"
    JOIN "skuProduct" "s" ON "s"."id" = "p"."skuId"
    WHERE "p"."id"=$1`;

  const values = [id];
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
