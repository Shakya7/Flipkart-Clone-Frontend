import {useLocation, useNavigate,useParams } from "react-router-dom"
import { GlobalContext } from "./GlobalContext";
import { useContext, useEffect, useLayoutEffect,useState } from "react";
import Categories from "./Categories";
import { Rating } from "@mui/material";
import cart_logo from "../images/cart_logo.png";
import love_disabled from "../images/wishlist_icon_disabled.png"
import love_enabled from "../images/wishlist_icon_enabled.png"
import { _500ServerError } from "./error-UI/_500ServerError";


export const SingleItemPage=(props)=>{
    const {id}=useParams();
    const {state,dispatch}=useContext(GlobalContext);
    const navigation=useNavigate();
    const location=useLocation();
    //console.log(location.state);

    useEffect(()=>{
        //console.log("WISHLIST",state.wishlist);
        //console.log("STATE",state);
    },[state.wishlist])

    return(
        <div style={{display:"flex",flexDirection:"column",width:"100%",backgroundColor:`${location.state?"#EEEEEE":"white"}`,height:"auto",justifyContent:"center",alignItems:"center",margin:0}}>
            {location.state?<Categories/>:""}
            <div style={{width:"100%", height:"2vh",backgroundColor:"#CDE8F6"}}/>

            {/* When entering any random value after "/", it'll trigger SingleItemPage.js to render which will accept the item data from Card.js in the form of location.state
                On just by entering 2, 3, 4, etc after "/" will not set the item data(PAYLOAD) which it would have set as navigation(" ", PAYLOAD) in Card.js
                Therefore, location.state._prop_name wont be accessible in this code if done that way, 
                So we are simply rendering error page if location.state is not found
             */}
            {location.state?<div style={{display:"flex",width:"100%",justifyContent:"space-between",alignItems:"center",padding:"20px"}}>
                <div style={{width:"45%",height:"60vmin", borderRadius:"5px", boxShadow:"4px 4px 5px grey",display:"flex",flexDirection:"column", justifyContent:"center",alignItems:"center",backgroundColor:"white", padding:"20px",position:"relative"}}>
                    <div style={{cursor:"pointer",width:"50px",height:"50px",position:"absolute",top:"10px",right:"10px",borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center",boxShadow:"3px 3px 5px grey"}}>
                        {state.userProfile && state.wishlist.find(el=>el.title===location.state.title)?
                        <img width={30} onClick={async e=>{
                            await dispatch({type:"remove-from-wishlist",payload:location.state});
                            await dispatch({type:"add-wishlist-to-DB"});
                        }} src={love_enabled}/>:
                        <img onClick={async e=>{
                            if(state.isLoggedIn){
                                await dispatch({type:"add-to-wishlist",payload:location.state});
                                await dispatch({type:"add-wishlist-to-DB"});
                            }
                            else{
                                navigation("/login");
                            }
                        }} width={30} src={love_disabled}/>}
                    </div>
                    <img style={{width:"80%",height:"80%", borderRadius:"5px"}} src={location.state.image}/>
                    {
                    state.cartProducts.find(el=>el.title===location.state.title)?
                    <div onClick={()=>navigation("/cart")} style={{width:"30%",height:"20%",display:"flex",justifyContent:"center", backgroundColor:"#357C3C", marginTop:"30px", cursor:"pointer", color:"white", borderRadius:"5px", boxShadow:"3px 3px 6px grey"}}>
                        <img src={cart_logo} style={{width:"30px"}}/>
                        <div style={{alignSelf:"center"}}>GO TO CART</div>
                    </div>:
                    <div onClick={(e)=>{
                        if(state.isLoggedIn){
                            dispatch({type:"add-to-cart",payload:location.state});
                            dispatch({type:"add-to-cart-DB"});
                            navigation("/cart");
                        }
                        else{
                            navigation("/login");
                        }
                    }}
                    style={{width:"30%",height:"20%",display:"flex",justifyContent:"center", backgroundColor:"#F6830F", marginTop:"30px", cursor:"pointer", color:"white", borderRadius:"5px", boxShadow:"3px 3px 6px grey"}}>
                        <img src={cart_logo} style={{width:"30px"}}/>
                        <div style={{alignSelf:"center"}}>ADD TO CART</div>
                    </div>
                    }
                </div>
                <div style={{width:"53%",minHeight:"60vmin", borderRadius:"5px", boxShadow:"4px 4px 5px grey",backgroundColor:"white"}}>
                    <div style={{padding:"30px"}}>
                        <p style={{fontWeight:"lighter",fontSize:"1.5em"}}>{location.state.title}</p>
                        <div style={{marginTop:"25px",width:"15vmax", color:"white",backgroundColor:"green",borderRadius:"5px",display:"flex",justifyContent:"space-evenly",alignItems:"center"}}>
                            <div>{location.state.rating.rate}</div>
                            <div>
                                <Rating defaultValue={location.state.rating.rate} precision={0.5} readOnly/>
                            </div>
                        </div>
                        <p style={{marginTop:"25px",fontWeight:"bolder",fontSize:"1.5em"}}>₹{location.state.price}</p>
                        <div>
                            <p style={{marginTop:"25px",fontWeight:"normal",fontSize:"1.5em"}}><span style={{fontWeight:"bolder"}}>Description: </span>{location.state.description}</p>
                        </div>
                    </div>
                </div>
            </div>:
            <_500ServerError/>
            }
        </div>
    )
}