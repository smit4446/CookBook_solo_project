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

router.get('/like', (req, res) => {
    const id = req.user.id;
    let queryText = `SELECT * FROM liked WHERE user_id=$1;`;
    pool.query(queryText, [id])
    .then((result) => {
        console.log('got likes from database', result.rows);
        res.send(result.rows);
    }).catch((error)=>{
        console.log('error getting likes from database', error);
        res.sendStatus(500);   
    })
});

router.put('/name/:id', (req, res) => {
    console.log('updating name');
    const id = req.params.id
    // if (req.isAuthenticated()){
        let queryText = `UPDATE recipes SET recipe_name = $1, prep_time = $2, cook_time = $3, servings = $4, instructions = $5, ingredients = $6, summary = $7 WHERE id = $8;`;
        pool.query(queryText, [req.body.recipe_name, req.body.prep_time, req.body.cook_time, req.body.servings, req.body.instructions, req.body.ingredients, req.body.summary, id]).then((result) => {
            res.sendStatus(201);
        }).catch((error)=>{
            console.log('error updating recipe name', error);
            res.sendStatus(500);
        })
});

router.post('/like', (req, res) => {
    console.log('in recipe router for like', req.body);
    const user_id = req.user.id
    const recipe_id = req.body.id
    // if (req.isAuthenticated()){
        let queryText = `INSERT INTO liked (user_id, recipe_id) Values($1, $2);`;
        pool.query(queryText, [user_id, recipe_id]).then((result) => {
            res.sendStatus(201);
            console.log('successfully posted like');   
        }).catch((error)=>{
            console.log('error updating like', error);
            res.sendStatus(500);
        })
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
});

router.delete('/like/:id', (req,res) => {
    const id = req.params.id;
    // if (req.isAuthenticated()){[]
        let queryText = 'DELETE FROM liked WHERE recipe_id = $1;';
        pool.query(queryText, [id]).then((result)=>{
            res.sendStatus(200);
            console.log('deleted like');
        }).catch((error)=>{
            console.log('error deleting like');
            res.sendStatus(500);
        })
});

router.post('/', (req,res) => {
    console.log('in category router post',req.body);
    // if(req.isAuthenticated()){
        let queryText = 'INSERT INTO recipes (recipe_name, category_id, user_id, prep_time, cook_time, servings, instructions, ingredients, summary) Values ($1, $2, $3, $4, $5, $6, $7, $8, $9);';
        pool.query(queryText, [req.body.recipe_name, req.body.category_id, req.user.id, req.body.prep_time, req.body.cook_time, req.body.servings, req.body.instructions, req.body.ingredients, req.body.summary]).then((result)=>{
            res.sendStatus(201);
            console.log('successfully posted recipe');
        }).catch((error)=>{
            console.log('error posting recipe', error);
            res.sendStatus(500);
        })
    // }
});

module.exports = router;