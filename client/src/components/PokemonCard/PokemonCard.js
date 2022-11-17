import React from "react";
import { Link } from "react-router-dom";

import style from "./PokemonCard.module.css"

export default function PokemonCard({img,id,types,name}){
    return(
        <Link to={`/home/${id}`} className={style.link}>
        <div className={style.card}>
            <img src={img} alt="pokemon" className={style.img}/>
            <h3 className={style.h3}>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
            <h5 className={style.h5}>Type/s: {types.map((t => `${t} `))}</h5>
        </div>
        </Link>
    )
}