import { useContext, useEffect, useLayoutEffect } from "react";
import { GlobalContext} from "./GlobalContext";
import { useNavigate } from "react-router-dom";
import cart_empty from "../images/cart_empty_pic.png";
import { ProfileContext } from "./GlobalContext";
import axios from "axios";

export default function CartProducts(){
    const {state,dispatch}=useContext(GlobalContext);
    const [accountPage,setAccountPage]=useContext(ProfileContext)
    const navigation=useNavigate();

    const getAddress=async ()=>{
        const address=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/getFirstAddress`,{withCredentials:true});
        dispatch({type:"address-selected",payload:address.data.data.addresses});
    }
    useLayoutEffect(()=>{
        if(!state.billingAddress)
            getAddress();
        else
            console.log("Test passed through CartProducts UI render");
    },[])

    useEffect((e)=>{
        if(state.billingAddress==="+ Add Address"){
            setAccountPage("addresses-info");
            navigation("/profile/addresses");
        }
        state.billingProducts=[...state.cartProducts];
    },[state.cartProducts,state.addresses.length,state.billingAddress])
    
    return(
        <div className={`${state.cart!==0?"not-full":"full"} bg-white flex flex-col h-auto shadow-lg shadow-gray-500 border border-gray-500 rounded-md`} >
            <header className="w-full flex bg-white justify-between h-[11vmin] p-2.5 rounded-md">
                <div className="w-6/12 font-bold tracking-wide text-2xl self-center ml-2.5">
                    My Cart {state.isLoggedIn?<span>({state.cart})</span>:""}
                </div>
                {state.cart!==0?
                <div className="w-6/12 flex justify-start items-center">
                    <span className="font-normal text-base text-gray-500">Deliver to:</span>
                    {state.addresses.length!==0?
                    <select className="h-[70%] pl-1.5 w-[70%] relative left-[20px] outline-none" onChange={e=>{
                        dispatch({type:"address-selected",payload:e.target.value});
                    }} value={state.billingAddress}>
                    {
                        [...state.addresses,"+ Add Address"].map((el,i)=><option value={el} key={i}>{el}</option>) 
                    }
                    </select>:
                    <div onClick={e=>{
                        setAccountPage("addresses-info");
                        navigation("/profile/addresses")
                    }} className="cursor-pointer ml-2.5 rounded-sm bg-orange-300 p-2.5">No address added. Please add one first</div>
                    }
                </div>:""}
            </header>
            <hr/>
            <div>
            {
            state.cartProducts && state.cartProducts.map((el,i)=>{
            
                return(
                <div key={i}>
                    <div className="p-5 h-auto">
                        <div className="flex auto">     
                            <img className="w-[10vmax] h-[20vmin]" src={el.image}/>
                            <div className="relative pl-7">
                                <div>{el.title}</div>
                                <div className="font-bold text-2xl">₹ {(el.price*Number(el.quantity)).toFixed(2)}</div>
                                <br/>
                                <div className="flex justify-start gap-10">
                                    <div className="flex justify-start items-center gap-1">
                                        <div className={el.quantity===1?"qnt-bttn abc":"qnt-bttn"} onClick={()=>{
                                            dispatch({type:"subtract-quantity",payload:el.id});
                                            dispatch({type:"add-to-cart-DB"});
                                        }}>-</div>
                                        <input className="input-fields w-12 border border-gray-200 outline-none h-auto text-center" value={el.quantity} onChange={(e)=>{
                                            dispatch({type:"add-quantity-input",qty:e.target.value,payload:el.id});
                                            dispatch({type:"add-to-cart-DB"});
                                        }}/>
                                        <div className="qnt-bttn" onClick={()=>{
                                            dispatch({type:"add-quantity",payload:el.id});
                                            dispatch({type:"add-to-cart-DB"});
                                        }}>+</div>
                                    </div>
                                    <button className="px-2.5 py-1 bg-red-500 text-white rounded-md cursor-pointer shadow-lg shadow-gray-500" onClick={(e)=>{
                                        dispatch({type:"remove-from-cart",payload:el});
                                        dispatch({type:"add-to-cart-DB"});
                                    }}>REMOVE</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr/>
                </div>
                )})
            }
            </div>
            <div>
            {
                !state.cart &&
                <div className="h-auto flex items-center justify-center text-center flex-col p-5">
                    <img src={cart_empty} className="mb-2.5"/>
                    {state.isLoggedIn?<p>Your cart is empty!</p>:<p>Missing Cart items?</p>}
                    <br/>
                    {state.isLoggedIn?<div className="text-sm">Add items to it now</div>:<div style={{fontSize:"0.8rem"}}>Login to see the items you added previously</div>}
                    <br/>
                    {state.isLoggedIn?<div onClick={(e)=>{
                        navigation("/");
                        dispatch({type:"initial"});
                        }} className="cursor-pointer bg-orange-500 text-white w-1/6 flex justify-center items-center rounded-md"
                        >
                            SHOP NOW
                    </div>:
                    <div onClick={(e)=>{
                        navigation("../login");
                        }} className="bg-orange-500 text-white w-1/6 flex justify-center items-center rounded-md cursor-pointer">
                        Login
                    </div>
                    }
                </div>
            }
            </div>
        </div>
    )
}