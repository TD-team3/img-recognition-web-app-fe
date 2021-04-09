var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
const fileElem = $("#fileElem");
let image_count = 1;

fileElem.onchange = function () {
  handleFiles(this.files);
};

let dropArea = document.getElementById("drop-area");
let filesDone = 0;
let filesToDo = 0;
let progressBar = document.getElementById("progress-bar");
let uploadProgress = [];

["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  dropArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

["dragenter", "dragover"].forEach((eventName) => {
  dropArea.addEventListener(eventName, highlight, false);
});
["dragleave", "drop"].forEach((eventName) => {
  dropArea.addEventListener(eventName, unhighlight, false);
});

function highlight(e) {
  dropArea.classList.add("highlight");
}

function unhighlight(e) {
  dropArea.classList.remove("highlight");
}

dropArea.addEventListener("drop", handleDrop, false);

function handleDrop(e) {
  let dt = e.dataTransfer;
  let files = dt.files;

  handleFiles(files);
}

function handleFiles(files) {
  files = [...files];
  initializeProgress(files.length); // <- Add this line
  files.forEach(uploadFile);
  files.forEach(previewFile);
}

function uploadFile(file, i) {
  // <- Add `i` parameter
  let url = "https://imgrecognitionteam3.pythonanywhere.com/upload/";
  let formData = new FormData();
  formData.append("photos[0]", file);
  formData.append(
    "data",
    '{"username":"' +
      sessionStorage.getItem("username") +
      '","token":"' +
      sessionStorage.getItem("token") +
      '"}'
  );

  fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      response.json().then((image) => {
        let list = document.getElementById("js-modalResultContent");
        -console.log("qui");
        try {
          Object.keys(image).map((key) => {
            let value = image[key];
            console.log("json:", key, value);
            let output =
              "<li><i>" +
              "Image " +
              image_count +
              "</i> => <strong>" +
              value +
              "</strong></li>";
            list.innerHTML += output;
            image_count += 1;
          });
        } catch (e) {
          console.error(e);
          list.innerHTML = "Errore nella risposta";
        }

        document
          .getElementById("js-modalResult")
          .classList.add("c-modal--open");
      });
    })
    .then(() => {
      progressDone();
    }) // <- Add `progressDone` call here
    .catch((error) => {
      console.error("Error:", error);
    });
}

function previewFile(file) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function () {
    let img = document.createElement("div");
    img.style.backgroundImage = "url('" + reader.result + "')";
    document.getElementById("gallery").appendChild(img);
  };
}

function initializeProgress(numfiles) {
  progressBar.value = 0;
  filesDone = 0;
  filesToDo = numfiles;
}

function progressDone() {
  filesDone++;
  progressBar.value = (filesDone / filesToDo) * 100;
}


/* HEADER */

const user = document.getElementById("headerUsername")
const logout = document.getElementById("logOut")
const searches = document.getElementById("searches")

user.innerHTML = "Welcome " + sessionStorage.getItem("username");

var acc = document.getElementsByClassName("c-header__user-wrapper");

for ( var i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
      // panel.style.animationName = "example";
      // panel.style.animationDuration =  "0.5s";
      // panel.style.animationDirection = "reverse";
    } else {
      panel.style.display = "block";
      panel.style.animationName = "example";
      panel.style.animationDuration =  "0.5s";
      panel.style.animationDirection = "normal";
    }
  });
}


logout.onclick = function() {
   event.preventDefault();
    // post body data
    let formData = new FormData();
    formData.append(
      "data",
      '{"username":"' +
        sessionStorage.getItem("username") +
        '","token":"' +
        sessionStorage.getItem("token") +
        '"}'
    );
  
  
  fetch("https://imgrecognitionteam3.pythonanywhere.com/logout/", {
      method: "POST",
      body: formData,
      // headers: {
      //     "Content-type": "application/json; charset=UTF-8",
  
      // }
    })
      .then((response) => {
        if (response.ok) {
          sessionStorage.removeItem("username")
  sessionStorage.removeItem("token")
  setTimeout(function () {
    window.location.href = "index.html";
  }, 200);
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
}

searches.onclick = function() {
  event.preventDefault();
  // post body data
  let formData = new FormData();
  formData.append(
    "data",
    '{"username":"' +
      sessionStorage.getItem("username") +
      '","token":"' +
      sessionStorage.getItem("token") +
      '"}'
  );


fetch("https://imgrecognitionteam3.pythonanywhere.com/get_searches/", {
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
          console.log(data);
        });
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
}