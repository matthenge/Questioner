function myFunction() {
    document.getElementById("myMenu").classList.toggle("show");
  }
  
  window.onclick = function(event) {
    if (!event.target.matches('.dashbtn')) {
      var dropdowns = document.getElementsByClassName("menu-items");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
var register = document.getElementById('registerbtn');
function signup(event) {
  event.preventDefault();
  let firstname = document.getElementById('firstname').value;
  let lastname = document.getElementById('lastname').value;
  let othername = document.getElementById('othername').value;
  let email = document.getElementById('email').value;
  let phoneNumber = document.getElementById('phone').value;
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  let confirm_password = document.getElementById('confirm_password').value;
  fetch('https://questioner-v2.herokuapp.com/api/v2/auth/signup', {
    mode:'cors',
    method:'POST',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    },
    body: JSON.stringify({
      firstname: firstname,
      lastname: lastname,
      othername: othername,
      email: email,
      phoneNumber: phoneNumber,
      username: username,
      password: password,
      confirm_password: confirm_password
    })
  })
  .then((resp) => resp.json())
  .then((data) => {
    if (data.status == 200){
      window.location.href = 'userdashboard.html'
      window.alert(data.data)
    }else{
      window.alert(data.error);
    }
  })
  .catch((error) => console.error(error))
}
documentTitle = document.querySelector('title').innerHTML;
if (documentTitle == "Questioner"){
  register.addEventListener('click', signup);
}
