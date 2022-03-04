import "./Navbar.css";

import { Link } from "react-router-dom";

const Navbar = () => {

    // Switch to mobile menu
    const MobileMenu = () => {
        document.querySelector("#Mobile-menu").classList.toggle('is-active');
        document.querySelector('#Navbar-container').classList.toggle('active');
    };

    const ScrollTo = (id) => {
        if (window.location.pathname === "/") {
            let section = document.querySelector(id).offsetTop - 100;
            window.scroll({
                top: section,
                behavior: "smooth"
            });    
        }
    }

    return (
        <nav id="Navbar" className="flex">
            <Link id="Navbar-logo" to="/" onClick={() => ScrollTo("#Hero")}>PoképediaJX</Link>
            <div id="Mobile-menu" onClick={MobileMenu} className="flex-col">
                <span className="bar"></span> 
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
            <div id="Navbar-container" className="flex" onClick={MobileMenu}>
                <Link to="/" onClick={() => ScrollTo("#Hero")} className="nav-button">Home</Link>
                <Link to="/" onClick={() => ScrollTo("#About")} className="nav-button">About</Link>
                <Link to="/" onClick={() => ScrollTo("#Regions")} className="nav-button">Regions</Link>
                <Link to="/dashboard" className="nav-button flex">Dashboard</Link>
            </div>
        </nav>
    );
}

export default Navbar;
