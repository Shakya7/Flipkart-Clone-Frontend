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
        <div className="w-full h-auto p-4 border border-gray-400">
            <div className="w-full flex justify-between h-auto">
                {element}
                {editBttnShow
                ?<div className="dots cursor-pointer" onMouseOverCapture={()=>setEditBttnShow((prev)=>!prev)}>
                    <img className="w-5" src={hamburger_dots}/>
                </div>
                :<div className="edit" onMouseLeave={()=>setEditBttnShow((prev)=>!prev)}>
                    <div onClick={e=>{
                    
                        setEditFieldShow(true);
                        setEditBttnShow((prev)=>!prev);
                        }}>Edit</div>
                    <div onClick={async e=>{
                        await dispatch({type:"delete-address",payload:element});
                        await dispatch({type:"add-address-to-DB"});
                        navigation("/profile/addresses");
                        window.location.reload(true);
                    }}>Delete</div>    
                </div>
                }
            </div>
            {editFieldShow? 
            <div>
                <textarea className="w-full h-auto p-4 border border-gray-400 outline-none" defaultValue={element} onChange={e=>setUpdateAddress(e.target.value)} />
                <div className="flex justify-start gap-2 text-white">
                    <div onClick={
                        async e=>{
                            //const user=await addAddress();
                            await dispatch({type:"update-address",payload:updateAddres,actualValue:element});
                            await dispatch({type:"add-address-to-DB"});
                            navigation("/profile/addresses");
                            window.location.reload(true);
                        }
                    } className="w-28 px-3 py-2 bg-blue-500 text-center cursor-pointer rounded-sm">SAVE</div>
                    <div className="w-28 px-3 py-2 bg-orange-500 text-center cursor-pointer rounded-sm" onClick={e=>setEditFieldShow((prev)=>!prev)}>CANCEL</div>
                </div>    
            </div>
            :""}
        </div>
    )
}
export default Addresses;

