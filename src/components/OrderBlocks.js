import { GlobalContext } from "./GlobalContext";
import { useContext,useEffect } from "react";

function OrderBlocks(props){

    const {state,dispatch}=useContext(GlobalContext);
    return(
        <div className="order-block" style={{width:"100%",height:"auto", backgroundColor:"white",display:"flex",justifyContent:"space-around",alignItems:"center",padding:"2%",boxShadow:"2px 2px 5px grey",borderRadius:"4px"}}>
                <div style={{width:"10vmax",height:"auto"}}>
                {
                    props.item.orders.length?
                    <div style={{height:"auto"}}>
                    {
                        props.item.orders.map((el,i)=>{
                            return(
                            <div style={{display:"flex",alignItems:"center",gap:"10px",margin:"10px"}} key={i}>
                                <img className="orders-img" src={el.image}/>
                                <p>Qty: {el.quantity}</p>
                            </div>)
                        })
                    }    
                    </div>:""
                }
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:"20px"}}>
                    <p><b>Delivered to:</b> {props.item.address}</p>  
                    <div>
                        <p><b>Payment done on:</b></p>
                        <div style={{backgroundColor:"green",padding:"2%",borderRadius:"15px",color:"white",textAlign:"center"}}>{props.item.paymentDate}</div>
                    </div>  
                </div> 
                <div style={{justifySelf:"flex-end"}}>
                    <b>₹{props.item.price}</b>
                </div>
        </div>
    )
}
export default OrderBlocks;