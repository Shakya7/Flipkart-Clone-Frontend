import { useState,useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import axios from "axios";


function FilterBar(){
    const {state,dispatch}=useContext(GlobalContext);
    const [priceFilter,setPriceFilter]=useState(500);
    return(
        <div className="bg-blue-900 flex flex-col rounded-md shadow-lg shadow-gray-500">
            <div className="p-5 text-xl text-white flex justify-between items-center">
                <p>Filters</p>
                <div onClick={async e=>{
                    setPriceFilter(500);
                    dispatch({type:"no-star"});
                    dispatch({type:"null-category"});
                    if(state.filterCat===""){
                        const results=await axios.get("https://fakestoreapi.com/products");
                        dispatch({type:"clear-filter",payload:results.data})
                    }
                    if(state.filterCat==="electronics"){
                        const results=await axios.get("https://fakestoreapi.com/products");
                        dispatch({type:"clear-filter",payload:results.data.filter((el)=>el.category==="electronics")})
                    }
                    if(state.filterCat==="jewelery"){
                        const results=await axios.get("https://fakestoreapi.com/products");
                        dispatch({type:"clear-filter",payload:results.data.filter((el)=>el.category==="jewelery")})
                    }
                    if(state.filterCat==="women's clothing"){
                        const results=await axios.get("https://fakestoreapi.com/products");
                        dispatch({type:"clear-filter",payload:results.data.filter((el)=>el.category==="women's clothing")})
                    }
                    if(state.filterCat==="men's clothing"){
                        const results=await axios.get("https://fakestoreapi.com/products");
                        dispatch({type:"clear-filter",payload:results.data.filter((el)=>el.category==="men's clothing")})
                    }  
                }} className="text-sm w-auto bg-red-500 px-2.5 py-1 rounded-md shadow-lg cursor-pointer transition-all ease-in-out duration-500 hover:bg-white hover:text-black hover:shadow-blue-500">Clear all</div>
            </div>
            <div className="h-[1px] bg-gray-400"/>
            <div className="p-5 text-white">
                <p className="text-2xl font-bold">PRICE</p>
                <div className="mt-2.5">
                    <p>Sort by:</p>
                    <div>
                        <div>   
                            <input onChange={e=>{
                                dispatch({type:e.target.value});
                                
                            }} type="radio" value="price-asc" checked={state.category==="price-asc"} name="price-sort"/>
                            <label className="text-base m-2.5">Low to High</label>
                        </div>
                        <div>
                            <input onChange={e=>{
                                dispatch({type:e.target.value});
                                
                            }} type="radio" value="price-desc" checked={state.category==="price-desc"} name="price-sort"/>
                            <label className="text-base m-2.5">High to Low</label>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex gap-2" >
                        <input min="0" value={priceFilter} onChange={(e)=>{
                            setPriceFilter(e.target.value);
                        }} step="10" max="1000" type={"range"}/>
                        <button className="cursor-pointer bg-stone-900 px-1.5 rounded-md shadow-xl hover:shadow-blue-500" onClick={async e=>{
                            const results=await axios.get("https://fakestoreapi.com/products");
                            dispatch({type:"search-products-by-price",payload:results.data,price:priceFilter});
                        }}>Search</button>
                    </div>
                    <div className="flex gap-3 mt-[5px]">
                        <label>Price: ₹</label>
                        <input value={priceFilter} onChange={e=>setPriceFilter(e.target.value)} type="number" className="text-black w-16 text-center rounded-sm"/>
                    </div>
                </div>
            </div>
            <div className="h-[1px] bg-gray-400"/>
            <div className="p-5 text-white">
                <p className="text-2xl font-bold">RATINGS</p>
                <div className="mt-2.5">
                    <div>
                        <input checked={state.filterChecked==="4-star"} type="radio" name="rating" onChange={async e=>{
                            dispatch({type:"4-star"})
                            if(state.filterCat===""){
                                const results=await axios.get("https://fakestoreapi.com/products");
                                dispatch({type:"no-cat-above-4",payload:results.data.filter((el)=>el.rating.rate>=4)})
                            }
                            if(state.filterCat==="electronics"){
                                const results=await axios.get("https://fakestoreapi.com/products");
                                dispatch({type:"cat-above-4",payload:results.data.filter((el)=>el.category==="electronics").filter((el)=>el.rating.rate>=4)})
                            }
                            if(state.filterCat==="jewelery"){
                                const results=await axios.get("https://fakestoreapi.com/products");
                                dispatch({type:"cat-above-4",payload:results.data.filter((el)=>el.category==="jewelery").filter((el)=>el.rating.rate>=4)})
                            }
                            if(state.filterCat==="women's clothing"){
                                const results=await axios.get("https://fakestoreapi.com/products");
                                dispatch({type:"cat-above-4",payload:results.data.filter((el)=>el.category==="women's clothing").filter((el)=>el.rating.rate>=4)})
                            }
                            if(state.filterCat==="men's clothing"){
                                const results=await axios.get("https://fakestoreapi.com/products");
                                dispatch({type:"cat-above-4",payload:results.data.filter((el)=>el.category==="men's clothing").filter((el)=>el.rating.rate>=4)})
                            }
                        }}/>
                        <label className="text-base m-2.5">4★ & above</label>
                    </div>
                    <div>
                        <input checked={state.filterChecked==="3-star"} type="radio" name="rating" onChange={async e=>{
                            dispatch({type:"3-star"})
                            if(state.filterCat===""){
                                const results=await axios.get("https://fakestoreapi.com/products");
                                dispatch({type:"no-cat-above-3",payload:results.data.filter((el)=>el.rating.rate>=3)})
                            }
                            if(state.filterCat==="electronics"){
                                const results=await axios.get("https://fakestoreapi.com/products");
                                dispatch({type:"cat-above-3",payload:results.data.filter((el)=>el.category==="electronics").filter((el)=>el.rating.rate>=3)})
                            }
                            if(state.filterCat==="jewelery"){
                                const results=await axios.get("https://fakestoreapi.com/products");
                                dispatch({type:"cat-above-3",payload:results.data.filter((el)=>el.category==="jewelery").filter((el)=>el.rating.rate>=3)})
                            }
                            if(state.filterCat==="women's clothing"){
                                const results=await axios.get("https://fakestoreapi.com/products");
                                dispatch({type:"cat-above-3",payload:results.data.filter((el)=>el.category==="women's clothing").filter((el)=>el.rating.rate>=3)})
                            }
                            if(state.filterCat==="men's clothing"){
                                const results=await axios.get("https://fakestoreapi.com/products");
                                dispatch({type:"cat-above-3",payload:results.data.filter((el)=>el.category==="men's clothing").filter((el)=>el.rating.rate>=3)})
                            }
                        }}/>
                        <label className="text-base m-2.5">3★ & above</label>
                    </div>
                    <div>
                        <input checked={state.filterChecked==="2-star"} type="radio" name="rating" onChange={async e=>{
                            dispatch({type:"2-star"})
                            if(state.filterCat===""){
                                const results=await axios.get("https://fakestoreapi.com/products");
                                dispatch({type:"no-cat-above-2",payload:results.data.filter((el)=>el.rating.rate>=2)})
                            }
                            if(state.filterCat==="electronics"){
                                const results=await axios.get("https://fakestoreapi.com/products");
                                dispatch({type:"cat-above-2",payload:results.data.filter((el)=>el.category==="electronics").filter((el)=>el.rating.rate>=2)})
                            }
                            if(state.filterCat==="jewelery"){
                                const results=await axios.get("https://fakestoreapi.com/products");
                                dispatch({type:"cat-above-2",payload:results.data.filter((el)=>el.category==="jewelery").filter((el)=>el.rating.rate>=2)})
                            }
                            if(state.filterCat==="women's clothing"){
                                const results=await axios.get("https://fakestoreapi.com/products");
                                dispatch({type:"cat-above-2",payload:results.data.filter((el)=>el.category==="women's clothing").filter((el)=>el.rating.rate>=2)})
                            }
                            if(state.filterCat==="men's clothing"){
                                const results=await axios.get("https://fakestoreapi.com/products");
                                dispatch({type:"cat-above-2",payload:results.data.filter((el)=>el.category==="men's clothing").filter((el)=>el.rating.rate>=2)})
                            }
                        }}/>
                        <label className="text-base m-2.5">2★ & above</label>
                    </div>
                    <div>
                        <input checked={state.filterChecked==="1-star"} type="radio" name="rating" onChange={async e=>{
                            dispatch({type:"1-star"})
                            if(state.filterCat===""){
                                const results=await axios.get("https://fakestoreapi.com/products");
                                dispatch({type:"no-cat-above-1",payload:results.data.filter((el)=>el.rating.rate>=1)})
                            }
                            if(state.filterCat==="electronics"){
                                const results=await axios.get("https://fakestoreapi.com/products");
                                dispatch({type:"cat-above-1",payload:results.data.filter((el)=>el.category==="electronics").filter((el)=>el.rating.rate>=1)})
                            }
                            if(state.filterCat==="jewelery"){
                                const results=await axios.get("https://fakestoreapi.com/products");
                                dispatch({type:"cat-above-1",payload:results.data.filter((el)=>el.category==="jewelery").filter((el)=>el.rating.rate>=1)})
                            }
                            if(state.filterCat==="women's clothing"){
                                const results=await axios.get("https://fakestoreapi.com/products");
                                dispatch({type:"cat-above-1",payload:results.data.filter((el)=>el.category==="women's clothing").filter((el)=>el.rating.rate>=1)})
                            }
                            if(state.filterCat==="men's clothing"){
                                const results=await axios.get("https://fakestoreapi.com/products");
                                dispatch({type:"cat-above-1",payload:results.data.filter((el)=>el.category==="men's clothing").filter((el)=>el.rating.rate>=1)})
                            }
                        }}/>
                        <label className="text-base m-2.5">1★ & above</label>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FilterBar;