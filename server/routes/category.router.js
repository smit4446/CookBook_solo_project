const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    let queryText = `SELECT * FROM recipies;`;
    pool.query(queryText)
    .then((result) => {
        console.log('got recipies from database', result.rows);
        res.send(result.rows);
    }).catch((error)=>{
        console.log('error getting recipies from database', error);
        res.sendStatus(500);   
    })
});

router.put('/:id', (req, res) => {
    console.log(req.params);
    const id = req.params.id
    // if (req.isAuthenticated()){
        let queryText = `UPDATE recipies SET recipe_name = $1 WHERE id = $2;`;
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
        let queryText = 'DELETE FROM recipies WHERE id = $1;';
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
        let queryText = 'INSERT INTO recipies (recipe_name, category_id, user_id) Values ($1, $2, $3);';
        pool.query(queryText, [req.body.recipe_name, req.body.category_id, req.body.user_id]).then((result)=>{
            res.sendStatus(201);
            console.log('successfully posted recipe');
        }).catch((error)=>{
            console.log('error posting recipe', error);
            res.sendStatus(500);
        })
    // }
});

module.exports = router;