var createmeet = document.getElementById('meetbtn');
const meeturl = "https://questioner-v2.herokuapp.com/api/v2/meetups"
const meetupurl = "https://matthenge.github.io/Questioner/UI/meetup.html"

//Create Meetup

function createMeetup(event) {
    event.preventDefault();
    let meetTags = document.getElementById('tags').value.split(",")
    meetTags.forEach(tag => {
        if (tag.length > 0 && tag.substr(0, 1) != "#"){
            tag = "#"+tag
        }
    });
    let tags = "{" + meetTags + "}"
    let meetImages = document.getElementById('images').value.split(",")
    let images = "{" + meetImages + "}"
    let location = document.getElementById('location').value
    let happeningOn = document.getElementById('date').value
    let topic = document.getElementById('topic').value

  fetch(meeturl, {
    method:'POST',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'x-access-token': localStorage.token
    },
    body: JSON.stringify({
        "location": location,
        "images":images,
        "topic":topic,
        "happeningOn": happeningOn,
        "tags":tags
    })
  })
  .then((resp) => resp.json())
  .then((data) => {
    if (data.status === 201){
      window.setTimeout(function () {
        location.href = meetupurl;
      }, 1000);
    }else{
      snackBar(data.error);
    }
  })
  .catch((error) => console.error(error))
}


//Snackbar for messages
var snack = document.getElementById("snackbar");

function snackBar(content) {
  snack.innerText = content;
  snack.className = "show";
  setTimeout(function(){ snack.className = snack.className.replace("show", ""); }, 3000);
}

documentTitle = document.querySelector('title').innerHTML;
if (documentTitle == "New Meetup"){
  createmeet.addEventListener('click', createMeetup);
}
