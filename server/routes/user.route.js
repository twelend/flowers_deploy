const Router = require('express');
const router = new Router();
const userController = require('../controller/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/update', authMiddleware, userController.updateProfile);
router.get('/profile', authMiddleware, userController.getProfile);
router.post('/addFavorite', authMiddleware, userController.addFavoriteFlower);
router.delete('/removeFavorite/:flowerId', authMiddleware, userController.removeFavoriteFlower);

module.exports = router;
