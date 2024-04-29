const { accounts } = require("../models");
const { follows } = require("../models");
const { comments: CommentsData } = require('../models')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../mailer");
const { tweets } = require("../models");

module.exports = {
  getData: async (req, res, next) => {
    try {
      const allAccounts = await accounts.findAll({
        include: [
          {
            model: follows,
            as: 'followings', // Follows where the account is following others
            attributes: ['following_id'],
          },
          {
            model: follows,
            as: 'followers', // Follows where the account is followed by others
            attributes: ['follower_id'],
          },
          {
            model: tweets,
            as: 'tweets', // The account's tweets
            attributes: ['id', 'tweet', 'user_id', 'likes'],
            include: [{
              model: CommentsData,
              required: false,
              attributes: [
                ['comment', 'comment'],
                ['user_id', 'user_id']
              ],
              include: [{
                model: accounts, // Include the commenter's account info
                as: 'commenter',
                attributes: ['username', 'name'], // Fetch only the username and name
              }],
              order: [['createdAt', 'DESC']]
            }],
          },
        ]
      });
      return res.status(200).send({
        success: true,
        accounts: allAccounts
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  },
  getAccount: async (req, res, next) => {
    try {
      const findAccount = await accounts.findOne({
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: follows,
            as: 'followings', // Follows where the account is following others
            attributes: ['following_id'],
          },
          {
            model: follows,
            as: 'followers', // Follows where the account is followed by others
            attributes: ['follower_id'],
          },
          {
            model: tweets,
            as: 'tweets', // The account's tweets
            attributes: ['id', 'tweet', 'user_id', 'likes'],
            include: [{
              model: CommentsData,
              required: false,
              attributes: [
                ['comment', 'comment'],
                ['user_id', 'user_id']
              ],
              include: [{
                model: accounts, // Include the commenter's account info
                as: 'commenter',
                attributes: ['username', 'name'], // Fetch only the username and name
              }],
              order: [['createdAt', 'DESC']]
            }],
          },
        ],
      });
      return res.status(200).send({
        success: true,
        findAccount,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },

  register: async (req, res, next) => {
    try {
      // Confirm if account already exists
      const findAccount = await accounts.findOne({
        where: {
          username: req.body.username,
        },
      });

      // Cannot create account if account already exists
      if (findAccount) {
        return res.status(400).send({
          success: false,
          message: "Account exists",
        });
      }

      // Confirm password is no longer needed
      delete req.body.confirmPassword;

      // Hashing and encrypting password
      const salt = await bcrypt.genSalt(10);
      console.log("Salt : ", salt);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      console.log("Hash Password : ", hashPassword);
      req.body.password = hashPassword;

      // Creating the account and storing it in the module
      const result = await accounts.create(req.body);
      console.log("Account successfully created : " + result);

      // The ID and Email will be signed in the token
      const token = jwt.sign(
        {
          id: result.id,
          email: result.email,
        },
        process.env.secretToken,
        { expiresIn: "1h" }
      );

      // Emailing the new account for verification
      await transporter.sendMail({
        from: "TWITTER ADMIN",
        to: req.body.email,
        subject: "Registration Info",
        html: `<h1>Hello ${req.body.username}, salken</h1>
        <a href="http://localhost:5713/verification/${token}">click link</a>`
      })

      // Account successfully registered
      return res.status(201).send({
        success: true,
        message: result,
        token: token
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  login: async (req, res, next) => {
    try {
      // Confirm if account already exists
      const findAccount = await accounts.findOne({
        where: {
          username: req.body.username
        },
        raw: true
      })

      // Cannot log in if account doesn't exist
      if (!findAccount) {
        return res.status(404).send({
          success: false,
          message: 'ACCOUNT NOT FOUND'
        })
      }

      // Comparing the given password to the account's password using decryption
      const correctPassword = await bcrypt.compare(req.body.password, findAccount.password);

      // Cannot log in if incorrect password
      if (!correctPassword) {
        return res.status(400).send({
          success: false,
          message: 'INCORRECT PASSWORD'
        });
      }

      // The ID, username, and role, will be signed in the token
      const token = jwt.sign({
        id: findAccount.id,
        username: findAccount.username,
        role: findAccount.role
      },
        'abcd',
        { expiresIn: "1h" })

      // Returns the token for a KeepLogin function
      return res.status(200).send({
        success: true,
        findAccount,
        token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: error
      })
    }
  },
  keepLogin: async (req, res, next) => {
    try {
      // Confirm if account already exists
      const findAccount = await accounts.findOne({
        where: {
          id: req.accountData.id,
        }, include: [
          {
            model: follows,
            as: 'followings', // Follows where the account is following others
            attributes: ['following_id'],
          },
          {
            model: follows,
            as: 'followers', // Follows where the account is followed by others
            attributes: ['follower_id'],
          },
          {
            model: tweets,
            as: 'tweets', // The account's tweets
            attributes: ['id', 'tweet', 'user_id', 'likes'],
            include: [{
              model: CommentsData,
              required: false,
              attributes: [
                ['comment', 'comment'],
                ['user_id', 'user_id']
              ],
              include: [{
                model: accounts, // Include the commenter's account info
                as: 'commenter',
                attributes: ['username', 'name'], // Fetch only the username and name
              }],
              order: [['createdAt', 'DESC']]
            }],
          },
        ]
      })
      console.log("Account : ", findAccount);

      // Extract the ID, username, email, etc from the findAccount
      const { id, password } = findAccount;

      // Create a new token with these attributes 
      const token = jwt.sign({
        id,
        password
      }, process.env.secretToken, {
        expiresIn: "1h",
      });

      // Login successful, using token
      return res.status(200).send({
        success: true,
        findAccount: findAccount,
        token
      })
    } catch (error) {
      console.log(error);
    }
  },
  editProfile: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
      const decoded = jwt.verify(token, process.env.secretToken); // Verify token and get user ID
      const userId = decoded.id;

      const user = await accounts.findByPk(userId);
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found"
        });
      }
      const { email, name, username } = req.body;

      if (email) {
        user.email = email;
      }
      if (name) {
        user.name = name;
      }
      if (username) {
        user.username = username;
      }

      await user.save();

      return res.status(200).send({
        success: true,
        message: "Profile updated successfully",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          username: user.username,
        },
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({
        success: false,
        message: error
      })
    }
  },
  follow: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.secretToken)
      const user_id = decoded.id
      console.log("Token : ", token);
      console.log("User ID : ", user_id);
      if (parseInt(req.params.id) === user_id) {
        return res.status(400).send({
          success: false,
          message: "You cannot follow your own account"
        })
      }
      const findFollow = await follows.findOne({
        where: {
          follower_id: user_id,
          following_id: parseInt(req.params.id)
        }
      });

      if (findFollow !== null) {
        console.log("a ", user_id);
        console.log("b ", parseInt(req.params.id));
        return res.status(400).send('Already followed');
      }

      const newFollow = await follows.create({
        follower_id: user_id,
        following_id: parseInt(req.params.id)
      })
      return res.status(200).send({
        success: true,
        follow: newFollow
      })
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: error
      })
    }
  },
  unfollow: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.secretToken);
      const user_id = decoded.id;

      const findFollow = await follows.findOne({
        where: {
          follower_id: user_id,
          following_id: parseInt(req.params.id),
        },
      });

      if (!findFollow) {
        return res.status(400).send("Follow relation not found");
      }

      await follows.destroy({
        where: {
          id: findFollow.id,
        },
      });

      return res.status(200).send({
        success: true,
        unfollowed: findFollow,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        success: false,
        message: error.message || "An error occurred",
      });
    }
  },
  myFollowings: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.secretToken)
      const user_id = decoded.id
      console.log("Token : ", token);
      console.log("User ID : ", user_id);

      const myFollowings = await follows.findAll({
        where: {
          follower_id: user_id
        }
      })

      const myFollowingsId = myFollowings.map((follow) => follow.following_id)

      const myFollowingsAccounts = await accounts.findAll({
        where: {
          id: myFollowingsId
        }
      })

      console.log("My Followings : ", myFollowings);
      return res.status(200).send({
        success: true,
        follows: myFollowingsAccounts
      })
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: error
      })
    }
  },
  resetPass: async (req, res, next) => {
    try {
      const checkedAccount = await accounts.findOne({
        where: {
          id: req.accountData.id
        }
      })
      const correctPassword = await bcrypt.compare(req.body.oldPassword, checkedAccount.password);
      if (correctPassword) {
        if (req.body.newPassword === req.body.confirmPassword) {
          delete req.body.confirmPassword;
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(req.body.newPassword, salt);
          await accounts.update({
            password: hashPassword,
          }, {
            where: {
              id: req.accountData.id
            }
          })
          return res.status(201).send("Password updated")
        } else {
          return res.status(401).send("Incorrect match")
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
};



// verify: async (req, res, next) => {
//   try {
//     const inToken = req.params.token
//     const result = await accounts.update(
//       { isVerified: true },
//       {
//         where: {
//           id: req.accountData.id
//         }
//       }
//     )
//     res.status(200).send({ success: true, message: 'successfully verified.' });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send(error)
//   }
// }


// getAccount: async (req, res, next) => {
//   try {
//     const findAccount = await accounts.findOne({
//       where: {
//         id: req.params.id
//       }
//     })
//     return res.status(200).send({
//       success: true,
//       account: findAccount
//     })
//   } catch (error) {
//     return res.status(500).send({
//       success: false,
//       message: error
//     })
//   }
// },
// forgotPass: async (req, res, next) => {
//   try {
//     const accountData = await accounts.findOne({
//       where: {
//         email: req.body.email,
//       },
//       raw: true,
//     });
//     console.log(accountData.id);
//     if (!accountData) {
//       return res.status(400).send({
//         success: false,
//         message: "Account doesn't exist",
//       });
//     } else {
//       const { id, username, email, phone, role, isVerified } = accountData;
//       const token = jwt.sign({
//         id,
//         email,
//       }, process.env.SCRT_TKN, {
//         expiresIn: "1h",
//       });
//       return res.status(200).send(token)
//     }
//   } catch (error) {
//     console.log(error);
//   }
// },
