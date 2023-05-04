import React from "react";
import Facebook from "../../../Images/facebook.png";
import Instagram from "../../../Images/instagram.png";
import Github from "../../../Images/github.png";

export const FooterHome = () => {
    return(
        <>
         <hr className="hr"/>
         
         <div className="contenedorFooter">
            <h2 className="nombre">Kevyn Santiago Pineda</h2>

            <div className="imgs">
            <img className="iconos" src={Facebook} alt="facebook" />
            <img className="iconos" src={Instagram} alt="instagram" />
            <img className="iconos" src={Github} alt="github" />
            </div>
         </div>
        </>
       
    )
}