//import express package
var express = require("express");

var http = require('http');
// 

var config = require('app-config');

//import mongodb package
var mongodb = require("mongodb");

var mongoose = require('mongoose');

var bodyParser = require('body-parser');




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


