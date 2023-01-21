import React, {useEffect, useContext, useLayoutEffect,useState} from "react"
import axios from "axios";
import { Outlet } from "react-router-dom";
import logo from "../images/flipkart_logo.png";
import cart_logo from "../images/cart_logo.png";
import search_icon from "../images/search_icon.png";
import profile_logo from "../images/profile_logo.png";
import wishlist_logo from "../images/wishlist_logo.png";
import orders_logo from "../images/orders_logo.png";
import logout_logo from "../images/logout_logo.png";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "./GlobalContext";
import { ProfileContext } from "./GlobalContext";



export const Navbar=()=>{
    const {state, dispatch}=useContext(GlobalContext);
    const [accountPage,setAccountPage]=useContext(ProfileContext)
    const [hoverLogin,setHover]=useState("none");
    const [searchTerm,setSearchTerm]=useState("");
    const navigation=useNavigate();
    useEffect(()=>{

    },[state.cart,hoverLogin,state.userProfile,state.showCart]);
    return(
        <div>
            <div style={{backgroundColor:"#2874f0",width:"100%",height:"9vh", display:"flex",justifyContent:"space-around", position:"sticky",top:0,marginTop:0,zIndex:99}}>
                <img onClick={(e)=>{
                    dispatch({type:"show-cart-enable"});
                    dispatch({type:"no-cat"});
                    dispatch({type:"initial"});
                    dispatch({type:"no-star"});
                    navigation("/");
                }} style={{height:"6vmin",alignSelf:"center",position:"relative",left:"7%",cursor:"pointer"}} src={logo}/>
                <div style={{display:"flex",alignItems:"center",width:"60vmax",height:"6vh",alignSelf:"center",position:"relative",left:"50px"}}>
                    <input className="srch" onChange={e=>setSearchTerm(e.target.value)} style={{width:"75%",height:"6vh", alignSelf:"center", borderColor:"white", paddingLeft:"20px"}} type="text" placeholder="Search for products..."/>
                    <div onClick={
                        async e=>{
                            dispatch({type:"search"});
                            dispatch({type:"no-star"});
                            dispatch({type:"search-term",payload:searchTerm});
                            document.querySelector(".srch").value="";
                            navigation("/");
                        }
                    } style={{width:"5%",height:"6vh",display:"flex",justifyContent:"center",alignItems:"center", backgroundColor:"white",borderColor:"white",cursor:"pointer"}}>
                        <img style={{width:"25px"}} src={search_icon}/>
                    </div>
                </div>
                <div style={{display:"flex",alignItems:"center"}}>
                    {
                        !state.userProfile?
                        <div onMouseOverCapture={()=>setHover("flex")} className="loggedin" style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",color:"#2874f0", fontWeight:"bold",cursor:"pointer",width:"70px",backgroundColor:"white",padding:"5px",textAlign:"center",position:"relative",left:"10px",fontWeight:"normal"}}>
                            <p onClick={
                                e=>navigation("/login")
                            } style={{cursor:"pointer"}}>LOGIN</p>
                            <div onMouseOutCapture={()=>setHover("none")} className="pointer" style={{width:"20%",height:"50%",backgroundColor:"white",position:"absolute",bottom:"-3.3vh",display:hoverLogin}}/>
                            <div onMouseOutCapture={()=>setHover("none")} style={{display:hoverLogin,position:"absolute", width:"40vmin",backgroundColor:"grey",top:"7vh",alignItems:"center",flexDirection:"column",boxShadow:"5px 0 5px -5px grey,0 5px 5px -5px grey, -5px 0 5px -5px grey"}}>
                                <div className="log-dropdown">
                                    <p style={{fontSize:"0.9rem",fontWeight:"bold"}}>New Customer?</p>
                                    <p onClick={
                                        e=>navigation("/signup")
                                    } style={{color:"#2874f0"}}>Sign Up</p>
                                </div>
                                <hr/>
                                <div className="login-dropdown" onClick={e=>navigation("/login")}>
                                    <div style={{display:"flex", justifyContent:"flex-start",marginLeft:"10px", alignItems:"center", textAlign:"center",position:"relative",top:"30%"}}>
                                        <img style={{width:"20px"}} src={profile_logo}/>
                                        <p style={{marginLeft:"20px"}}>My Profile</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className="login-dropdown" onClick={e=>navigation("/login")}>
                                    <div style={{display:"flex", marginLeft:"10px",position:"relative",top:"30%"}}>
                                        <img style={{width:"20px"}} src={orders_logo}/>
                                        <p style={{marginLeft:"20px"}}>Orders</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className="login-dropdown" onClick={e=>navigation("/login")}>
                                    <div style={{display:"flex", marginLeft:"10px",position:"relative",top:"30%"}}>
                                        <img style={{width:"20px"}} src={wishlist_logo}/>
                                        <p style={{marginLeft:"20px"}}>Wishlist</p>
                                    </div>    
                                </div>
                            </div>
                        </div>:
                        <div onMouseOverCapture={()=>setHover("flex")} className="loggedin" style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",color:"#2874f0", fontWeight:"bold",cursor:"pointer",minwidth:"20vmin",maxWidth:"auto",backgroundColor:"white",padding:"5px",textAlign:"center",position:"relative",left:"10px",fontWeight:"normal",borderRadius:"7px"}}>
                            <p style={{width:"auto", height:"auto",padding:"3px",fontWeight:"bold"}}>{state.userProfile?state.userProfile.name.split(" ")[0].toUpperCase():"LOGIN"}</p>
                            <div onMouseOutCapture={()=>setHover("none")} className="pointer" style={{width:"20%",height:"50%",backgroundColor:"white",position:"absolute",bottom:"-3.3vh",display:hoverLogin}}/>
                            <div onMouseOutCapture={()=>setHover("none")} style={{display:hoverLogin,position:"absolute", width:"40vmin",backgroundColor:"grey",top:"7vh",alignItems:"center",flexDirection:"column",boxShadow:"5px 0 5px -5px grey,0 5px 5px -5px grey, -5px 0 5px -5px grey",borderRadius:"4px 4px 4px 4px"}}>
                                <div className="login-dropdown" onClick={(e)=>{
                                    setAccountPage("profile-info");
                                    navigation("/profile");
                                }}>
                                    <div style={{display:"flex", justifyContent:"flex-start",marginLeft:"10px", alignItems:"center", textAlign:"center",position:"relative",top:"30%"}}>
                                        <img style={{width:"20px"}} src={profile_logo}/>
                                        <p style={{marginLeft:"20px"}}>My Profile</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className="login-dropdown" onClick={e=>{
                                    navigation("/orders")
                                }}>
                                    <div style={{display:"flex", marginLeft:"10px",position:"relative",top:"30%"}}>
                                        <img style={{width:"20px"}} src={orders_logo}/>
                                        <p style={{marginLeft:"20px"}}>Orders</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className="login-dropdown" onClick={e=>{
                                    setAccountPage("wishlist-info");
                                    navigation("/profile/wishlist")
                                }}>
                                    <div style={{display:"flex", marginLeft:"10px",position:"relative",top:"30%"}}>
                                        <img style={{width:"20px"}} src={wishlist_logo}/>
                                        <p style={{marginLeft:"20px"}}>Wishlist {state.wishlist.length?`(${state.wishlist.length})`:""}</p>
                                    </div>    
                                </div>
                                <hr/>
                                <div className="login-dropdown" onClick={async e=>{
                                    dispatch({type:"logout"});
                                    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/logout`,{
                                        withCredentials:true
                                    });
                                    navigation("/");
                                    window.location.reload();
                                }}>
                                    <div style={{display:"flex", marginLeft:"10px",position:"relative",top:"30%"}}>
                                        <img style={{width:"20px"}} src={logout_logo}/>
                                        <p style={{marginLeft:"20px"}}>Logout</p>
                                    </div>    
                                </div>

                            </div>
                        </div>
                    }
                    {state.showCart?<div onClick={(e)=>{
                        navigation("/cart");
                        if(accountPage==="addresses-info")
                            window.location.reload(true); 
                    }} style={{color:"white", fontWeight:"bold", marginLeft:"10vw",display:"flex",position:"relative",cursor:"pointer"}}>
                        {state.cart===0?"":<div style={{backgroundColor:"red",position:"absolute",top:"-5px",width:"20px",height:"20px",borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center"}}>{state.cart}</div>}
                        <img src={cart_logo} style={{width:"30px"}}/>
                        <div style={{alignSelf:"center"}}>Cart</div>
                    </div>:
                    <div style={{width:"15vmax",visibility:"hidden"}}/>
                    }
                </div>
                
            </div>
            <Outlet/>
        </div>

    )
}