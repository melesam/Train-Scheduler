

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBUcek6amZPxoxZZWU3-NcHCikYWJD6Lv8",
  authDomain: "trainscheduler-dd0bc.firebaseapp.com",
  databaseURL: "https://trainscheduler-dd0bc.firebaseio.com",
  projectId: "trainscheduler-dd0bc",
  storageBucket: "trainscheduler-dd0bc.appspot.com",
  messagingSenderId: "1037127325137"
};

firebase.initializeApp(config);


var database = firebase.database();
var trainTime = ""
var frequency = ""


$("#submit-button").on("click", function (e) {
  e.preventDefault();

  var trainName = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  trainTime = $("#trainTime").val().trim();
  frequency = $("#frequency").val().trim();

  database.ref().push({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency
    });

});

database.ref().on("child_added", function(data){
  var trainFreq = data.val().frequency;
  var Tfirst = data.val().trainTime

  var timeConverted = moment(Tfirst, "HH:mm");
  var diff = moment().diff(moment(Tfirst), "minutes");
  var timeremain = diff % trainFreq;
  var timeLeft = trainFreq - timeremain;
  var trainNext = moment().add(timeLeft, "minutes");
  var tNext = moment(trainNext).format("HH:mm");

  var createRow = $("<tr>")

  createRow.html(
        "<td>" + data.val().trainName + "</td>" +
        "<td>" + data.val().destination + "</td>" + 
        "<td>" + data.val().frequency + "</td>" + "<td>" + tNext + "</td>" + "<td>" + timeLeft + "</td>" );
    $("#tableBody").append(createRow)

});













