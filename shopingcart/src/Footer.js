import { Link } from "react-router-dom";

function Footer() {
    return ( 
        <>
        <section id="footer">
    <div className="container">
        <div className="row">
            <div className="col-md-3">
            <h3>Navigations</h3>
            <ul> 
                <li><Link to="/products">Home</Link></li>
                <li><Link to="#">Blogs</Link></li>
                <li><Link to="#">About Us</Link></li>
                <li><Link to="#">Contact</Link></li>

            </ul>
            </div>
            <div className="col-md-3">
                <h3>About Us</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, obcaecati culpa temporibus, corrupti doloremque placeat cum, dignissimos at sapiente.</p>
                
                
            </div>
            <div className="col-md-3">
                <h3>Company</h3>
                <ul>
                    <Link to=""><li>Awards</li></Link>
                    <Link to=""><li>News</li></Link>
                    <Link to=""><li>Events</li></Link>
                    <Link to=""><li>Social Responsibility</li></Link>
                    <Link to=""><li>Careers</li></Link>
                    <Link to=""><li>Contact Us</li></Link>
                </ul>
            </div>
            <div className="col-md-3">
                <h3>Follows Us</h3>
                <ul>
                    
                    <li><i className="bi bi-facebook"></i><Link to="">Follows us on facebook</Link></li>
                    
                    <li><i className="bi bi-instagram"></i><Link to="">Follows us on instagram</Link></li>
                    <li><i className="bi bi-twitter-x"></i><Link to="">Follows us on X-twitter</Link></li>
                </ul>    
            </div>

        </div>
        <div className="row">
            <div className="col-md-12">
                <p className="text-center mt-3">Copyright © 2024 Elegant Themes ®</p>
            </div>
        </div>
    </div>
        </section>
        </>
     );
}

export default Footer;