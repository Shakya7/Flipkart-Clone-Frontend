import { GlobalContext } from "./GlobalContext";
import { useContext,useEffect } from "react";

function OrderBlocks(props){

    const {state,dispatch}=useContext(GlobalContext);
    return(
        <div className="transition-transform duration-500 ease-in-out cursor-pointer hover:scale-105 w-full h-auto bg-white flex flex-col xlsm:flex-row justify-around items-center p-3 shadow-lg shadow-gray-500 rounded-sm">
                <div className="w-[10vmax] h-auto">
                {
                    props.item.orders.length?
                    <div className="h-auto">
                    {
                        props.item.orders.map((el,i)=>{
                            return(
                            <div className="flex items-center gap-2 mt-2.5 flex-col lg:flex-row text-z xxxxsm:text-base" key={i}>
                                <img className="w-14" src={el.image}/>
                                <p>Qty: <span className="font-bold">{el.quantity}</span></p>
                            </div>)
                        })
                    }    
                    </div>:""
                }
                </div>
                <div className="flex flex-col gap-5 text-z xxxxsm:text-base">
                    <p><b>Delivered to:</b> {props.item.address}</p>  
                    <div>
                        <p><b>Payment done on:</b></p>
                        <div className="bg-green-600 p-2 rounded-full text-white text-center">{props.item.paymentDate}</div>
                    </div>  
                </div> 
                <div className="justify-self-end text-z xxxxsm:text-base">
                    <b>₹{props.item.price}</b>
                </div>
        </div>
    )
}
export default OrderBlocks;