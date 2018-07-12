const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    let queryText = `SELECT * FROM cookbooks ORDER BY cookbook_name ASC;`;
    pool.query(queryText)
    .then((result) => {
        console.log('got cookbooks from database', result.rows);
        res.send(result.rows);
    }).catch((error)=>{
        console.log('error getting cookbooks from database', error);
        res.sendStatus(500);   
    })
});

router.put('/:id', (req, res) => {
    console.log(req.params);
    const id = req.params.id
    // if (req.isAuthenticated()){
        let queryText = `UPDATE cookbooks SET cookbook_name = $1 WHERE id = $2;`;
        pool.query(queryText, [req.body.cookbook_name, id]).then((result) => {
            res.send(result.rows);
        }).catch((error)=>{
            console.log('error updating cookbook name', error);
            res.sendStatus(500);
        })
    // } else {
    //     res.sendStatus(403);
    // }
});

router.delete('/:id', (req,res) => {
    const id = req.params.id;
    // if (req.isAuthenticated()){[]
        let queryText = 'DELETE FROM cookbooks WHERE id = $1;';
        pool.query(queryText, [id]).then((result)=>{
            res.sendStatus(200);
        }).catch((error)=>{
            console.log('error deleting cookbook');
            res.sendStatus(500);
        })
    // } 
    // else {
    //     res.sendStatus(403);
    // }
});

router.post('/', (req,res) => {
    // if(req.isAuthenticated()){
        let queryText = 'INSERT INTO cookbooks (cookbook_name, user_id) Values ($1, $2);';
        pool.query(queryText, [req.body.cookbook_name, req.body.user_id]).then((result)=>{
            res.sendStatus(201);
        }).catch((error)=>{
            console.log('error posting cookbook', error);
            res.sendStatus(500);
        })
    // }
});

module.exports = router;