const Tour = require('./../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    console.log(req.query);
    //Build Query
    //1) filter
    const queryObj = { ...req.query };
    const excludedField = ['page', 'sort', 'limit', 'fields'];

    excludedField.forEach(el => delete queryObj[el]);
    console.log(req.query, queryObj);

    //2) Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    console.log(JSON.parse(queryStr));

    // const tours = await Tour.find()
    //   .where('duration')
    //   .lte(25)
    //   .where('difficulty')
    //   .equals('medium');
    const query = Tour.find(JSON.parse(queryStr));

    // Execute Query
    const tours = await query;

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours: tours
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: {
        tour: tour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err
    });
  }
};
