const express = require('express');
const router = express.Router();
const {
    createCustomPerfume,
    getAllCustomPerfumes,
    getCustomPerfume,
    updateCustomPerfume,
    deleteCustomPerfume
} = require('../controllers/CustomeProduct');

// Custom perfume routes
router.post('/customperfume', createCustomPerfume);
router.get('/customperfumes', getAllCustomPerfumes);
router.get('/customperfume/:id', getCustomPerfume);
router.put('/customperfume/:id', updateCustomPerfume);
router.delete('/customperfume/:id', deleteCustomPerfume);

module.exports = router;
