import page_not_found from "../../images/page_not_found.png";

export function PageNotFoundError(){
    return(
        <>
            <div className="w-full bg-white flex justify-center items-center overflow-hidden">
                <img src={page_not_found}/>
            </div>
        </>
    )
}