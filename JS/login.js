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
        var loginStatus = JSON.parse(xhr.responseText);
        Object.values(loginStatus).forEach((value) => {
          if (value == "Login success") {
            window.location.href = "http://127.0.0.1:5501/HTML/userpage.html";
          } else if (value == "password not match") {
            document.getElementById("incorrectPassword").style.visibility =
              "visible";
            document.getElementById("password").value = "";
          } else if (value == "User not exists") {
            document.getElementById("incorrectUsername").style.visibility =
              "visible";
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
          }
        });
      } else {
        console.error("Error:", xhr.statusText);
      }
    };
    xhr.send(JSON.stringify(userLoginData));
  });
