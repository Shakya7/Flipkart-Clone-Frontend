import { useState, useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import hamburger_dots from "../images/hamburger_three_dots.png";
import { GlobalContext } from "./GlobalContext";


function Addresses(props){
    const [editBttnShow,setEditBttnShow]=useState(true);
    const [editFieldShow, setEditFieldShow]=useState(false);
    const [updateAddres,setUpdateAddress]=useState(props.element);
    const {element}=props
    const {state,dispatch}=useContext(GlobalContext);
    //const {newAddress, setAddAddressBttn}=useContext(ProfileContext);
    const navigation=useNavigate();

    useEffect(()=>{
    },[updateAddres]);

    return(
        <div style={{width:"100%",minHeight:"6vmax",padding:"2%", borderStyle:"solid",borderColor:"#D1D1D1",borderWidth:"1px"}}>
            <div style={{width:"100%",minHeight:"auto", display:"flex",justifyContent:"space-between"}}>
                {element}
                {editBttnShow
                ?<div className="dots" onMouseOverCapture={()=>setEditBttnShow((prev)=>!prev)} style={{cursor:"pointer"}}><img style={{width:"20px"}} src={hamburger_dots}/></div>
                :<div className="edit" onMouseLeave={()=>setEditBttnShow((prev)=>!prev)}>
                    <div onClick={e=>{
                    
                        setEditFieldShow(true);
                        setEditBttnShow((prev)=>!prev);
                        }}>Edit</div>
                    <div onClick={async e=>{
                        await dispatch({type:"delete-address",payload:element});
                        await dispatch({type:"add-address-to-DB"});
                        navigation("/profile");
                        window.location.reload(true);
                    }}>Delete</div>    
                </div>
                }
            </div>
            {editFieldShow? 
            <div>
                <textarea style={{width:"100%",height:"5vmax", padding:"2%"}} defaultValue={element} onChange={e=>setUpdateAddress(e.target.value)} />
                <div style={{display:"flex", justifyContent:"flex-start",gap:"2%",color:"white"}}>
                    <div onClick={
                        async e=>{
                            //const user=await addAddress();
                            await dispatch({type:"update-address",payload:updateAddres,actualValue:element});
                            await dispatch({type:"add-address-to-DB"});
                            navigation("/profile");
                            window.location.reload(true);
                        }
                    } style={{width:"9vmax", padding:"2%", backgroundColor:"#2874f0",textAlign:"center",cursor:"pointer",borderRadius:"4px"}}>SAVE</div>
                    <div onClick={e=>setEditFieldShow((prev)=>!prev)} style={{width:"9vmax", padding:"2%",backgroundColor:"#fb7a1b",textAlign:"center",cursor:"pointer",borderRadius:"4px"}}>CANCEL</div>
                </div>    
            </div>
            :""}
        </div>
    )
}
export default Addresses;

