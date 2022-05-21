import fb_footer from "../images/fb_footer.png";
import github_footer from "../images/github_footer.png";
import linkedin_footer from "../images/linkedin_footer.png";
import google_footer from "../images/google_footer.png";
import { useNavigate } from "react-router-dom";

function Footer(){
    const navigation=useNavigate();
    return(
        <div className="footer">
            <footer style={{display:'flex',flexDirection:"column",justifyContent:"center",alignItems:"center", gap:"30px"}}>
                <div className="nav-footer" style={{display:"flex",gap:"30px"}}>
                    <div className="nav-ft">What we do</div>
                    <div className="nav-ft">About</div>
                    <div className="nav-ft">Help Center</div>
                    <div className="nav-ft">Contact</div>
                </div>
                <div className="img-footer">
                    <img src={fb_footer}/>
                    <img src={github_footer}/>
                    <img src={linkedin_footer}/>
                    <img src={google_footer}/>
                </div>
                <div>
                    <p>Bansdroni, Kolkata-70</p>
                </div>
                <div style={{width:"70vmax",height:"1px",backgroundColor:"grey"}}/>
                <div>
                    <p style={{fontSize:"0.8rem"}}>Copyright © 2022 Shakya Sarkar Inc. All rights reserved.</p>
                </div>
            </footer> 
        </div>
    )
}
export default Footer;