import React from "react";

export const Input = ( { id ,tipo ,valor, estilo, placeholder, evento, habilitado} ) =>{
    return(
        <>
            <input id={id} type={tipo} value={valor} className={estilo} placeholder={placeholder} onChange={evento} disabled={habilitado}/>
        </>
    )
}