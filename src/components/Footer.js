import fb_footer from "../images/fb_footer.png";
import github_footer from "../images/github_footer.png";
import linkedin_footer from "../images/linkedin_footer.png";
import google_footer from "../images/google_footer.png";
import { useNavigate } from "react-router-dom";

function Footer(){
    const navigation=useNavigate();
    
    return(
        
        <div className="w-full h-auto p-[23vmin] bg-blue-800 text-white flex justify-center items-center">
            <footer className="flex flex-col justify-center items-center gap-7">
                <div className="flex gap-7" >
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
                <div className="w-[70vmax] h-[1px] bg-gray-400"/>
                <div>
                    <p clasName="text-sm">Copyright © 2022 Shakya Sarkar Inc. All rights reserved.</p>
                </div>
            </footer> 
        </div>
    )
}
export default Footer;