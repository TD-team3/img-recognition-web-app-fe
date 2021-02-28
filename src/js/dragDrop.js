var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
const fileElem = $("#fileElem");

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
  let url = "https://imgrecognitionteam3.pythonanywhere.com/upload_test/";
  let formData = new FormData();
  formData.append("file", file);
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
    .then(progressDone) // <- Add `progressDone` call here
    .catch((error) => {
      console.error("Error:", error);
    });
}

function previewFile(file) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function () {
    let img = document.createElement("img");
    img.src = reader.result;
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
