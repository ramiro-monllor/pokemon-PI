const { Router } = require('express');
const { Pokemon } = require("../db.js")
const {pokemonDB, pokemonAPI, allPokemons, pokemonByNameDB, pokemonByNameAPI, pokemonById, createPokemon, getTypes} = require("./functions.js")
const router = Router();

router.get("/", async (req,res) => {
    let {name} = req.query;
    if(name){
            let pokeByName = await pokemonByNameDB(name)
            res.status(200).send(pokeByName)
    }else{
        try{
            let pokemons = await allPokemons()
            res.status(200).send(pokemons)
        }catch(err){
            res.status(400).send(err.message)
        }
    }
})

router.get("/:idPokemon", async (req,res) => {
    let {idPokemon} = req.params;
    try{
        let pokeById = await pokemonById(idPokemon)
        res.status(200).send(pokeById)
    }catch(err){
        res.status(400).send(err.message)
    }
})


router.post("/", async (req,res) => {
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
        res.status(200).send(`${deleted} pokemon/s removed`)
    }catch(err){
        res.status(404).send(err.message)
    }
})

// router.delete("/id", async (req,res) => {
//     try{
//         const {id} = req.query
//         const deleted = await Pokemon.destroy({
//             where : {id : id}
//         });
//         res.status(200).send(`${deleted} pokemon/s removed`)
//     }catch(err){
//         res.status(404).send(err.message)
//     }
// })

router.put("/:idPokemon", async (req,res) => {
    try{
        let {idPokemon} = req.params
        let {name,height, weight, hp, attack, defense, speed, img, types} = req.body;
        const updated = await Pokemon.update({
            name: name,
            height: height,
            weight: weight,
            hp: hp,
            attack: attack,
            defense: defense,
            speed: speed,
            img: img,
            types: types
        },
        {
            where: {
                id: idPokemon
            }
        }
        )
        res.status(200).send(`${updated} pokemon/s updated`)
    }catch(err){
        res.status(404).send(err.message)
    }
})

module.exports = router;
