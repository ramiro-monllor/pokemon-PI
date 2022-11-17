import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Landing.module.css"

import poke from "../../imagenes/pokemon.png"
import linkedin from "../../imagenes/linkedin.png"
import github from "../../imagenes/github.png"

export default function Landing(){
    return(
        <div className={style.div}>
            <img className={style.img} src={poke} alt="letras"/>
            <div className={style.div2}>
            <li className={style.li}>
              <a href="https://www.linkedin.com/in/ramiro-monllor/"><img src={linkedin} alt="logo linkedin" width="30" height="20" style={{marginLeft: "5px"}}/></a>
              <a href="https://github.com/ramiro-monllor"><img src={github} alt="logo git" width="20" height="20" style={{marginLeft: "-5px"}}/></a>
            </li>
            <NavLink to="/home"><button className={style.button}>GO TO POKEDEX!</button></NavLink>
            </div>
        </div>
    )
}