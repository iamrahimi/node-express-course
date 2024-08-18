const {unAuthenticatedError} = require("../errors");
const jwt = require('jsonwebtoken');


const authMiddleware = async (req, res, next)  => {
    
    const authToken = req.headers.authorization;
    
    if(!authToken || !authToken.startsWith('Bearer ')) {
        throw new unAuthenticatedError ('Login required, please login and try again');
    }
    
    const token = authToken.split(' ')[1];
    try {
        const verifyToken = jwt.verify(token, process.env.JWT_SECERET_STRING);
        const {id, username} = verifyToken;
        req.user = {id, username};
        next();
        
    } catch (error) {
        console.log(error)
        throw new unAuthenticatedError('Not authorized to access this page');
    }

    
}


module.exports = authMiddleware;