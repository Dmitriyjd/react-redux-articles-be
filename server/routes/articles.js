const express = require('express');
const controller = require('../controllers/articles');

const router = express.Router();

router.post('/', controller.createArticle);
router.put('/:id', controller.updateArticle);
router.get('/', controller.getArticlesByQuery);
router.get('/:_id', controller.getArticleById);
router.delete('/:_id', controller.deleteArticleById);

module.exports = router;
