window.Dropzone = require("./js/dropzone");
import "./styles.scss";

var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
const user = $("#user");
const pass = $("#pass");
const submit = $("#submitButton");

if (typeof submit != "undefined" && submit != null) {
  submit.addEventListener("click", send);
}

if (window.location.href.indexOf("index") > -1) {
} else {
  if (!sessionStorage["username"] && !sessionStorage["token"]) {
    window.location.href = "index.html";
  }
}

Dropzone.options.dropzone = {
  dictDefaultMessage:
    "<svg width='80' height='80' viewBox='0 0 80 80' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M66.9779 6.66668C66.9779 6.07731 66.7437 5.51208 66.327 5.09533C65.9102 4.67858 65.345 4.44446 64.7556 4.44446H15.8668C15.2774 4.44446 14.7122 4.67858 14.2954 5.09533C13.8787 5.51208 13.6445 6.07731 13.6445 6.66668V8.8889H66.9779V6.66668Z' fill='#25C685'/><path d='M71.378 15.5556C71.378 14.9662 71.1439 14.401 70.7271 13.9842C70.3104 13.5675 69.7451 13.3334 69.1558 13.3334H11.378C10.7886 13.3334 10.2234 13.5675 9.80664 13.9842C9.38989 14.401 9.15576 14.9662 9.15576 15.5556V17.7778H71.378V15.5556Z' fill='#25C685'/><path d='M71.3777 22.2223H8.62211C7.5141 22.2223 6.45146 22.6624 5.66798 23.4459C4.88449 24.2294 4.44434 25.2921 4.44434 26.4001V66.9334C4.44434 68.0414 4.88449 69.104 5.66798 69.8875C6.45146 70.671 7.5141 71.1112 8.62211 71.1112H71.3777C72.4857 71.1112 73.5483 70.671 74.3318 69.8875C75.1153 69.104 75.5554 68.0414 75.5554 66.9334V26.4001C75.5554 25.2921 75.1153 24.2294 74.3318 23.4459C73.5483 22.6624 72.4857 22.2223 71.3777 22.2223ZM19.0221 29.889C20.3407 29.889 21.6296 30.2799 22.7259 31.0125C23.8222 31.745 24.6767 32.7862 25.1813 34.0044C25.6859 35.2226 25.8179 36.563 25.5607 37.8562C25.3034 39.1494 24.6685 40.3373 23.7362 41.2697C22.8038 42.202 21.6159 42.837 20.3227 43.0942C19.0295 43.3514 17.6891 43.2194 16.4709 42.7148C15.2527 42.2102 14.2115 41.3558 13.479 40.2594C12.7464 39.1631 12.3554 37.8742 12.3554 36.5556C12.3554 34.7875 13.0578 33.0918 14.3081 31.8416C15.5583 30.5913 17.254 29.889 19.0221 29.889ZM66.6666 62.2223H13.3332L29.911 45.6223C30.2065 45.3292 30.6059 45.1647 31.0221 45.1647C31.4383 45.1647 31.8377 45.3292 32.1332 45.6223L40.311 53.8001L51.5777 42.2223C51.8732 41.9292 52.2725 41.7647 52.6888 41.7647C53.105 41.7647 53.5044 41.9292 53.7999 42.2223L66.6666 55.089V62.2223Z' fill='#25C685'/></svg>",
  autoProcessQueue: false,
  addRemoveLinks: true,
  dictMaxFilesExceeded: "Maximum upload limit reached",
  dictInvalidFileType: "upload only JPG/PNG/JPEG/GIF/BMP",
  acceptedFiles: ".png,.jpg,.jpeg,.gif,.bmp",
  parallelUploads: 10,
  // uploadMultiple: true,
  init: function () {
    var submitButton = document.querySelector("#js-upload");
    myDropzone = this;

    submitButton.addEventListener("click", function () {
      myDropzone.processQueue();
      alert("hello");
    });

    this.on("complete", function () {
      if (
        this.getQueuedFiles().length == 0 &&
        this.getUploadingFiles().length == 0
      ) {
        var _this = this;
        _this.removeAllFiles();
      }
      console.log(this.getUploadingFiles());
    });
  },
};

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

/************************************************RECOVERY PASSWORD */

const recovery = $("#passwordRecovery");
const subtitle = $("#subtitle")
const title = $("#title")
const passImg = $("#passImg")

recovery.onclick = function () {
  recovery.style.display = "none"
  title.innerHTML = "Write your email";
  pass.style.display = "none";
  user.placeholder = "email address";
  passImg.style.display = "none";
  subtitle.innerHTML = "We will send an email to recover your password" ;
  submit.innerHTML = "Continue &#8594;"
};