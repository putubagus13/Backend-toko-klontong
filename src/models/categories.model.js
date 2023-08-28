const db = require("../helpers/db.halper");

const tabel = "categories";

exports.findAll = async (page, limit, search, sort, sortBy) => {
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;
  search = search || "";
  sort = sort || "id";
  sortBy = sortBy || "ASC";
  const offset = (page - 1) * limit;
  const query = `
    SELECT * FROM "${tabel}" WHERE "name" LIKE $3 ORDER BY ${sort} ${sortBy} LIMIT $1 OFFSET $2`;

  const values = [limit, offset, `%${search}%`];
  const { rows } = await db.query(query, values);
  return rows;
};

exports.insert = async (data) => {
  const query = `
    INSERT INTO "${tabel}" ("name")
    VALUES ($1) RETURNING *
    `;
  const values = [data.name];
  const { rows } = await db.query(query, values);
  return rows[0];
};
