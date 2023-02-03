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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faCartShopping, faHeart, faLayerGroup, faXmark, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";



export const Navbar=()=>{
    const {state, dispatch}=useContext(GlobalContext);
    const [accountPage,setAccountPage]=useContext(ProfileContext)
    const [hoverLogin,setHover]=useState("none");
    const [searchTerm,setSearchTerm]=useState("");

    const [show, setShow]=useState(false);
    const navigation=useNavigate();
    useEffect(()=>{

    },[state.cart,hoverLogin,state.userProfile,state.showCart]);
    return(
        <div className="w-screen bg-blue-800 h-screen overflow-x-hidden">
            <div onClick={(e)=>{
                    dispatch({type:"show-cart-enable"});
                    dispatch({type:"no-cat"});
                    dispatch({type:"initial"});
                    dispatch({type:"no-star"});
                    navigation("/");
                }}  className="pl-3 pt-2 block xxsm:hidden bg-blue-500">
                <img src={logo}/>
            </div>

            
            <div className={`absolute transform-all ease-in-out duration-500 top-0 ${show?"right-0":"right-[100vw]"} border border-l-slate-500 h-full bg-stone-100 w-3/5 xxsm:w-3/6 sm:w-2/5 flex flex-col z-20 smd:hidden`}>
                <FontAwesomeIcon onClick={()=>setShow(false)} className={`text-xl absolute top-4 right-4`} icon={faXmark}/>
                <div onClick={()=>{
                    if(!state.userProfile){
                        setShow(false);
                        navigation("/login");
                    }
                    else{
                        setShow(false);
                        setAccountPage("profile-info");
                        navigation("/profile");
                    }
                }} className="flex w-full gap-[3vw] xxsm:gap-5 mt-14 justify-start items-center py-2 p-4 hover:text-white hover:bg-blue-700 text-z xxsm:text-base">
                    <div className="w-[8vw] xxsm:w-10 h-[8vw] xxsm:h-10 flex justify-center items-center">
                        <FontAwesomeIcon size={15} icon={faUser}/>
                    </div>
                    <p>{state.userProfile?"Profile":"Login"}</p>
                </div>
                <div onClick={()=>{
                    if(!state.userProfile){
                        navigation("/login")
                        setShow(false);
                    }
                    else{
                        setShow(false);
                        navigation("/orders");
                    }
                }} className="flex w-full gap-[3vw] xxsm:gap-5 justify-start items-center py-2 p-4 hover:text-white hover:bg-blue-700 text-z xxsm:text-base">
                    <div className="w-[8vw] xxsm:w-10 h-[8vw] xxsm:h-10 flex justify-center items-center">
                        <FontAwesomeIcon size={15} icon={faLayerGroup}/>
                    </div>
                    <p>Orders</p>
                    
                </div>
                <div onClick={()=>{
                    if(!state.userProfile){
                        navigation("/login")
                        setShow(false);
                    }
                    else{
                        setShow(false);
                        setAccountPage("wishlist-info");
                        navigation("profile/wishlist")
                    }
                }} className="flex w-full gap-[3vw] xxsm:gap-5 justify-start items-center py-2 p-4 hover:text-white hover:bg-blue-700 text-z xxsm:text-base">
                    <div className="w-[8vw] xxsm:w-10 h-[8vw] xxsm:h-10 flex justify-center items-center">
                        <FontAwesomeIcon size={15} icon={faHeart}/>
                    </div>
                    <p>Wishlist {state.wishlist.length?`(${state.wishlist.length})`:""}</p>
                </div>
                <div onClick={()=>{
                    if(!state.userProfile){
                        navigation("/cart")
                        setShow(false);
                    }
                    else{
                        setShow(false);
                        navigation("/cart")
                    }
                }} className="flex w-full gap-[3vw] xxsm:gap-5 justify-start items-center py-2 p-4 hover:text-white hover:bg-blue-700 text-z xxsm:text-base">
                    <div className="w-[8vw] xxsm:w-10 h-[8vw] xxsm:h-10 flex justify-center items-center">
                        <FontAwesomeIcon size={15} icon={faCartShopping}/>
                    </div>
                    <p>Cart</p>
                </div>
                {state.userProfile?<div onClick={async e=>{
                    dispatch({type:"logout"});
                    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/logout`,{
                        withCredentials:true
                    });
                    setShow(false);
                    navigation("/");
                    }} className="flex w-full gap-[3vw] xxsm:gap-5 justify-start items-center py-2 p-4 hover:text-white hover:bg-blue-700 text-z xxsm:text-base">
                    <div className="w-[8vw] xxsm:w-10 h-[8vw] xxsm:h-10 flex justify-center items-center">
                        <FontAwesomeIcon className="text-red-400" size={15} icon={faRightFromBracket}/>
                    </div>
                    <p>Logout</p>
                </div>:""}
            </div>
            <div className="bg-blue-500 w-full min-h-[3.5rem] flex justify-start xxsm:justify-between smd:justify-around sticky top-0 z-10">
                <img onClick={(e)=>{
                    dispatch({type:"show-cart-enable"});
                    dispatch({type:"no-cat"});
                    dispatch({type:"initial"});
                    dispatch({type:"no-star"});
                    navigation("/");
                }} className="hidden xxsm:block self-center relative left-3 smd:left-10 cursor-pointer" src={logo}/>
                <div className="flex items-center justify-start xxsm:justify-center w-full xxsm:w-[60vmax] pl-3 xxsm:pl-0 my-1 h-[6vh] self-center smd:relative smd:left-[50px]">
                    <input className="srch w-[75%] h-full self-start xxsm:self-center pl-5 outline-none rounded-l-sm text-z xxxsm:text-base" onChange={e=>setSearchTerm(e.target.value)} type="text" placeholder="Search for products..."/>
                    <div onClick={
                        async e=>{
                            dispatch({type:"search"});
                            dispatch({type:"no-star"});
                            dispatch({type:"search-term",payload:searchTerm});
                            document.querySelector(".srch").value="";
                            navigation("/");
                        }
                    } className="w-[5%] h-full flex justify-center items-center bg-white rounded-r-sm cursor-pointer">
                        <img className="w-5" src={search_icon}/>
                    </div>
                </div>
                <FontAwesomeIcon onClick={()=>setShow(true)} className="place-self-center pr-1.5 smd:hidden text-xs xxxxsm:text-base" color="white" size={10} icon={faBars}/>
                <div className="hidden smd:flex items-center">
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
                                "PROFILE":
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