const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true,
  },

  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
    min: [0, 'Price must be above 0'],
  },

  priceDiscount: {
    type: Number,
    validate: {
      validator: function (val) {
        return val < this.price;
      },
      message: 'Discount price should be below regular price',
    },
  },

  rating: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
  },

  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },

  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size'],
  },

  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
    enum: {
      values: ['easy', 'medium', 'difficult'],
      message: 'Difficulty must be: easy, medium, or difficult',
    },
  },

  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: 1,
    max: 5,
    set: (val) => Math.round(val * 10) / 10,
  },

  ratingsQuantity: {
    type: Number,
    default: 0,
  },

  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a description'],
  },

  description: {
    type: String,
    trim: true,
  },

  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'],
  },

  images: [String],

  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },

  startDates: [Date],
});

tourSchema.index({ price: 1, ratingsAverage: -1 });

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
