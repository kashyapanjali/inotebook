import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Alert from "./components/Alert";
import NoteState from "./context/notes/NoteState";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

function App() {
	return (
		<>
			<NoteState>
				<Router>
					<Navbar />
					<Alert message='This is Alert' />
					<div className='container'>
						<Routes>
							<Route
								path='/'
								element={<Home />}
							/>
							<Route
								path='/about'
								element={<About />}
							/>
							<Route
								path='/signup'
								element={<SignUp />}
							/>
							<Route
								path='/login'
								element={<Login />}
							/>
						</Routes>
					</div>
				</Router>
			</NoteState>
		</>
	);
}

export default App;
