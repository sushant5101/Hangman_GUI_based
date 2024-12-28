document.addEventListener('DOMContentLoaded', () => {
    var visibility = document.getElementById("trigger");
    var password = document.getElementById("password");
    var enter = document.getElementById("enter");
    var username = document.getElementById("username");

    visibility.addEventListener("click", function () {
        // Toggle visibility of the password
        if (password.type === "password") {
            password.type = "text";  // Show password
            visibility.innerText = "Θ";
            password.focus();
        } else {
            password.type = "password";  // Hide password
            visibility.innerText = "O";
            password.focus();
        }
    });

    enter.addEventListener('click', () => {
        if (username.value == "" || password.value == "") {
            alert("Fill in all the details");
        }else{
        location.relode();
        }
    });
