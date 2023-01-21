import Categories from "./Categories";
import { GlobalContext } from "./GlobalContext";
import { useContext,useEffect, useState, useLayoutEffect } from "react";
import search_icon from "../images/search_icon.png";
import OrderBlocks from "./OrderBlocks";
import Footer from "./Footer";
import LoadingSpinner from "./loading-spinners/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OrdersPage(){
    const {state,dispatch}=useContext(GlobalContext);
    const [isLoading,setIsLoading]=useState(false);
    const [searchInp, setSearchInp]=useState("");
    const [priceFilter,setPriceFilter]=useState(5000);
    const navigation=useNavigate();

    const loadData=async ()=>{
        const userData=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/load-data`,{
                withCredentials:true
            });
        return userData.data.data.user;
    }

    const checkLoggedIn=async()=>{
        try{
            setIsLoading(true)
            const user=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/authenticate`,{
            withCredentials:true
            });
            setIsLoading(false);
        }catch(err){
            setIsLoading(false);
            navigation("/login");
        } 
    }
    useLayoutEffect(()=>{
        checkLoggedIn();
    },[])
    useLayoutEffect(()=>{
    },[isLoading])
    useEffect(()=>{

    },[state.userProfile,priceFilter,searchInp])

    return(
        <div>
            <Categories/>
            <div style={{width:"100%",minHeight:"auto", backgroundColor:"#EEEEEE",display:"flex", gap:"2%",alignItems:"flex-start",justifyContent:"center",paddingTop:'20px',paddingBottom:'20px'}}>
                <div style={{minWidth:"20%", backgroundColor:"#21325E",height:"200px", color:"white",borderRadius:"4px", boxShadow:"5px 5px 8px #476072",position:"relative"}}>
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",marginTop:"5%",gap:10}}>
                        <p>Filter effects</p>
                        <div stype={{display:"flex"}}>
                            <div>
                                <label>Price: ₹</label>
                                <input value={priceFilter} onChange={e=>setPriceFilter(e.target.value)} type="number" style={{width:"5vw",textAlign:"center"}}/>
                            </div>
                            <div style={{display:"flex"}}>
                                <input min="0" value={priceFilter} onChange={(e)=>{
                                    setPriceFilter(e.target.value);
                                    //loadData().then(res=>dispatch({type:"search-order-by-price",payload:res,price:priceFilter}))//
                                    //await dispatch({type:"search-order-by-price",payload:data,price:priceFilter});
                                }} step="1" max="10000" type={"range"}/>
                                <button style={{cursor:"pointer"}}onClick={async e=>{
                                    let data=await loadData();
                                    dispatch({type:"search-order-by-price",payload:data,price:priceFilter})
                                }}>Search</button>
                            </div>
                        </div>
                    </div>
                    <div onClick={async e=>{
                        let data=await loadData();
                        window.location.reload();
                        await dispatch({type:"load-user-data",payload:data});
                        setSearchInp("");
                        document.querySelector(".srch").value="";
                    }} style={{position:"absolute",bottom:10,right:10}} className="clear-filter">Clear</div>
                </div>
                <div style={{width:"65%", backgroundColor:"#EEEEEE",minHeight:"200px",display:"flex",flexDirection:"column",gap:"20px"}}>
                    <div style={{display:"flex"}}>
                        <input className="srch" style={{width:"80%",height:"3vmax", borderRadius:"5px 0 0 5px", paddingLeft:"2%",borderColor:"#D1D1D1"}} onChange={e=>setSearchInp(e.target.value)} type="text" placeholder="Search orders by destination address keywords..."/>
                        <div style={{backgroundColor:"blue",display:"flex",justifyContent:"space-evenly",alignItems:"center", padding:"5px", color:"white",fontSize:"0.8rem",fontWeight:"bold",width:"20%",gap:"5%",borderRadius:"0 5px 5px 0",cursor:"pointer"}}>
                            <img  width={"20px"} src={search_icon}/>
                            <p onClick={async()=>{
                                let data=await loadData();
                                dispatch({type:"search-order-by-address",payload:data,term:searchInp});
                            }}>Search orders</p>
                        </div>
                    </div>
                    {/*<div>Hello</div>*/}
                    {
                    state.userProfile
                    ?(state.userProfile.orders.length!==0?state.userProfile.orders.map((el,i)=><OrderBlocks item={el} key={i}/>):"Sorry, no orders delivered on this address/ within this range")
                    :"There are no orders placed yet..."
                    }
                </div>
            </div>
            <Footer/>
            {isLoading?<LoadingSpinner/>:""}
        </div>
    )
}
export default OrdersPage;