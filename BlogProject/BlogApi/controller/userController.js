const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function createUser(req, res) {
	console.log("hello there");
	res.status(200).json({
		message: "It works",
	});

	//
	console.log(req.body);

	try {
		let hashedPass;
		bcrypt
			.hash(req.body.password, 10)
			.then((hashedPassword) => {
				hashedPass = hashedPassword;
			})
			.catch((error) => {
				res.status(500).send({
					message: "Password was not hashed successfully.",
					error,
				});
			});

		await prisma.user.create({
			data: {
				username: req.body.username,
				email: req.body.email,
				password: hashedPass,
			},
		});
	} catch (err) {
		console.error(err);
	}
}
async function getUser(req, res) {
	res.json("hi");
}

async function getAllUsers(req, res) {
	res.status(200).json({
		message: " Get all users",
	});
}

async function updateUser(req, res) {}

async function deleteUser(req, res) {}

async function loginUser(req, res) {
	const user = await prisma.user.findUnique({
		where: {
			email: req.body.email,
		},
	});

	// Check if user exists
	if (user) {
		// User exists
		// Verify Password
	} else {
		res.status(500).json({ message: "Internal Server Error" });
	}
	console.log(user);
	//bcrypt.compare(req.body.password, user.password);
}
module.exports = {
	createUser,
	getUser,
	getAllUsers,
	updateUser,
	deleteUser,
	loginUser,
};
