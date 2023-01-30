import { Rating } from "@mui/material";
import { useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";



export const Card=(props)=>{
    const navigation=useNavigate();
    
    return(
        <div className="product-scale grow smd:w-[20vmax] flex flex-col h-auto bg-white p-5 justify-center items-center rounded-md shadow-lg shadow-gray-500" onClick={()=>{
            navigation(`/${props.element.id}`,{state:props.element})    //passing the selected item to be received as useLocation
        }}>
            <div>
                <img className="w-[16vmax] h-[30vh]" src={props.element.image}/>
            </div>
            <div className="text-center text-z xxxsm:text-base mt-2.5 xxxsm:mt-0">{props.element.title}</div>
            <div className="w-auto text-white text-z xxxsm:text-base bg-green-700 rounded-sm flex justify-center gap-2 items-center px-1.5 py-1 xxxsm:p-3">
                <div>{props.element.rating.rate}</div>
                <div className="hidden xxxsm:block self-center">
                    <Rating size="small" defaultValue={props.element.rating.rate} precision={0.5} readOnly/>
                </div>
                <FontAwesomeIcon className="block xxxsm:hidden" color="#F4BE2C" icon={faStar} />
            </div>
            <div className="text-y font-bold xxxsm:text-base">₹{props.element.price}</div>
        </div>
    )
}
export default Card;