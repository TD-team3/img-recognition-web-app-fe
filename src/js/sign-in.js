
var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

let password = $("#password");
let password_confirm = $("#password_confirm");
let username = $('#username');

function validatePassword() {
  if (password.value != password_confirm.value) {
    password_confirm.setCustomValidity("Passwords Don't Match");
    password_confirm.style.borderBottom = "0.1em solid red";
  } else {
    password_confirm.setCustomValidity("");
    password_confirm.style.borderBottom = "0.1em solid green";

    const submitRegistration = $("#submit_sign_in");
    submitRegistration.addEventListener("click", sendRegistration);

    function sendRegistration() {
      event.preventDefault();

      // post body data
      let form = { username: username.value, password: password.value };

      let asdf = JSON.stringify(form);

      let formData = new FormData();
      formData.append("data", asdf);
      // pass request object to `fetch()`
      fetch("URL", {
        method: "POST",
        body: formData,
        // headers: {
        //     "Content-type": "application/json; charset=UTF-8",

        // }
      })
        .then((response) => {
          if (response.ok ) {
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
            console.log("Richiesta errata");
          }
          if (response.status >= 500 && response.status < 599) {
            console.log("Errore sul server");
          }
        })
        .catch((err) => console.log(err));

      console.log(asdf);
    }
  }

}
password.onchange = validatePassword();
password_confirm.onkeyup = validatePassword();