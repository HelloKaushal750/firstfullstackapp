require('dotenv').config()
const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.send("Please login again");
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if(err){
        res.send("Please Login")
    }else{
        req.body.userId = decoded.userId
        next()
    }
  });
};


module.exports = {authenticate}