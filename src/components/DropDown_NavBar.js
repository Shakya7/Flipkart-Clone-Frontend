import { useContext, useEffect } from "react";
import { GlobalContext } from "./GlobalContext";
import { useNavigate } from "react-router-dom";

function DropDown(props){                                       
    const {state,dispatch}=useContext(GlobalContext);
    const navigation=useNavigate();
    useEffect(()=>{
        //DO something
    },[props.show])
    return(
        <div onMouseEnter={(e)=>props.pass("flex")} onMouseLeave={(e)=>props.pass("none")} style={{display:props.show}} className={`flex-col absolute left-0 top-[112%] w-[15vmax] z-2`}>  
        {
            props.items.map((el,i)=>{
                return(
                    <div key={i} className="bg-white p-1.5 hover:bg-sky-400" onClick={e=>{
                        if(el==="Women's clothing")
                        {
                            dispatch({type:"wc"});
                            dispatch({type:"no-star"});
                            dispatch({type:"women's clothing"});
                            navigation("/");
                        }
                        else if(el==="Men's clothing"){
                            dispatch({type:"mc"});
                            dispatch({type:"no-star"});
                            dispatch({type:"men's clothing"});
                            navigation("/");
                        }
                    }}>
                        <p>{el}</p>
                        <br/>
                    </div>
                )
            })
        }    
        </div>
    )
}
export default DropDown;