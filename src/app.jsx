import React, { Component, useState } from 'react';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { Login } from './login/login';
import { Library } from './library/library';
import { Feed } from './feed/feed';
import { Settings } from './settings/settings';

export class UserData {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
};

localStorage.setItem("userDataSet", JSON.stringify([new UserData("david", "password")]));

function Navbar() {
    const location = useLocation()

    if (location.pathname === "/") {
        return null
    }

    return (
        <header className="nav-bar">
            <div className="logo">
                <img src="/check-mark.png" alt="Library Logo" style={{ width: "1.5em", height: "auto" }} />
                <span>CheckOff</span>
            </div>

            <nav className="nav-links">
                <NavLink to="">Log Out</NavLink> |
                <NavLink to="library">Library</NavLink>  |
                <NavLink to="feed">Feed</NavLink>
            </nav>

            <div className="account-settings">
                <NavLink to="settings">Account Settings</NavLink>
            </div>
        </header>
    )
}

export default function App() {

    return (
        <BrowserRouter>
            <div className="body">
                
                <Navbar />

                <Routes>
                    <Route path='/' element={<Login />} exact />
                    <Route path='/library' element={<Library />} />
                    <Route path='/feed' element={<Feed />} />
                    <Route path='/settings' element={<Settings />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>

                <footer className="credit">
                    <span>David Deskins | </span>
                    <a href="https://github.com/HyperNebula/CS260-Startup/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>Github Repository</a>
                </footer>

            </div>
        </BrowserRouter>
    );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}