// External dependencies
const express = require('express');
const router = express.Router();

// Add your routes here - above the module.exports line

// Branching example
router.post('/screener-question/answer', function (req, res) {

  var answer = req.session.data['self-isolate']

  // Check whether the variable matches a condition
  if (answer == "yes"){
    // Send user to next page
    res.redirect('/screener-question-why')
  }
  else {
    // Send user to ineligible page
    res.redirect('/screener-question-alt')
  }

})

router.post('/screener-question-alt/answer', function (req, res) {

  var answer = req.session.data['self-isolate-other']

  // Check whether the variable matches a condition
  if (answer == "yes"){
    // Send user to next page
    res.redirect('/screener-question-why')
  }
  else {
    // Send user to ineligible page
    res.redirect('/screener-question-no')
  }

})

// Branching example
router.post('/screener-question-date/answer', function (req, res) {

  // Make a variable and give it the value from 'know-nhs-number'
  var answer = req.session.data['self-isolate-date']

  // Check whether the variable matches a condition
  if (answer == "today"){
    // Send user to next page
    res.redirect('/what-is-your-name')
  }
  else {
    // Send user to ineligible page
    res.redirect('/screener-question-date-no')
  }

})

module.exports = router;

