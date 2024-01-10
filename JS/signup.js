document
  .getElementById("signupButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var userRegistrationData = {
      firstName: firstname,
      lastName: lastname,
      email: email,
      username: username,
      password: password,
    };

    var xhr = new XMLHttpRequest();

    xhr.open("POST", "http://localhost:8080/auth/register", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
      if (xhr.status == 200) {
        console.log(JSON.parse(xhr.responseText));
        console.log("user created succesfully");
        document.getElementById("loginBack").style.visibility = "visible";
      } else {
        console.error("Error:", xhr.statusText);
      }
    };
    xhr.send(JSON.stringify(userRegistrationData));

    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  });
