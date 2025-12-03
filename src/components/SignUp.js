import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp(props) {
	const [credentials, setCredentials] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const url = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		//destructure password and confirm password
		const { name, email, password } = credentials;

		const response = await fetch(`${url}/v1/users`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		});

		const json = await response.json();
		console.log(json);
		if (json.success) {
			//create token
			localStorage.setItem("token", json.authToken);
			navigate("/login");
			props.showAlert("Account created successfully", "success");
		} else {
			props.showAlert("Invalid details", "danger");
		}
	};

	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	return (
		<div className='container mt-5'>
			<div className='form-container'>
				<h2>Create Account</h2>
				<p style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '2rem' }}>
					Join iNotebook and start organizing your thoughts
				</p>
				<form onSubmit={handleSubmit}>
					<div className='mb-3'>
						<label
							htmlFor='name'
							className='form-label'>
							Full Name
						</label>
						<input
							type='text'
							className='form-control'
							id='name'
							name='name'
							placeholder='Enter your full name'
							aria-describedby='nameHelp'
							onChange={onChange}
							required
						/>
					</div>
					<div className='mb-3'>
						<label
							htmlFor='email'
							className='form-label'>
							Email address
						</label>
						<input
							type='email'
							className='form-control'
							id='email'
							aria-describedby='emailHelp'
							name='email'
							placeholder='Enter your email'
							onChange={onChange}
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
							id='password'
							name='password'
							placeholder='Create a password (min. 5 characters)'
							onChange={onChange}
							minLength={5}
							required
						/>
					</div>
					<div className='mb-3'>
						<label
							htmlFor='confirmPassword'
							className='form-label'>
							Confirm Password
						</label>
						<input
							type='password'
							className='form-control'
							id='confirmPassword'
							name='confirmPassword'
							placeholder='Confirm your password'
							onChange={onChange}
							required
						/>
					</div>
					<button
						type='submit'
						className='btn btn-primary w-100'
						style={{ marginTop: '1rem' }}>
						Create Account
					</button>
					<p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'rgba(255, 255, 255, 0.7)' }}>
						Already have an account?{' '}
						<a href='/login' style={{ color: '#818cf8', textDecoration: 'none', fontWeight: '500' }}>
							Sign in here
						</a>
					</p>
				</form>
			</div>
		</div>
	);
}

export default SignUp;
