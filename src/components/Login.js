import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
	const [mobileNumber, setMobile] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState();
	let navigate = useNavigate();

	useEffect(() => {
		const loggedInUser = localStorage.getItem('user');
		if (loggedInUser) {
			const foundUser = JSON.parse(loggedInUser);
			setUser(foundUser);
		}
	}, []);

	// logout the user
	const handleLogout = () => {
		setUser({});
		setMobile('');
		setPassword('');
		localStorage.clear();
	};

	// login the user
	const handleSubmit = async (e) => {
		e.preventDefault();

		const user = { mobileNumber, password };
		// send the username and password to the server
		user.name = 'USER';
		// set the state of the user
		setUser(user);
		// store the user in localStorage
		localStorage.setItem('user', JSON.stringify(user));
		navigate('/chats');
	};

	// if there's a user show the message below
	if (user) {
		return (
			<div
				style={{
					float: 'right',
					padding: '10px',
					color: 'green',
					fontWeight: 'bold',
				}}>
				{user.name}
				<div onClick={handleLogout}>logout</div>
			</div>
		);
	}
	// if there's no user, show the login form
	return (
		<div class='container'>
			<form className='login-form' onSubmit={handleSubmit}>
				<label htmlFor='mobile'>Mobile: </label>
				<input
					type='text'
					value={mobileNumber}
					minLength={10}
					placeholder='enter your mobile number'
					onChange={({ target }) => setMobile(target.value)}
				/>
				<div>
					<label htmlFor='password'>password: </label>
					<input
						type='password'
						value={password}
						placeholder='enter a password'
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type='submit'>Login</button>
			</form>
		</div>
	);
};

export default Login;
