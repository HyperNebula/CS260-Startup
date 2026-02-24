import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function Settings() {

    const navigate = useNavigate();

    const [username, setUsername] = useState(localStorage.getItem("userName"));
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handleAccountUpdate = (e) => {
        e.preventDefault();

        if (password != passwordConfirm) {
            alert("Passwords do not match");
            return;
        }
        
        if (password != "" && password.length < 8) {
            alert("Password must be at least 8 characters.");
            return;
        }

        const userDataSet = JSON.parse(localStorage.getItem("userDataSet"));
        
        if (localStorage.getItem("userName") != username) {
            for (const user of userDataSet) {
                if (user.username == username) {
                    alert("Username Already Taken");
                    return;
                }
            }
        }

        userDataSet[localStorage.getItem("userID")].username = username;

        if (password != "") {
            userDataSet[localStorage.getItem("userID")].password = password;
        }

        localStorage.setItem("userDataSet", JSON.stringify(userDataSet));
        localStorage.setItem('userName', username);

        navigate('/library');
    }
    
    return (
        <main>
            <h1 style={{ textAlign: "center" }}>Account Settings</h1>

            <form className="setting-form" onSubmit={ handleAccountUpdate }>

                <fieldset>
                    <legend><strong>Public Profile</strong></legend>
                    
                    <p>
                        <label>Username:</label><br/>
                        <input type="text" id="targetUsername" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </p>

{/*                    <p>
                        <label>Profile Picture:</label><br/>
                        <input type="file" accept="image/png, image/jpeg"/>
                    </p>
*/}
                    <p>
                        <label>Bio:</label><br/>
                        <textarea rows="4" defaultValue={"Information on user..."}></textarea>
                    </p>
                </fieldset>
                
                <br/>

                <fieldset>
                    <legend><strong>Security</strong></legend>
                    
                    <p>
                        <label>New Password:</label><br/>
                        <input type="password" id="targetPassword" placeholder="Leave blank to keep current" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </p>

                    <p>
                        <label >Confirm New Password:</label><br/>
                        <input type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}/>
                    </p>
                </fieldset>

                <br/>

                <fieldset>
                    <legend><strong>Library Preferences</strong></legend>
                    
                    <p><strong>Privacy:</strong></p>
                    
                    <input type="checkbox"checked/>
                    <label for="public-profile">Make my library visible to everyone</label><br/>

                    <input type="checkbox"checked/>
                    <label for="show-activity">Share my activity in the public feed</label>
                    
                </fieldset>

                <br/>

                <fieldset className="delete-field">
                    <legend><strong>Danger Zone</strong></legend>
                    
                    <p>Once you delete your account, there is no going back.</p>
                    <button type="button">Delete Account</button>
                </fieldset>

                <br/>
                <hr/>
                <br/>

                <div className="update-settings">
                    <Link to="/library" >Cancel</Link>
                    <button type="submit">Save Changes</button>
                </div>

            </form>
        </main>
    
    );
}