import { useContext, useState,useEffect, useLayoutEffect} from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "./GlobalContext";
import Categories from "./Categories";
import axios from "axios";
import { ForgotPassModal } from "./modals/ForgotPassModal";
import Footer from "./Footer";
import SaveSpinner from "./loading-spinners/SaveSpinner";
import { showAlert } from "./utils/showAlert";


//	https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png
function Login(props){
    const navigation=useNavigate();
    const {state,dispatch}=useContext(GlobalContext);

    const [inputState,setInputState]=useState({
        email:"",
        password:"",
    });

    const [forgotPModal,setForgotPModal]=useState(false);
    const [failure,setFailure]=useState(false);
    const [isLoading,setIsLoading]=useState(false);

    const body=document.querySelector("body");
    
    useLayoutEffect(()=>{

    },[failure,isLoading])
    
    useEffect(()=>{
        if(forgotPModal)
            body.style.overflow="hidden";
        else    
            body.style.overflow="auto";
        dispatch({type:"show-cart-enable"});
    },[inputState,forgotPModal]);

    const loginFunction=async()=>{
        try{
        const user= await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/login`,{
            email:inputState.email,
            password:inputState.password,
        },{withCredentials:true})
        return user.data.data;
        }catch(err){
            console.log(err);
        }
    }
    return(
        <div>
            <Categories/>
            <div className="flex justify-center flex-col xlsm:flex-row items-center text-extraSmall md:text-base w-full h-auto bg-white p-3 xxxxsm:p-12">
                <p className="block xlsm:hidden text-y xlsm:text-xl">Login</p>
                <div className="flex h-auto shadow-lg shadow-gray-500 w-11/12 md:w-[53vmax]">
                    <div className="hidden w-0 xlsm:flex xlsm:w-4/12 md:w-[23vmax] h-auto bg-blue-700 p-5 flex-col">
                        <div className="text-white text-y md:text-3xl">Login</div>
                        <br/>
                        <br/>
                        <div className="text-extraSmall md:text-base text-white">Get access to your Orders, Wishlist and Recommendations</div>
                        <div className="flex justify-center mt-[50%]">
                            <img className="w-auto" src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png"/>
                        </div>
                    </div>
                    <div className="w-full xlsm:w-3/5 md:w-[30vmax] h-auto bg-white flex flex-col p-6">
                        <form className="flex flex-col w-full">
                            <input onFocus={e=>{
                                if(failure)
                                {
                                     return setFailure(false)
                                }
                                else
                                    setFailure(false);
                            }} value={inputState.email} onChange={e=>setInputState({
                                ...inputState,
                                email:e.target.value
                            })} placeholder="Enter email/ phone number" className="text-extraSmall w-full md:w-auto md:text-base px-3 py-2 xlsm:p-5 outline-none border border-gray-500 focus:border-blue-500" type="text"/>
                            <br/>
                            <input onFocus={e=>{
                                if(failure)
                                {
                                     return setFailure(false)
                                }
                                else
                                    setFailure(false);
                            }} value={inputState.password} onChange={e=>setInputState({
                                ...inputState,
                                password:e.target.value
                            })} placeholder="Enter password" className="text-extraSmall md:text-base px-3 py-2 xlsm:p-5 outline-none border border-gray-500 focus:border-blue-500" type="password"/>
                            <br/>
                            {failure?<p className="text-red-600 text-center">Login failed. Make sure you are entering correct email address and password</p>:""}
                            
                            <div className="flex flex-col mt-[5%]">
                                <p className="text-center">By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</p>
                                <div className="flex justify-center items-center mt-[10%]" onClick={
                                    async e=>{
                                        try{
                                        setIsLoading(true);
                                        const user=await loginFunction();
                                        dispatch({type:"connect-to-db"});
                                        dispatch({type:"login",payload:user.user});
                                        showAlert("success","Logged in successfully");
                                        setIsLoading(false);
                                        navigation("/");
                                        //window.location.reload(true);
                                        }catch(err){
                                            showAlert("failure","Login failed")
                                            setIsLoading(false);
                                            setFailure(true)
                                            console.log(err.message);
                                        }
                                    }
                                }>
                                    <div className="w-auto xlsm:w-3/5 bg-orange-500 px-5 py-2 xlsm:p-5 text-center text-white cursor-pointer">
                                        {!isLoading?"Login":
                                        <div className="flex gap-1 xxxxsm:gap-5 justify-center items-center">
                                            <p>Logging in...</p>
                                            <SaveSpinner/>
                                         </div>
                                        }
                                    </div>
                                </div>
                                <p onClick={e=>setForgotPModal(true)} className="text-center cursor-pointer text-blue-600">Forgot your password?</p>
                            </div>
                            <div onClick={
                                e=>navigation("/signup")
                            } className="flex justify-center items-center text-blue-600 mt-12 text-center cursor-pointer">
                                New to Flipkart? Create an account
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
            {forgotPModal && <ForgotPassModal val={forgotPModal} closeModal={setForgotPModal}/>}
        </div>
    )
}
export default Login;