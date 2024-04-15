const { accounts } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../mailer");

module.exports = {
  getData: async (req, res, next) => {
    try {
      // allAccounts array for containing all accounts from the module
      const allAccounts = await accounts.findAll();
      return res.status(200).send({
        success: true,
        accounts: allAccounts
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  getAccount: async (req, res, next) => {
    try {
      const findAccount = await accounts.findOne({
        where: {
          id: req.params.id
        }
      })
      return res.status(200).send({
        success: true,
        test: findAccount
      })
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
        message: "Register success",
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
        },
        raw: true,
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
// resetPass: async (req, res, next) => {
//   try {
//     // Check token
//     let token = req.body.token;
//     const accountData = jwt.verify(token, process.env.SCRT_TKN);
//     if (req.body.password === req.body.confirmPassword) {
//       delete req.body.confirmPassword;
//       const salt = await bcrypt.genSalt(10);
//       const hashPassword = await bcrypt.hash(req.body.password, salt);
//       req.body.password = hashPassword;
//       await accounts.update({
//         password: req.body.password,
//       }, {
//         where: {
//           id: accountData.id
//         }
//       })
//       return res.status(201).send("Password updated")
//     } else {
//       return res.status(401).send("Password and confirm Password not same")
//     }
//   } catch (error) {
//     console.log(error);
//   }
// },