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




app.get("/getHospital/:_id", function(req,res){
  var hospitalId = req.params._id;
  console.log("getting hospital with id", hospitalId);
Hospital.findOne({_id: hospitalId }, function(err, hospital) {
      if (err) throw err;
      console.log(hospital);
      res.send(JSON.stringify(hospital));
  });
    
});

app.get('/getNutritionStats', function (req, res) {
   var user ={};
        user.Name='Simi';
        user.Number='+447414918685';
        user.Age='24';
        user.Aim='Increased Energy Levels';
        user.Condition='Anaemia';
        user.DailyMessage='For healthy high energy,it is important to maintain high levels of Iron,Vitamin B12 and Vitamin B9.';

        user.labels1= ['Beans/Nuts','Grains','Eggs/Milk','Meat/Fish','Vegetable','Fruits'];
        user.data1= [11,6,12,4,7,15];
        user.labels2= ['Calcium','Zinc','Iron','Vitamin A','Vitamin B9','Vitamin B12','Vitamin D','Vitamin E'];
        user.data2= [2,2,2,2,2,2,2,2];
        console.log(user);
  res.json(user);
})





// app.use(express.static(__dirname));
app.use(express.static(__dirname + '/public'));



app.get('/getStats', function (req, res) {
       var user ={};
            user.Name='Simi';
            user.Number='+447414918685';
            user.Age='24';
            user.Aim='Longer/Thicker Hair';
            user.Condition='Diabetes';
            user.DailyMessage='You need more fish for thicker hair';
            user.labels= ['VitA','VitB','Iodine','Iron','Zinc'];
            user.data= [10,89, 600,700,150];
      res.json(user);
});


app.get('/getNutriStats', function(req, res) {
console.log('djkjdskjdkds')
//res.header('Access-Control-Allow-Origin', '*');

//     var user ={};
//     user.Name='Simi';
//     user.Number='+447414918685';
//     user.Age='24';
//     user.Aim='Longer/Thicker Hair';
//     user.Condition='Diabetes';
//     user.DailyMessage='You need more fish for thicker hair';
//     user.labels= ['VitA','VitB','Iodine','Iron','Zinc'];
//     user.data= [10,89, 600,700,150];

    //var json=JSON.stringify(user);
    var jsonObj={};
    jsonObj.name = "simi";
    jsonObj.no='787878787'

        res.json(jsonObj);
    });

// app.post('/sms', function(req, res) {
//   var twilio = require('twilio');
//   var twiml = new twilio.TwimlResponse();
//   twiml.message('Food buddie has received your message');
//   res.writeHead(200, {'Content-Type': 'text/xml'});
//   res.end(twiml.toString());
// });

var obj={}


app.post('/sms', function(req, res) {
    var twilio = require('twilio');
    var twiml = new twilio.TwimlResponse();
//    if (req.body.Body == 'hello') {
//        twiml.message('Hi! Chop Well here :)');
//    } else if(req.body.Body == 'bye') {
//        twiml.message('Goodbye');
//    } else {
//        twiml.message('No Body param match, Twilio sends this in the request to your server.');
//    }
//    var userText=req.body.Body;
//    userText=userText.replace(/\s+/g, ''); //remove whitespace
//    var q1=userText.charAt(userText.indexOf(0));
//    var q2=userText.charAt(userText.indexOf(2));
//    var q3=userText.charAt(userText.indexOf(4));
//    var q4=userText.charAt(userText.indexOf(5));
//    var q5=userText.charAt(userText.indexOf(6));
//    var q6=userText.charAt(userText.indexOf(8));

    twiml.message('View your Chop Well weekly summary at: https://bos-africanhealthcarechal17.herokuapp.com/NutritionStatus/1');
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
    console.log("Sleep for 15 seconds");

    client.sendMessage({
                to: number, //user's number
                from: '+441548312025', //twilio number
                body: '\nPlease send us answers to these questions in the following format(in one text message):\n\na1 b2 c1 d4 e2 f1 g1\na. How many meals did you eat today?\nHow many meals did you eat today with:\nb.grains (e.g. bread or rice)?\nc.beans and/or ground nuts?\nd.fruits (e.g. pawpaw, pineapple)\ne.vegetables (e.g. efo)?\nf.meat or fish?\ng.eggs or milk?'
                });

    }, 15000);



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

app.get('*', function(req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load our public/index.html file
    });

app.listen(app.get('port'), function(){
  console.log('Server up: localhost:3300');
});


module.exports = app