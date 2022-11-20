const { Router } = require('express');
const router = Router();
const {getTypes} = require("./functions.js")

router.get("/", async (req,res) => {
    try{
        let allTypes = await getTypes()
        res.status(200).send(allTypes)
    }catch(err){
        res.status(400).send(err)
    }
})


module.exports = router;