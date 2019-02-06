var register = document.getElementById('loginbtn');
function login(event) {
  event.preventDefault();
  let logindata = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
};
  fetch(' http://127.0.0.1:5000/api/v2/auth/login', {
    mode:'cors',
    method:'POST',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    },
    body: JSON.stringify(logindata)
  })
  .then((resp) => resp.json())
  .then((data) => {
    if (data.status === 200){
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
  register.addEventListener('click', login);
}