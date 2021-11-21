const express = require('express')
const router = new express.Router()
const Post = require("../models/post");

//CREATE POST
router.post("/posts", async (req, res) => {
  const post = new Post(req.body);

  try {
    await post.save()
  } catch(e){
    res.status(400).send(e)
  }
});

//UPDATE POST
router.patch("/posts/:id", async (req, res) => {

    const updates = Object.keys(req.body)
    const allowUpdates = ['title', 'description', 'photo', 'usernamne', 'categories']
    const isValidOperation = updates.every((update)=> allowUpdates.includes(update))

    if (!isValidOperation){
      return res.status(400).send({error: 'Invalid updates!'})
    }

    try {
      const post = await Post.findById(req.params.id)
      updates.forEach((update)=> post[update] = req.body[update])
      await post.save()
      if (!post ){
        return res.status(404).send()
      }
      res.send(post)
    } catch (e) {
      res.status(400).send(e)
    }
  });

//DELETE POST
router.delete("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/posts", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;