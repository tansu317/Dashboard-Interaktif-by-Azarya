const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "dashboard_db",
    password: "password_baru123",
    port: 5433,
});

module.exports = pool;