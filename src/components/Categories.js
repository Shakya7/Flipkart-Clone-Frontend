import cat_2 from "../images/electronics_cat.jpg"
import cat_1 from "../images/fashion_cat.jpg";
import cat_3 from "../images/jewelery_cat.jpg";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "./GlobalContext";
import { useContext, useState } from "react";
import { useRef } from "react";


const Categories=()=>{
    const {state,dispatch}=useContext(GlobalContext);
    const [cat1,setCat1]=useState("none")
    const categories=["Fashion", "Electronics", "Jewelery"];
    const navigation=useNavigate();

    const [showFashion, setShowFashion]=useState(false);

    const fashionRef=useRef(null);

    const closeFashionMenus = (e)=>{
        if(fashionRef.current && showFashion && !fashionRef.current.contains(e.target)){
            setShowFashion(false);
        }
    }
    document.addEventListener('mousedown',closeFashionMenus);


    /*onMouseOverCapture={(e)=>setCat1("flex")} onMouseOutCapture={(e)=>setCat1("none")}*/

    return(
        <div className="w-full h-auto bg-white">
                <div className="flex justify-around p-2">
                    <div className="fashion">
                        <div className="flex flex-col justify-between">
                            <div ref={fashionRef} onClick={(e)=>{
                                setShowFashion((prev)=>!prev);

                            }}>
                                <img className="w-[15vmin] h-[10vmin]" src={cat_1}/>
                                <p className="text-extraSmall xlsm:text-base text-center">{categories[0]}</p>
                            </div>
                            {
                            showFashion && 
                            <div className="flex-col absolute left-0 top-[112%] w-[15vmax] border border-gray-700 z-2" ref={fashionRef}>
                                <p className="bg-white p-1.5 hover:bg-sky-400 text-extraSmall xlsm:text-base" onClick={()=>{
                                    dispatch({type:"wc"});
                                    dispatch({type:"no-star"});
                                    dispatch({type:"women's clothing"});
                                    navigation("/");
                                    setShowFashion(false);
                                }}>Women</p>
                                <hr/>
                                <p className="bg-white p-1.5 hover:bg-sky-400 text-extraSmall xlsm:text-base" onClick={()=>{
                                    dispatch({type:"mc"});
                                    dispatch({type:"no-star"});
                                    dispatch({type:"men's clothing"});
                                    navigation("/");
                                    setShowFashion(false);
                                }}>Men</p>
                            </div>
                            }
                        </div>    
                    </div>
                    <div className="fashion" onClick={(e)=>{
                        dispatch({type:"elect"});
                        dispatch({type:"no-star"});
                        dispatch({type:"electronics"});
                        navigation("/");
                    }}>
                        <img className="w-[15vmin] h-[10vmin]" src={cat_2}/>
                        <p className="text-extraSmall xlsm:text-base text-center">{categories[1]}</p>
                    </div>
                    <div className="fashion" onClick={(e)=>{
                        dispatch({type:"jewel"});
                        dispatch({type:"no-star"});
                        dispatch({type:"jewelery"});                      
                        navigation("/");
                    }}>
                        <img className="w-[15vmin] h-[10vmin]" src={cat_3}/>
                        <p className="text-extraSmall xlsm:text-base text-center">{categories[2]}</p>
                    </div>
                </div>
                <div className="w-full h-[2vh] bg-sky-200"/>
            </div>
            
    )
}
export default Categories;