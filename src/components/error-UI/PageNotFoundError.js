import page_not_found from "../../images/page_not_found.png";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export function PageNotFoundError(){
    return(
        <>
            <div style={{width:"100%", height:"2vh",backgroundColor:"#CDE8F6"}}/>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <img src={page_not_found}/>
            </div>
        </>
    )
}