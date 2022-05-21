import { useNavigate } from "react-router-dom";

function PaymentDoneModal(props){
    const body=document.querySelector("body");
    const navigation=useNavigate();
    return(
        <div className="modalBackground">
            <div className="modalContainer" style={{flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                <div onClick={e=>{
                    props.closeModal(false);
                    navigation("/");
                }} style={{position:"absolute", top:20,right:20, fontSize:"1.5rem",cursor:"pointer"}}>X</div>
                <h2>Congratulations!!!</h2>
                <p>Your order has been placed successfully.</p>
                <div style={{margin:"30px"}}>Go to orders to view your orders</div>
                <div onClick={e=>{
                    props.closeModal(false);
                    navigation("/orders");
                }} style={{width:"auto",padding:"10px",backgroundColor:"orange",borderRadius:"15px",cursor:"pointer"}}>Orders</div>
            </div>
        </div>
    )
}
export default PaymentDoneModal;