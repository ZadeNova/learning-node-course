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
export function SignInForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		// Basic input validation
		let hasErrors = false;

		if (!hasErrors) {
			// If all validations pass, proceed with the API request
			// ... (your API request code)
			const userData = {
				email: email,
				password: password,
			};
			console.log(email, password);
			axios
				.post("http://localhost:8080/users/login", userData)
				.catch((error) => {
					if (error.response) {
						console.error(error.response.data.message);
					}
				});

			// Clear the form

			setPassword("");
			setEmail("");
		}
		console.log(email, password);
	};

	return (
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
					Sign In
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						placeholder="Enter email"
						fullWidth
						required
						autoFocus
						variant="outlined"
						label="Email"
						sx={{ mb: 2 }}
						value={email}
						onChange={handleEmailChange}
					/>
					<TextField
						placeholder="Enter password"
						fullWidth
						required
						value={password}
						onChange={handlePasswordChange}
						variant="outlined"
						label="Password"
					/>
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
						<Link to="/signup">Sign Up</Link>
					</Grid2>
				</Grid2>
			</Paper>
		</Container>
	);
}
