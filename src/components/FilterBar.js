import { useState,useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import axios from "axios";


function FilterBar(){
    const {state,dispatch}=useContext(GlobalContext);
    const [priceFilter,setPriceFilter]=useState(500);
    return(
        <div style={{display:"flex",flexDirection:"column"}}>
            <div className="filter-header">
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
                }} className="clear-filter">Clear all</div>
            </div>
            <div className="hr-line"/>
            <div className="filter-price">
                <p className="heading-sub-filter">PRICE</p>
                <div style={{marginTop:"10px"}}>
                    <p>Sort by:</p>
                    <div>
                        <div>   
                            <input onChange={e=>{
                                dispatch({type:e.target.value});
                                
                            }} type="radio" value="price-asc" checked={state.category==="price-asc"} name="price-sort"/>
                            <label style={{fontSize:"1rem",margin:"10px"}}>Low to High</label>
                        </div>
                        <div>
                            <input onChange={e=>{
                                dispatch({type:e.target.value});
                                
                            }} type="radio" value="price-desc" checked={state.category==="price-desc"} name="price-sort"/>
                            <label style={{fontSize:"1rem",margin:"10px"}}>High to Low</label>
                        </div>
                    </div>
                </div>
                <div stype={{display:"flex"}}>
                    <div style={{display:"flex"}}>
                        <input min="0" value={priceFilter} onChange={(e)=>{
                            setPriceFilter(e.target.value);
                        }} step="10" max="1000" type={"range"}/>
                        <button style={{cursor:"pointer"}}onClick={async e=>{
                            const results=await axios.get("https://fakestoreapi.com/products");
                            dispatch({type:"search-products-by-price",payload:results.data,price:priceFilter});
                        }}>Search</button>
                    </div>
                    <div>
                        <label>Price: ₹</label>
                        <input value={priceFilter} onChange={e=>setPriceFilter(e.target.value)} type="number" style={{width:"5vw",textAlign:"center"}}/>
                    </div>
                </div>
            </div>
            <div className="hr-line"/>
            <div className="filter-rating">
                <p className="heading-sub-filter">RATINGS</p>
                <div style={{marginTop:"10px"}}>
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
                        <label style={{fontSize:"1rem",margin:"10px"}}>4★ & above</label>
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
                        <label style={{fontSize:"1rem",margin:"10px"}}>3★ & above</label>
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
                        <label style={{fontSize:"1rem",margin:"10px"}}>2★ & above</label>
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
                        <label style={{fontSize:"1rem",margin:"10px"}}>1★ & above</label>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FilterBar;