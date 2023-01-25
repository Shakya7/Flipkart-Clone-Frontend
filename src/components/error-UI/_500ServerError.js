import _500_error from "../../images/_500_error.png";

export function _500ServerError(){
    return(
        <div className="w-full bg-white flex justify-center items-center overflow-hidden">
            <img className="h-full" src={_500_error}/>
        </div>
    )
}