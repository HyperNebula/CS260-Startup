import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom';
//import { Login } from './login/login';
//import { Library } from './library/library';
//import { Feed } from './feed/feed';
//import { Settings } from './settings/settings';

export default function App() {
  return (
    <div className="body">
        <header className="nav-bar">
                <div className="logo">
                    <img src="/check-mark.png" alt="Library Logo" style={{ width: "1.5em", height: "auto" }} />
                    <span>CheckOff</span>
                </div>

                <nav className="nav-links">
                    <a href="index.html">Log Out</a> |
                    <a href="library.html">Library</a>  |
                    <a href="feed.html">Feed</a>
                </nav>

                <div className="account-settings">
                    <a href="settings.html">Account Settings</a>
                </div>
        </header>

        <main>Body Here</main>

        <footer className="credit">
            <span>David Deskins | </span>
            <a href="https://github.com/HyperNebula/CS260-Startup/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>Github Repository</a>
        </footer>

    </div>
    
  );
}