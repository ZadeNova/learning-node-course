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

export function SignUpForm() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(username, password, email);
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
							placeholder="Enter username"
							fullWidth
							required
							autoFocus
							sx={{ mb: 2 }}
							value={username}
							onChange={handleUsernameChange}
							variant="outlined"
							label="Username"
						/>
						<TextField
							placeholder="Enter Email"
							fullWidth
							required
							sx={{ mb: 2 }}
							value={email}
							onChange={handleEmailChange}
							variant="outlined"
							label="Email"
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
							<Link to="/forgot">Forgot Password</Link>
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
