// External dependencies
const express = require('express');
const router = express.Router();

// Add your routes here - above the module.exports line

// First screener page routing
router.post('/screener-question/answer', function (req, res) {

  // Set a variable to the answer
  var answer = req.session.data['self-isolate']

  // Check whether the answer is yes
  if (answer == "yes"){
    // If the answer is yes send to the next question
    res.redirect('/screener-question-why')
  }
  else {
    // If the answer is no send to the no screen 
    res.redirect('/screener-question-no')
  }

})

// Why screener page routing
router.post('/screener-question-why/answer', function (req, res) {

  // Set a variable to the answer
  var answer = req.session.data['isolation-why']

  if (answer == "I have a medical condition which means I shouldn't go to work"){
    res.redirect('/screener-question-why-no')
  }
  else {
    res.redirect('/screener-question-date')
  }

})

// Date screener page routing
router.post('/screener-question-date/answer', function (req, res) {

    // Set a variable to the answer
  var answer = req.session.data['self-isolate-date']

  // Check whether the answer is yes
  if (answer == "today"){
    // Send user to next page
    res.redirect('/what-is-your-name')
  }
  else {
    // Send user to enter a custom date page
    res.redirect('/screener-question-date-no')
  }

})

module.exports = router;

