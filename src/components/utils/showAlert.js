const hideAlert=()=>{
    const el=document.querySelector(".alert");
    if(el)
        el.parentElement.removeChild(el)
}

export const showAlert=(response,message)=>{
    hideAlert();
    const markup= `<div class="alert alert--${response}">${message}</div>`;
    document.querySelector("body").insertAdjacentHTML("afterbegin",markup);
    window.setTimeout(hideAlert,3000);
}