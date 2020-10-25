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
