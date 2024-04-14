import { useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div className="navbar" id="nav">
            <div className="logo">
                <h1>LOGO</h1>
            </div>
            <div className="nav-links">
                <a href="#home">Home</a>
                <a href="#algo">About</a>
                <a href="#team">Team</a>
            </div>
            <button className="nav-btn" onClick={()=>navigate("/App")}>Try</button>
        </div>
    );
}

export default Navbar;