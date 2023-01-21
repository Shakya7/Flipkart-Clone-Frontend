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
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",height:"auto",backgroundColor:"#EEEEEE",padding:"50px"}}>
                <div style={{display:"flex",boxShadow:"4px 4px 6px grey",width:"53vmax",height:"auto"}}>
                    <div style={{width:"23vmax",height:"auto",backgroundColor:"#2874f0",padding:"20px",paddingTop:"30px",paddingLeft:"15px",display:"flex",flexDirection:"column"}}>
                        <div style={{fontSize:"1.8rem",color:"white"}}>Looks like you are new here!</div>
                        <br/>
                        <br/>
                        <div style={{fontSize:"1rem",color:"white"}}>Sign up with your mobile number to get started</div>
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
                            }} placeholder="Enter your email address" value={inputState.email} onChange={(e)=>{
                                setInputState({...inputState,email:e.target.value});
                            }} className="login-input" style={{borderTop:"none",borderLeft:"none",borderRight:"none",padding:"20px"}} type="text"/>

                            <input onFocus={e=>{
                                if(failure)
                                {
                                     return setFailure(false)
                                }
                                else
                                    setFailure(false);
                            }} placeholder="Enter your name" value={inputState.name} onChange={(e)=>{
                                setInputState({...inputState,name:e.target.value})
                            }} className="login-input" style={{borderTop:"none",borderLeft:"none",borderRight:"none",padding:"20px"}} type="text"/>

                            <input onFocus={e=>{
                                if(failure)
                                {
                                     return setFailure(false)
                                }
                                else
                                    setFailure(false);
                            }} placeholder="Enter your password" value={inputState.password} onChange={(e)=>{
                                setInputState({...inputState,password:e.target.value})
                            }} className="login-input" style={{borderTop:"none",borderLeft:"none",borderRight:"none",padding:"20px"}} type="password"/>

                            <input onFocus={e=>{
                                if(failure)
                                {
                                     return setFailure(false)
                                }
                                else
                                    setFailure(false);
                            }} placeholder="Enter your password again" value={inputState.confirmPassword} onChange={(e)=>{
                                setInputState({...inputState,confirmPassword:e.target.value})
                            }} className="login-input" style={{borderTop:"none",borderLeft:"none",borderRight:"none",padding:"20px"}} type="password"/>

                            <div style={{display:"flex",flexDirection:"column",marginTop:"5%"}}>
                                {failure?<p style={{color:"red",textAlign:"center"}}>Signup failed. Make sure you are entering all fields correctly</p>:<p style={{textAlign:"center"}}>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</p>}
                                <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"10%"}}>
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
                                    }} style={{width:"60%",backgroundColor:"#fb641b",padding:"20px",textAlign:"center",color:"white",cursor:"pointer",border:"none"}}>{!isLoading?"Sign Up":
                                    <div style={{display:"flex",gap:"20px",justifyContent:"center",alignItems:"center"}}>
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
                            } style={{display:"flex",justifyContent:"center",alignItems:"center", color:"#2874f0",marginTop:"10px", cursor:"pointer",textAlign:"center"}}>
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