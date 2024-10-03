const { Pool } = require("pg");


module.exports = new Pool({
    connectionString: "postgresql://postgres:apple@localhost:5432/InventoryManagementProject"
})