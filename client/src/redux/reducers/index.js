import { GET_POKEMONS, GET_TYPES, FILTER_TYPES, FILTER_FROM, ORDER_AZ, ORDER_ATTACK, GET_POKEMON_NAME, CREATE_POKEMON, DETAILS_POKEMON, CLEAR_DETAIL, DELETE_POKEMON } from "../actions";

const initialState = {
    pokemons: [],
    notFilter : [],
    types: [],
    details: []
}

export default function rootReducer(state = initialState,action){
    switch(action.type){
        case GET_POKEMONS:
            return{
                ...state,
                pokemons: action.payload,
                notFilter: action.payload
            }
        case GET_TYPES:
            return{
                ...state,
                types: action.payload
            }
        case DETAILS_POKEMON:
            return{
                ...state,
                details: action.payload
            }
        case CLEAR_DETAIL:
            return{
                ...state,
                details: []
            }
        case GET_POKEMON_NAME:
            return{
                ...state,
                pokemons: Array.isArray(action.payload) === true ? action.payload : []
            }
        case CREATE_POKEMON:
            return{
                ...state
            }
        case FILTER_TYPES:
            const allPokemons = state.notFilter
            const filterTypes = action.payload === "none" ? allPokemons : allPokemons.filter((p) => p.types.includes(action.payload))
            return{
                ...state,
                pokemons: filterTypes
            }
        case FILTER_FROM:
            const allPokemonsFROM = state.notFilter
            let filterFrom
            if(action.payload === "all"){
                filterFrom = allPokemonsFROM
            }
            if(action.payload === "api"){
                filterFrom = allPokemonsFROM.filter((p) => p.createdDB === false)
            }
            if(action.payload === "yours"){
                filterFrom = allPokemonsFROM.filter((p) => p.createdDB === true)
            }
            return{
                ...state,
                pokemons: filterFrom
            }
        case ORDER_AZ:
            let filterAZ
            if(action.payload === "none"){
                filterAZ = state.pokemons
            }else if(action.payload === "az"){
                filterAZ = state.pokemons.sort(function(a,b){
                    if(a.name.toUpperCase() < b.name.toUpperCase()) {return -1;}
                    if(a.name.toUpperCase() > b.name.toUpperCase()) {return 1;}
                    return 0;
                })
            }else if(action.payload === "za"){
                filterAZ = state.pokemons.sort(function(a,b){
                    if(a.name.toUpperCase() < b.name.toUpperCase()) {return 1;}
                    if(a.name.toUpperCase() > b.name.toUpperCase()) {return -1;}
                    return 0
                })
            }
            return{
                ...state,
                pokemons: filterAZ
            }
        case ORDER_ATTACK:
            let filterATTACK
            if(action.payload === "none"){
                filterATTACK = state.pokemons
            }else if(action.payload === "plus"){
                filterATTACK = state.pokemons.sort(function(a,b){
                    if(a.attack < b.attack) {return 1;}
                    if(a.attack > b.attack) {return -1;}
                    return 0;
                })
            }else if(action.payload === "less"){
                filterATTACK = state.pokemons.sort(function(a,b){
                    if(a.attack < b.attack) {return -1;}
                    if(a.attack > b.attack) {return 1;}
                    return 0
                })
            }
            return{
                ...state,
                pokemons: filterATTACK
            }
        case DELETE_POKEMON:
            return{
                ...state,
            }
        default:
            return{
                ...state
            }
    }
}