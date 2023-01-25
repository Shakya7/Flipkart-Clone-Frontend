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
            <div className="w-full min-h-auto bg-white flex gap-2 items-start justify-evenly py-5">
                <div className="w-1/5 bg-blue-900 h-52 text-white rounded-md relative shadow-lg shadow-gray-500">
                    <div className="flex justify-center items-center flex-col mt-[5%] gap-5">
                        <p>Filter effects</p>
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-3">
                                <label>Price: ₹</label>
                                <input className="text-center w-[5vw] text-black" value={priceFilter} onChange={e=>setPriceFilter(e.target.value)} type="number"/>
                            </div>
                            <div className="flex gap-3">
                                <input min="0" value={priceFilter} onChange={(e)=>{
                                    setPriceFilter(e.target.value);
                                    //loadData().then(res=>dispatch({type:"search-order-by-price",payload:res,price:priceFilter}))//
                                    //await dispatch({type:"search-order-by-price",payload:data,price:priceFilter});
                                }} step="1" max="10000" type={"range"}/>
                                <button className="cursor-pointer bg-black px-1.5 rounded-md" onClick={async e=>{
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
                    }} className="absolute bottom-5 right-5 text-sm w-auto bg-red-500 px-2.5 py-1 rounded-md shadow-lg shadow-blue-500 cursor-pointer transition-colors ease-in-out duration-500 hover:bg-white hover:text-black">Clear</div>
                </div>
                <div className="w-2/3 bg-white flex flex-col h-auto gap-5">
                    <div className="flex">
                        <input className="srch w-4/5 h-[3vmax] rounded-l-md pl-[2%] border border-gray-400" onChange={e=>setSearchInp(e.target.value)} type="text" placeholder="Search orders by destination address keywords..."/>
                        <div className="bg-blue-500 flex justify-evenly items-center p-1.5 text-white font-bold text-sm w-1/5 gap-5 rounded-r-md cursor-pointer">
                            <img className="w-5" src={search_icon}/>
                            <p onClick={async()=>{
                                let data=await loadData();
                                dispatch({type:"search-order-by-address",payload:data,term:searchInp});
                            }}>Search orders</p>
                        </div>
                    </div>
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