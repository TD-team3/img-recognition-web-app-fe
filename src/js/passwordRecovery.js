/************************************************RECOVERY PASSWORD */
var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
const user = $("#user");
const subtitle = $("#subtitle")
const title = $("#title")
const userImg = $("#userImg")

const recoveryButton = document.getElementById("recoveryPassword")

if (recoveryButton != null) {
recoveryButton.onclick = function() {
  event.preventDefault();

  // post body data
  let form = { mail: user.value};

  let asdf = JSON.stringify(form);

  let formData = new FormData();
  formData.append("data", asdf);

  // pass request object to `fetch()`
  fetch("https://imgrecognitionteam3.pythonanywhere.com/recovery_password/", {
    method: "POST",
    body: formData,
    // headers: {
    //     "Content-type": "application/json; charset=UTF-8",

    // }
  })
    .then((response) => {
      if (response.ok) {
        title.innerHTML = "Email sent, check your mailbox!";
        subtitle.innerHTML = "You will be redirected to the login page within 5s." ;
        recoveryButton.style.display = "none";
        user.style.display = "none";
        userImg.style.display = "none";
        setTimeout(function () {
            window.location.href = "index.html";
          }, 4000);
      }

      if (response.status >= 100 && response.status < 200) {
        console.log("Informazioni per il client");
      }
      if (response.status >= 300 && response.status < 399) {
        console.log("Redirezione");
      }
      if (response.status >= 400 && response.status < 499) {
        title.innerHTML = "Incorrect Email";
        subtitle.style.display = "none" ;
        recoveryButton.style.display = "none";
        user.style.display = "none";
        userImg.style.display = "none";
        setTimeout(function () {
            window.location.href = "recovery-password.html";
          }, 2000);
        console.log("Richiesta errata");
      }
      if (response.status >= 500 && response.status < 599) {
        console.log("Errore sul server");
      }
    })
    .catch((err) => console.log(err));

}
}