import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS"
export const GET_TYPES = "GET_TYPES"
export const FILTER_TYPES = "FILTER_TYPES"
export const FILTER_FROM = "FILTER_FROM"
export const ORDER_AZ = "ORDER_AZ"
export const ORDER_ATTACK = "ORDER_ATTACK"
export const CLEAR_FILTERS = "CLEAR_FILTERS"
export const GET_POKEMON_NAME = "GET_POKEMON_NAME"
export const CREATE_POKEMON = "CREATE_POKEMON"
export const DETAILS_POKEMON = "DETAILS_POKEMON"
export const CLEAR_DETAIL = "CLEAR_DETAIL"
export const DELETE_POKEMON = "DELETE_POKEMON"

// const URL = "http://localhost:3001"
const URL = "https://pokemon-pi-production-aeba.up.railway.app"

export function getPokemons(){
    return async function(dispatch){
        let json = await axios.get(`${URL}/api/pokemons`)
        return dispatch({
            type: GET_POKEMONS,
            payload: json.data
        })
    }
}

export function getTypes(){
    return async function(dispatch){
        let json = await axios.get(`${URL}/api/types`)
        return dispatch({
            type: GET_TYPES,
            payload: json.data
        })
    }
}

export function detailsPokemon(id){
    return async function(dispatch){
        try{
            let json = await axios.get(`${URL}/api/pokemons/${id}`)
            return dispatch({
                type: DETAILS_POKEMON,
                payload: json.data
            })
        }catch(error){
            console.log(error.message)
        }
    }
}

export function getPokemonName(name){
    return async function(dispatch){
        try{
        let json = await axios.get(`http://localhost:3001/api/pokemons?name=${name}`)
        return dispatch({
            type: GET_POKEMON_NAME,
            payload: json.data
        })
    }catch(e){
        return ("That pokemon does not exist")
        // alert("Sorry, the Pokemon you are looking for doesn't exists :(");
    }
    }
}

export function createPokemons(payload){
        return async function(){
            let json = await axios.post(`${URL}/api/pokemons`,payload)
            return json
        }
}

export function filterTypes(payload){
    return{
        type: FILTER_TYPES,
        payload: payload
    }
}

export function filterFrom(payload){
    return{
        type: FILTER_FROM,
        payload : payload
    }
}

export function orderAZ(payload){
    return{
        type: ORDER_AZ,
        payload: payload
    }
}

export function orderATTACK(payload){
    return{
        type: ORDER_ATTACK,
        payload: payload
    }
}

export function clearDetail(payload){
    return{
        type: CLEAR_DETAIL,
        payload: payload
    }
}

export function deletePokemon(idPokemon){
    return async function(dispatch){
        try{
            return axios.delete(`${URL}/api/pokemons/`+idPokemon)
        }catch(e){
            console.log(e.message)
        }
    }
}