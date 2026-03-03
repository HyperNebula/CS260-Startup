import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { UserData } from '../app';

export function Login() {
	
	const navigate = useNavigate();

	const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

	const handleLogin = async (e) => {
		e.preventDefault();

		if (username.length < 3) {
			toast.error("Username should be at least 3 characters");
			return;
		}

		if (password.length < 8) {
			toast.error("Password should be at least 8 characters");
			return;
		}

		const status = await createAuth("PUT");

		if (status == 200) {
			navigate('/library');
			toast.success("Successfully logged in");
			return;
		} else if (status == 401) {
			toast.error("Incorrect Password");
			return;
		} else if (status == 403) {
			toast.error("User is not registered");
			return;
		}
		
	};

	const handleAccountCreation = async (e) => {
		e.preventDefault();

		if (username.length < 3) {
			toast.error("Username should be at least 3 characters");
			return;
		}

		if (password.length < 8) {
			toast.error("Password should be at least 8 characters");
			return;
		}

		const status = await createAuth("POST");

		if (status == 200) {
			navigate('/settings');
			toast.success("Account created");
			return;
		} else if (status == 409) {
			toast.error("Username already taken");
			return;
		}
	}

	async function createAuth(method) {
        const res = await fetch("api/auth", {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

		return res.status;
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