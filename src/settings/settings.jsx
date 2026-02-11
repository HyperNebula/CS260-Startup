import React from 'react';

export function Settings() {
    return (
        <main>
            <h1 style={{ textAlign: "center" }}>Account Settings</h1>

            <form className="setting-form">

                <fieldset>
                    <legend><strong>Public Profile</strong></legend>
                    
                    <p>
                        <label>Username:</label><br/>
                        <input type="text" id="targetUsername" value="Current Username"/>
                    </p>

                    <p>
                        <label>Profile Picture:</label><br/>
                        <input type="file" accept="image/png, image/jpeg"/>
                    </p>

                    <p>
                        <label>Bio:</label><br/>
                        <textarea rows="4">Information on user...</textarea>
                    </p>
                </fieldset>
                
                <br/>

                <fieldset>
                    <legend><strong>Security</strong></legend>
                    
                    <p>
                        <label>New Password:</label><br/>
                        <input type="password" id="targetPassword" placeholder="Leave blank to keep current"/>
                    </p>

                    <p>
                        <label >Confirm New Password:</label><br/>
                        <input type="password"/>
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

                <fieldset class="delete-field">
                    <legend><strong>Danger Zone</strong></legend>
                    
                    <p>Once you delete your account, there is no going back.</p>
                    <button type="button">Delete Account</button>
                </fieldset>

                <br/>
                <hr/>
                <br/>

                <div class="update-settings">
                    <a href="library.html">Cancel</a>
                    <button type="submit">Save Changes</button>
                </div>

            </form>
        </main>
    
    );
}