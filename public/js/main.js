let mainNav = document.getElementById("js-menu");
let navBarToggle = document.getElementById("js-navbar-toggle");

navBarToggle.addEventListener("click", function() {
  mainNav.classList.toggle("active");
});

const userDisplay = document.getElementById("demo");

let text = "";

let params = new URLSearchParams(document.location.search.substring(1));
let username = params.get("username");
const name = document.getElementById("name");
const about = document.getElementById("about");
const image = document.getElementById("userImg");
const fbLink = document.getElementById("fbLink");
const gitLink = document.getElementById("gitLink");
let title = document.getElementById("title");

fetch(
  "https://coffeewithdevs.github.io/CodeWithUs/contributions/" +
    username +
    ".json"
)
  .then((res) => res.text())
  .then((res) => getDetails(res))
  .catch((err) => {
    console.log(err);
  });

function getDetails(data) {
  var obj = JSON.parse(data);
  name.innerHTML = obj.name;
  about.innerHTML = obj.about;
  image.src = obj.imageurl;
  fbLink.href = obj.facebook;
  gitLink.href = obj.github;

  let text, fLen, i;
  let prs = obj.prs;
  fLen = prs.length;

  text = "<ul>";
  for (i = 0; i < fLen; i++) {
    text += "<li>" + prs[i] + "</li>";
  }
  text += "</ul>";

  document.getElementById("demo").innerHTML = text;
  title.innerHTML = name.innerHTML + " | Code With Us";
}

//code for fetching participants from json files in contributions folder

const githubApiUrl =
  "https://api.github.com/repos/CoffeeWithDevs/CodeWithUs/commits/main";
const participantBaseUrl =
  "https://coffeewithdevs.github.io/CodeWithUs/contributions/";
const participantProfile =
  "https://coffeewithdevs.github.io/CodeWithUs/profile.html?username=";
const participantsContainer = document.getElementById("participants-container");
fetch(githubApiUrl)
  .then((res) => res.json())
  .then((data) => {
    const treeUrl = data.commit.tree.url;
    fetch(treeUrl)
      .then((treeRes) => treeRes.json())
      .then((treeData) => {
        const contributionsUrl = treeData.tree[2].url;
        fetch(contributionsUrl)
          .then((contributionsRes) => contributionsRes.json())
          .then((contributionsData) => {
            let participants = contributionsData.tree.map(
              (contributor) => contributor.path
            );
            participants.forEach((participant) => {
              const participantUsername = participant.substring(
                0,
                participant.length - 5
              );
              fetch(`${participantBaseUrl + participant}`)
                .then((res) => res.json())
                .then((data) => {
                  //code for rendering participants in partcipants-container
                  //participant image is available as data.imageurl
                  x =
                    '<div class="image"><img class="image__img" src="' +
                    data.imageurl +
                    '" onerror="this.src=' +
                    "customUrl" +
                    '"><div class="image__overlay image__overlay_blur"><div class="image__title text-center">' +
                    data.name;
                  x =
                    x +
                    '</div><div class="image__description"><p id="parag" class="text-center">';
                  g = data.about;
                  g = truncate(g);
                  x = x + g;
                  x =
                    x +
                    '</p></div><div class="links_par"><a  href="' +
                    data.github +
                    '"><i class="fab fa-github"></i></a><a  href="' +
                    participantProfile +
                    participantUsername +
                    '"><i class="fa fa-user"></i></a><a href="' +
                    data.facebook +
                    '"><i class="fab fa-facebook"></i></a><div></div></div>';
                  participantsContainer.innerHTML += x;
                })
                .catch((err) => console.log(participant + ": " + err));
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));

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
