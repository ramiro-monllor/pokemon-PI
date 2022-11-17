import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { detailsPokemon } from "../../redux/actions";

import style from "./PokemonDetails.module.css"

export default function PokemonDetails(){
    let dispatch = useDispatch()
    let params = useParams()

    const details = useSelector((state) => state.details)
    console.log(details)

    React.useEffect(() => {
        dispatch(detailsPokemon(params.id))
    },[dispatch])

    return(
        <div className={style.all}>
        {
            details.length > 0 ?

            <div className={style.card}>
                <h1 className={style.h1}>{details[0].name}</h1>
                <div className={style.divtext}>
                <div className={style.text}>
                <p>ID: {details[0].id}</p>
                <p>Attack: {details[0].attack}</p>
                <p>Defense: {details[0].defense}</p>
                <p>Speed: {details[0].speed}</p>
                <p>Height: {details[0].height}</p>
                <p>Weight: {details[0].weight}</p>
                </div>
                <div className={style.divimg}>
                <img src={details[0].img} className={style.img}/>
                <p className={style.types}>Type/s: {details[0].types.map((t) => {
                    return t + " "
                })}</p>
                </div>
                </div>
                <Link to="/home" className={style.link}><button className={style.button}>BACK HOME</button></Link>
            </div>
        :
        <div className={style.loading}>
            <img src="https://media.tenor.com/fSsxftCb8w0AAAAi/pikachu-running.gif" alt="pokemon" className={style.pikachu}/>
            <h3 className={style.texto}>Loading...</h3>    
        </div>
        }
        </div>
    )
}