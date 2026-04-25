const express = require('express');
const toursController = require('../controllers/tourController');

const router = express.Router();

// Create a checkBody middleware
// Check if the body contains the name and price property
// If not, send back 400 (bad request)
// Add it to the post handler stack

router
  .route('/')
  .get(toursController.getAllTours)
  .post(toursController.createTour);

router
  .route('/:id')
  .get(toursController.getTour)
  .patch(toursController.updateTour)
  .delete(toursController.deleteTour);

module.exports = router;
