import fb_footer from "../images/fb_footer.png";
import github_footer from "../images/github_footer.png";
import linkedin_footer from "../images/linkedin_footer.png";
import google_footer from "../images/google_footer.png";
import { useNavigate } from "react-router-dom";

function Footer(){
    const navigation=useNavigate();
    
    return(
        
        <div className="w-full h-auto p-[23vmin] bg-blue-800 text-white flex justify-center items-center text-extraSmall xlsm:text-base">
            <footer className="flex flex-col justify-center items-center gap-7">
                <div className="flex gap-[3vw] xxxxsm:gap-7" >
                    <div>What we do</div>
                    <div>About</div>
                    <div>Help Center</div>
                    <div>Contact</div>
                </div>
                <div className="flex gap-[3vw] xxxxsm:gap-10">
                    <img className="w-[6vw] xlsm:w-7 cursor-pointer rounded-full shadow-lg shadow-blue-900" src={fb_footer}/>
                    <img className="w-[6vw] xlsm:w-7 cursor-pointer rounded-full shadow-lg shadow-blue-900" src={github_footer}/>
                    <img className="w-[6vw] xlsm:w-7 cursor-pointer rounded-full shadow-lg shadow-blue-900" src={linkedin_footer}/>
                    <img className="w-[6vw] xlsm:w-7 cursor-pointer rounded-full shadow-lg shadow-blue-900" src={google_footer}/>
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