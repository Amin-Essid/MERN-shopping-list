// Item model
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const user_register = (req, res) => {
    const {email, password} = req.body;

    // simple validation
    if(!email || !password) {
        return res.status(400).json({msg: 'pls enter all failed'})
    }

    // check for existing email
    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({msg: 'user does not exist'})

            // validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) res.status(400).json({msg: 'invalid credentials'});
                    jwt.sign(
                        {id: user._id},
                        process.env.JWT_SECRET,
                        {expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user._id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        }
                    )  
                })

        })
};

const user_data = (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
}

module.exports = {
    user_register,
    user_data
} 