import "./Navbar.css";

const Navbar = () => {

    // Switch to mobile menu
    const MobileMenu = () => {
        document.querySelector("#Mobile-menu").classList.toggle('is-active');
        document.querySelector('#Navbar-container').classList.toggle('active');
    };

    const RedirectToHome = () => {
        if (window.location.pathname !== "/") {
            window.location.pathname = "/";
        }
    }

    const ScrollTo = (id) => {
        RedirectToHome();

        if (window.location.pathname === "/") {
            let section = document.querySelector(id).offsetTop - 80;
            window.scroll({
                top: section,
                behavior: "smooth"
            });    
        }
    }

    return (
        <nav id="Navbar" className="flex">
            <button id="Navbar-logo" onClick={() => ScrollTo("#Hero")}>PoképediaJX</button>
            <div id="Mobile-menu" onClick={MobileMenu} className="flex-col">
                <span className="bar"></span> 
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
            <div id="Navbar-container" className="flex" onClick={MobileMenu}>
                <button onClick={() => ScrollTo("#Hero")} className="nav-button">Home</button>
                <button onClick={() => ScrollTo("#About")} className="nav-button">About</button>
                <button onClick={() => ScrollTo("#Regions")} className="nav-button">Regions</button>
                <a href="/dashboard" className="nav-button">Dashboard</a>
            </div>
        </nav>
    );
}

export default Navbar;
