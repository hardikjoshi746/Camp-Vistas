const express = require('express');
const router = express.Router();
const catchAsync = require('../util/catchAsync');
const Campground = require('../models/campground');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware.js')
const campgrounds = require('../controllers/campgrounds'); 

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));

router.get('/new', isLoggedIn, campgrounds.newForm);

router.route('/:id')
    .get(isLoggedIn, catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))



router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEdit));


module.exports = router;