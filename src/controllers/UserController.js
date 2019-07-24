const User = require('../models/User');

const userController = {}

userController.getAuthenticatedUser = async (request, response, next) => {
    
    const query = {
        _id: request.user
    };

    try {
        const user = await User.find(query);

        return response.status(200).send({
            success: true,
            user: user
        });
    } catch (error) {
        next(error);
    }
};


module.exports = userController;
