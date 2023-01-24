import { useContext, useEffect} from "react"
import { GlobalContext } from "./GlobalContext";
import { useNavigate } from "react-router-dom";
import { showAlert } from "./utils/showAlert";

export default function CartAmount(props){
    const {state,dispatch}=useContext(GlobalContext);
    const navigation=useNavigate();

    useEffect(()=>{
        dispatch({type:"final-money",payload:((state.cartProducts.reduce((acc,el)=>Number(el.price)*Number(el.quantity)+acc,0))+(state.cart<=2?50:state.cart<=5?100:0)).toFixed(2)})
    },[]);

    return(
        <div className="bg-white w-[27%] flex flex-col h-[67vh] border border-gray-500 p-5 shadow-lg rounded-md shadow-gray-500">
            <div>PRICE DETAILS</div>
            <hr/>
            <br/>
            <br/>
            <div className="flex justify-between">
                <div>Price ({state.cart}) <span>{state.cart<=1?"item":"items"}</span></div>
                <div>₹{(state.cartProducts.reduce((acc,el)=>Number(el.price)*Number(el.quantity)+acc,0)).toFixed(2)}</div>
            </div> 
            <br/>
            <br/>
            <div className="flex justify-between">
                <div>Delivery Charges</div>
                <div>{state.cart<=2?"₹100":state.cart<=5?"₹50":"Free Delivery"}</div>
            </div> 
            <br/>  
            <br/>
            <div className="flex justify-between">
                <div className="font-bold text-2xl">Total Amount</div>
                <div>₹{((state.cartProducts.reduce((acc,el)=>Number(el.price)*Number(el.quantity)+acc,0))+(state.cart<=2?100:state.cart<=5?50:0)).toFixed(2)}</div>
            </div>
            <br/>
            <br/>
            <div onClick={e=>{
                if(state.addresses.length===0)
                    showAlert("failure","ERROR: Please select an address first!");
                else
                    props.handleP(((state.cartProducts.reduce((acc,el)=>Number(el.price)*Number(el.quantity)+acc,0))+(state.cart<=2?100:state.cart<=5?50:0)).toFixed(2));
            }} className="w-9/12 p-5 bg-yellow-200 self-center text-center rounded-md cursor-pointer">
                PLACE ORDER
            </div>
        </div>
    )
}