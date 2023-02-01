import Card from "./Card";
import { useEffect,useContext,useLayoutEffect,useState, useCallback} from "react";
import axios from "axios";
import { GlobalContext } from "./GlobalContext";
import Categories from "./Categories";
import FilterBar from "./FilterBar";
import Footer from "./Footer";
import LoadingSpinner from "./loading-spinners/LoadingSpinner";

const ItemsPage=()=>{
    const {state,dispatch}=useContext(GlobalContext);
    const [isLoading,setIsLoading]=useState(false);

    const func1=useCallback(async()=>{
        setIsLoading(true);
        const results=await axios.get("https://fakestoreapi.com/products");
        dispatch({type:"load-data-initial",payload:results.data});
        dispatch({type:"null-category"});
        setIsLoading(false);
    },[state.results]);

    const func2=useCallback(async()=>{
        setIsLoading(true);
        const results=await axios.get("https://fakestoreapi.com/products");
        dispatch({type:"load-data-women",payload:results.data.filter((el)=>el.category==="women's clothing")});
        dispatch({type:"null-category"});
        setIsLoading(false);
    },[state.results]);

    const func3=useCallback(async()=>{
        setIsLoading(true);
        const results=await axios.get("https://fakestoreapi.com/products");
        dispatch({type:"load-data-electronics",payload:results.data.filter((el)=>el.category==="electronics")});
        dispatch({type:"null-category"});
        setIsLoading(false);
    },[state.results]);

    const func4=useCallback(async()=>{
        setIsLoading(true);
        const results=await axios.get("https://fakestoreapi.com/products");
        dispatch({type:"load-data-jewelery",payload:results.data.filter((el)=>el.category==="jewelery")});
        dispatch({type:"null-category"});
        setIsLoading(false);
    },[state.results]);

    const func5=useCallback(async()=>{
        setIsLoading(true);
        const results=await axios.get("https://fakestoreapi.com/products");
        dispatch({type:"load-data-men",payload:results.data.filter((el)=>el.category==="men's clothing")});
        dispatch({type:"null-category"});
        setIsLoading(false);
    },[state.results]);

    const func6=useCallback(async()=>{
        setIsLoading(true);
        const results=await axios.get("https://fakestoreapi.com/products");
        dispatch({type:"load-search-data",payload:results.data.filter((el)=>el.title.toLowerCase().includes(state.searchTerm.toLowerCase()))});
        dispatch({type:"null-category"});
        setIsLoading(false);
    },[state.results]);

    const funcPriceAsc=(()=>{
        dispatch({type:"sort-asc",payload:state.results.sort((a,b)=>parseFloat(a.price)-parseFloat(b.price))})
    });
    const funcPriceDesc=(()=>{
        dispatch({type:"sort-desc",payload:state.results.sort((a,b)=>parseFloat(b.price)-parseFloat(a.price))})
    });

    useLayoutEffect(()=>{
        
    },[isLoading])

    useEffect(useCallback(()=>{
        if(state.category==="init")
            func1();
        if(state.category==="women's clothing")
            func2();
        if(state.category==="electronics")
            func3();
        if(state.category==="jewelery")
            func4();
        if(state.category==="men's clothing")
            func5();
        if(state.category==="search")
            func6();
        if(state.category==="price-asc")
            funcPriceAsc();
        if(state.category==="price-desc")
            funcPriceDesc();
    },[state.results,state.category]),[state.results,state.category]);
    return(
        <div className="flex flex-col w-full bg-gray-200">
            <Categories/>
            <div className="w-full h-[2vh] bg-sky-200"/>
            <div className="flex justify-between items-center mb-5">
                <div className="hidden smd:block w-1/5 h-auto self-start ml-[3%] mt-2.5 rounded-md shadow-lg shadow-gray-500">
                    <FilterBar mobile={false}/>
                </div>
                <div className="flex flex-wrap smd:grid smd:grid-cols-3 gap-3 smd:mr-10 p-2 smd:p-0 mt-2.5">
                    <div className="block smd:hidden w-full"><FilterBar mobile={true}/></div>
                    {   state.results &&
                        state.results.map((el)=>{
                            return <Card key={el.id} element={el}/>
                        })
                    }
                    {
                        state.results && state.results.length===0?"Oops! No products found...":""
                    }
                </div> 
            </div>
            <Footer/>
            {isLoading?<LoadingSpinner/>:""}
        </div>   
    )
}
export default ItemsPage;

