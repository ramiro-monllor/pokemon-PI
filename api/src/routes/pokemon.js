const { Router } = require('express');
const { Pokemon } = require("../db.js")
const {pokemonDB, pokemonAPI, allPokemons, pokemonByNameDB, pokemonByNameAPI, pokemonById, createPokemon, getTypes} = require("./functions.js")
const router = Router();

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

router.delete("/:idPokemon", async (req,res) => {
    try{
        const {idPokemon} = req.params
        const deleted = await Pokemon.destroy({
            where : {id : idPokemon}
        });
        res.status(200).json(deleted)
    }catch(e){
        res.status(404).send(e.message)
    }
})

module.exports = router;
