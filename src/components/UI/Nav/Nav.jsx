import React from "react";
import { Ancla } from "../Ancla/Ancla";

export const Nav = () => {
    return(
        <nav className="nav">
            <Ancla style="ancla" references="./Principal" textAncla="Principal" />
            <Ancla style="ancla" references="./ApiRick" textAncla="Api Rick" />
        </nav>
    )
}