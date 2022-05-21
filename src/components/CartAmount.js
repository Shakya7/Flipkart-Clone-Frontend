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
        <div style={{backgroundColor:"white",width:"27%", display:"flex",flexDirection:"column", height:"67vh",boxShadow:"5px 5px 5px grey", borderColor:"grey", borderStyle:"solid", borderWidth:"1px",padding:"20px"}}>
            <div>PRICE DETAILS</div>
            <hr/>
            <br/>
            <br/>
            <div style={{display:"flex",justifyContent:"space-between"}}>
                <div>Price ({state.cart}) <span>{state.cart<=1?"item":"items"}</span></div>
                <div>₹{(state.cartProducts.reduce((acc,el)=>Number(el.price)*Number(el.quantity)+acc,0)).toFixed(2)}</div>
            </div> 
            <br/>
            <br/>
            <div style={{display:"flex",justifyContent:"space-between"}}>
                <div>Delivery Charges</div>
                <div>{state.cart<=2?"₹100":state.cart<=5?"₹50":"Free Delivery"}</div>
            </div> 
            <br/>  
            <br/>
            <div style={{display:"flex",justifyContent:"space-between"}}>
                <div style={{fontWeight:"bold",fontSize:"1.5rem"}}>Total Amount</div>
                <div>₹{((state.cartProducts.reduce((acc,el)=>Number(el.price)*Number(el.quantity)+acc,0))+(state.cart<=2?100:state.cart<=5?50:0)).toFixed(2)}</div>
            </div>
            <br/>
            <br/>
            <div onClick={e=>{
                if(state.addresses.length===0)
                    showAlert("failure","ERROR: Please select an address first!");
                else
                    props.handleP(((state.cartProducts.reduce((acc,el)=>Number(el.price)*Number(el.quantity)+acc,0))+(state.cart<=2?100:state.cart<=5?50:0)).toFixed(2));
            }} style={{width:"70%",padding:"20px",backgroundColor:"#FFEEAD",alignSelf:"center",textAlign:"center",borderRadius:"5px",cursor:"pointer"}}>
                PLACE ORDER
            </div>
        </div>
    )
}