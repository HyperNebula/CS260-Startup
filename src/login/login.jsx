import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { UserData } from '../app';

export function Login() {
	
	const navigate = useNavigate();

	const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

	const handleLogin = (e) => {
		e.preventDefault();

		if (username.length < 3) {
			toast.error("Username should be at least 3 characters");
			return;
		}

		if (password.length < 8) {
			toast.error("Password should be at least 8 characters");
			return;
		}

		const userDataSet = JSON.parse(localStorage.getItem("userDataSet"));

		for (const user of userDataSet) {
			if (user.username == username) {
				if (user.password == password) {
					localStorage.setItem('userName', username);
					localStorage.setItem('userID', userDataSet.indexOf(user));

					navigate('/library');
					return;
				} else {
					toast.error("Incorrect Password");
					return;
				}
			}
		}
		toast.error("User is not registered");
		return;
	};

	const handleAccountCreation = (e) => {
		e.preventDefault();

		if (username.length < 3) {
			toast.error("Username should be at least 3 characters");
			return;
		}

		if (password.length < 8) {
			toast.error("Password should be at least 8 characters");
			return;
		}

		const userDataSet = JSON.parse(localStorage.getItem("userDataSet"));

		for (const user of userDataSet) {
			if (user.username == username) {
				toast.error("Username Already Taken");
				return;
			}
		}

		localStorage.setItem('userID', userDataSet.length);

		userDataSet.push(new UserData(username, password));
		localStorage.setItem("userDataSet", JSON.stringify(userDataSet));

		localStorage.setItem('userName', username);

		navigate('/settings');
	}

  	return (
		<main className='login-page'>

			<h1 id="login-title">CheckOff</h1>

			<div className="login_box">

				<h2 style={{ marginBottom: 30 }}>Login</h2>

				<form onSubmit={ handleLogin }>
					<div className="input-group">
						<span className="icon">👤</span>
						<input type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
					</div>
					
					<div className="input-group">
						<span className="icon">🗝️</span>
						<input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
					</div>
					
					<br/>

					<div className="form-actions">
						<input type="submit" value="Login"/>
						<input type="button" value="Create Account" onClick={handleAccountCreation}/>
					</div>
				</form>
			
			</div>

		</main>
  	);
}