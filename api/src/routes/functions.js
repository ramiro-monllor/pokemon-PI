const axios = require("axios")
const {Pokemon, Type} = require("../db.js")

async function pokemonDB(){
    let pokemonsDB = await Pokemon.findAll({
        attributes:["id","name","img","attack","createdDB"],
        include: {
            model: Type,
            attributes: ["id", "name"],
            through : {
                attributes: [],
            },
        }
    });

    let typePokemonsDB = pokemonsDB.map((t) => {
        return {
            ...t.dataValues,
            types: t.types.map((t) => t.name)
        }
    })

    return typePokemonsDB
}

async function pokemonAPI(){
    const pokemonURLAPI = await axios.get("https://pokeapi.co/api/v2/pokemon");
    const pokemonURLAPIt = await axios.get(pokemonURLAPI.data.next);
    
    const pokemonURLS = pokemonURLAPI.data.results.map((p) => p.url)
    const pokemonURLSt = pokemonURLAPIt.data.results.map((p) => p.url)
    
    const allURLS = pokemonURLS.concat(pokemonURLSt)

    let arrayPokemons = [];

    for(i = 0; i < allURLS.length; i++){
        const poke = await axios(allURLS[i]);
        arrayPokemons.push({
            id: poke.data.id,
            name: poke.data.name,
            attack: poke.data.stats[1].base_stat,
            img: poke.data.sprites.other.home.front_default,
            types: poke.data.types.map((p) => p.type.name),
            createdDB: false
        })
    }
    return arrayPokemons
}

async function allPokemons(){
    let a = await pokemonAPI()
    let b = await pokemonDB()

    let arrayAll = a.concat(b)
    return arrayAll
}

async function pokemonByNameDB(value){
    let pokeByNameDB = await Pokemon.findAll({
        where: {
            name: value,
        },
          include: {
            model: Type,
            attributes: ["name"],
          },
    })
    if(!pokeByNameDB.length){
        return pokemonByNameAPI(value)
    }
    pokeByNameDB = pokeByNameDB.map((p) => {
        return{
            id: p.id,
            name: p.name,
            hp: p.hp,
            attack: p.attack,
            defense: p.defense,
            speed: p.speed,
            height: p.height,
            weight: p.weight,
            types: p.types.map((t) => t.name),
            img: p.img,
            createdDB: p.createdDB
        }        
    })
    return pokeByNameDB
}

async function pokemonByNameAPI(value){
    try{
        let pokeByNameApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase().trim()}`);

        let pokeDetail = {
            name: pokeByNameApi.data.name,
            id: pokeByNameApi.data.id,
            height: pokeByNameApi.data.height,
            weight: pokeByNameApi.data.weight,
            hp: pokeByNameApi.data.stats[0].base_stat,
            attack: pokeByNameApi.data.stats[1].base_stat,
            defense: pokeByNameApi.data.stats[2].base_stat,
            speed: pokeByNameApi.data.stats[5].base_stat,
            types: pokeByNameApi.data.types.map((p) => p.type.name),
            img: pokeByNameApi.data.sprites.other.home.front_default,
        };
        let pokeArray = []
        pokeArray.push(pokeDetail)
        return pokeArray
    }catch(err){
        return ("That pokemon does not exist")
    }
}

async function pokemonById(id){
    if (id.length > 8){
        let pokeByIdDB = await Pokemon.findOne({
            where: {
                id: id
            },
            include: {
                model: Type,
                attributes: ["id","name"],
            },
        });
        let pokeArray = []
        pokeArray.push(pokeByIdDB)
        pokeArray = pokeArray.map((p) => {
            return{
                id: p.id,
                name: p.name,
                hp: p.hp,
                attack: p.attack,
                defense: p.defense,
                speed: p.speed,
                height: p.height,
                weight: p.weight,
                types: p.types.map((t) => t.name),
                img: p.img,
                createdDB: p.createdDB
            }        
        })
        return pokeArray
    }else{
        return pokemonByNameAPI(id)
    }
}

async function getTypes(){
    let typesApiURL = await axios.get("https://pokeapi.co/api/v2/type")
    let typesAPI = typesApiURL.data.results.map((t) => t.name)
    console.log(typesAPI)

    typesAPI.map((t) => Type.findOrCreate({
        where: {
            name: t
        }
    }))

    let types = await Type.findAll({
        attributes : ["name","id"]
     })
     return types
}


async function createPokemon(name,height, weight, hp, attack, defense, speed, img, types){
    if(name){
        let pokeDB = await Pokemon.findOne({
            where:{
                name: name.toLowerCase().trim()
            }
        })
        if(pokeDB){
            return "El pokemon ya existe en la BD"
        }
        try{
            let pokeApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase().trim()}`)
            if(pokeApi){
                return "El pokemon ya existe en la API"
            }
        }catch(e){
            let newPokemon = await Pokemon.create({
                name: name,
                height: height,
                weight: weight,
                hp: hp,
                attack: attack,
                defense: defense,
                speed: speed,
                img: img
            })
    
            let typesDB = await Type.findAll({
                where: {
                    name: types
                },
            })
    
            newPokemon.addType(typesDB)
            return newPokemon
        }

    }else{
        return "Enter a name"
    }
}

module.exports = {
    pokemonDB, pokemonAPI, allPokemons, pokemonByNameDB, pokemonByNameAPI, pokemonById, getTypes, createPokemon
}