import React from "react";
import {useDispatch, useSelector} from "react-redux"
import { useState } from "react";
import { clearDetail, getPokemons } from "../../redux/actions";

import style from "./Home.module.css"

import PokemonCard from "../PokemonCard/PokemonCard";
import Filter from "../Filter/Filter";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";

export default function Home(){
    
    let dispatch = useDispatch()
    const pokemons = useSelector((state) => state.pokemons)
    const allPoke = useSelector((state) => state.notFilter)

    const [order, setOrder] = useState(" ")
    console.log(order)

    React.useEffect(() => {
        dispatch(getPokemons())
        dispatch(clearDetail())
    },[dispatch])

    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12)
    console.log(setPokemonsPerPage)
    
    const lastPokemon = currentPage * pokemonsPerPage
    const firstPokemon = lastPokemon - pokemonsPerPage
    const currentPokemons = pokemons.slice(firstPokemon,lastPokemon)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    if(!allPoke.length){
        return(
            <div>
                <SearchBar
                />
                <Filter
                setCurrentPage={setCurrentPage}
                setOrder={setOrder}
                />
            <img src="https://cdn.dribbble.com/users/621155/screenshots/2835314/simple_pokeball.gif" alt="loading" className={style.loading}/>
          </div>
        )
    }else if(currentPokemons.length){
        return(
            <div>
                <SearchBar
                />
                <Filter
                setCurrentPage={setCurrentPage}
                setOrder={setOrder}
                />
                <ul className={style.background}>
                    {
                        currentPokemons.map((p) => (
                                <PokemonCard
                                id = {p.id}
                                key = {p.id}
                                name = {p.name}
                                img = {p.img}
                                types = {p.types}
                                />
                        ))
                    }
                    
                </ul>
                <Pagination
                pokemons={pokemons}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pokemonsPerPage={pokemonsPerPage}
                paginado={paginado}
                />
            </div>
        )
    }else if(allPoke && currentPokemons.length === 0){
        return (
            <div>
                 <SearchBar
                />
                <Filter
                setCurrentPage={setCurrentPage}
                setOrder={setOrder}
                />
            <div className={style.encontrado}>
                 <img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c319.png" alt="pokemon" className={style.pikachu}/>
                 <h1 className={style.texto}>Pokemon not found</h1>
            </div>
        </div>
        )
    }
}