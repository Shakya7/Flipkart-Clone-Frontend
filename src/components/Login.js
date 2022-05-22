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
    const {state,dispatch}=useContext(GlobalContext);
    const [inputState,setInputState]=useState({
        email:"",
        password:"",
    });
    const [forgotPModal,setForgotPModal]=useState(false);
    const body=document.querySelector("body");
    const [failure,setFailure]=useState(false);
    const [isLoading,setIsLoading]=useState(false);
    useLayoutEffect(()=>{

    },[failure,isLoading])
    
    useEffect(()=>{
        if(forgotPModal)
            body.style.overflow="hidden";
        else    
            body.style.overflow="auto";
        dispatch({type:"show-cart-enable"});
    },[inputState,forgotPModal]);
    const navigation=useNavigate();
    const loginFunction=async()=>{
        try{
        const user= await axios.post("https://flipkart-clone-mernstack.herokuapp.com/api/v1/users/login",{
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
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",height:"auto",backgroundColor:"#EEEEEE",padding:"50px"}}>
                <div style={{display:"flex",boxShadow:"4px 4px 6px grey",width:"53vmax",height:"auto"}}>
                    <div style={{width:"23vmax",height:"auto",backgroundColor:"#2874f0",padding:"20px",paddingTop:"30px",paddingLeft:"15px",display:"flex",flexDirection:"column"}}>
                        <div style={{fontSize:"1.8rem",color:"white"}}>Login</div>
                        <br/>
                        <br/>
                        <div style={{fontSize:"1rem",color:"white"}}>Get access to your Orders, Wishlist and Recommendations</div>
                        <div style={{display:"flex",justifyContent:"center",marginTop:"50%"}}>
                            <img style={{width:"auto"}} src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png"/>
                        </div>
                    </div>
                    <div style={{width:"30vmax",height:"auto",backgroundColor:"white",padding:"25px",paddingTop:"30px",paddingLeft:"15px",display:"flex",flexDirection:"column"}}>
                        <form style={{display:"flex",flexDirection:"column"}}>
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
                            })} placeholder="Enter email/ phone number" className="login-input" style={{borderTop:"none",borderLeft:"none",borderRight:"none",padding:"20px"}} type="text"/>
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
                            })} placeholder="Enter password" className="login-input" style={{borderTop:"none",borderLeft:"none",borderRight:"none",padding:"20px"}} type="password"/>
                            <br/>
                            {failure?<p style={{color:"red",textAlign:"center"}}>Login failed. Make sure you are entering correct email address and password</p>:""}
                            
                            <div style={{display:"flex",flexDirection:"column",marginTop:"5%"}}>
                                <p style={{textAlign:"center"}}>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</p>
                                <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"10%"}} onClick={
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
                                    <div style={{width:"60%",backgroundColor:"#fb641b",padding:"20px",textAlign:"center",color:"white",cursor:"pointer"}}>{!isLoading?"Login":
                                    <div style={{display:"flex",gap:"20px",justifyContent:"center",alignItems:"center"}}>
                            <p>Logging in...</p>
                            <SaveSpinner/>
                        </div>
                        }</div>
                                </div>
                                <p onClick={e=>setForgotPModal(true)} style={{textAlign:"center",cursor:"pointer",color:"#2874f0"}}>Forgot your password?</p>
                            </div>
                            <div onClick={
                                e=>navigation("/signup")
                            } style={{display:"flex",justifyContent:"center",alignItems:"center", color:"#2874f0",marginTop:"50px",cursor:"pointer", textAlign:"center"}}>
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