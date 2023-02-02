import { useContext, useState,useEffect, useLayoutEffect} from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "./GlobalContext";
import Categories from "./Categories";
import axios from "axios";
import Footer from "./Footer";
import SaveSpinner from "./loading-spinners/SaveSpinner";


function SignUp(props){
    const {state,dispatch}=useContext(GlobalContext);
    const [inputState,setInputState]=useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""

    });
    const [failure,setFailure]=useState(false);
    const [isLoading,setIsLoading]=useState(false);

    useLayoutEffect(()=>{

    },[failure,isLoading])
    useEffect(()=>{
        //console.log(inputState);
    },[inputState]);

    const navigation=useNavigate();

    const signupFunction=async()=>{
        try{
        const user= await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/signup`,{
            name:inputState.name,
            email:inputState.email,
            password:inputState.password,
            confirmPassword:inputState.confirmPassword
        },{withCredentials:true});
        return user.data.data;
        }catch(err){
            console.log(err);
        }
    }
    return(
        <div>
            <Categories/>
            <div className="flex justify-center flex-col xlsm:flex-row items-center text-extraSmall md:text-base w-full h-auto bg-white p-3 xxxxsm:p-12">
                <p className="block xlsm:hidden text-y xlsm:text-xl">Signup</p>
                <div className="flex h-auto shadow-lg shadow-gray-500 w-11/12 md:w-[53vmax]">
                    <div className="hidden w-0 xlsm:flex xlsm:w-4/12 md:w-[23vmax] h-auto bg-blue-700 p-5 flex-col">
                        <div className="text-white text-y md:text-3xl">Looks like you are new here!</div>
                        <br/>
                        <br/>
                        <div className="text-extraSmall md:text-base text-white">Sign up with your mobile number to get started</div>
                        <div className="flex justify-center mt-[50%]">
                            <img className="w-auto" src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png"/>
                        </div>
                    </div>
                    <div className="w-full xlsm:w-3/5 md:w-[30vmax] h-auto bg-white flex flex-col p-6">
                        <form className="flex flex-col w-full gap-2">
                            <input onFocus={e=>{
                                if(failure)
                                {
                                     return setFailure(false)
                                }
                                else
                                    setFailure(false);
                            }} placeholder="Enter your email address" value={inputState.email} onChange={(e)=>{
                                setInputState({...inputState,email:e.target.value});
                            }} className="text-extraSmall w-full md:w-auto md:text-base px-3 py-2 xlsm:p-5 outline-none border border-gray-500 focus:border-blue-500" type="text"/>

                            <input onFocus={e=>{
                                if(failure)
                                {
                                     return setFailure(false)
                                }
                                else
                                    setFailure(false);
                            }} placeholder="Enter your name" value={inputState.name} onChange={(e)=>{
                                setInputState({...inputState,name:e.target.value})
                            }} className="text-extraSmall w-full md:w-auto md:text-base px-3 py-2 xlsm:p-5 outline-none border border-gray-500 focus:border-blue-500" type="text"/>

                            <input onFocus={e=>{
                                if(failure)
                                {
                                     return setFailure(false)
                                }
                                else
                                    setFailure(false);
                            }} placeholder="Enter your password" value={inputState.password} onChange={(e)=>{
                                setInputState({...inputState,password:e.target.value})
                            }} className="text-extraSmall w-full md:w-auto md:text-base px-3 py-2 xlsm:p-5 outline-none border border-gray-500 focus:border-blue-500" type="password"/>

                            <input onFocus={e=>{
                                if(failure)
                                {
                                     return setFailure(false)
                                }
                                else
                                    setFailure(false);
                            }} placeholder="Enter your password again" value={inputState.confirmPassword} onChange={(e)=>{
                                setInputState({...inputState,confirmPassword:e.target.value})
                            }} className="text-extraSmall w-full md:w-auto md:text-base px-3 py-2 xlsm:p-5 outline-none border border-gray-500 focus:border-blue-500" type="password"/>

                            <div className="flex flex-col mt-[5%]">
                                {failure?<p className="text-red-600 text-center">Signup failed. Make sure you are entering all fields correctly</p>:<p className="text-center">By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</p>}
                                <div className="flex justify-center items-center mt-[10%]">
                                    <button onClick={async (e)=>{
                                        try{
                                        e.preventDefault();
                                        setIsLoading(true);
                                        const user=await signupFunction();
                                        await dispatch({type:"signup",payload:user.user});
                                        await dispatch({type:"connect-to-db"});
                                        setIsLoading(false);
                                        navigation("/");
                                        //window.location.reload(true);
                                        }catch(err){
                                            setIsLoading(false);
                                            setFailure(true)
                                        }
                                    }} className="w-auto xlsm:w-3/5 bg-orange-500 px-5 py-2 xlsm:p-5 text-center text-white cursor-pointer">{!isLoading?"Sign Up":
                                        <div className="flex gap-1 xxxxsm:gap-5 justify-center items-center">
                                            <p>Signing up...</p>
                                            <SaveSpinner/>
                                        </div>
                                    }</button>
                                </div>
                            </div>
                            <div onClick={
                                e=>{
                                    navigation("/login");
                                }    
                            } className="flex justify-center items-center text-blue-600 mt-12 text-center cursor-pointer">
                                <div>Already have an account? Login here</div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
export default SignUp;