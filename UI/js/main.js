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
  let signdata = {
      firstname: document.getElementById('firstname').value,
      lastname: document.getElementById('lastname').value,
      othername: document.getElementById('othername').value,
      email: document.getElementById('email').value,
      phoneNumber: document.getElementById('phone').value,
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
      confirm_password: document.getElementById('confirm_password').value
};
  fetch(' http://127.0.0.1:5000/api/v2/auth/signup', {
    mode:'cors',
    method:'POST',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    },
    body: JSON.stringify(signdata)
  })
  .then((resp) => resp.json())
  .then((data) => {
    if (data.status === 201){
      window.location.href = "http://127.0.0.1:5500/UI/userdashboard.html";
      localStorage.setItem('token', data.token);
      console.log(resp.status)
      console.log(resp.data)
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
