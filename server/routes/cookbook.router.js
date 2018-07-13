const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    let queryText = `SELECT * FROM categories;`;
    pool.query(queryText)
    .then((result) => {
        console.log('got categories from database', result.rows);
        res.send(result.rows);
    }).catch((error)=>{
        console.log('error getting categories from database', error);
        res.sendStatus(500);   
    })
});

router.put('/:id', (req, res) => {
    console.log(req.params);
    const id = req.params.id
    // if (req.isAuthenticated()){
        let queryText = `UPDATE categories SET category_name = $1 WHERE id = $2;`;
        pool.query(queryText, [req.body.category_name, id]).then((result) => {
            res.send(result.rows);
        }).catch((error)=>{
            console.log('error updating category name', error);
            res.sendStatus(500);
        })
    // } else {
    //     res.sendStatus(403);
    // }
});

router.delete('/:id', (req,res) => {
    const id = req.params.id;
    // if (req.isAuthenticated()){[]
        let queryText = 'DELETE FROM categories WHERE id = $1;';
        pool.query(queryText, [id]).then((result)=>{
            res.sendStatus(200);
        }).catch((error)=>{
            console.log('error deleting category');
            res.sendStatus(500);
        })
    // } 
    // else {
    //     res.sendStatus(403);
    // }
});

router.post('/', (req,res) => {
    // if(req.isAuthenticated()){
        let queryText = 'INSERT INTO categories (category_name, cookbook_id, user_id) Values ($1, $2, $3);';
        pool.query(queryText, [req.body.category_name, req.body.cookbook_id, req.body.user_id]).then((result)=>{
            res.sendStatus(201);
        }).catch((error)=>{
            console.log('error posting category', error);
            res.sendStatus(500);
        })
    // }
});

module.exports = router;