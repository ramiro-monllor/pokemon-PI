import React from "react";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { getPokemonName } from "../../redux/actions";

import pokebola from "../../imagenes/pokebola.png"

import style from "./SearchBar.module.css"

export default function SearchBar(){

    let dispatch = useDispatch()

    const [name, setName] = useState("")

    const handleInput = (e) => {
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(getPokemonName(name))
        setName("")
    }

    return(
        <div className={style.div}>
            <div className={style.all}>
            <input type="text" placeholder="Search pokemon..." value={name} className={style.input}
            onChange={(e) => handleInput(e)}
            onKeyPress={(e) => {
                if(e.key === "Enter") {
                    handleClick(e)}
            }}
            />
            <button type="submit" className={style.button}
            onClick={(e) => handleClick(e)}
            >
            <img src={pokebola} alt="pokebola" width="14px" height="14px"/>
            </button>
            </div>
        </div>
    )
}