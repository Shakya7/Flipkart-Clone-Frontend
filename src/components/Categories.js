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
        <div style={{width:"100%",height:"auto",backgroundColor:"white"}}>
                <div style={{display:"flex", justifyContent:"space-around",margin:"10px"}}>
                    <div className="fashion">
                        <div onMouseEnter={(e)=>setCat1("flex")} onClick={(e)=>setCat1("none")} style={{display:"flex",flexDirection:"column", justifyContent:"space-between"}}>
                            <div onClick={(e)=>{
                                //dispatch({type:"women's clothing"});
                                //navigation("/");

                            }}>
                                <img className="category_img" src={cat_1}/>
                                <p style={{textAlign:"center"}}>{categories[0]}</p>
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
                        <img className="category_img" src={cat_2}/>
                        <p style={{textAlign:"center"}}>{categories[1]}</p>
                    </div>
                    <div className="fashion" onClick={(e)=>{
                        dispatch({type:"jewel"});
                        dispatch({type:"no-star"});
                        dispatch({type:"jewelery"});                      
                        navigation("/");
                    }}>
                        <img className="category_img" src={cat_3}/>
                        <p style={{textAlign:"center"}}>{categories[2]}</p>
                    </div>
                </div>
                <div style={{width:"100%", height:"2vh",backgroundColor:"#CDE8F6"}}/>
            </div>
            
    )
}
export default Categories;