const express = require('express');
const router = express.Router();
const passport = require('passport');

const todoController = require('../controllers/TodoController');
const authController = require('../controllers/AuthController');
const userController = require('../controllers/UserController');


router.post('/register', authController.register);
router.post('/login', authController.login);

// Customize auth message Protect the  routes
router.all('*', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            const error = new Error('You are not authorized to access this area');
            error.status = 401;
            throw error;
        }

        req.user = user;
        return next();
    })(req, res, next);
});

router.get('/get-auth-user', userController.getAuthenticatedUser);

router.get('/todos', todoController.get);
router.get('/todo/:id', todoController.getOne);
router.post('/todo', todoController.create);
router.put('/todo/:id', todoController.update);
router.delete('/todo/:id', todoController.destroy);




module.exports = router;