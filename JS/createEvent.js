document
  .getElementById("createEventButton")
  .addEventListener("click", function (e) {
    e.preventDefault();
    var eventTitle = document.getElementById("eventName").value;
    var eventLocation = document.getElementById("eventLocation").value;
    var eventDescription = document.getElementById("eventDescription").value;
    var eventDate = document.getElementById("eventDate").value;
    var eventTime = document.getElementById("eventTime").value;
    var eventCategory = document.getElementById("eventCategory").value;

    var eventCreationData = {
      title: eventTitle,
      location: eventLocation,
      description: eventDescription,
      date: eventDate,
      time: eventTime,
      category: eventCategory,
    };

    if (
      eventTitle === "" ||
      eventLocation === "" ||
      eventDescription === "" ||
      eventDate === "" ||
      eventTime === "" ||
      eventCategory == " "
    ) {
      console.log("please fill all the details Before Submitting");
    } else {
      const xhr = new XMLHttpRequest();
      var accessToken = getCookie("jwt");
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          var eventCreationResponse = JSON.parse(xhr.responseText);
          console.log(eventCreationResponse);
        }
      };
      xhr.open("POST", "http://localhost:8080/events/create", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
      xhr.send(JSON.stringify(eventCreationData));
    }
  });

function getCookie(name) {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }
}
