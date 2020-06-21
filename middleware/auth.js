const jwt = require('jsonwebtoken');
const {User} = require('../models/user');

module.exports = function(req, res, next) {
    try{

        //getting token from header
        const token = req.header('x-auth-token').replace('Bearer', '');
    
        //verifying token from dev.env where jwt is stored
        const decoded = jwt.verify(token, process.env.jwtPrivateKey);
    
        //finding user that has that token, from token array in user model
        const user = await User.findOne({_id: decoded._id, 'tokens.token' : token})
    
        if(!token) res.status(401).send('You are not authorized to access this');
    
        req.token = token;
        req.user = user;
    
        next();
    }
    catch(e) {
        res.status(400).send('This is an invalid token');
    }
    
}

