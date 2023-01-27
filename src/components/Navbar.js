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
        <div className="w-screen h-screen overflow-x-hidden">
            <div className="bg-blue-500 w-full min-h-[3.5rem] flex justify-around sticky top-0 z-10">
                <img onClick={(e)=>{
                    dispatch({type:"show-cart-enable"});
                    dispatch({type:"no-cat"});
                    dispatch({type:"initial"});
                    dispatch({type:"no-star"});
                    navigation("/");
                }} className="self-center relative left-10 cursor-pointer" src={logo}/>
                <div className="flex items-center w-[60vmax] my-1 h-[6vh] self-center relative left-[50px]">
                    <input className="srch w-[75%] h-full self-center pl-5 outline-none" onChange={e=>setSearchTerm(e.target.value)} type="text" placeholder="Search for products..."/>
                    <div onClick={
                        async e=>{
                            dispatch({type:"search"});
                            dispatch({type:"no-star"});
                            dispatch({type:"search-term",payload:searchTerm});
                            document.querySelector(".srch").value="";
                            navigation("/");
                        }
                    } className="w-[5%] h-full flex justify-center items-center bg-white cursor-pointer">
                        <img className="w-5" src={search_icon}/>
                    </div>
                </div>
                <div className="flex items-center">
                    {
                        !state.userProfile?
                        <div onMouseOverCapture={()=>setHover("flex")} className="flex flex-col justify-center items-center font-bold cursor-pointer w-[70px] bg-white text-blue-500 relative left-[10px] px-1.5 py-1 rounded-sm text-center">
                            <p onClick={
                                e=>navigation("/login")
                            } className="cursor-pointer">LOGIN</p>

                            <div onMouseOutCapture={()=>setHover("none")} style={{display:hoverLogin,position:"absolute", width:"40vmin",backgroundColor:"grey",top:"7vh",alignItems:"center",flexDirection:"column",boxShadow:"5px 0 5px -5px grey,0 5px 5px -5px grey, -5px 0 5px -5px grey"}}>
                                <div className="log-dropdown">
                                    <p className="text-sm font-bold">New Customer?</p>
                                    <p onClick={
                                        e=>navigation("/signup")
                                    } className="text-blue-500">Sign Up</p>
                                </div>
                                <hr/>
                                <div className="login-dropdown" onClick={e=>navigation("/login")}>
                                    <div className="flex justify-start ml-2.5 items-center text-center relative top-[30%]">
                                        <img className="w-5" src={profile_logo}/>
                                        <p className="ml-5">My Profile</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className="login-dropdown" onClick={e=>navigation("/login")}>
                                    <div className="flex ml-2.5 relative top-[30%]">
                                        <img className="w-5" src={orders_logo}/>
                                        <p className="ml-5">Orders</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className="login-dropdown" onClick={e=>navigation("/login")}>
                                    <div className="flex ml-2.5 relative top-[30%]">
                                        <img className="w-5" src={wishlist_logo}/>
                                        <p className="ml-5">Wishlist</p>
                                    </div>    
                                </div>
                            </div>
                        </div>:
                        <div onMouseOverCapture={()=>setHover("flex")} className="flex flex-col justify-center items-center font-bold cursor-pointer w-[70px] bg-white text-blue-500 relative left-[10px] px-1.5 py-1 rounded-sm text-center">
                            <p className="w-auto h-auto p-0.5 font-bold">
                                {state.userProfile?
                                state.userProfile.name.split(" ")[0].toUpperCase():
                                "LOGIN"}
                            </p>
                            <div onMouseOutCapture={()=>setHover("none")} style={{display:hoverLogin,position:"absolute", width:"40vmin",backgroundColor:"grey",top:"7vh",alignItems:"center",flexDirection:"column",boxShadow:"5px 0 5px -5px grey,0 5px 5px -5px grey, -5px 0 5px -5px grey",borderRadius:"4px 4px 4px 4px"}}>
                                <div className="login-dropdown" onClick={(e)=>{
                                    setAccountPage("profile-info");
                                    navigation("/profile");
                                }}>
                                    <div className="flex justify-start ml-2.5 items-center text-center relative top-[30%]">
                                        <img className="w-5" src={profile_logo}/>
                                        <p className="ml-5">My Profile</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className="login-dropdown" onClick={e=>{
                                    navigation("/orders")
                                }}>
                                    <div className="flex ml-2.5 relative top-[30%]">
                                        <img className="w-5" src={orders_logo}/>
                                        <p className="ml-5">Orders</p>
                                    </div>
                                </div>
                                <hr/>
                                <div className="login-dropdown" onClick={e=>{
                                    setAccountPage("wishlist-info");
                                    navigation("/profile/wishlist")
                                }}>
                                    <div className="flex ml-2.5 relative top-[30%]">
                                        <img className="w-5" src={wishlist_logo}/>
                                        <p className="ml-5">Wishlist {state.wishlist.length?`(${state.wishlist.length})`:""}</p>
                                    </div>    
                                </div>
                                <hr/>
                                <div className="login-dropdown" onClick={async e=>{
                                    dispatch({type:"logout"});
                                    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/logout`,{
                                        withCredentials:true
                                    });
                                    navigation("/");
                                }}>
                                    <div className="flex ml-2.5 relative top-[30%]">
                                        <img className="w-5" src={logout_logo}/>
                                        <p className="ml-5">Logout</p>
                                    </div>    
                                </div>

                            </div>
                        </div>
                    }
                    {state.showCart?<div onClick={(e)=>{
                        navigation("/cart");
                        if(accountPage==="addresses-info")
                            window.location.reload(true); 
                    }} className="text-white font-bold flex relative cursor-pointer ml-[10vw]" >
                        {state.cart===0?"":<div className="bg-red-500 absolute top-[-5px] w-5 h-5 rounded-full flex justify-center items-center">{state.cart}</div>}
                        <img src={cart_logo} className="w-[30px]"/>
                        <div className="self-center">Cart</div>
                    </div>:
                    <div className="w-[15vmax] invisible"/>
                    }
                </div>
                
            </div>
            <Outlet/>
        </div>

    )
}