
import { Rating } from "@mui/material";
import { useNavigate} from "react-router-dom";



export const Card=(props)=>{
    const navigation=useNavigate();
    
    return(
        <div className="product-scale" onClick={()=>{
            
            navigation(`/${props.element.id}`,{state:props.element})    //passing the selected item to be received as useLocation
        }} style={{width:"20vmax", display:"flex",flexDirection:"column",height: "auto",backgroundColor:"white", padding:"20px",justifyContent:"center",alignItems:"center",boxShadow:"3px 3px 5px grey",borderRadius:"8px"}}>
            <div>
                <img style={{width:"16vmax",height:"30vh"}}src={props.element.image}/>
            </div>
            <div>{props.element.title}</div>
            <div style={{width:"auto", color:"white",backgroundColor:"green",borderRadius:"5px",display:"flex",justifyContent:"space-evenly",alignItems:"center",padding:"2%"}}>
                <div>{props.element.rating.rate}</div>
                <div style={{alignSelf:"center"}}>
                    <Rating style={{fontSize:"1em"}} defaultValue={props.element.rating.rate} precision={0.5} readOnly/>
                </div>
                
            </div>
            <div>₹{props.element.price}</div>
        </div>
    )
}
export default Card;