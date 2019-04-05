var config = {
  apiKey: "AIzaSyDV3U1cvHnS84cShXyd7Hv91DEdddWG3Lg",
  authDomain: "trainschedule-80a35.firebaseapp.com",
  databaseURL: "https://trainschedule-80a35.firebaseio.com",
  projectId: "trainschedule-80a35",
  storageBucket: "",
  messagingSenderId: "412985811283"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainFirsttime = $("#first-time-input").val().trim();
  var trainFrequency = $("#frequency-input").val().trim();

  var newTrain = {
    name: trainName,
    destination: trainDestination,
    firsttime: trainFirsttime,
    frequency: trainFrequency
  };

  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firsttime);
  console.log(newTrain.frequency);

  alert("New Train Added");

  $("#name-input").val("");
  $("#destination-input").val("");
  $("#first-time-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {

  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainFirsttime = childSnapshot.val().firsttime;
  var trainFrequency = childSnapshot.val().frequency;

  console.log(trainName);
  console.log(trainDestination);
  console.log(trainFirsttime);
  console.log(trainFrequency);

  var formatTime = moment(trainFirsttime, "HH:mm").subtract(1, "years");
  console.log(formatTime);

  var currentTime = moment();
  console.log(moment(currentTime).format("HH:mm"));

  var diffTime = moment().diff(moment(formatTime), "minutes");
  console.log("Difference" + diffTime);

  var timeApart = diffTime % trainFrequency;
  console.log(timeApart);

  var minutesAway = trainFrequency - timeApart;
  console.log("Minutes away" + minutesAway);

  var nextArrival = moment().add(minutesAway, "minutes");
  var nextArrivalTime = moment(nextArrival).format("HH:mm");
  console.log(nextArrivalTime);

  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextArrivalTime),
    $("<td>").text(minutesAway)
  );

  $("#train-table > tbody").append(newRow);
});