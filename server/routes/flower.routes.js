const Router = require('express');
const router = new Router();
const flowerController = require('../controller/flower.controller');

router.post('/create', flowerController.createFlower);
router.get('/get', flowerController.getFlowers);
router.get('/getByCountry', flowerController.getFlowersByCountry);
router.get('/getByType', flowerController.getFlowersByType);
router.get('/getByRoomType', flowerController.getFlowersByRoomType);

module.exports = router;
