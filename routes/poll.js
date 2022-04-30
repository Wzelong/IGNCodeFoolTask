const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Vote = require('../models/Vote');

const Pusher = require('pusher');

const pusher = new Pusher({
    appId: "1399440",
    key: "777bd7c75b0bde5c46b2",
    secret: "e3f2c454f27a0351e8d1",
    cluster: "us2",
    useTLS: true
  });

router.get('/', (req, res) => {
    Vote.find().then(votes => res.json({success: true, votes: votes}));
})

router.post('/', (req,res) => {
    const newVote = {
      color: req.body.color,
      points: 1
    }

    new Vote(newVote).save().then(vote => {
      pusher.trigger("color-poll", "color-vote", {
        points: parseInt(vote.points),
        color: vote.color
      });

      return res.json({success: true, message: 'Thank you for voting'});
    });

});

module.exports = router;