const {badRequestError} = require("../errors");
const jwt = require('jsonwebtoken');

const dashboard = async (req, res) => {
    return res.status(200).json({status: 'success', msg: `welcome back ${req.user.username}`});
}


const login = async (req, res) => {
    const {username, password} = req.body;
 
    if(!username || !password){
        throw new badRequestError('Please enter username and password');
    }

    const id = new Date().getMonth();
    const token = jwt.sign({id, username}, process.env.JWT_SECERET_STRING, {expiresIn: '30d'});


    res.status(200).json({status: 'success', msg: 'User created'});

}


module.exports = {
    login, dashboard
}
