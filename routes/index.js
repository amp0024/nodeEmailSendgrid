var express = require('express');
var router = express.Router();
var dotenv = require('dotenv');
dotenv.load();

var sendgridAPI = process.env.sendgridAPI;
var recEmailAddress = process.env.recEmailAddress;

var sendgrid  = require('sendgrid')(sendgridAPI);

// require hogan.js and the node.js file structure
var Hogan = require('hogan.js');
var fs = require('fs');

// get the file
var template = fs.readFileSync('./views/email.hjs', 'utf-8');
// compile the template
var compiledTemplate = Hogan.compile(template);


/* GET home page. */
router.get('/', function(req, res, next) {
  
	sendgrid.send({
	  to:       recEmailAddress,
	  from:     'noreply@milehighbaseball.com',
	  subject:  'Hello World',
	  html:     compiledTemplate.render({firstName: 'Adam'})
	}, function(err, json) {
	  if (err) { return res.send('Oh no there was an error'); }
	  res.send('Email sent succesfully. Very nice!');  
	});

});

router.get('/preview', function(req, res){
	res.render('email', {firstName: 'Adam'});
});

module.exports = router;