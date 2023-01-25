import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SaveSpinner from "../loading-spinners/SaveSpinner";


export function ChangePassModal(props){
    const [passwordFields,setPasswordFields]=useState({
        currPassword:"",
        newPassword:"",
        confirmNewPassword:""
    })
    const [failure,setFailure]=useState(false);
    const [isLoading,setIsLoading]=useState(false);
    useEffect(()=>{
        //do something
    },[failure,isLoading]);
    return(
        <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-sm z-10 flex justify-center items-center">
            <div className="w-1/2 h-[80vh] bg-white border border-gray-700 rounded-md flex justify-around pt-14 p-4 relative">
                <div onClick={e=>props.closeModal(false)} className="absolute top-3 right-3 text-xl cursor-pointer">X</div>
                <div className="w-1/3 break-words">
                    <p><b>Your new password must:</b></p>
                    <br/>
                    <div>
                        <ul className="text-sm">
                            <li>Be at least 4 characters in length</li>
                            <br/>
                            <li>Not be same as your current password</li>
                            <br/>
                            <li>Not contain common passwords.</li>
                        </ul>
                    </div>
                </div>
                <div className="w-3/5">
                    <h3>Change Password</h3>
                    <div className="flex flex-col justify-evenly gap-6">
                        <div>
                            <input onFocus={e=>{
                                if(failure)
                                {
                                     return setFailure(false)
                                }
                                else
                                    setFailure(false);
                            }} className="w-[25vmax] h-[10vmin] border border-gray-300 pl-2.5" type="password" placeholder="Type current password" onChange={e=>{
                                setPasswordFields({
                                    ...passwordFields,
                                    currPassword:e.target.value
                                })
                            }}/>
                        </div>
                        <div>
                            <input onFocus={e=>{
                                if(failure)
                                {
                                     return setFailure(false)
                                }
                                else
                                    setFailure(false);
                            }} className="w-[25vmax] h-[10vmin] border border-gray-300 pl-2.5" type="password" placeholder="Type new password" onChange={e=>{
                                setPasswordFields({
                                    ...passwordFields,
                                    newPassword:e.target.value
                                })
                            }}/>
                        </div>
                        <div>
                            <input onFocus={e=>{
                                if(failure)
                                {
                                     return setFailure(false)
                                }
                                else
                                    setFailure(false);
                            }} className="w-[25vmax] h-[10vmin] border border-gray-300 pl-2.5" type="password" placeholder="Retype new password" onChange={e=>{
                                setPasswordFields({
                                    ...passwordFields,
                                    confirmNewPassword:e.target.value
                                })
                            }}/>
                        </div>
                        {failure?<p className="text-red text-center">Password changed failed, make sure you are entering correct password and following password guidelines</p>:""}
                        <div onClick={async e=>{
                            try{
                            setIsLoading(true);
                            await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/updatePassword`,{
                                currentPassword:passwordFields.currPassword,
                                password:passwordFields.newPassword,
                                confirmPassword:passwordFields.confirmNewPassword
                            },{withCredentials:true});
                            props.closeModal(false);
                            setIsLoading(false);
                            window.location.reload(true);
                            }catch(err){
                                setIsLoading(false);
                                setFailure(true);
                            }

                        }} className="w-[25vmax] h-[7vmin] bg-blue-600 flex items-center justify-center text-white font-bold cursor-pointer">{!isLoading?"CHANGE PASSWORD":
                        <div className="flex gap-4 justify-center items-center">
                            <p>Changing PASSWORD...</p>
                            <SaveSpinner/>
                        </div>
                        }</div>
                    </div>
                </div>
            </div>
        </div>
    )
}