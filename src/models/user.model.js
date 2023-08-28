const db = require("../helpers/db.halper");

exports.findAll = async function (page, limit, search, sort, sortBy) {
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;
  search = search || "";
  sort = sort || "id";
  sortBy = sortBy || "ASC";
  const offset = (page - 1) * limit;
  const query = `
    SELECT * FROM "users" WHERE "username" LIKE $3 ORDER BY ${sort} ${sortBy} LIMIT $1 OFFSET $2`;

  const values = [limit, offset, `%${search}%`];
  const { rows } = await db.query(query, values);
  return rows;
};

exports.findOne = async function (id) {
  const query = `
    SELECT * FROM "users" WHERE id=$1`;

  const values = [id];
  const { rows } = await db.query(query, values);
  return rows[0];
};

exports.findByUserName = async function (username) {
  const query = `
    SELECT * FROM "users" WHERE "username"=$1`;

  const values = [username];
  const { rows } = await db.query(query, values);
  return rows[0];
};

exports.insert = async function (data) {
  const query = `
    INSERT INTO "users" ("username", "email", "password")
    VALUES ($1, $2, $3) RETURNING *
    `;
  const values = [data.username, data.email, data.password];
  const { rows } = await db.query(query, values);
  return rows[0];
};

exports.update = async function (id, data) {
  const query = `
    UPDATE "users" 
    SET 
    "username"= COALESCE(NULLIF($2,''), "username"),
    "email"= COALESCE(NULLIF($3,''), "email"),
    "password"= COALESCE(NULLIF($4,''), "password")
     WHERE "id"=$1
    RETURNING *
    `;
  const values = [id, data.username, data.email, data.password];
  const { rows } = await db.query(query, values);
  return rows[0];
};

exports.destroy = async function (id) {
  const query = `
    DELETE FROM "users" WHERE "id"=$1 RETURNING *
`;
  const values = [id];
  const { rows } = await db.query(query, values);
  return rows[0];
};

exports.findOneByEmail = async (email) => {
  const query = `
    SELECT * FROM "users" WHERE email = $1`;

  const values = [email];
  const { rows } = await db.query(query, values);
  return rows[0];
};
