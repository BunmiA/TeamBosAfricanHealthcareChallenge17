 var twilio = require('twilio');

 // Find your account sid and auth token in your Twilio account Console.
 var client = twilio('ACba2f6c1d1384b841bedde2d86f09ffe4', '513fca91f166413f3995811fe5e7bdfb');

 // Send the text message.
 client.sendMessage({
     to: '+447414918685', //simi's number
     from: '+441548312025', //twilio number
     body: 'Thanks for registering with Twilio!'
 });

