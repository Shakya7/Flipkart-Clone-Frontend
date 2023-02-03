import { useState,useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import axios from "axios";


function FilterBar(props){
    const {state,dispatch}=useContext(GlobalContext);
    const [priceFilter,setPriceFilter]=useState(500);
    async function dispatchClearFilter(){
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
    }
    
    async function searchPricedFilter(){
        const results=await axios.get("https://fakestoreapi.com/products");
        dispatch({type:"search-products-by-price",payload:results.data,price:priceFilter});
    }

    function sortByFilter(event){
        dispatch({type:event.target.value});
    }

    function priceFilterInputSetup(event){
        setPriceFilter(event.target.value);
    }

    async function dispatch4Star(){
        dispatch({type:"4-star"});
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
    }

    async function dispatch3Star(){
        dispatch({type:"3-star"});
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
    }

    async function dispatch2Star(){
        dispatch({type:"2-star"});
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
    }

    async function dispatch1Star(){
        dispatch({type:"1-star"});
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
    }

    function dispatchCasesAutomatic(event){
        if(event==="four")
            dispatch4Star();
        else if(event==="three")
            dispatch3Star();
        else if(event==="two")
            dispatch2Star();
        else
            dispatch1Star();
    }

    return(
        !props.mobile?
        <div className="bg-blue-900 flex flex-col rounded-md shadow-lg shadow-gray-500">
            <div className="p-5 text-xl text-white flex justify-between items-center">
                <p>Filters</p>
                <div onClick={dispatchClearFilter} className="text-sm w-auto bg-red-500 px-2.5 py-1 rounded-md shadow-lg cursor-pointer transition-all ease-in-out duration-500 hover:bg-white hover:text-black hover:shadow-blue-500">Clear all</div>
            </div>
            <div className="h-[1px] bg-gray-400"/>
            <div className="p-5 text-white">
                <p className="text-2xl font-bold">PRICE</p>
                <div className="mt-2.5">
                    <p>Sort by:</p>
                    <div>
                        <div>   
                            <input onChange={e=>sortByFilter(e)} type="radio" value="price-asc" checked={state.category==="price-asc"} name="price-sort"/>
                            <label className="text-base m-2.5">Low to High</label>
                        </div>
                        <div>
                            <input onChange={e=>sortByFilter(e)} type="radio" value="price-desc" checked={state.category==="price-desc"} name="price-sort"/>
                            <label className="text-base m-2.5">High to Low</label>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex flex-col xlg:flex-row gap-2" >
                        <input min="0" value={priceFilter} onChange={(e)=>priceFilterInputSetup(e)} step="10" max="1000" type={"range"}/>
                        <button className="cursor-pointer bg-stone-900 px-1.5 rounded-md shadow-xl hover:shadow-blue-500" onClick={searchPricedFilter}>Search</button>
                    </div>
                    <div className="flex gap-3 mt-[5px]">
                        <label>Price: ₹</label>
                        <input value={priceFilter} onChange={(e)=>priceFilterInputSetup(e)} type="number" className="text-black w-16 text-center rounded-sm"/>
                    </div>
                    <p className="text-xs mt-2">**Filter products within this price range</p>
                </div>
            </div>
            <div className="h-[1px] bg-gray-400"/>
            <div className="p-5 text-white">
                <p className="text-2xl font-bold">RATINGS</p>
                <div className="mt-2.5">
                    <div>
                        <input checked={state.filterChecked==="4-star"} type="radio" name="rating" onChange={dispatch4Star}/>
                        <label className="text-base m-2.5">4★ & above</label>
                    </div>
                    <div>
                        <input checked={state.filterChecked==="3-star"} type="radio" name="rating" onChange={dispatch3Star}/>
                        <label className="text-base m-2.5">3★ & above</label>
                    </div>
                    <div>
                        <input checked={state.filterChecked==="2-star"} type="radio" name="rating" onChange={dispatch2Star}/>
                        <label className="text-base m-2.5">2★ & above</label>
                    </div>
                    <div>
                        <input checked={state.filterChecked==="1-star"} type="radio" name="rating" onChange={dispatch1Star}/>
                        <label className="text-base m-2.5">1★ & above</label>
                    </div>
                </div>
            </div>
        </div>:
        <div className="block text-extraSmall md:text-base smd:hidden w-full">
            <div className="flex justify-between items-center mb-1">
                <b>Filters:</b>
                <div onClick={dispatchClearFilter} className="w-auto bg-red-500 px-1.5 rounded-md shadow-lg hover:shadow-gray-500 cursor-pointer transition-colors ease-in-out duration-500 text-white hover:bg-white hover:text-black">
                    CLEAR
                </div>
            </div>
            <div className="flex px-2 flex-col xxxxsm:flex-row xxxxsm:flex-wrap bg-white border border-gray-800 rounded-md items-center gap-3 py-3 border-dashed">
                <div className="border border-gray-400 self-start rounded-sm p-1.5">
                    <div className="flex justify-center gap-1">
                        <p>Price: ₹</p>
                        <input value={priceFilter} onChange={(e)=>priceFilterInputSetup(e)} className="bg-gray-300 rounded-sm px-1.5" placeholder="Type in your filtered amount..." type="number"/>
                    </div>
                    <input value={priceFilter} onChange={(e)=>priceFilterInputSetup(e)} min="0" className="w-10/12 xxxxsm:w-auto" step="1" max="1000" type={"range"}/>
                    <div onClick={searchPricedFilter} className="flex gap-3">
                        <button className="cursor-pointer bg-black px-1.5 text-white rounded-md">Search</button>
                    </div>
                    <p className="text-extraSmall xlsm:text-xs mt-2 text-blue-600">**Filter products within this price range</p>
                </div>
                
                <div className="flex flex-col self-start p-1">
                    <label className="text-extraSmall md:text-base">Price: </label>
                    <div className="flex gap-1 justify-center items-center">   
                        <input onChange={e=>sortByFilter(e)} type="radio" value="price-asc" checked={state.category==="price-asc"} name="price-sort-1"/>
                        <label className="text-extraSmall md:text-base">Low to High</label>
                    </div>
                    <div className="flex gap-1 justify-center items-center">
                        <input onChange={e=>sortByFilter(e)} type="radio" value="price-desc" checked={state.category==="price-desc"} name="price-sort-1"/>
                        <label className="text-extraSmall md:text-base">High to Low</label>
                    </div>
                </div>
                <div className="flex flex-col self-start p-1">
                    <label className="text-extraSmall md:text-base">Rating: </label>
                    <select onChange={e=>dispatchCasesAutomatic(e.target.value)}>
                        <option selected>--No rating--</option>
                        <option selected={state.filterChecked==="4-star"} value="four" >4+ star</option>
                        <option selected={state.filterChecked==="3-star"} value="three">3+ star</option>
                        <option selected={state.filterChecked==="2-star"} value="two">2+ star</option>
                        <option selected={state.filterChecked==="1-star"} value="one">1+ star</option>
                    </select>

                </div>
            </div>
        </div>
    )
}
export default FilterBar;