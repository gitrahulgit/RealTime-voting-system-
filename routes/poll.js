const router = require("express").Router();
const config = require("config");
const Pusher = require("pusher");

const VoteModel = require("../models/vote");

const pusher = new Pusher({
  appId: config.pusher.appId,
  key: config.pusher.key,
  secret: config.pusher.secret,
  cluster: config.pusher.cluster,
  encrypted: true
});

router.post('/', (req, res) => {
    const newVote = {
        os: req.body.os,
        points: 1
    }

    new VoteModel(newVote).save().then(vote => {
        pusher.trigger('os-poll', 'os-vote', {
          points: parseInt(vote.points),
          os: vote.os
        });

        return res.json({
            success: true,
            message: "Thank you for voting"
        });
    });
});

router.get("/", (req, res) => {
    VoteModel.find().then(votes => res.json({
        success: true,
        votes: votes
    }));
});

module.exports = router;
