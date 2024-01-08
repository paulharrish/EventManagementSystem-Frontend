const xhr = new XMLHttpRequest();
const username = "user";
const password = "28a50750-eff8-4a1a-b9da-c08335b35ea8";
const credentials = `${username}:${password}`;
const base64Credentials = btoa(credentials);
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4 && xhr.status == 200) {
    const eventData = JSON.parse(xhr.responseText);
    display(eventData);
  }
};
xhr.open("GET", "http://localhost:8080/events/all", true);
xhr.setRequestHeader("Authorization", `Basic ${base64Credentials}`);
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

document.getElementById("loginButton").addEventListener("click", function () {
  window.location.href = "http://127.0.0.1:5501/HTML/login.html";
});
document.getElementById("signupButton").addEventListener("click", function () {
  window.location.href = "http://127.0.0.1:5501/HTML/signup.html";
});
