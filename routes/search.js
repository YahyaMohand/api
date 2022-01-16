const express = require('express');
const router = express.Router();

const {keywordSearch } = require("../controllers/search");
const { usdiqdmiddleware} = require("../controllers/products");

router.get('/search/:keyword',usdiqdmiddleware,keywordSearch)


module.exports = router;