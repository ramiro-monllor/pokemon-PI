import React from "react";
import style from "./Pagination.module.css"

export default function Pagination({pokemons, pokemonsPerPage, paginado, currentPage, setCurrentPage}){
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(pokemons.length/pokemonsPerPage); i++){
        pageNumbers.push(i)
    }

    const handlePrev = () => {
        setCurrentPage(currentPage - 1)
    }

    const handleNext = () => {
        setCurrentPage(currentPage + 1)
    }

    return(
        <nav>
            <ul className={style.paginado}>

                {currentPage !== 1 ? <button onClick={() => handlePrev()} className={style.flechas}>Prev</button> : null}

                {
                    pageNumbers && pageNumbers.map((number) => (
                        <button key={number}
                        onClick={() => paginado(number)}
                        className={number === currentPage ? `${style.active}` : `${style.desactive}`}>
                        {number}
                        </button>
                    ))
                }

                {currentPage !== pageNumbers.length ? <button onClick={() => handleNext() } className={style.flechas}>Next</button> : null}


            </ul>
        </nav>
    )
}