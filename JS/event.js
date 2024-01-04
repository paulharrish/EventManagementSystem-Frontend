const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4 && xhr.status == 200) {
    const eventData = JSON.parse(xhr.responseText);
    display(eventData);
    console.log(eventData);
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

    const participateButton = document.createElement("button");
    participateButton.textContent = "Participate";
    participateButton.classList.add("participate-btn")
    eventInfo.appendChild(participateButton);

  });
}
