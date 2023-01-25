import {useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import { useLayoutEffect,useState } from "react";
import unauth_err from "../images/unauthorized_error_page.png";
import lock_img from "../images/lock_img.svg";

export function ResetPass(){
    const navigation=useNavigate();
    const {token}=useParams();
    const [showResetPForm,setShowResultPForm]=useState(false);
    const [resetPOptions,setResetPOptions]=useState({
        newPassword:"",
        confirmNewPassword:""
    })
    const [showError,setShowError]=useState(false);
    //console.log(token);
    const checkToken=()=>{
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/checkResetToken`,{
            passwordResetToken:token
        },{withCredentials:true}).then(res=>setShowResultPForm(true)).catch(err=>setShowResultPForm(false));
        console.log(showError);
    }
    useLayoutEffect(()=>{
        checkToken();
    },[showResetPForm,showError])
    return(
        <div className="w-full h-auto">
            {
            showResetPForm?
            <div className="flex flex-col justify-center items-center p-5 gap-4">
                <img className="w-1/12 h-[8.33%]" src={lock_img}/>
                <h1>Password Reset</h1>
                <div>
                    <p>New Password</p>
                    <input placeholder="Type your new password" type="password" className="w-[25vmax] h-[10vmin] border border-gray-300 pl-2.5" onChange={e=>setResetPOptions({...resetPOptions,newPassword:e.target.value})}/>
                </div>
                <div>
                    <p>Confirm New Password</p>
                    <input placeholder="Re-type your new password to confirm" type="password" className="w-[25vmax] h-[10vmin] border border-gray-300 pl-2.5" onChange={e=>setResetPOptions({...resetPOptions,confirmNewPassword:e.target.value})}/>
                </div>
                {showError && <p className="text-red-600">Password change not successful. Make sure you are entering the same passwords in both fields.</p>}
                <div onClick={async e=>{
                    if(resetPOptions.newPassword===resetPOptions.confirmNewPassword){
                        setShowError(false);
                        const user=await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/resetPassword/${token}`,{
                            password:resetPOptions.newPassword,
                            confirmPassword:resetPOptions.confirmNewPassword
                        },{withCredentials:true});
                        navigation("/login");
                        window.location.reload(true);
                    }
                    else{
                        setShowError(true);
                    }
                    
                }} className="w-[25vmax] h-[7vmin] bg-blue-600 flex items-center justify-center text-white font-bold cursor-pointer">
                    CHANGE PASSWORD
                </div>
                

            </div>:
            <div className="flex flex-col justify-center items-center p-5">
                <img className="w-1/2" src={unauth_err}/>
                <div onClick={e=>navigation("/login")} className="text-blue-600 cursor-pointer">Please try to login again</div>
            </div>
            }
        </div>
    )
}