import cat_2 from "../images/electronics_cat.jpg"
import cat_1 from "../images/fashion_cat.jpg";
import cat_3 from "../images/jewelery_cat.jpg";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "./GlobalContext";
import { useContext, useState } from "react";
import DropDown from "./DropDown_NavBar";


const Categories=()=>{
    const {state,dispatch}=useContext(GlobalContext);
    const [cat1,setCat1]=useState("none")
    const categories=["Fashion", "Electronics", "Jewelery"];
    const navigation=useNavigate();


    /*onMouseOverCapture={(e)=>setCat1("flex")} onMouseOutCapture={(e)=>setCat1("none")}*/

    return(
        <div className="w-full h-auto bg-white">
                <div className="flex justify-around p-2">
                    <div className="fashion">
                        <div onMouseEnter={(e)=>setCat1("flex")} onClick={(e)=>setCat1("none")} className="flex flex-col justify-between">
                            <div onClick={(e)=>{
                                //dispatch({type:"women's clothing"});
                                //navigation("/");

                            }}>
                                <img className="w-[15vmin] h-[10vmin]" src={cat_1}/>
                                <p className="text-center">{categories[0]}</p>
                            </div>
                            <DropDown show={cat1} pass={setCat1} items={["Women's clothing","Men's clothing"]}/>
                        </div>    
                    </div>
                    <div className="fashion" onClick={(e)=>{
                        dispatch({type:"elect"});
                        dispatch({type:"no-star"});
                        dispatch({type:"electronics"});
                        navigation("/");
                    }}>
                        <img className="w-[15vmin] h-[10vmin]" src={cat_2}/>
                        <p className="text-center">{categories[1]}</p>
                    </div>
                    <div className="fashion" onClick={(e)=>{
                        dispatch({type:"jewel"});
                        dispatch({type:"no-star"});
                        dispatch({type:"jewelery"});                      
                        navigation("/");
                    }}>
                        <img className="w-[15vmin] h-[10vmin]" src={cat_3}/>
                        <p className="text-center">{categories[2]}</p>
                    </div>
                </div>
                <div className="w-full h-[2vh] bg-sky-200"/>
            </div>
            
    )
}
export default Categories;