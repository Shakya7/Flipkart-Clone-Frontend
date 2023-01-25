import { useNavigate } from "react-router-dom";

function PaymentDoneModal(props){
    const body=document.querySelector("body");
    const navigation=useNavigate();
    return(
        <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-sm z-10 flex justify-center items-center">
            <div className="w-1/2 h-[80vh] bg-white border border-gray-700 rounded-md flex justify-center p-4 relative flex-col items-center">
                <div onClick={e=>{
                    props.closeModal(false);
                    navigation("/");
                }} className="absolute top-3 right-3 text-xl cursor-pointer">X</div>
                <h2>Congratulations!!!</h2>
                <p>Your order has been placed successfully.</p>
                <div className="m-7">Go to orders to view your orders</div>
                <div onClick={e=>{
                    props.closeModal(false);
                    navigation("/orders");
                }} className="w-auto p-2.5 bg-orange-500 rounded-full cursor-pointer">Orders</div>
            </div>
        </div>
    )
}
export default PaymentDoneModal;