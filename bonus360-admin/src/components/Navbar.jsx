import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Assuming you have a CSS file for styling

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/campaigns">Campaigns</Link>
                </li>
                <li>
                    <Link to="/create-campaign">Create Campaign</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;