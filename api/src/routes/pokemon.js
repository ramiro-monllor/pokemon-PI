const { Router } = require('express');
const { Pokemon } = require("../db.js")
const {pokemonDB, pokemonAPI, allPokemons, pokemonByNameDB, pokemonByNameAPI, pokemonById, createPokemon, getTypes} = require("./functions.js")
const router = Router();

// router.get("/", async (req,res,next) => {
//     try{
//         let {name} = req.query
//         let pokemons = await allPokemons()

//         if(name){
//             let namePoke = pokemons.find((p) => p.name === name)
//             if(namePoke){
//                 return res.status(200).send(namePoke)
//             }
//             return res.status(400).send("Pokemon no encontrado")
//         }
//         res.status(200).send(pokemons)
//     }catch(err){
//         res.status(400).send(err)
//     }
// })

// router.get("/:idPokemon", async (req,res,next) => {
//         let {idPokemon} = req.params
//         let all = await allPokemons()
//         let idPoke = all.find((p) => p.id == idPokemon)
//         if(!idPoke){
//             res.status(400).send("Pokemon no encontrado")
//         }
//         res.status(200).send(idPoke)
// })

router.get("/", async (req,res,next) => {
    let {name} = req.query;
    if(name){
        try{
            let pokeByName = await pokemonByNameDB(name)
            res.status(200).send(pokeByName)
        }catch(err){
            res.status(400).send(err.message)
        }
    }else{
        try{
            let pokemons = await allPokemons()
            res.status(200).send(pokemons)
        }catch(err){
            res.status(400).send(err)
        }
    }
})

router.get("/:idPokemon", async (req,res,next) => {
    let {idPokemon} = req.params;
    try{
        let pokeById = await pokemonById(idPokemon)
        res.status(200).send(pokeById)
    }catch(err){
        res.status(400).send(err.message)
    }
})

router.post("/", async (req,res,next) => {
    try{
        let {name,height, weight, hp, attack, defense, speed, img, types} = req.body;
        let newPoke = await createPokemon(name,height, weight, hp, attack, defense, speed, img, types)
        res.status(201).send(newPoke)
    }catch(err){
        res.status(404).send(err.message)
    }
})


module.exports = router;
