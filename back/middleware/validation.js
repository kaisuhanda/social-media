const jwt = require("jsonwebtoken");

module.exports = {
  validateRegis: async (req, res, next) => {
    if (
      req.body.password.length >= 8 &&
      req.body.password === req.body.confirmPassword
    )
    {
      next();
    } else {
      return res.status(400).send({
        success: false,
        message: "Your password is not valid"
      })
    }
  },
  validateToken: (req, res, next) => {
    try {
      if (!req.token) {
        return res.status(400).send({
          success: false,
          message: "You do not have a token",
        });
      } else {
        const verifyData = jwt.verify(req.token, process.env.secretToken);
        if (!verifyData) {
          return res.status(401).send({
            success: false,
            message: "Unautorized request"
          })
        } else {
          req.accountData = verifyData;
          console.log("token masuk : ", req.token);
          next();
        }
      }
    } catch (error) {
      return res.status(400).send("Invalid token")
    }
  },
}