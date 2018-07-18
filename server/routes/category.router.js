const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    let queryText = `SELECT * FROM recipes;`;
    pool.query(queryText)
    .then((result) => {
        console.log('got recipes from database', result.rows);
        res.send(result.rows);
    }).catch((error)=>{
        console.log('error getting recipes from database', error);
        res.sendStatus(500);   
    })
});

router.put('/:id', (req, res) => {
    console.log(req.params);
    const id = req.params.id
    // if (req.isAuthenticated()){
        let queryText = `UPDATE recipes SET recipe_name = $1 WHERE id = $2;`;
        pool.query(queryText, [req.body.category_name, id]).then((result) => {
            res.send(result.rows);
            console.log('updated recipe', result.rows);
        }).catch((error)=>{
            console.log('error updating recipe name', error);
            res.sendStatus(500);
        })
    // } else {
    //     res.sendStatus(403);
    // }
});

router.delete('/:id', (req,res) => {
    const id = req.params.id;
    // if (req.isAuthenticated()){[]
        let queryText = 'DELETE FROM recipes WHERE id = $1;';
        pool.query(queryText, [id]).then((result)=>{
            res.sendStatus(200);
            console.log('deleted recipe');
        }).catch((error)=>{
            console.log('error deleting recipe');
            res.sendStatus(500);
        })
    // } 
    // else {
    //     res.sendStatus(403);
    // }
});

router.post('/', (req,res) => {
    console.log('in category router post',req.body);
    // if(req.isAuthenticated()){
        let queryText = 'INSERT INTO recipes (recipe_name, category_id, user_id, prep_time, cook_time, servings, instructions, ingredients) Values ($1, $2, $3, $4, $5, $6, $7, $8);';
        pool.query(queryText, [req.body.recipe_name, req.body.category_id, req.body.user_id, req.body.prep_time, req.body.cook_time, req.body.servings, req.body.instructions, req.body.ingredients]).then((result)=>{
            res.sendStatus(201);
            console.log('successfully posted recipe');
        }).catch((error)=>{
            console.log('error posting recipe', error);
            res.sendStatus(500);
        })
    // }
});

module.exports = router;