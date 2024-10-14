const { Pool } = require("pg");

module.exports = new Pool({
	connectionString:
		"postgresql://postgres:apple@localhost:5433/MembersOnly",
});

// 5432 is for the laptop
// 5433 is for main pc
