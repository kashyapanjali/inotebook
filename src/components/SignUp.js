import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp(props) {
	const [credentials, setCredentials] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const url = "http://localhost:3000";

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		//destructure password and confirm password
		const { name, email, password } = credentials;

		const response = await fetch(`${url}/api/v1/users`, {
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
		<div className='container'>
			<form onSubmit={handleSubmit}>
				<div className='mb-3'>
					<label
						htmlFor='name'
						className='form-label'>
						Enter Name
					</label>
					<input
						type='text'
						className='form-control'
						id='name'
						name='name'
						aria-describedby='emailHelp'
						onChange={onChange}
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
						onChange={onChange}
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
						onChange={onChange}
					/>
				</div>
				<button
					type='submit'
					className='btn btn-primary'>
					Submit
				</button>
			</form>
		</div>
	);
}

export default SignUp;
