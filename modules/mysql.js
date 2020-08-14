const mysql = require("promise-mysql");
const dbconfig = require("../config/dbconfig");

let pool;

async function getPool() {
  if (!pool) {
    pool = await mysql.createPool(dbconfig);
    return pool;
  }

  return pool;
}

async function query(...args) {
  const query = args[0];
  const data = args[1];

  await getPool();

  const connection = await pool.getConnection();
  const result = (await connection.query(query, data)) || null;

  connection.release();

  return result;
}

async function transaction(...args) {
  await getPool();

  const result = true;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    await args[0](connection);
    await connection.commit();
  } catch (error) {
    console.log(error);

    await connection.rollback();
    result = undefined;
  } finally {
    connection.release();
    return result;
  }
}

module.exports = {
  query,
  transaction,
};
