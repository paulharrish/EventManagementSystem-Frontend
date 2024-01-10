const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4 && xhr.status == 200) {
    const eventData = JSON.parse(xhr.responseText);
    display(eventData);
  }
};
xhr.open("GET", "http://localhost:8080/events/all", true);
xhr.send();

const xhttp = new XMLHttpRequest();
var accessToken = document.cookie;
xhttp.onreadystatechange = function () {
  if (xhttp.readyState == 4 && xhttp.status == 200) {
    var userDetails = JSON.parse(xhttp.responseText);
    var userName = userDetails.firstName;
    updateNavbar(userName);
  }
};
xhttp.open("GET", "http://localhost:8080/users/home", true);
xhttp.setRequestHeader("Authorization", "Bearer " + accessToken);
xhttp.send();

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
  });
}

function updateNavbar(name) {
  const infoArea = document.getElementById("infoDiv");
  const userGreeting = document.createElement("span");
  userGreeting.textContent = "Hii " + name + "!";
  userGreeting.classList.add("user-greeting");
  infoArea.appendChild(userGreeting);
}

function dropdownExtend() {
  document.getElementById("myDropdown").style.display = "block";
}

function dropdownClose() {
  document.getElementById("myDropdown").style.display = "none";
}
