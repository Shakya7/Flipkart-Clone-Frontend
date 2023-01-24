import { Rating } from "@mui/material";
import { useNavigate} from "react-router-dom";



export const Card=(props)=>{
    const navigation=useNavigate();
    
    return(
        <div className="product-scale w-[20vmax] flex flex-col h-auto bg-white p-5 justify-center items-center rounded-md shadow-lg shadow-gray-500" onClick={()=>{
            navigation(`/${props.element.id}`,{state:props.element})    //passing the selected item to be received as useLocation
        }}>
            <div>
                <img className="w-[16vmax] h-[30vh]" src={props.element.image}/>
            </div>
            <div>{props.element.title}</div>
            <div className="w-auto text-white bg-green-700 rounded-sm flex justify-center gap-2 items-center p-3">
                <div>{props.element.rating.rate}</div>
                <div className="self-center">
                    <Rating className="text-xs" defaultValue={props.element.rating.rate} precision={0.5} readOnly/>
                </div>
                
            </div>
            <div>₹{props.element.price}</div>
        </div>
    )
}
export default Card;