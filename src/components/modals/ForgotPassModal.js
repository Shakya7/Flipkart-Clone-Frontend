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
        <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-sm z-10 flex justify-center items-center">
            {sendEmail?
            <div className="w-1/2 h-[80vh] bg-white border border-gray-700 rounded-md flex justify-around p-4 relative flex-col items-center">
                <div onClick={e=>props.closeModal(false)} className="absolute top-3 right-3 text-xl cursor-pointer">X</div>
                <img className="w-3/5 h-3/5" src={email_sent}/>
                <p className="text-center">Email has been sent successfully to your email! Do check the link for changing the password.</p>
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
                        }} className="text-red-500 cursor-pointer">{!isLoading?"Resend":"Sending..."}</span></p>
            </div>:
            <div className="w-1/2 h-[80vh] bg-white border border-gray-700 rounded-md flex flex-col justify-between items-center p-4 relative">
                <div onClick={e=>props.closeModal(false)} className="absolute top-3 right-3 text-xl cursor-pointer">X</div>
                <h2>Forgot your password?</h2>
                <p>No worries, we got you covered! Enter your registered email below, we'll send you a link there through which you can change your password easily.</p>
                <p onClick={e=>{
                    props.closeModal(false);
                    navigation("/login");
                    }} className="cursor-pointer text-blue-500">Oh you remember? Great! Lets log in.</p>
                <div className="flex justify-between items-center">
                    <div>
                        <img className="w-[20vmax] h-[40vmin]" src={forgotp_email}/>
                    </div>
                    <div className="flex flex-col justify-center gap-4 items-center">
                        <div>
                            <input onFocus={e=>setErrorShow(false)} className="w-[25vmax] h-[10vmin] border border-gray-300 pl-2.5 focus:bg-yellow-300" type="email" placeholder="Type your email" onChange={e=>{
                                setForgotPOptions({
                                    ...forgotPOptins,
                                    email:e.target.value
                                })
                            }}/>
                            {errorShow?<p className="text-red-500 text-center">Please enter a registered email address</p>:""}
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
                        }} className="bg-sky-300 w-[8vmax] h-[8vmin] flex items-center justify-center rounded-md text-xl font-light cursor-pointer text-center">{!isLoading?"SEND":<SaveSpinner/>}</div>
                    </div> 
                </div>
            </div>
            }
        </div>
    )
}