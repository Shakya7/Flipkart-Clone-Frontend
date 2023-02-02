import { GlobalContext } from "./GlobalContext";
import { useContext } from "react";
import delete_icon from "../images/delete_icon.png";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function Wishlist(props){
    const {state,dispatch}=useContext(GlobalContext);
    const {item}=props;
    const navigation=useNavigate();
    return(
        <div className="flex flex-col xxxsm:flex-row justify-between gap-3 w-full p-[3%] border border-gray-500">
            <div className="flex gap-3 w-4/5">
                <img className="w-1/5" src={item.image}/>
                <div className="flex flex-col gap-3">
                    <div>{item.title}</div>
                    <div className="w-fit text-white bg-green-600 rounded-md flex justify-center px-2 gap-1.5 items-center">
                        <div>{item.rating.rate}</div>
                        <div className="hidden xxxsm:block self-center">
                            <Rating size="small" defaultValue={item.rating.rate} precision={0.5} readOnly/>
                        </div>
                        <FontAwesomeIcon className="block xxxsm:hidden" color="#F4BE2C" icon={faStar} />
                    </div>
                    <div className="font-bold text-z xxsm:text-2xl">₹ {(item.price).toFixed(2)}</div>

                </div>
            </div>
            <div className="flex flex-row xxxsm:flex-col justify-center items-center gap-10">
                <img onClick={async e=>{
                    await dispatch({type:"remove-from-wishlist",payload:item});
                    await dispatch({type:"add-wishlist-to-DB"});
                }} className="w-[4vw] h-[4vw] xxsm:w-5 xxsm:h-5 cursor-pointer" src={delete_icon}/>
                {
                state.cartProducts.find(el=>el.title===item.title)?
                <div onClick={()=>navigation("/cart")} className="flex px-2 text-extraSmall xxsm:text-sm justify-center bg-green-600 cursor-pointer rounded-md text-white">
                    <div className="self-center">GO TO CART</div>
                </div>:
                <div onClick={(e)=>{
                        dispatch({type:"add-to-cart",payload:item});
                        dispatch({type:"add-to-cart-DB"});
                        navigation("/cart");
                    }} className="flex justify-center text-extraSmall xxsm:text-sm px-2 bg-orange-500 cursor-pointer rounded-md text-white">
                    
                    <div className="self-center">ADD TO CART</div>
                </div>
                }
            </div>
        </div>
    )
}
export default Wishlist;