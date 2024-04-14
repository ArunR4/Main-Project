import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/navbar";
import About from "../About/About";
import Team from "../Team/Team";
import Footer from "../../components/Footer/Footer";
import v1 from '../../assets/v1.mp4';
import './LandingPage.css';


const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <div className="landing-page">
            <a href="#nav" className="up-btn"><i class="fa-solid fa-caret-up"></i></a>
            <div className="overlay-back"></div>
            <video src={v1} className='back-video' autoPlay loop muted />
            <div className="home">
                <Navbar />
                <div className="home-main" id="home">
                    <h1>X-Ray Image Enchancer</h1>
                    <p>Lorem ipsum dolor sit amet consectetur. Mi feugiat risus eu sagittis mauris.Lorem ipsum dolor sit amet consectetur. Mi feugiat risus eu sagittis mauris.</p>
                    <button onClick={()=>navigate("/App")}>Try</button>
                </div>
            </div>
            <About />
            <Team />
            <Footer />
        </div>
    );
}

export default LandingPage