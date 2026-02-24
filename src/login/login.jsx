import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserData } from '../app';

export function Login() {
	
	const navigate = useNavigate();

	const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
	const [userDataSet, setUserDataSet] = useState([]);

	const handleLogin = (e) => {
		e.preventDefault();

		setUserDataSet(JSON.parse(localStorage.getItem("userDataSet")))

		for (const user of userDataSet) {
			if (user.username == username) {
				localStorage.setItem('userName', username);

				navigate('/library');
			} else {
				console.log("Error, not registered");
			}
		}
	};

	const handleAccountCreation = (e) => {
		e.preventDefault();

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
						<input type="text" name="username" placeholder="Username" minLength="3" required value={username} onChange={(e) => setUsername(e.target.value)}/>
					</div>
					
					<div className="input-group">
						<span className="icon">🗝️</span>
						<input type="password" name="password" placeholder="Password" minLength="8" required value={password} onChange={(e) => setPassword(e.target.value)}/>
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