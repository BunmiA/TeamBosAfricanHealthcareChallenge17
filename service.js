//import express package
var express = require("express");

var http = require('http');
// 

var config = require('app-config');

//import mongodb package
var mongodb = require("mongodb");

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var twilio = require('twilio');



mongoose.connect(config.db.url);

// var schema = new Schema({ name: String }, { collection: 'actor' });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected");
});


var Schema = mongoose.Schema;


var patientSchema = new mongoose.Schema({
     _id : Number,
    firstName: String,
    lastName: String,
    invoice: Number
});


patientSchema.set('collection', 'Data');
var Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;

var hospitalSchema = new Schema({
      _id : Number,
      name : String,
      Locations : String,
      contribs: Array ,
      patients : [patientSchema]
  });

hospitalSchema.set('collection', 'Data');


// the schema is useless so far
// we need to create a model using it
var Hospital = mongoose.model('Hospital', hospitalSchema);


// // make this available to our users in our Node applications
module.exports = Hospital;


//create express app
var app = express();
app.set('port', (process.env.PORT || 3300));

 app.use(bodyParser.urlencoded({ extended: true })); 
 app.use(bodyParser.json());


// function getHospital(name_val){
//     Hospital.findOne({name: name_val }, function(err, hospital) {
//       if (err) throw err;
//       console.log(hospital);
//   });
// }



app.get("/getHospital/:_id", function(req,res){
  var hospitalId = req.params._id;
  console.log("getting hospital with id", hospitalId);
Hospital.findOne({_id: hospitalId }, function(err, hospital) {
      if (err) throw err;
      console.log(hospital);
      res.send(JSON.stringify(hospital));
  });
    
});



// app.post("/addPatient", function(req,res) {
//     console.log('adding Patient ro hospital based on request',req.body);
//     res.status(200);
//     // res.status(200).send(req.body);
// });

app.listen(app.get('port'), function(){
  console.log('Server up: localhost:3300');
});


// function increaseData(id,val){
//   Patient.findOneAndUpdate({ _id: id }, { $inc: { invoice: val }}, function(err, patient) {
//   if (err) throw err;
//   console.log(patient);
// });
  
// };


app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users

// app.use(express.static(__dirname));
app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load our public/index.html file
    });

// app.post('/sms', function(req, res) {
//   var twilio = require('twilio');
//   var twiml = new twilio.TwimlResponse();
//   twiml.message('Food buddie has received your message');
//   res.writeHead(200, {'Content-Type': 'text/xml'});
//   res.end(twiml.toString());
// });

app.post('/sms', function(req, res) {
    var twilio = require('twilio');
    var twiml = new twilio.TwimlResponse();
    if (req.body.Body == 'hello') {
        twiml.message('Hi! Chop Well here :)');
    } else if(req.body.Body == 'bye') {
        twiml.message('Goodbye');
    } else {
        twiml.message('No Body param match, Twilio sends this in the request to your server.');
    }
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

app.post('/submit', function(req, res) {
    var twilio = require('twilio');
    var twiml = new twilio.TwimlResponse();

    //log input
    var userObj=req.body;
    var name=userObj.Name;
    console.log(name);
    var number=userObj.Number;
    console.log(number);
    var age=userObj.Age;
    console.log(age);
    var aim=userObj.Aim.name;
    console.log(aim);
    var condition=userObj.Condition.name;
    console.log(condition);

    var client = twilio('ACba2f6c1d1384b841bedde2d86f09ffe4', '513fca91f166413f3995811fe5e7bdfb');

     // Send the registry text message.
     client.sendMessage({
         to: number, //user's number
         from: '+441548312025', //twilio number
         body: '\nHi '+name+'!A big hello from Chop Well!We are going to help you achieve '+ aim + ' and tackle '+ condition+'.Thanks for registering!'
     });

    setTimeout(function(){
    console.log("Sleep for 10 seconds")
    }, 10000);

    client.sendMessage({
         to: number, //user's number
         from: '+441548312025', //twilio number
         body: '\nToday, did you eat:\n1.grains (e.g. bread or rice)?\n2.beans and/or ground nuts?\n3.fruits (e.g. pawpaw, pineapple)\n4.vegetables (e.g. efo)?\n5.protein (e.g. meat, chicken, fish)?\n6.eggs or milk?'
     });

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

app.post('/submit', function(req, res) {
//  var twilio = require('twilio');
//  var twiml = new twilio.TwimlResponse();
//  twiml.message('The Robots are coming! Head for the hills!');
//  res.writeHead(200, {'Content-Type': 'text/xml'});
//  res.end(twiml.toString());
});

