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

    xhr.open("POST", "http://localhost:8080/auth/login", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
      if (xhr.status == 200) {
        var loginResponse = JSON.parse(xhr.responseText);
        console.log(loginResponse);
        var jwtToken = loginResponse.jwt;
        setCookie(jwtToken);
        window.location.href = "http://127.0.0.1:5501/HTML/userpage.html";
      } else {
        console.error("Error:", xhr.statusText);
      }
    };

    xhr.send(JSON.stringify(userLoginData));

    function setCookie(cvalue) {
      document.cookie = cvalue + ";" + ";path=/";
    }
  });
