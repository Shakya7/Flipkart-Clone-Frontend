import { useEffect } from "react";
import _500_error from "../../images/_500_error.png";
import { useLocation } from "react-router-dom";

export function _500ServerError(){
    return(
        <div style={{heigth:"100%"}}>
            <img style={{height:"100%"}} src={_500_error}/>
        </div>
    )
}