
var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
const user = $("#user");
const pass = $("#pass");
const submit = $("#submitButton");
const registration = $("#registration")

registration.addEventListener("click", function () {
  window.location.href = "sign-in.html"
});

if (typeof submit != "undefined" && submit != null) {
  submit.addEventListener("click", send);
}

if (window.location.href.indexOf("index") > -1) {
} else {
  if (!sessionStorage["user"] && !sessionStorage["token"]) {
    window.location.href = "index.html";
  }
}

function send() {
  event.preventDefault();
  // post body data
  let form = { username: user.value, password: pass.value };

  let asdf = JSON.stringify(form);

  let formData = new FormData();
  formData.append("data", asdf);

  // pass request object to `fetch()`
  fetch("https://imgrecognitionteam3.pythonanywhere.com/login/", {
    method: "POST",
    body: formData,
    // headers: {
    //     "Content-type": "application/json; charset=UTF-8",

    // }
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          // use data
          console.log(data["token"]);
          sessionStorage.setItem("token", data["token"]);
          sessionStorage.setItem("username", user.value);
        });
        $("#js-modalSuccess").classList.add("c-modal--open");
        setTimeout(function () {
          window.location.href = "upload-page.html";
        }, 1400);
      }

      if (response.status >= 100 && response.status < 200) {
        console.log("Informazioni per il client");
      }
      if (response.status >= 300 && response.status < 399) {
        console.log("Redirezione");
      }
      if (response.status >= 400 && response.status < 499) {
        $("#js-modalError").classList.add("c-modal--open");
        console.log("Richiesta errata");
      }
      if (response.status >= 500 && response.status < 599) {
        console.log("Errore sul server");
      }
    })
    .catch((err) => console.log(err));

  console.log(asdf);
}


