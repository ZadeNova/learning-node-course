import { useState } from "react";
import { Link } from "react-router-dom";
import NavigationAppBar from "../Components/Navbar";
import NavBarBeforeSignIn from "../Components/NavBarBeforeSignIn";

export function Home() {
	return (
		<>
			<NavBarBeforeSignIn></NavBarBeforeSignIn>
			{/* <NavigationAppBar></NavigationAppBar> */}
			{/* Outlet should be below navbar? */}
			<h1>Home page</h1>
			<Link to="/">Home</Link>
			<Link to="/signin">Sign Up</Link>
		</>
	);
}
