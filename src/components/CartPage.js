import { useEffect,useContext, useState } from "react";
import CartAmount from "./CartAmount";
import CartProducts from "./CartProducts";
import { GlobalContext } from "./GlobalContext";
import axios from "axios";
import PaymentDoneModal from "./modals/PaymentDoneModal";
import Footer from "./Footer";
import { showAlert } from "./utils/showAlert";
 
const CartPage=(props)=>{
    const {state,dispatch}=useContext(GlobalContext);
    const [paymentSt,setPaymentSt]=useState(false);

    const initPayment = (data) => {
		const options = {
			key: "rzp_test_qUJmI8cKYQn0s3",
			amount: Number(data.price),
			currency: data.currency,
			name: "Total Amount",
			description: "Subtotal amount",
			//image: book.img,
			order_id: data.id,
			handler: async (response) => {
				try {
					const verifyUrl = "https://flipkart-clone-mernstack.herokuapp.com/api/v1/payment/verify";
					await axios.post(verifyUrl, response,{withCredentials:true})
					.then(async function (res){
                        setPaymentSt(true);
                        const user=await axios.patch("https://flipkart-clone-mernstack.herokuapp.com/api/v1/payment/success",{
                            orders:state.billingProducts,
                            address:state.billingAddress,
                            price:state.finalPrice
                        },{ withCredentials:true});
                        await dispatch({type:"finally-update-data-from-db",payload:user.data.data.user});
                        
					})
					.catch(function (err){
						console.log(err.message);
					})
				} catch (error) {
					//Do something
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

	const handlePayment = async (val) => {
		try {
			const orderUrl = "https://flipkart-clone-mernstack.herokuapp.com/api/v1/payment/orders";
			const { data } = await axios.post(orderUrl, { amount: Number(val) },{withCredentials:true});
			initPayment(data.data);
		} catch (error) {
			showAlert("failure","ERROR: Payment denied by Payment gateway!!!");
		}
	};

    useEffect(()=>{

        if(!state.isLoggedIn){
            dispatch({type:"show-cart-disable"});
        }
        else
            dispatch({type:"show-cart-enable"});
    },[state.showCart,state.isLoggedIn,paymentSt]);
    return(
		<div>
			<div style={{backgroundColor:"#EEEEEE", display:"flex", height:"auto", padding:"20px", justifyContent:"space-between"}}>
				<CartProducts/>
				{state.cart!==0?<CartAmount handleP={handlePayment}/>:""}
				{
				paymentSt?<PaymentDoneModal val={paymentSt} closeModal={setPaymentSt}/>:""
				}
        	</div>
			<Footer/>
		</div>
        
    )
}
export default CartPage;