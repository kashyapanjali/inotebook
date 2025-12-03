import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
	});

	const url = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch(`${url}/v1/users/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: credentials.email,
				password: credentials.password,
			}),
		});
		const json = await response.json();
		if (json.success) {
			//save the auth token and redirect
			localStorage.setItem("token", json.authToken);
			navigate("/");
			props.showAlert("Successfull login", "success");
		} else {
			props.showAlert("Invalid Details", "danger");
		}
	};

	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	return (
		<div className='container mt-5'>
			<div className='form-container'>
				<h2>Welcome Back</h2>
				<p
					style={{
						textAlign: "center",
						color: "rgba(255, 255, 255, 0.7)",
						marginBottom: "2rem",
					}}>
					Sign in to access your notes
				</p>
				<form onSubmit={handleSubmit}>
					<div className='mb-3'>
						<label
							htmlFor='email'
							className='form-label'>
							Email address
						</label>
						<input
							type='email'
							className='form-control'
							value={credentials.email}
							onChange={onChange}
							id='email'
							name='email'
							placeholder='Enter your email'
							aria-describedby='emailHelp'
							required
						/>
						<div
							id='emailHelp'
							className='form-text'>
							We'll never share your email with anyone else.
						</div>
					</div>
					<div className='mb-3'>
						<label
							htmlFor='password'
							className='form-label'>
							Password
						</label>
						<input
							type='password'
							className='form-control'
							value={credentials.password}
							onChange={onChange}
							id='password'
							name='password'
							placeholder='Enter your password'
							required
						/>
					</div>
					<button
						type='submit'
						className='btn btn-primary w-100'
						style={{ marginTop: "1rem" }}>
						Sign In
					</button>
					<p
						style={{
							textAlign: "center",
							marginTop: "1.5rem",
							color: "rgba(255, 255, 255, 0.7)",
						}}>
						Don't have an account?{" "}
						<a
							href='/signup'
							style={{
								color: "#818cf8",
								textDecoration: "none",
								fontWeight: "500",
							}}>
							Sign up here
						</a>
					</p>
				</form>
			</div>
		</div>
	);
}

export default Login;
