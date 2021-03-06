var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

const password = $("#password");
const password_confirm = $("#password_confirm");
const email = $("#email");
const name = $("#name");
const surname = $("#surname");
const date = $("#date");
const gender = $("#gender");
const country = $("#country");
const submitRegistration = $("#submit_sign_in");
const fields = document.getElementsByName("input");

function validatePassword() {
  if (password != null) {
    if (password.value != password_confirm.value) {
      console.log("qui");
      password_confirm.setCustomValidity("Passwords Don't Match");
      password_confirm.style.borderBottom = "0.1em solid red";
    } else {
      console.log("qui2");
      password_confirm.setCustomValidity("");
      password_confirm.style.borderBottom = "0.1em solid green";
      verificationFields();
    }
  }
}
if (password != null) {
  password.onchange = function () {
    validatePassword();
  };
  password_confirm.onkeyup = function () {
    validatePassword();
  };
}

fields.onchange = function () {
  verificationFields();
};

function verificationFields() {
  if (
    password != null &&
    password_confirm != null &&
    email != null &&
    name != null &&
    surname != null &&
    date != null &&
    gender != null &&
    country != null
  ) {
  } else {
    $("#js-emptyError").classList.add("");
  }
  // post body data
}

if (typeof submitRegistration != "undefined" && submitRegistration != null) {
  submitRegistration.onclick = function () {
    event.preventDefault();
    sendRegistration();
  };
}

function sendRegistration() {
  let form = {
    mail: mail.value,
    name: name.value,
    surname: surname.value,
    password: password.value,
  };

  let asdf = JSON.stringify(form);

  let formData = new FormData();
  formData.append("data", asdf);
  // pass request object to `fetch()`
  fetch("https://imgrecognitionteam3.pythonanywhere.com/signup/", {
    method: "POST",
    body: formData,
    // headers: {
    //     "Content-type": "application/json; charset=UTF-8",

    // }
  })
    .then((response) => {
      if (response.ok) {
        $("#js-modalRegistrationSuccess").classList.add("c-modal--open");
        setTimeout(function () {
          window.location.href = "index.html";
        }, 2500);
      }

      if (response.status >= 100 && response.status < 200) {
        console.log("Informazioni per il client");
      }
      if (response.status >= 300 && response.status < 399) {
        console.log("Redirezione");
      }
      if (response.status >= 400 && response.status < 499) {
        $("#js-registrationError").classList.add("c-modal--open");
        console.log("Richiesta errata");
      }
      if (response.status >= 500 && response.status < 599) {
        console.log("Errore sul server");
      }
    })
    .catch((err) => console.log(err));
}
