const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try{
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "this_should_be_my_secret_key_but_whatever");
    next();
  } catch (error) {
    res.status(401).json({message: "Auth failed"});
  }
};
