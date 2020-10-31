let text = "";

let params = new URLSearchParams(document.location.search.substring(1));
let username = params.get("username");
const name = document.getElementById("name");
const about = document.getElementById("about");
const image = document.getElementById("userImg");
const fbLink = document.getElementById("fbLink");
const gitLink = document.getElementById("gitLink");
let title = document.getElementById("title");

fetch("https://api.github.com/repos/CoffeeWithDevs/CodeWithUs/contributors")
  .then((res) => res.json())
  .then((res) => getDetails(res))
  .catch((err) => {
    console.log(err);
  });

function getDetails(data) {
  const user = data.find((user) => user.login == username);
  fetch(user.url)
    .then((res) => res.json())
    .then((res) => {
      const name1 = res.name == null ? user.login : res.name;
      name.innerHTML = name1;
      about.innerHTML = res.bio =
        res.bio == null
          ? "I'm a Programmer and Open source contributor"
          : res.bio;
      image.src = user.avatar_url;
      gitLink.href = user.html_url;

      document.getElementById("demo").innerHTML = text;
      title.innerHTML = name.innerHTML + " | Code With Us";
    });
}
