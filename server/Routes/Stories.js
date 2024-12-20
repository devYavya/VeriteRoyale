const express = require('express');
const {createstories, getAll, getOne, update, deleteStory } = require('../controllers/StoriesController');
const router = express.Router();

router.post('/createstories', createstories);
router.get('/getAll', getAll);
router.delete('/deleteStory/:id',deleteStory)

// router.put('/updatequnatity:id',)
module.exports = router;

