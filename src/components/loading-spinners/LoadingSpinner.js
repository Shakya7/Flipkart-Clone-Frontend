function  LoadingSpinner(){
    return(
        <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-sm z-10 flex justify-center items-center" style={{backdropFilter: "blur(10px)"}}>
            <div className="loading-spinner">
                <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="text-stone-900 font-bold">Loading...</div>
            </div>
        </div>
    )
}
export default LoadingSpinner