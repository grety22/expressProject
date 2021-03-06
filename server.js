// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Star Wars Characters (DATA)
// =============================================================

var reservations = [
{
"customerName": "Gretel",
"phoneNumber": "444-forget-it",
"customerEmail": "wouldn't you like to know",
"customerDestination": "Europe",
"customerID": "1"
},
{
"customerName": "Martha",
"phoneNumber": "444-forget-it",
"customerEmail": "wouldn't you like to know",
"customerDestination": "Alaska",
"customerID": "4"
},
{
"customerName": "Adrian",
"phoneNumber": "444-forget-it",
"customerEmail": "wouldn't you like to know",
"customerDestination": "Caribbean",
"customerID": "2"
},
{
"customerName": "ZhAYinG",
"phoneNumber": "444-forget-it",
"customerEmail": "wouldn't you like to know",
"customerDestination": "Caribbean",
"customerID": "2"
},
{
"customerName": "Rus",
"phoneNumber": "444-forget-it",
"customerEmail": "wouldn't you like to know",
"customerDestination": "Caribbean",
"customerID": "2"
}
];

var waitingList = [
{
"customerName": "Joey Perea",
"phoneNumber": "7864931114",
"customerEmail": "j.perea08@gmail.com",
"customerID": "ja"
},
{
"customerName": "testtest",
"phoneNumber": "4444444444",
"customerEmail": "test",
"customerID": "9"
}
];


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/view", function(req, res) {
  res.sendFile(path.join(__dirname, "destinations.html"));
});
app.get("/form", function(req, res) {
  res.sendFile(path.join(__dirname, "form.html"));
});

// Displays all characters
app.get("/api/reservations", function(req, res) {
  return res.json(reservations);
});
app.get("/api/destinations", function(req, res) {
  return res.json(reservations);
});
app.get("/api/waitlist", function(req, res) {
  return res.json(waitingList);
});

// Displays a single character, or returns false
app.get("/api/characters/:character", function(req, res) {
  var chosen = req.params.character;

  console.log(chosen);

  for (var i = 0; i < characters.length; i++) {
    if (chosen === characters[i].routeName) {
      return res.json(characters[i]);
    }
  }

  return res.json(false);
});

// Create New Characters - takes in JSON input
app.post("/api/destinations", function(req, res) {

  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newReservation = req.body;

  console.log(newReservation);
  console.log("length Before:", reservations.length);
  //Check for available space to reserve
  if (reservations.length === 5) {

     waitingList.push(newReservation);
    console.log(waitingList);
    return;

  }


  reservations.push(newReservation);
  console.log(reservations);
  console.log("length After:", reservations.length);

  res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
