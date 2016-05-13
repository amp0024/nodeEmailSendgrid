Set up for example

Generate an express server

	npm install -g express-generator
	express {name of file} --hogan -c less

then install dependencies
	npm install 


Once I have my basic express server set up I will install sendgrid

	npm install -S sendgrid

Go to sendgrid.com to register for an account. (takes a couple hours to get provisioned...good though because less emails go to spam)

Go to npm to view the sendgrid package that we just installed.
https://www.npmjs.com/package/sendgrid

I grab the starter route code they have listed and enter it in my index.js main route

	var sendgrid  = require('sendgrid')(sendgrid_api_key);
	sendgrid.send({
	  to:       'example@example.com',
	  from:     'other@example.com',
	  subject:  'Hello World',
	  text:     'My first email through SendGrid.'
	}, function(err, json) {
	  if (err) { return console.error(err); }
	  console.log(json);
	});

Generate sendgrid API Key
https://app.sendgrid.com/settings/api_keys

	npm install dotenv

Create a global variable in .env file to save API key

require the following in your index.js file

	var express = require('express');
	var router = express.Router();
	var dotenv = require('dotenv');
	dotenv.load();

	var sendgridAPI = process.env.sendgridAPI;

	var sendgrid  = require('sendgrid')(sendgridAPI);

set up your main route and sendgrid.send email object

	sendgrid.send({
	  to:       'amp0024@gmail.com',
	  from:     'noreply@milehighbaseball.com',
	  subject:  'Hello World',
	  text:     'My first email through SendGrid.'
	}, function(err, json) {
	  if (err) { return res.send('Oh no there was an error'); }
	  res.send('Email sent succesfully. Very nice!');  
	});

save your files and start your server

npm start

go to localhost:3000

wait about 5-8 seconds and boom! email in your box!


Now to send rich HTML emails...

Workflow / tools for responsive emails
1 - Create a new route in index.js

	router.get('/preview', function(req, res){
		res.render('email', {firstName: 'Adam'});
	});

2 - Create new view email.hjs

	<!DOCTYPE html>
	<html>
		<style>
			h1 {
				font-weight: bold;
			}
		</style>
		
		<body>
			<h1>Thanks, {{ firstName }}</h1>
			
		</body>
	</html>

3 - Start my server npm start
4 - Go to localhost:3000/preview you will see your email template

Setting up hogan complier

1- npm install --save hogan.js
2- include these packages in index.js

	var Hogan = require('hogan.js');
	var fs = require('fs');

	// get the file
	// compile the template


	// get the file
	var template = fs.readFileSync('./views/email.hjs', 'utf-8');
	// compile the template
	var compiledTemplate = Hogan.compile(template);

3- add compiled template into html of sendgrid.send main route in index.js

Problems...
Developing and formating emails can be a pain. You basically will have to code and then send emails to tell how your email is looking etc.

To solve...
We need a tool to help develop professional emails that are clean accross all email providers.

To add styles you need to inline all your css...which is a giant pain so use an inliner tool.

Gives you: 
Responsive classes - columns etc.
Templates  
http://foundation.zurb.com/emails/email-templates.html
Inliner

http://foundation.zurb.com/emails/inliner.html

	<!DOCTYPE html>
	<html>
		<style>
			h1 {
				font-weight: bold;
			}
		</style>
		
		<body>
			<h1>Thanks, {{ firstName }}</h1>
			
		</body>
	</html>

Install Zurb foundation cli stack
	npm install --global foundation-cli

Create a new email project

	foundation new --framework {filename}

cd into your new project structure

paste in your desired template into /src/pages/index.html

you can then begin to develop your email in nice HTML structure

	$ foundation watch

will launch your email in a browser to have a live environment development workflow

	$ npm run build

this will build your file structure and create a build file in the route of your file.

from there we will copy the entire inlined html file and paste it into our sendgrid server.

