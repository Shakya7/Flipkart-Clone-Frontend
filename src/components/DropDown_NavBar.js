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
        <div onMouseEnter={(e)=>props.pass("flex")} onMouseLeave={(e)=>props.pass("none")} style={{display:props.show,flexDirection:"column",position:"absolute",left:0, top:"112%",width:"15vmax",zIndex:2,boxShadow:"5px 0 5px -5px grey,0 5px 5px -5px grey, -5px 0 5px -5px grey"}}>  
        {
            props.items.map((el,i)=>{
                return(
                    <div key={i} className="sub-list" onClick={e=>{
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