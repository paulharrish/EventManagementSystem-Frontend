const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4 && xhr.status == 200) {
    const eventData = JSON.parse(xhr.responseText);
    display(eventData);
  }
};
xhr.open("GET", "http://localhost:8080/events/all", true);
xhr.send();

function display(data) {
  const exculdeColumns = ["eventId", "user", "createdAt", "updatedAt"];
  const contentArea = document.getElementById("contentArea");
  data.forEach((event) => {
    const eventCard = document.createElement("div");
    eventCard.classList.add("event-card");
    contentArea.appendChild(eventCard);

    const eventPreview = document.createElement("div");
    eventPreview.classList.add("event-preview");
    eventCard.appendChild(eventPreview);

    const eventHeading = document.createElement("h6");
    eventHeading.textContent = event.category;
    eventPreview.appendChild(eventHeading);

    const eventName = document.createElement("h2");
    eventName.textContent = event.title;
    eventPreview.appendChild(eventName);

    const eventInfo = document.createElement("div");
    eventInfo.classList.add("event-info");
    eventCard.appendChild(eventInfo);

    Object.keys(event).forEach((key) => {
      if (!exculdeColumns.includes(key)) {
        const span = document.createElement("span");
        span.textContent = key + ": " + event[key];
        eventInfo.appendChild(span);
      }
    });

    const eventHost = document.createElement("span");
    eventHost.textContent =
      "Hosted by:" + event.user.firstName + " " + event.user.lastName;
    eventHost.classList.add("event-host");
    eventInfo.appendChild(eventHost);

    const participateButton = document.createElement("button");
    participateButton.textContent = "Participate";
    participateButton.classList.add("participate-btn");
    participateButton.setAttribute("id", "participateButton");
    eventInfo.appendChild(participateButton);

    participateButton.addEventListener("click", function () {
      window.location.href = "http://127.0.0.1:5501/HTML/login.html";
    });
  });
}

function dropdownExtend() {
  document.getElementById("myDropdown").style.display = "block";
}

function dropdownClose() {
  document.getElementById("myDropdown").style.display = "none";
}

function getEventByCategory(category) {
  document.getElementById("myDropdown").style.display = "none";
  const contentArea = document.getElementById("contentArea");
  contentArea.innerHTML = "";
  const listofallevents = document.createElement("h1");
  listofallevents.textContent = "List of all Upcoming " + category + " Events";
  listofallevents.classList.add("listofallevents");
  contentArea.appendChild(listofallevents);
  const eventRequest = new XMLHttpRequest();

  var url = "http://localhost:8080/events/" + encodeURIComponent(category);
  eventRequest.open("GET", url);

  eventRequest.onreadystatechange = function () {
    if (eventRequest.readyState == 4 && eventRequest.status == 200) {
      const eventDataByCategory = JSON.parse(eventRequest.responseText);
      console.log(eventDataByCategory);
      display(eventDataByCategory);
    }
  };

  eventRequest.send();
}

function getAllEvents() {
  const contentArea = document.getElementById("contentArea");
  contentArea.innerHTML = "";
  const listofallevents = document.createElement("h1");
  listofallevents.textContent = "List of all Upcoming Events";
  listofallevents.classList.add("listofallevents");
  contentArea.appendChild(listofallevents);

  document.getElementById("myDropdown").style.display = "none";
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const eventData = JSON.parse(xhr.responseText);
      display(eventData);
    }
  };
  xhr.open("GET", "http://localhost:8080/events/all", true);
  xhr.send();
}

document.getElementById("loginButton").addEventListener("click", function () {
  window.location.href = "http://127.0.0.1:5501/HTML/login.html";
});
document.getElementById("signupButton").addEventListener("click", function () {
  window.location.href = "http://127.0.0.1:5501/HTML/signup.html";
});
