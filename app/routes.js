// External dependencies
const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const fs = require('fs');
const NotifyClient = require('notifications-node-client').NotifyClient

// Add your routes here - above the module.exports line

// Branching example
router.post('/screener-question/answer', function (req, res) {

  // Make a variable and give it the value from 'know-nhs-number'
  var answer = req.session.data['self-isolate']

  // Check whether the variable matches a condition
  if (answer == "yes"){
    // Send user to next page
    res.redirect('/screener-question-date')
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
  if (answer == "yes"){
    // Send user to next page
    res.redirect('/what-is-your-name')
  }
  else {
    // Send user to ineligible page
    res.redirect('/screener-question-date-no')
  }

})

const apiKey = 'email_test-2308ee4b-d50f-4847-b43b-edd0522db9bc-000a5bd9-d3d2-4096-808b-5a229a0cd4ba';
const emailAddress = 'tom.doughty1@nhs.net';
const templateId = 'd7bc4c0a-c454-402f-b0fc-636dd1627b32';

router.get(`/confirmation-page`, async(req, res) => {
	const name = 'Tom';
	if (name) {
    const pdfBuffer = await new Promise(resolve => {
      const doc = new PDFDocument()
    
      doc.text('hello world', 100, 50)
      doc.end()
    
      //Finalize document and convert to buffer array
      let buffers = []
      doc.on("data", buffers.push.bind(buffers))
      doc.on("end", () => {
        let pdfData = new Uint8Array(Buffer.concat(buffers))
        resolve(pdfData)
      })
    });
    
		const notifyClient = new NotifyClient(apiKey)
			notifyClient.sendEmail(templateId, emailAddress, {
				personalisation: {
					name,
					link_to_file: notifyClient.prepareUpload(pdfBuffer)
				},
				reference: null,
			})
			.then(res => console.log(new Date(), res.body))
			.catch(err => console.error('Error', err))
	}
	return res.render('confirmation-page');
});

module.exports = router;

