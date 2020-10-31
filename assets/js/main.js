const loader = document.querySelector("#loader");
const main = document.querySelector("#content");
var g;
function init() {
  setTimeout(() => {
    loader.style.opacity = 0;
    loader.style.display = "none";

    main.style.display = "block";
    setTimeout(() => (main.style.opacity = 1), 50);
  }, 2000);
}

init();

let mainNav = document.getElementById("js-menu");
let navBarToggle = document.getElementById("js-navbar-toggle");

navBarToggle.addEventListener("click", function () {
  mainNav.classList.toggle("active");
});

//code for fetching participants from json files in contributionsfolder

const participantProfile =
  "https://coffeewithdevs.github.io/CodeWithUs/profile.html?username=";
const participantsContainer = document.getElementById("participants-container");
const participantProfilesystem = "/profile.html?username=";

fetch("https://api.github.com/repos/CoffeeWithDevs/CodeWithUs/contributors")
  .then((res) => res.json())
  .then((res) => {
    res.forEach((user) => {
      fetch(user.url)
        .then((res) => res.json())
        .then((res) => {
          {
            const name = res.name == null ? user.login : res.name;
            //code for rendering participants in partcipants-container
            //participant image is available as data.imageurl
            x =
              '<div class="image"><img class="image__img" src="' +
              user.avatar_url +
              '" onerror="this.src=' +
              "customUrl" +
              '"><div class="image__overlay image__overlay_blur"><div class="image__title text-center">' +
              name;
            x =
              x +
              '</div><div class="image__description"><p id="parag" class="text-center">';
            g = res.bio;
            res.bio == null
              ? (g = "I'm a Programmer and Open source contributor")
              : (g = truncate(g));
            x = x + g;
            x =
              x +
              '</p></div><div class="links_par"><a  href="' +
              user.html_url +
              '"><i class="fab fa-github"></i></a><a  href="' +
              participantProfile +
              user.login +
              '"><i class="fa fa-user"></i></a><div></div></div>';
            participantsContainer.innerHTML += x;
          }
        });
    });
  });

function truncate(usertext) {
  var n = usertext.length;
  var c = 0;
  for (i = 0; i < n; i++) {
    if (usertext[i] == " ") {
      c++;
    }
  }
  var f = 12;
  if (c > 12) {
    var temText = "";
    for (i = 0; i < n; i++) {
      if (f > 0) {
        if (usertext[i] == " ") f--;
        temText += usertext[i];
      }
    }
    temText += "...";
    usertext = temText;
  }
  return usertext;
}
