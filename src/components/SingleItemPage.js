import {useLocation, useNavigate,useParams } from "react-router-dom"
import { GlobalContext } from "./GlobalContext";
import { useContext, useEffect } from "react";
import Categories from "./Categories";
import { Rating } from "@mui/material";
import cart_logo from "../images/cart_logo.png";
import love_disabled from "../images/wishlist_icon_disabled.png"
import love_enabled from "../images/wishlist_icon_enabled.png"
import { _500ServerError } from "./error-UI/_500ServerError";


export const SingleItemPage=(props)=>{
    //const {id}=useParams();
    const {state,dispatch}=useContext(GlobalContext);
    const navigation=useNavigate();
    const location=useLocation();
    //console.log(location.state);

    useEffect(()=>{
        //console.log("WISHLIST",state.wishlist);
        //console.log("STATE",state);
    },[state.wishlist])

    return(
        <div className="flex flex-col w-full h-auto justify-center items-center bg-gray-200">
            {location.state?<Categories/>:""}
            <div className="w-full h-[2vh] bg-sky-200"/>

            {/* When entering any random value after "/", it'll trigger SingleItemPage.js to render which will accept the item data from Card.js in the form of location.state
                On just by entering 2, 3, 4, etc after "/" will not set the item data(PAYLOAD) which it would have set as navigation(" ", PAYLOAD) in Card.js
                Therefore, location.state._prop_name wont be accessible in this code if done that way, 
                So we are simply rendering error page if location.state is not found
             */}
            {location.state?
            <div className="flex w-full justify-between items-start p-5">
                <div className="w-[45%] rounded-md flex flex-col justify-center items-center bg-white p-5 relative shadow-lg shadow-gray-500">
                    <div className="cursor-pointer w-12 h-12 absolute top-2 right-2 rounded-full flex justify-center items-center shadow-lg shadow-gray-500">
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
                    <img className="w-4/5 h-4/5" src={location.state.image}/>
                    {
                    state.cartProducts.find(el=>el.title===location.state.title)?
                    <div onClick={()=>navigation("/cart")} className="w-1/3 h-1/5 flex justify-center bg-green-700 mt-8 cursor-pointer text-white rounded-md shadow-lg shadow-gray-500 gap-3">
                        <img className="w-7" src={cart_logo}/>
                        <div className="self-center">GO TO CART</div>
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
                    className="w-1/3 h-1/5 flex justify-center bg-orange-500 mt-8 cursor-pointer text-white rounded-md shadow-lg shadow-gray-500 gap-3">
                        <img src={cart_logo} className="w-7"/>
                        <div className="self-center">ADD TO CART</div>
                    </div>
                    }
                </div>
                <div className="rounded-md shadow-lg shadow-gray-500 w-[53%] bg-white">
                    <div className="p-8">
                        <p className="font-light text-2xl">{location.state.title}</p>
                        <div className="mt-6 w-[15vmax] text-white bg-green-600 rounded-md flex justify-evenly items-center">
                            <div>{location.state.rating.rate}</div>
                            <div>
                                <Rating defaultValue={location.state.rating.rate} precision={0.5} readOnly/>
                            </div>
                        </div>
                        <p className="mt-6 font-bold text-2xl">₹{location.state.price}</p>
                        <div>
                            <p className="mt-6 font-normal text-xl"><span className="font-bold">Description: </span>{location.state.description}</p>
                        </div>
                    </div>
                </div>
            </div>:
            <_500ServerError/>
            }
        </div>
    )
}