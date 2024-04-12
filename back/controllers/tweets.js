const { tweets: TweetsData } = require('../models')
const jwt = require("jsonwebtoken")

module.exports = {
    getTweets: async (req, res, next) => {
        try {
            const tweets = await TweetsData.findAll()
            return res.status(200).send({
                success: true,
                tweets: tweets
            })
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                error: error
            })
        }
    },
    tweet: async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.secretToken)
            const user_id = decoded.id
            console.log("Token : ", token);
            console.log("User ID : ", user_id);
            const tweet = await TweetsData.create({
                tweet: req.body.tweet,
                user_id: user_id
            })
            return res.status(200).send({
                success: true, 
                tweet: tweet
            })
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                error: error
            })
        }
    }
}