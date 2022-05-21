import { GlobalContext } from "./GlobalContext";
import { useContext } from "react";
import delete_icon from "../images/delete_icon.png";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Wishlist(props){
    const {state,dispatch}=useContext(GlobalContext);
    const {item}=props;
    const navigation=useNavigate();
    return(
        <div style={{display:'flex',borderStyle:"solid",borderColor:"#D1D1D1",borderWidth:"2px",minHeight:"6vmax",padding:"3%",gap:"2%",justifyContent:"space-between"}}>
            <div style={{display:"flex",gap:"2%"}}>
                <img className="wishlist-img" src={item.image}/>
                <div style={{display:"flex",flexDirection:"column",gap:"5px"}}>
                    <div>{item.title}</div>
                    <div style={{width:"15vmax", color:"white",backgroundColor:"green",borderRadius:"5px",display:"flex",justifyContent:"space-evenly",alignItems:"center"}}>
                        <div>{item.rating.rate}</div>
                        <div>
                            <Rating defaultValue={item.rating.rate} precision={0.5} readOnly/>
                        </div>
                    </div>
                    <div style={{fontWeight:"bold",fontSize:"1.4rem"}}>₹ {(item.price).toFixed(2)}</div>

                </div>
            </div>
            <img onClick={async e=>{
                await dispatch({type:"remove-from-wishlist",payload:item});
                await dispatch({type:"add-wishlist-to-DB"});
            }} className="delete-icon" src={delete_icon}/>
            {
            state.cartProducts.find(el=>el.title===item.title)?
            <div onClick={()=>navigation("/cart")} style={{width:"30%",height:"20%",display:"flex",justifyContent:"center", backgroundColor:"#357C3C", marginTop:"30px", cursor:"pointer", color:"white", borderRadius:"5px", boxShadow:"3px 3px 6px grey"}}>
                <div style={{alignSelf:"center"}}>GO TO CART</div>
            </div>:
            <div onClick={(e)=>{
                    dispatch({type:"add-to-cart",payload:item});
                    dispatch({type:"add-to-cart-DB"});
                    navigation("/cart");
                }} style={{width:"30%",height:"20%",display:"flex",justifyContent:"center", backgroundColor:"#F6830F", marginTop:"30px", cursor:"pointer", color:"white", borderRadius:"5px", boxShadow:"3px 3px 6px grey"}}>
                
                <div style={{alignSelf:"center"}}>ADD TO CART</div>
            </div>
            }
        </div>
    )
}
export default Wishlist;