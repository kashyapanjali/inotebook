import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Alert from "./components/Alert";
import NoteState from "./context/notes/NoteState";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { useState } from "react";

function App() {
	const [alert, setAlert] = useState(null);

	//message, type passed to alert component as a props
	const showAlert = (message, type) => {
		setAlert({ message, type });

		setTimeout(() => {
			setAlert(null);
		}, 3000);
	};

	return (
		<>
			<NoteState>
				<Router>
					<Navbar />
					<Alert alert={alert} />
					<div className='container'>
						<Routes>
							<Route
								path='/'
								element={<Home showAlert={showAlert} />}
							/>
							<Route
								path='/about'
								element={<About />}
							/>
							<Route
								path='/signup'
								element={<SignUp showAlert={showAlert} />}
							/>
							<Route
								path='/login'
								element={<Login showAlert={showAlert} />}
							/>
						</Routes>
					</div>
				</Router>
			</NoteState>
		</>
	);
}

export default App;
