const { tweets: TweetsData } = require('../models')
const { comments: CommentsData } = require('../models')
const { accounts: AccountsData } = require('../models')
const { likes: LikesData } = require('../models')
const jwt = require("jsonwebtoken")

module.exports = {
    getTweets: async (req, res, next) => {
        try {
            const tweets = await TweetsData.findAll({
                include: [{
                    model: CommentsData,
                    required: false,
                    attributes: [
                        ['comment', 'comment'],
                        ['commenterUsername', 'commenterUsername'],
                        ['commenterName', 'commenterName'],
                        ['user_id', 'user_id']
                    ],
                    order: [['createdAt', 'DESC']]
                }],
            })
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
    getLikes: async (req, res, next) => {
        try {
            const allLikes = await LikesData.findAll()
            return res.status(200).send({
                success: true,
                likes: allLikes
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
    },
    comment: async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.secretToken)
            const user_id = decoded.id
            console.log("Token : ", token);
            console.log("User ID : ", user_id);
            const commenter = await AccountsData.findOne({
                where: {
                    id: user_id
                },
                attributes: ['username', 'name']
            })
            const comment = await CommentsData.create({
                user_id: user_id,
                tweet_id: req.params.id,
                comment: req.body.comment,
                commenterUsername: commenter.username,
                commenterName: commenter.name
            })
            return res.status(200).send({
                success: true,
                comment: comment
            })
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                error: error
            })
        }
    },
    like: async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.secretToken)
            const user_id = decoded.id
            console.log("Token : ", token);
            console.log("User ID : ", user_id);
            const findTweet = await TweetsData.findOne({
                where: {
                    id: req.params.id
                }
            })
            const findLike = await LikesData.findOne({
                where: {
                    user_id: user_id,
                    tweet_id: req.params.id
                }
            })
            if (findLike) {
                return res.status(400).send({
                    success: false,
                    message: 'already liked'
                })
            } else {
                findTweet.likes++
                const newLike = await LikesData.create({
                    user_id: user_id,
                    tweet_id: req.params.id
                })
                await findTweet.save();
                return res.status(200).send({
                    success: true,
                    tweet: findTweet,
                    like: newLike
                })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                error: error
            })
        }
    },
    unlike: async (req, res, next) => {
        try {
            // Extracting and decoding token from local storage
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.secretToken);
            const user_id = decoded.id;
            console.log("Token : ", token);
            console.log("User ID : ", user_id);
    
            // Finding the tweet to unlike
            const findTweet = await TweetsData.findOne({
                where: {
                    id: req.params.id
                }
            });
    
            // Finding the like and tweet relation
            const findLike = await LikesData.findOne({
                where: {
                    user_id: user_id,
                    tweet_id: req.params.id
                }
            });
    
            // If the findLike doesn't exist
            if (!findLike) {
                return res.status(400).send({
                    success: false,
                    message: 'You have not liked this tweet'
                });
            }
    
            // Checks if there are more than 0 likes
            if (findTweet.likes > 0) {
                // Decrement likes
                findTweet.likes--;
                // Deletes like and tweet relation
                await LikesData.destroy({
                    where: {
                        user_id: user_id,
                        tweet_id: req.params.id
                    }
                });
                await findTweet.save();
                return res.status(200).send({
                    success: true,
                    tweet: findTweet,
                    message: 'Like removed successfully'
                });
            } else {
                return res.status(400).send('0 likes');
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                error: error.message || 'Internal server error'
            });
        }
    }    
}