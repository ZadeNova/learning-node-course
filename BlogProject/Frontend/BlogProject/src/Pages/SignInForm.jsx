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

export function SignInForm() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(username, password);
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
						placeholder="Enter username"
						fullWidth
						required
						autoFocus
						variant="outlined"
						label="Username"
						sx={{ mb: 2 }}
						value={username}
						onChange={handleUsernameChange}
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
						<Link to="/signup">Sign Up</Link>
					</Grid2>
				</Grid2>
			</Paper>
		</Container>
	);
}
