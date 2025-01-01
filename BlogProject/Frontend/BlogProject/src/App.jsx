import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { SignInForm } from "./Pages/SignInForm";
import { SignUpForm } from "./pages/signupForm";
function App() {
	// const [count, setCount] = useState(0)

	// return (
	//   <>
	//     <div>
	//       <a href="https://vite.dev" target="_blank">
	//         <img src={viteLogo} className="logo" alt="Vite logo" />
	//       </a>
	//       <a href="https://react.dev" target="_blank">
	//         <img src={reactLogo} className="logo react" alt="React logo" />
	//       </a>
	//     </div>
	//     <h1>Vite + React</h1>
	//     <div className="card">
	//       <button onClick={() => setCount((count) => count + 1)}>
	//         count is {count}
	//       </button>
	//       <p>
	//         Edit <code>src/App.jsx</code> and save to test HMR
	//       </p>
	//     </div>
	//     <p className="read-the-docs">
	//       Click on the Vite and React logos to learn more
	//     </p>
	//   </>
	// )

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/signin" element={<SignInForm />} />
				<Route path="/signup" element={<SignUpForm />} />
				{/* <Route path="/" element={<Home/>}/>
        <Route path="/" element={<Home/>}/> */}
			</Routes>
		</Router>
	);
}

// Fix navbar first onto app
// After that make the signup form and signin form. [Done] [ Signin form needs form validation too. Signup form needs to ]
// Setup backend api to handle users. Now need to create createuser and login user. [ Api for create user done, Just need to add password encryption. ]
// For Navbar implement conditional logic that checks whether user is loggedin. If user is loggedin display navbar before signin.
// Edit the navbar to link to signup and signin.

//TODO Setup backend API to login users.
//TODO Encrypt password
//TODO find an authentication library for frontend and backend?
//TODO Implement conditional logic that checks whether user is loggedin. Display different navbars for different states.
//* 22/12/2024 11:50pm

//TODO Find a way to display error of login in the frontend.
export default App;
