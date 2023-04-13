import { useReducer, createContext, useEffect,useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";


const initialState={
    results:null,
    cart:0,
    category:"init",
    cartProducts:[],
    userProfile:null,
    isLoggedIn:false,
    showCart:true,
    addresses:[],
    wishlist:[],
    billingAddress:"",
    billingProducts:[],
    finalPrice:1,
    searchTerm:"",
    filterCat:"",
    filterChecked:""
}

const reducerF=(currState, action)=>{
    const helperFunc1=()=>currState.cart;
    
    switch(action.type){
        case "connect-to-db":
            return currState

        case "null-category":
            return{
                ...currState,
                category:null
            }
        case "finally-update-data-from-db":
            return{
                ...currState,
                userProfile:action.payload,
                cartProducts:action.payload.cart,
                cart:action.payload.cart.length,  
                addresses:action.payload.addresses,
                wishlist:action.payload.wishlist
            }
        case "load-user-data":
            return{
                ...currState,
                userProfile:action.payload
            }
        case "load-data-initial":
            return{
                ...currState,
                results:action.payload
            }
        case "load-data-women":
            return{
                ...currState,
                results:action.payload
            }
        case "load-data-men":
            return{
                ...currState,
                results:action.payload
            }
        case "load-data-electronics":
            return{
                ...currState,
                results:action.payload
            }
        case "load-data-jewelery":
            return{
                ...currState,
                results:action.payload
            }
        case "load-search-data":
            return{
                ...currState,
                results:action.payload
            }


        case "initial":
            return{
                ...currState,
                category:"init"
            }
        case "price-asc":
            return{
                ...currState,
                category:"price-asc"
            }
        case "price-desc":
            return{
                ...currState,
                category:"price-desc"
            }

        case "search":
            return{
                ...currState,
                category:"search"
            }

        case "women's clothing":
            return{
                ...currState,
                category:"women's clothing"
            }
        case "no-cat":
            return{
                ...currState,
                filterCat:""
            }    
        case "wc":
            return{
                ...currState,
                filterCat:"women's clothing"
            }
        case "men's clothing":
            return{
                ...currState,
                category:"men's clothing"
            }
        case "mc":
            return{
                ...currState,
                filterCat:"men's clothing"
            }
        case "electronics":
            return{
                ...currState,
                category:"electronics"
            }
        case "elect":
            return{
                ...currState,
                filterCat:"electronics"
            }
        case "jewelery":{
            return{
                ...currState,
                category:"jewelery"
            }
        }
        case "jewel":
            return{
                ...currState,
                filterCat:"jewelery"
            }

        case "search-term":{
            return{
                ...currState,
                searchTerm:action.payload
            }
        }
        
        case "add-to-cart":
            return{
                ...currState,
                cart:helperFunc1()+1,
                cartProducts:[...currState.cartProducts,{...action.payload,quantity: 1}]
            }
        case "add-to-cart-DB":
            axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/add-to-cart`,{cart:[...currState.cartProducts]},{withCredentials:true}).then(
            (res)=>{}).catch((err)=>{
            
            })
            return currState;
            
        case "remove-from-cart":
            const number=currState.cartProducts.filter((el)=>el.id===action.payload.id).length;
            return{
                ...currState,
                cart:helperFunc1()-number,
                cartProducts:[...currState.cartProducts.filter((el)=>el.id!==action.payload.id)]
                
            }
        case "add-quantity":
            const index=currState.cartProducts.findIndex(el=>el.id===action.payload);
            const updatedProducts=[...currState.cartProducts];
            updatedProducts[index]={...updatedProducts[index],quantity:Number(updatedProducts[index].quantity)+1}

            return{
                ...currState,
                //cartProducts:[...currState.cartProducts,{...action.payload,quantity:action.payload.quantity+1}]
                //cartProducts:[...currState.cartProducts.filter((el)=>el.id===action.payload.id),updatedObj]
                cartProducts:updatedProducts
            }
        case "subtract-quantity":
            const index3=currState.cartProducts.findIndex(el=>el.id===action.payload);
            const updatedProducts3=[...currState.cartProducts];
            updatedProducts3[index3]={...updatedProducts3[index3],quantity:Number(updatedProducts3[index3].quantity)-1}
            return{
                ...currState,
                cartProducts:updatedProducts3
            }

        case "add-quantity-input":
            const index2=currState.cartProducts.findIndex(el=>el.id===action.payload);
            const updatedProducts2=[...currState.cartProducts];
            updatedProducts2[index2]={...updatedProducts2[index2],quantity:action.qty}
            return{
                ...currState,
                cartProducts:updatedProducts2
            }

        case "signup":
            return{
                ...currState,
                userProfile:action.payload,
                isLoggedIn:true
            }
        case "login":
            return{
                ...currState,
                userProfile:action.payload,
                isLoggedIn:true
            }
        case "logout":
            return{
                ...currState,
                userProfile:null,
                isLoggedIn:false
            }

        case "show-cart-disable":
            return{
                ...currState,
                showCart:false,
            }
        case "show-cart-enable":
            return{
                ...currState,
                showCart:true,
            }
        // case "add-address":
        //     return{
        //        ...currState,
        //        addresses:[...currState.addresses,action.payload]
        //     }

        case "add-address-to-DB":
            console.log(action.payload);
            axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/add-address`,
            {address:action.payload},{withCredentials:true}).then(
            (res)=>{
                console.log(res.data.data.user.addresses)
                return {...currState,addresses:res.data.data.user.addresses}
            }).catch((err)=>{

            })
            //return currState;   
        case "delete-address":
            axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/delete-address`,
            {id:action.payload},{withCredentials:true}).then((res)=>{
                return {...currState,addresses:res.data.data.user.addresses}
            }).catch(err=>{})
            
            // return{
            //     ...currState,
            //     addresses:[...currState.addresses.filter((el)=>el!==action.payload)]
            // }
        case "update-address":
            // const index4=currState.addresses.findIndex(el=>el===action.actualValue);
            // currState.addresses.splice(index4,1,action.payload);
            // return currState;
            axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/update-address`,
            {id:action.payload.id,updatedAddress:action.payload.updateAddress},{withCredentials:true}).then((res)=>{
                return {...currState,addresses:res.data.data.user.addresses}
            }).catch(err=>{})

        case "add-to-wishlist":
            return{
                ...currState,
                wishlist:[...currState.wishlist,action.payload]
            }

        case "remove-from-wishlist":
            //const num=currState.wishlist.filter((el)=>el.id===action.payload.id).length;
            return{
                ...currState,
                wishlist:[...currState.wishlist.filter((el)=>el.id!==action.payload.id)]
            }

        case "add-wishlist-to-DB":
            axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/add-wishlist`,
            {wishlist:[...currState.wishlist]},{withCredentials:true}).then(
            (res)=>{}).catch((err)=>{
    

            })
            return currState;

        case "final-money":
            return{
                ...currState,
                finalPrice:action.payload
            }
        
        case "address-selected":
            return{
                ...currState,
                billingAddress:action.payload
            }

        case "sort-asc":
            return{
                ...currState,
                results:action.payload
            }
        case "sort-desc":
            return{
                ...currState,
                results:action.payload
            }
        case "4-star":
            return{
                ...currState,
                filterChecked:"4-star"
            }  
        case "3-star":
            return{
                ...currState,
                filterChecked:"3-star"
            }
        case "2-star":
            return{
                ...currState,
                filterChecked:"2-star"
            }  
        case "no-star":
            return{
                ...currState,
                filterChecked:""
            } 
        case "1-star":
            return{
                ...currState,
                filterChecked:"1-star"
            }     
        case "no-cat-above-4":
            return{
                ...currState,
                results:action.payload
            }
        case "cat-above-4":
            return{
                ...currState,
                results:action.payload
            }
        case "no-cat-above-3":
            return{
                ...currState,
                results:action.payload
            }
        case "cat-above-3":
            return{
                ...currState,
                results:action.payload
            }
        case "no-cat-above-2":
            return{
                ...currState,
                results:action.payload
            }
        case "cat-above-2":
            return{
                ...currState,
                results:action.payload
            }
        case "no-cat-above-1":
            return{
                ...currState,
                results:action.payload
            }
        case "cat-above-1":
            return{
                ...currState,
                results:action.payload
            }
        case "clear-filter":
            return{
                ...currState,
                results:action.payload
            }
        case "search-order-by-address":
            const updatedProfile=action.payload;
            if(action.term!=="")
                updatedProfile.orders=action.payload.orders.filter((el)=>el.address.toLowerCase().includes(action.term.toLowerCase()));
            return{
                ...currState,
                userProfile: updatedProfile
            }
        case "search-order-by-price":
            const updatedPr=action.payload;
            updatedPr.orders=action.payload.orders.filter((el)=>Number(el.price)<Number(action.price));
            return{
                ...currState,
                userProfile: updatedPr
            }
        
        case "search-products-by-price":
            return{
                ...currState,
                results:[...action.payload.filter(el=>el.price<=action.price)]
            }
            
    }
}

export const ProfileContext=createContext();
export const GlobalContext=createContext();

export const GlobalProvider=(props)=>{
    const [state,dispatch]=useReducer(reducerF,initialState);
    const location=useLocation();
    const [accountPage,setAccountPage]=useState(location.pathname==="/profile"?"profile-info":location.pathname==="/profile/addresses"?"addresses-info":location.pathname==="/profile/wishlist"?"wishlist-info":location.pathname==="/cart"?"cart-view":"");

    const loadFromDB=async e=>{
        const userData=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/load-data`,{
            withCredentials:true
        });
        if(!userData.data.data.user){
            dispatch({type:"load-data-initial"});
            dispatch({type:"logout"});
        }
        else{    
            dispatch({type:"finally-update-data-from-db",payload:userData.data.data.user});
            dispatch({type:"login",payload:userData.data.data.user});
        }
    }

    useEffect(()=>{
        loadFromDB();
    },[state.showCart,accountPage]);

    return(
        <GlobalContext.Provider value={{state,dispatch}}>
            <ProfileContext.Provider value={[accountPage,setAccountPage]}>
                {
                    props.children
                }
            </ProfileContext.Provider>
            
        </GlobalContext.Provider>
    )
}
