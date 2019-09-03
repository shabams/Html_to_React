  "use strict";
  // function that creates dummy data for demonstration
  function createDummyData(cb) {
    const Url = "http://127.0.0.1:8000/fetchtime";
    axios.get(Url).then(function (response) {
      var date = new Date();
      var data = {};

    for (var i = 0; i < 5; i++) {
      data[date.getFullYear() + i] = {};

      for (var j = 0; j < response.data.length; j++) {
        var month = response.data[j].substring(5,7);
          month = parseInt(month);
         data[date.getFullYear() + i][month] = {};
        for(var k=0;k<response.data.length;k++){
          var l = response.data[k].substring(8,10);
          if(response.data[k].substring(5,7)==month){
          try {
            data[date.getFullYear() + i][month][l].push({
              startTime: "10:00",
              endTime: "12:00",
              text: "Some Event Here"
            });
          } catch (e) {
            data[date.getFullYear() + i][month][l] = [];
            data[date.getFullYear() + i][month][l].push({
              startTime: "10:00",
              endTime: "12:00",
              text: "Some Event Here"
            });
          }
        }
      }
      }
    }
    return cb(data);
    })
  }

  // creating the dummy static data
  var data = createDummyData((params)=>{
     // initializing a new calendar object, that will use an html container to create itself
  var calendar = new Calendar(
    "calendarContainer", // id of html container for calendar
    "small", // size of calendar, can be small | medium | large
    [
      "Wednesday", // left most day of calendar labels
      3 // maximum length of the calendar labels
    ],
    [
      "#17a2b8", // primary color
      "#2c3e50", // primary dark color
      "#FFFFFF", // text color
      "#FFFFFF" // text dark color
    ]
  );

  // initializing a new organizer object, that will use an html container to create itself
  var organizer = new Organizer(
    "organizerContainer", // id of html container for calendar
    calendar, // defining the calendar that the organizer is related to
    params // giving the organizer the static data that should be displayed
  );
  });
