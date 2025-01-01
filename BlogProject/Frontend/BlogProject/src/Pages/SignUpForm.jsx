"use client";
import {
	Avatar,
	Container,
	Paper,
	Typography,
	Box,
	TextField,
	FormControlLabel,
	Checkbox,
	Button,
	Grid2,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";

export function SignUpForm() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	//const { register, handleSubmit, errors } = useForm();
	// Validators
	const [usernameError, setUsernameError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");

	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
		if (username >= 1) {
			setUsernameError("");
		}
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);

		if (password >= 1) {
			setPasswordError("");
		}
	};

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
		if (email >= 1) {
			setEmailError("");
		}
	};

	// Validation for form inputs

	const handleSubmit = (event) => {
		event.preventDefault();

		// Basic input validation
		let hasErrors = false;
		if (!username) {
			setUsernameError("Username is required");
			hasErrors = true;
		} else {
			setUsernameError("");
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!email || !emailRegex.test(email)) {
			setEmailError("Invalid email address");
			hasErrors = true;
		} else {
			setEmailError("");
		}

		if (!password) {
			setPasswordError("Password is required");
			hasErrors = true;
		} else {
			setPasswordError("");
		}

		if (!hasErrors) {
			// If all validations pass, proceed with the API request
			// ... (your API request code)
			const userData = {
				username: username,
				password: password,
				email: email,
			};
			console.log(username, password, email);
			axios.post("http://localhost:8080/users/createUser", userData);

			// Clear the form
			setEmail("");
			setPassword("");
			setUsername("");
		}
	};

	return (
		<>
			<Container maxWidth="sm">
				<Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
					<Avatar
						sx={{
							mx: "auto",
							bgcolor: "secondary.main",
							textAlign: "center",
							mb: 1,
						}}
					></Avatar>
					<Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
						Sign Up/Register
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							placeholder="Enter Username"
							fullWidth
							required
							autoFocus
							sx={{ mb: 2 }}
							value={username}
							onChange={handleUsernameChange}
							variant="outlined"
							label="Username"
							name="username"
						/>
						{usernameError && <p style={{ color: "red" }}>{usernameError}</p>}
						<TextField
							placeholder="Enter Email"
							fullWidth
							required
							sx={{ mb: 2 }}
							value={email}
							onChange={handleEmailChange}
							variant="outlined"
							label="Email"
							name="email"
						/>
						{emailError && <p style={{ color: "red" }}>{emailError}</p>}
						<TextField
							placeholder="Enter password"
							fullWidth
							required
							value={password}
							onChange={handlePasswordChange}
							variant="outlined"
							label="Password"
							name="password"
						/>
						{passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember Me"
						/>
						<Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
							Sign In
						</Button>
					</Box>
					<Grid2 container justifyContent={"space-between"} sx={{ mt: 1 }}>
						<Grid2 item="true">
							<Link to="/">Home</Link>
						</Grid2>
						<Grid2 item="true">
							<Link to="/signin">Sign In</Link>
						</Grid2>
					</Grid2>
				</Paper>
			</Container>
		</>
	);
}
