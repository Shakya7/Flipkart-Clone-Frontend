import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import forgotp_email from "../../images/forgotpass_email_img.svg";
import email_sent from "../../images/email_sent.svg";
import SaveSpinner from "../loading-spinners/SaveSpinner";

export function ForgotPassModal(props){
    const body=document.querySelector("body");
    const navigation=useNavigate();
    const [forgotPOptins,setForgotPOptions]=useState({
        email:""
    })
    const [sendEmail,setSendEmail]=useState(false);
    const [isLoading,setIsLoading]=useState(false);
    const [errorShow,setErrorShow]=useState(false);
    
    useEffect(()=>{
        if(props.val)
            body.style.overflow="hidden";
        else    
            body.style.overflow="auto";
    },[sendEmail,props.val,isLoading,errorShow]);
    return(
        <div className="modalBackground">
            {sendEmail?
            <div className="modalContainer" style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                <div onClick={e=>props.closeModal(false)} style={{position:"absolute", top:20,right:20, fontSize:"1.5rem",cursor:"pointer"}}>X</div>
                <img style={{width:"60%",height:"50%"}} src={email_sent}/>
                <p style={{textAlign:"center"}}>Email has been sent successfully to your email! Do check the link for changing the password.</p>
                <p>Didn't receive the email? <span onClick={()=>{
                            setIsLoading(true);
                            axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/forgotPassword`,{
                                email:forgotPOptins.email
                            },{withCredentials:true})
                            .then(res=>{
                                setSendEmail(true);
                                setIsLoading(false);
                            })
                            .catch(err=>{
                                setIsLoading(false);
                            });
                        }} style={{color:"red",cursor:"pointer"}}>{!isLoading?"Resend":"Sending..."}</span></p>
            </div>:
            <div className="modalContainer" style={{display:"flex", flexDirection:"column", alignItems:"center",justifyContent:"space-between"}}>
                <div onClick={e=>props.closeModal(false)} style={{position:"absolute", top:20,right:20, fontSize:"1.5rem",cursor:"pointer"}}>X</div>
                <h2>Forgot your password?</h2>
                <p>No worries, we got you covered! Enter your registered email below, we'll send you a link there through which you can change your password easily.</p>
                <p onClick={e=>{
                    props.closeModal(false);
                    navigation("/login");
                    }} style={{color:"#2874f0",cursor:"pointer"}}>Oh you remember? Great! Lets log in.</p>
                <div style={{display:"flex",justifyContent:"space-between", alignItems:"center"}}>
                    <div>
                        <img style={{width:"20vmax",height:"40vmin"}} src={forgotp_email}/>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",gap:"20px",alignItems:"center"}}>
                        <div>
                            <input onFocus={e=>setErrorShow(false)} className="ip-highlight" type="email" placeholder="Type your email" onChange={e=>{
                                setForgotPOptions({
                                    ...forgotPOptins,
                                    email:e.target.value
                                })
                            }}/>
                            {errorShow?<p style={{color:"red",textAlign:"center"}}>Please enter a registered email address</p>:""}
                        </div>
                        <div onClick={()=>{
                            setIsLoading(true);
                            axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/forgotPassword`,{
                                email:forgotPOptins.email
                            },{withCredentials:true})
                            .then(res=>{
                                setSendEmail(true)
                                setIsLoading(false);
                            })
                            .catch(err=>{
                                setErrorShow(true);
                                setIsLoading(false);
                            });
                        }} style={{backgroundColor:"#42C2FF",width:"8vmax",height:"8vmin",display:"flex",alignItems:"center",justifyContent:"center", borderRadius:"20px",fontSize:"1.3rem",fontWeight:"lighter",cursor:"pointer"}}>{!isLoading?"SEND":<SaveSpinner/>}</div>
                    </div> 
                </div>
            </div>
            }
        </div>
    )
}