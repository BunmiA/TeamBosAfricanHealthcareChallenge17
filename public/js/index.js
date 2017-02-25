 var twilio = require('twilio');

 // Find your account sid and auth token in your Twilio account Console.
 var client = twilio('ACba2f6c1d1384b841bedde2d86f09ffe4', '513fca91f166413f3995811fe5e7bdfb');

 // Send the registry text message.
 client.sendMessage({
     to: '+447414918685', //simi's number
     from: '+441548312025', //twilio number
     body: 'A big hello from Food Buddie!Thanks for registering!'
 });

//sleep for 10 seconds
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function sleepNow() {
  await sleep(10000);
}
sleepNow();

 // Send the question text message.
 client.sendMessage({
     to: '+447414918685', //simi's number
     from: '+441548312025', //twilio number
     body: '*Questions go here*'
 });