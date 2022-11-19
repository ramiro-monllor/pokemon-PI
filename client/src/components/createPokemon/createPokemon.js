import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link , useHistory } from "react-router-dom";
import { getTypes, createPokemons } from "../../redux/actions";

import style from "./createPokemon.module.css"


export default function CreatePokemon(){
    let dispatch = useDispatch()
    let history = useHistory()
    const types = useSelector((state) => state.types)
    const pokemons = useSelector((state) => state.notFilter)
    const [error, setError] = useState({})
    
    function validate(input){
        let errors = {}
    
        if(!input.name){
            errors.name = "The pokemon must have a name."
        }
        if(input.name.search("[0-9]") !== -1) {
            errors.name = "The name must not contain numbers."
        }
        if(input.name.search("[^A-Za-z0-9]") !== -1) {
            errors.name = "The name must not contain symbols or spaces."
        }
        if(pokemons.find(p => p.name === input.name)){
            errors.name = "There is already a pokemon with that name, try to create it with another"
        }
        if(parseInt(input.attack) < 1 || parseInt(input.attack) > 100){
            errors.attack = "The attack value must be between 1 and 100."
        }
        if(parseInt(input.defense) < 1 || parseInt(input.defense) > 115){
            errors.defense = "The defense value must be between 1 and 115."
        }
        if(parseInt(input.hp) < 1 || parseInt(input.hp) > 150){
            errors.hp = "The hp value must be between 1 and 150."
        }
        if(parseInt(input.speed) < 1 || parseInt(input.speed) > 115){
            errors.speed = "The speed value must be between 1 and 115."
        }
        if(parseInt(input.height) < 1 || parseInt(input.height) > 40){
            errors.height = "The height value must be between 1 and 40."
        }
        return errors
    }
    
    React.useEffect(() => {
        dispatch(getTypes())
    },[dispatch])

    const [input, setInput] = useState({
    name : "",
    attack: "",
    defense: "",
    hp: "",
    speed: "",
    height: "",
    weight: "",
    img : "",
    types: []
    })

    const [type, setType] = useState({
        typeO: "",
        typeT: ""
    })

    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setError(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
        console.log(input)
    }

    const handleSelect = (e) => {
        if(input.types.includes(e.target.value)){
            return alert("The pokemon cannot have two identical types.")
        }
        setType({
            ...type,
            [e.target.name] : e.target.value
        })
        if(e.target.name === "typeO"){
            setInput({
                ...input,
                types: [e.target.value,type.typeT]
            })
        }
        if(e.target.name === "typeT"){
            setInput({
                ...input,
                types: [type.typeO,e.target.value]
            })
        }
        setError(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(input.types.length === 0){
            return alert("A Pokemon must have at least one type.")
         }
        let data = {...input}
        for(let i in data){
            if(data[i] === ""){
                data[i] = undefined
            }
        }
        dispatch(createPokemons(data))
        setInput({
            name : "",
            attack: "",
            defense: "",
            hp: "",
            speed: "",
            height: "",
            weight: "",
            img : "",
            types: []
        })
        alert("The pokemon has been successfully created :)")
        history.push("/home")
    }

    return(
        <div className={style.all}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className={style.create}>
                    <h1 className={style.h1}>Create Pokemon</h1>

                <div className={style.divtextimg}>
                <div className={style.divtext}>

                <div className={style.diverror}>
                    <label className={style.label}>Name: </label>
                    <input type="text" name="name" value={input.name} onChange={(e) => handleInput(e)} className={style.input}/>
                    {error.name && (
                        <p className={style.error}>{error.name}</p>
                        )}
                </div>

                <div className={style.diverror}>
                    <label className={style.label}>Attack: </label>
                    <input type="number" name="attack" value={input.attack} onChange={(e) => handleInput(e)} className={style.input}/>
                    {error.attack && (
                        <p className={style.error}>{error.attack}</p>
                        )}
                </div>
                
                <div className={style.diverror}>
                    <label className={style.label}>Defense: </label>
                    <input type="number" name="defense" value={input.defense} onChange={(e) => handleInput(e)} className={style.input}/>
                    {error.defense && (
                        <p className={style.error}>{error.defense}</p>
                        )}
                </div>

                <div className={style.diverror}>
                    <label className={style.label}>HP: </label>
                    <input type="number" name="hp" value={input.hp} onChange={(e) => handleInput(e)} className={style.input}/>
                    {error.hp && (
                        <p className={style.error}>{error.hp}</p>
                    )}
                </div>

                <div className={style.diverror}>
                    <label className={style.label}>Speed: </label>
                    <input type="number" name="speed" value={input.speed} onChange={(e) => handleInput(e)} className={style.input}/>
                    {error.speed && (
                        <p className={style.error}>{error.speed}</p>
                        )}
                </div>

                <div className={style.diverror}>
                    <label className={style.label}>Height: </label>
                    <input type="number" name="height" value={input.height} onChange={(e) => handleInput(e)} className={style.input}/>
                    {error.height && (
                        <p className={style.error}>{error.height}</p>
                        )}
                </div>

                <div>
                    <label className={style.label}>Weight: </label>
                    <input type="number" name="weight" value={input.weight} onChange={(e) => handleInput(e)} className={style.input}/>
                </div>

                <div>
                    <label className={style.label}>Types: </label>
                    <select defaultValue={"none"} name="typeO" onChange={(e) => handleSelect(e)} className={style.select}>
                    <option value="none" disabled>Select type...</option>
                        {types.map((t) => {
                            return(
                                <option value={t.name}>{t.name}</option>
                                )
                            })}
                    </select>
                    <select defaultValue={"none"} name="typeT" onChange={(e) => handleSelect(e)} className={style.select}>
                    <option value="none" disabled>Select type...</option>
                        {types.map((t) => {
                            return(
                                <option value={t.name}>{t.name}</option>
                                )
                            })}
                    </select>
                </div>
                    </div>


                <div className={style.divimg}>
                    <label className={style.label}>Image:</label>
                    <input type="text" name="img" value={input.img} onChange={(e) => handleInput(e)} className={style.inputimg}/>
                    <img src={input.img? input.img : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/481px-Pokebola-pokeball-png-0.png"} alt="img" className={style.img}/>
                </div>
                </div>

                <div className={style.divbutton}>
                <Link to="/home"><button className={style.button}>
                    Go Home
                </button></Link>

                {
                    !error.name && !error.attack && !error.defense && !error.hp && !error.speed && !error.height ?  
                    <button type="submit" className={style.button}>
                            Create Pokemon
                         </button> : null
                }
                </div>

                </div>
            </form>
        </div>
    )
}