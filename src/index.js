window.Dropzone = require("./js/dropzone");
import "./styles.scss";

var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

$("#js-result").onclick = function () {
  $("#js-modalError").classList.remove("c-modal--open");
  $("#js-modalResult").classList.add("c-modal--open");
};

$("#js-error").onclick = function () {
  $("#js-modalResult").classList.remove("c-modal--open");
  $("#js-modalError").classList.add("c-modal--open");
};

Dropzone.options.dropzone = {
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
