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
        alert("fill in all the details");
    } else {
        fetch('http://localhost:3001/data').then(response => response.json()).then(data => {

            data.users.push({ name: username.value, password: password.value });
            fetch('http://localhost:3001/data', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(response => response.text()).then(result => {
                console.log(result);
                enter.innerText = 'User added successfully';
            }).catch(error => { console.error('Error saving data:', error); enter.innerText = 'Error saving data'; });
            username.value = "";
            password.value = "";
        }).catch(error => {
            console.error('Error fetching JSON:', error);
            enter.innerText = 'Error fetching data';
        });
    }

});
