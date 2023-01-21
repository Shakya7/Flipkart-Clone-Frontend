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
        <div style={{width:"100%",height:"auto"}}>
            {
            showResetPForm?
            <div style={{display:"flex",flexDirection:"column", justifyContent:"center",alignItems:"center",padding:"20px",gap:"20px"}}>
                <img style={{width:"9%",height:"9%"}} src={lock_img}/>
                <h1>Password Reset</h1>
                <div>
                    <p>New Password</p>
                    <input placeholder="Type your new password" type="password" className="reset-pw-inp" onChange={e=>setResetPOptions({...resetPOptions,newPassword:e.target.value})}/>
                </div>
                <div>
                    <p>Confirm New Password</p>
                    <input placeholder="Re-type your new password to confirm" type="password" className="reset-pw-inp" onChange={e=>setResetPOptions({...resetPOptions,confirmNewPassword:e.target.value})}/>
                </div>
                {showError && <p style={{color:"red"}}>Password change not successful. Make sure you are entering the same passwords in both fields.</p>}
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
                    
                }} style={{width:"25vmax",height:"7vmin", backgroundColor:"#2874f0",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:"bold",cursor:"pointer"}}>
                    CHANGE PASSWORD
                </div>
                

            </div>:
            <div style={{display:"flex",flexDirection:"column", justifyContent:"center",alignItems:"center",padding:"20px"}}>
                <img style={{width:"53%"}} src={unauth_err}/>
                <div onClick={e=>navigation("/login")} style={{color:"#2874f0",cursor:"pointer"}}>Please try to login again</div>
            </div>
            }
        </div>
    )
}