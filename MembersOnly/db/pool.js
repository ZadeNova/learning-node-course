const { Pool } = require("pg");

module.exports = new Pool({
	connectionString:
		"postgresql://postgres:apple@localhost:5432/MembersOnly",
});

// 5432 is for the laptop
