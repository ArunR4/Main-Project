import './Footer.css';

const Footer = () => {
    return(
        <div className='footer'>
            <div className='footer-link'>
            <a href="#home">Home</a>
                <a href="#algo">About</a>
                <a href="#team">Team</a>
            </div>
            <hr/>
            <p className='footer-copy'>Copyright © 2024 Bennett, Coleman & Co. Ltd. All rights reserved.</p>
        </div>
    );
}
export default Footer;