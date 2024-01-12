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
var accessToken = getCookie("jwt");
xhttp.onreadystatechange = function () {
  if (xhttp.readyState == 4 && xhttp.status == 200) {
    var userDetails = JSON.parse(xhttp.responseText);
    var userName = userDetails.firstName;
    updateNavbar(userName);
    displayDetailsOnSidebar(userDetails);
  }
};
xhttp.open("GET", "http://localhost:8080/users/home", true);
xhttp.setRequestHeader("Authorization", "Bearer " + accessToken);
xhttp.send();

function display(data) {
  const exculdeColumns = [
    "eventId",
    "user",
    "createdAt",
    "updatedAt",
    "creator",
    "participants",
  ];
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
      "Hosted by:" + event.creator.firstName + " " + event.creator.lastName;
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

var sidebar = document.getElementById("sidebar");
document.getElementById("profileIcon").addEventListener("click", function () {
  if (sidebar.classList == "sidebar") {
    sidebar.classList.add("sidebar-collapsed");
  } else {
    sidebar.classList.add("sidebar");
    sidebar.classList.remove("sidebar-collapsed");
  }
});
// document.addEventListener("click", function (e) {
//   var target = e.target;
//   var isSidebar = sidebar.contains(target);

//   if (!isSidebar && sidebar.classList.contains("sidebar-collapsed")) {
//     sidebar.classList.add("sidebar");
//     sidebar.classList.remove("sidebar-collapsed");
//   }
// });

function displayDetailsOnSidebar(userDetails) {
  var name = document.createElement("span");
  name.textContent = userDetails.firstName + " " + userDetails.lastName;
  name.classList.add("sidebar-name");
  var email = document.createElement("span");
  email.textContent = userDetails.email;
  email.classList.add("sidebar-email");

  var profileDetails = document.getElementById("profileNameDiv");
  profileDetails.appendChild(name);
  profileDetails.appendChild(email);
}

function logout() {
  document.cookie = "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure";
}

document.getElementById("logoutField").addEventListener("click", function () {
  expireCookie("jwt");
  window.location.href = "http://127.0.0.1:5501/HTML/event.html";
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

function expireCookie(name) {
  document.cookie = name + "= xyz; expires=Thu, 01 Jan 1970 00:00:00 UTC";
}

document.getElementById("createEvent").addEventListener("click", function () {
  window.location.href = "http://127.0.0.1:5501/HTML/createEvent.html";
});
