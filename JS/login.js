document
  .getElementById("loginButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var userLoginData = {
      username: username,
      password: password,
    };

    var xhr = new XMLHttpRequest();

    xhr.open("POST", "http://localhost:8080/users/login", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
      if (xhr.status == 200) {
        console.log(JSON.parse(xhr.responseText));
      } else {
        console.error("Error:", xhr.statusText);
      }
    };
    xhr.send(JSON.stringify(userLoginData));

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  });
