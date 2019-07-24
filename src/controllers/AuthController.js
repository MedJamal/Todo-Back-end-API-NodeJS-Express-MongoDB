const User = require('../models/User');
const jwt = require('jsonwebtoken');

const AuthController = {};

AuthController.register = async (request, response, next) => {
    const { name, email, password } = request.body;
    
    const newUser = new User({
        name, email, password
    });

    try {
        const user = await newUser.save();
        return response.status(201).send({ success: true, user });
    } catch (error) {
        if(error.code === 11000) {
            const error = new Error(`Email address ${newUser.email} is alredy exist in database`);
            error.status = 400;
            next(error);
        } else {
            next(error);
        }
    }
}

AuthController.login = async (request, response, next) => {
    // Username, password in request
    const { email, password } = request.body;
    try {
        //Retrieve user information
        const user = await User.findOne({ email });
        if (!user) {
            const err = new Error(`The email ${email} was not found on our system`);
            err.status = 401;
            return next(err);
        }

        //Check the password
        user.isPasswordMatch(password, user.password, (error, matched) => {
            if (matched) { //Generate JWT
                const secret = process.env.JWT_SECRET;
                const expire = process.env.JWT_EXPIRATION;

                const token = jwt.sign({ _id: user._id }, secret, { expiresIn: expire });
                return response.send({ token });
            }

            response.status(401).send({
                error: 'Invalid username/password combination'
            });
        });

    }catch(error){
        next(error);
    }
    
};

module.exports = AuthController;
