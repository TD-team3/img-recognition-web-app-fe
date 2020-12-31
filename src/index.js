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
