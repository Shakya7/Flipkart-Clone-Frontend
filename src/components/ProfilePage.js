import Categories from "./Categories";
import profile_avatar from "../images/profile_avatar_logo.png"
import cart_logo from "../images/cart_logo.png"
import { GlobalContext } from "./GlobalContext";
import { useNavigate,useLocation } from "react-router-dom";
import { useContext, useState, useEffect, createContext, useLayoutEffect} from "react";
import next_button from "../images/next_button.png";
import user_profile from "../images/user_profile.png";
import user_payments from "../images/user_payments.png";
import logout_logo from "../images/logout_logo.png";
import my_stuff_logo from "../images/my_stuff_logo.png";
import account_btm_banner from "../images/account_bottom_banner.png";
import axios from "axios";
import Addresses from "./Addresses";
import Wishlist from "./Wishlist";
import { ProfileContext } from "./GlobalContext";
import { ChangePassModal } from "./modals/ChangepassModal";
import Footer from "./Footer";
import SaveSpinner from "./loading-spinners/SaveSpinner";
import LoadingSpinner from "./loading-spinners/LoadingSpinner";

const ProfilePage=(props)=>{
    const {state,dispatch}=useContext(GlobalContext);
    const [accountPage,setAccountPage]=useContext(ProfileContext)
    const location=useLocation();
    const navigation=useNavigate();
    //console.log("URL",location.pathname);
    let email=state.userProfile?state.userProfile.email:"";
    let mobile=state.userProfile?state.userProfile.mobile:"";
    let gender=state.userProfile?state.userProfile.gender:"";

    const getProfileDetails=async()=>{
        const user=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/getUserDetails`,{
            withCredentials:true
        });
        return user;
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

    const [profileDetails,setProfileDetails]=useState({
        profile_edit:false,
        profile_val_fname:state.userProfile?state.userProfile.name.split(" ")[0]:"",
        profile_val_lname:state.userProfile?state.userProfile.name.split(" ")[1]:"",
        profile_val_email:email,
        profile_val_mobile:mobile,
        gender_val:gender,
        email_edit:false,
        mobile_edit:false
    });
    const [addAddressBttn, setAddAddressBttn]=useState(true);
    const [newAddress,setNewAddress]=useState("");
    const [showModal,setShowModal]=useState(false);
    const [isLoading,setIsLoading]=useState(false);
    const body=document.querySelector("body");

    useLayoutEffect(()=>{
        checkLoggedIn();
    },[])
    useLayoutEffect(()=>{
        const func1=async()=>{
            const val=await getProfileDetails()
            setProfileDetails({
                ...profileDetails,
                profile_val_fname:val.data.data.user.name.split(" ")[0],
                profile_val_lname:val.data.data.user.name.split(" ")[1],
                profile_val_mobile:val.data.data.user.mobile,
                gender_val:val.data.data.user.gender
            })
        }
        func1();
    },[])
    useLayoutEffect(()=>{

    },[isLoading])

    
    useEffect(()=>{

        if(showModal)
            body.style.overflow="hidden";
        else{    
            body.style.overflow="auto";
        }    
    },[profileDetails,accountPage,newAddress,state.addresses,showModal])

    /*const addAddress=async ()=>{
        try{
            const user= await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/add-address`,{
                address:newAddress
            },{withCredentials:true})
            return user.data.data;
        }catch(err){
        }
    }*/
    return(
        <div className="relative">
            <Categories/>
            <div className="w-full h-auto bg-gray-200 flex gap-10 items-start justify-center py-5">
                <div className="flex flex-col h-1/2 bg-gray-200 gap-3">
                    <div className="bg-blue-900 w-full h-auto flex items-center justify-start gap-4 p-2.5 rounded-md shadow-lg shadow-gray-500">
                        <div className="w-[60px] h-[60px] flex items-center justify-center">
                            <img className="w-12 h-12 rounded-full" src={profile_avatar}/>
                        </div>
                        <div className="flex flex-col text-white">
                            <div className="text-xs mb-1.5">Hello,</div>
                            <div>{state.userProfile?state.userProfile.name:""}</div>
                        </div>     
                    </div>
                    <div className="bg-blue-900 w-full h-auto rounded-md shadow-lg shadow-gray-500">
                        <div onClick={e=>navigation("/orders")} className="account-sub-sections flex justify-between w-full h-12">
                            <div className="flex justify-start text-white font-light items-center gap-3 pl-6">
                                <div><img className="w-8" src={cart_logo}/></div>
                                <div>MY ORDERS</div>
                            </div>
                            <div className="flex items-center">
                                <img className="w-8" src={next_button}/>
                            </div>
                        </div>
                        <div className="w-full h-px bg-gray-400"/>
                        <div className="flex justify-between w-full h-12">
                            <div className="flex justify-start text-gray-400 font-normal items-center gap-4 pl-6">
                                <div><img className="w-8" src={user_profile}/></div>
                                <div>ACCOUNT SETTINGS</div>
                            </div>
                            <div className="flex invisible items-center">
                                <img className="w-8" src={next_button}/>
                            </div>
                        </div>
                        <div onClick={()=>{
                            setAccountPage("profile-info");
                            navigation("/profile");
                        }} className="account-sub-sections flex justify-center items-center w-full h-12 text-white" style={{backgroundColor:`${accountPage==="profile-info"?"#344CB7":"inherit"}`}}>
                            Profile Information
                        </div>
                        <div onClick={()=>{
                            setAccountPage("addresses-info");
                            navigation("/profile/addresses");
                            }} className="account-sub-sections flex justify-center items-center w-full h-12 text-white" style={{backgroundColor:`${accountPage==="addresses-info"?"#344CB7":"inherit"}`}}>
                            Manage Addresses
                        </div>
                        <div className="w-full h-px bg-gray-400"/>
                        <div className="account-sub-sections flex justify-between w-full h-12">
                            <div className="flex justify-start text-white font-light items-center gap-3 pl-6">
                                <div><img className="w-8" src={user_payments}/></div>
                                <div>PAYMENTS</div>
                            </div>
                            <div className="flex items-center">
                                <img className="w-8" src={next_button}/>
                            </div>
                        </div>
                        <div className="flex justify-between w-full h-12">
                            <div className="flex justify-start text-gray-500 font-normal items-center gap-3 pl-6">
                                <div><img className="w-8" src={my_stuff_logo}/></div>
                                <div>MY STUFF</div>
                            </div>
                            <div className="flex invisible items-center">
                                <img className="w-8" src={next_button}/>
                            </div>
                        </div>
                        <div className="account-sub-sections flex justify-center items-center w-full h-12 text-white">
                            {"My Reviews & Ratings"}
                        </div>
                        <div className="account-sub-sections flex justify-center items-center w-full h-12 text-white">
                            All Notifications
                        </div>
                        <div onClick={e=>{
                            setAccountPage("wishlist-info");
                            navigation("wishlist");
                            }} className="account-sub-sections flex justify-center items-center w-full h-12 text-white" style={{backgroundColor:`${accountPage==="wishlist-info"?"#344CB7":"inherit"}`}}>
                            My Wishlist
                        </div>
                        <div className="w-full h-px bg-gray-400"/>
                        <div onClick={
                            async e=>{
                                dispatch({type:"logout"});
                                await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/logout`,{
                                    withCredentials:true
                                });
                                navigation("/");
                                window.location.reload();
                            }
                        } className="account-sub-sections flex justify-between w-full h-12">
                            <div className="flex justify-start text-white font-normal items-center gap-3 pl-6">
                                <div><img className="w-8" src={logout_logo}/></div>
                                <div>Logout</div>
                            </div>
                            <div className="flex invisible items-center">
                                <img className="w-8" src={next_button}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-[65%] h-auto shadow-lg shadow-gray-500">
                    {accountPage==="profile-info"?
                    <form className="min-w-[65%] h-auto bg-white flex p-[4%] flex-col gap-[80px]">
                        <div className="form-personal-info" syle={{display:"flex",flexDirection:"column",gap:"10px"}}> 
                            <div style={{display:"flex",gap:"5%"}}>
                                <div style={{fontSize:"1.3rem",fontWeight:"bold"}}>Personal Information</div>
                                <div onClick={e=>{
                                    setProfileDetails({
                                        ...profileDetails,
                                        profile_edit:!profileDetails.profile_edit
                                    })
                                }} style={{color:"blue",cursor:"pointer"}}>{profileDetails.profile_edit?<p>Cancel</p>:<p>Edit</p>}</div>
                            </div>
                            <div style={{display:"flex",marginTop:"3%",gap:"2%"}}>
                                <input defaultValue={profileDetails.profile_val_fname} type="text" disabled={profileDetails.profile_edit?false:true} onChange={e=>setProfileDetails({
                                    ...profileDetails,
                                    profile_val_fname:e.target.value
                                })} placeholder="First name..."/>
                                <input type="text" defaultValue={profileDetails.profile_val_lname} disabled={profileDetails.profile_edit?false:true} onChange={e=>setProfileDetails({
                                    ...profileDetails,
                                    profile_val_lname:e.target.value
                                })} placeholder="Last name..."/>
                                {profileDetails.profile_edit?<div onClick={
                                    async e=>{
                                        setIsLoading(true);
                                        const user=await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/update-name`,{
                                            name:profileDetails.profile_val_fname+" "+profileDetails.profile_val_lname,
                                            gender:profileDetails.gender_val
                                            
                                        },{ withCredentials:true});
                                        setProfileDetails({
                                            ...profileDetails,
                                            profile_edit:!profileDetails.profile_edit,
                                        });
                                        setIsLoading(false);
                                        //window.location.reload(true);
                                    }
                                } style={{width:"100px",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#2874f0",color:"white",borderRadius:"3px",cursor:"pointer"}}>{!isLoading?"SAVE":<SaveSpinner/>}</div>:""}
                            </div>
                            <div style={{display:"flex", flexDirection:"column",marginTop:"3%"}}>
                                <p>Your Gender</p>
                                <div style={{display:"flex",marginTop:"2%"}}>
                                    <div>
                                        <input checked={profileDetails.gender_val==="Male"?true:false} disabled={profileDetails.profile_edit?false:true} type="radio" name="gender" value="Male" onChange={e=>{
                                            setProfileDetails({
                                                ...profileDetails,
                                                gender_val:e.target.value
                                            })
                                        }}/>
                                        <label>Male</label>
                                    </div>
                                    <div style={{marginLeft:"3%"}}>
                                        <input checked={profileDetails.gender_val==="Female"?true:false} disabled={profileDetails.profile_edit?false:true} type="radio" name="gender" value="Female" onChange={e=>{
                                            setProfileDetails({
                                                ...profileDetails,
                                                gender_val:e.target.value
                                            })
                                        }}/>
                                        <label>Female</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-email-address" style={{display:"flex",flexDirection:"column"}}>
                            <div style={{display:"flex",gap:"5%"}}>
                                <div style={{fontSize:"1.3rem",fontWeight:"bold"}}>Email Address</div>
                                <div style={{color:"blue",cursor:"pointer",display:"flex",gap:"15px"}}>{profileDetails.email_edit?
                                    <div>
                                        <p onClick={e=>{
                                        setProfileDetails({
                                        ...profileDetails,
                                        email_edit:!profileDetails.email_edit
                                        })
                                        }}>Cancel</p>
                                    </div>:
                                    <p onClick={e=>{
                                    setProfileDetails({
                                    ...profileDetails,
                                    email_edit:!profileDetails.email_edit
                                    })
                                    }}>Edit</p>}
                                    <p onClick={e=>setShowModal(true)}>Change password</p>
                                </div>
                            </div>
                            <div style={{display:"flex",marginTop:"3%",gap:"2%"}}>
                                <input onChange={
                                    e=>{
                                        setProfileDetails({
                                            ...profileDetails,
                                            profile_val_email:e.target.value
                                        })
                                    }
                                } type="text" disabled={profileDetails.email_edit?false:true} placeholder="Email address..."/>
                                {profileDetails.email_edit?<div onClick={
                                    async e=>{
                                        try{
                                        setIsLoading(true);
                                        const user=await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/update-email`,{
                                            email:profileDetails.profile_val_email
                                        },{ withCredentials:true});
                                        setProfileDetails({
                                            ...profileDetails,
                                            email_edit:!profileDetails.email_edit,
                                        });
                                        setIsLoading(false);
                                        //window.location.reload(true);
                                        }catch(err){
                                            setProfileDetails({
                                                ...profileDetails,
                                                email_edit:!profileDetails.email_edit,
                                            });
                                            setIsLoading(false);
                                        }
                                    }
                                } style={{width:"100px",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#2874f0",color:"white",borderRadius:"3px",cursor:"pointer"}}>{!isLoading?"SAVE":<SaveSpinner/>}</div>:""}
                            </div>
                        </div>
                        <div className="form-mobile">
                            <div style={{display:"flex",gap:"5%"}}>
                                <div style={{fontSize:"1.3rem",fontWeight:"bold"}}>Mobile Number</div>
                                <div onClick={e=>{
                                    setProfileDetails({
                                        ...profileDetails,
                                        mobile_edit:!profileDetails.mobile_edit
                                    })
                                }} style={{colCancelor:"blue",cursor:"pointer"}}><p style={{color:"blue"}}>Edit</p></div>
                            </div>
                            <div style={{display:"flex",marginTop:"3%",gap:"2%"}}>
                                <input onChange={
                                    e=>{
                                        setProfileDetails({
                                            ...profileDetails,
                                            profile_val_mobile:e.target.value
                                        })
                                    }
                                } defaultValue={profileDetails.profile_val_mobile} type="text" placeholder="Mobile Number..." disabled={profileDetails.mobile_edit?false:true} />
                                {profileDetails.mobile_edit?<div onClick={
                                    async e=>{
                                        setIsLoading(true);
                                        const user=await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/update-mobile`,{
                                            mobile:profileDetails.profile_val_mobile
                                        },{ withCredentials:true});
                                        setProfileDetails({
                                            ...profileDetails,
                                            mobile_edit:!profileDetails.mobile_edit,
                                        });
                                        setIsLoading(false);
                                        //window.location.reload(true);
                                    }
                                } style={{width:"100px",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#2874f0",color:"white",borderRadius:"3px",cursor:"pointer"}}>{!isLoading?"SAVE":<SaveSpinner/>}</div>:""}
                            </div>
                        </div>
                        <div style={{width:"",display:"flex",flexDirection:"column",}}>
                            <p><b>FAQs</b></p>
                            <p className="faq-sec-1"><b>What happens when I update my email address (or mobile number)?</b></p>
                            <p className="faq-sec">Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).</p>
                            <p className="faq-sec"><b>When will my Flipkart account be updated with the new email address (or mobile number)?</b></p>
                            <p className="faq-sec">It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</p>
                            <p className="faq-sec"><b>What happens to my existing Flipkart account when I update my email address (or mobile number)?</b></p>
                            <p className="faq-sec">Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.</p>
                            <p className="faq-sec"><b>Does my Seller account get affected when I update my email address?</b></p>
                            <p className="faq-sec">Flipkart has a 'single sign-on' policy. Any changes will reflect in your Seller account also.</p>
                            
                        </div>
                        <div style={{color:"#2874f0"}} className="deactivate">
                            Deactivate Account
                        </div>
                    </form>:(
                    accountPage==="addresses-info"?
                    <div >
                        <form style={{minWidth:"65%",height:"auto", backgroundColor:"white",display:"flex",padding:"4%",flexDirection:"column",gap:"20px"}}>
                            <div style={{fontSize:"1.3rem", fontWeight:"bold"}}>Manage Addresses</div>
                            {addAddressBttn?<div onClick={e=>setAddAddressBttn((prev)=>!prev)} style={{display:"flex",justifyContent:"flex-start",alignItems:"center", color:"blue", borderWidth:"1px" ,borderColor:"grey", borderStyle:"solid", padding:"2%", fontSize:"1rem", cursor:"pointer"}}>
                                <div style={{marginRight:"3%",fontSize:"1.2rem"}}>+</div>
                                <div>ADD A NEW ADDRESS</div>
                            </div>:
                            <div>
                                <textarea style={{width:"100%",height:"5vmax", padding:"2%"}} onChange={e=>setNewAddress(e.target.value)} />
                                <div style={{display:"flex", justifyContent:"flex-start",gap:"2%",color:"white"}}>
                                    <div onClick={
                                        async e=>{
                                            await dispatch({type:"add-address",payload:newAddress});
                                            await dispatch({type:"add-address-to-DB"});
                                            navigation("/profile");
                                            window.location.reload(true);
                                        }
                                    } style={{width:"9vmax", padding:"2%", backgroundColor:"#2874f0",textAlign:"center",cursor:"pointer",borderRadius:"4px"}}>SAVE</div>
                                    <div onClick={e=>setAddAddressBttn((prev)=>!prev)} style={{width:"9vmax", padding:"2%",backgroundColor:"#fb7a1b",textAlign:"center",cursor:"pointer",borderRadius:"4px"}}>CANCEL</div>
                                </div>    
                            </div>
                            }   
                            {
                            state.userProfile && state.userProfile.addresses?
                            <div>
                                {state.userProfile.addresses.map((el,i)=>
                                    <Addresses key={i} element={el}/>
                                )}
                            </div>
                            :
                            <div>
                                Sorry, there are no addresses saved for you
                            </div>
                            }
                        </form>
                    </div>:
                    accountPage==="wishlist-info"?
                    <div>
                        <div style={{backgroundColor:"white",padding:"4%"}}>
                            <p style={{fontSize:"1.3rem", fontWeight:"bold"}}>My Wishlist</p>
                            {
                            state.wishlist.length?
                                <div style={{display:"flex",flexDirection:"column"}}>
                                {
                                    state.wishlist.map((el,i)=><Wishlist item={el} key={i}/>)
                                }    
                                </div>:
                                <div><p>Sorry, you dont have any items added to wishlist</p></div>
                                

                            }
                        </div>
                    </div>:
                    <div>
                        Last case
                    </div>
                    )}
                    <div style={{width:"100%"}}>
                        <img style={{width:"inherit"}} src={account_btm_banner}/>
                    </div>
                </div>   
            </div>
            <Footer/>
            {showModal && <ChangePassModal closeModal={setShowModal}/>}
            {isLoading?<LoadingSpinner/>:""}
        </div>
    )
}
export default ProfilePage;