const express = require('express');
const foodRouter = express.Router();
const foodData = require('../food_data.json');

// expected url + query string:
// localhost:3001/foods?nutrient=[nutrient]&min=[value]&max=[val]

// type array object
const foodList = foodData.report.foods;
// const test = foodList[0].nutrients[1].value;
// console.log(typeof test);

/* GET foods list.
 * By default, .get will return 404 error if queryMiddleware is bypassed.
 * queryMiddleware will send the 200 response.
 */
foodRouter.get('/', queryMiddleware, (req, res, next) => {
  res
    .status(404)
    .send('Sorry, your search yielded no results. Please try again.');
});

/**
 * queryMiddleware parses the URL query string into variables.
 * Filters food_data.json based on query variables and returns a new array.
 * If new array is empty (ie. no results matched query), calls next().
 * Else, sends new array in response.
 */
function queryMiddleware(req, res, next) {
  // the query values come in as strings; parsed into numbers
  const nutrient = parseInt(req.query.nutrient);
  const minValue = parseFloat(req.query.min);
  const maxValue = parseFloat(req.query.max);
  console.log(nutrient, minValue, maxValue);

  // values from foodList are parsed into numbers before comparing w/ minValue and maxValue
  let filteredFoods = foodList.filter(
    food =>
      parseFloat(food.nutrients[nutrient].value) >= minValue &&
      parseFloat(food.nutrients[nutrient].value) <= maxValue
  );

  if (filteredFoods.length === 0) next();
  else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(filteredFoods);
  }
}

module.exports = foodRouter;
