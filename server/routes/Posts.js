const express = require('express');
const router = express.Router();
const {Posts} = require('../models');

//getting the posts created by users
router.get("/", async (req, res) => {
    const listOfPosts = await Posts.findAll();
    res.json(listOfPosts);
});

//storing a new post
router.post("/", async (req, res) =>{
    const post = req.body;
    await Posts.create(post);
    res.json(post);
})

module.exports = router;