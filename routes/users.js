var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const Users = [
  {
    "username":"shaheerali",
    "Passwrod":"passwod"
  }
]




/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/user',function(req, res, next) {
  const usernameExist = Object.fromEntries(Object.entries(obj).filter(([key, value]) => {
    return value.username === req.username;
  }))
  if(usernameExist){
    throw new Error("user Already exist")
  }

  const salt =  bcrypt.genSaltSync(10)
  const password =  bcrypt.hashSync(req.password,salt)
  const PrivateKey = 'KDNOde'
  const user=   {
    "username":req.username,
    "Passwrod":password
  }
  Users.push(user)

  
  var token = jwt.sign({"username":req.username},PrivateKey);

  res.send({"token":token})
})



module.exports = router;
