import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import logo from '../../static/assets/logo.svg';
import camera from '../../static/assets/camera.svg';

export default function Header() {
    return (
        <header id="main-header">
            <figure className="header-content">
                <Link to="/">
                    <img src={logo} alt="IstaRocket"/>
                </Link>
                <Link to="/new">
                    <img src={camera} alt="Enviar publicação"/>
                </Link>
            </figure>
        </header>
    )
}