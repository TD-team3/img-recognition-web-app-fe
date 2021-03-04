import "./styles.scss";
import "./js/dragDrop";

// alert("funge");
// let dropArea = document.getElementById('drop-area')
// let filesDone = 0
// let filesToDo = 0
// let progressBar = document.getElementById('progress-bar')
// let uploadProgress = []

// ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
//   dropArea.addEventListener(eventName, preventDefaults, false)
// })

// function preventDefaults (e) {
//   e.preventDefault()
//   e.stopPropagation()
// }

// ;['dragenter', 'dragover'].forEach(eventName => {
//   dropArea.addEventListener(eventName, highlight, false)
// })

// ;['dragleave', 'drop'].forEach(eventName => {
//   dropArea.addEventListener(eventName, unhighlight, false)
// })

// function highlight(e) {
//   dropArea.classList.add('highlight')
// }

// function unhighlight(e) {
//   dropArea.classList.remove('highlight')
// }

// dropArea.addEventListener('drop', handleDrop, false)

// function handleDrop(e) {
//   let dt = e.dataTransfer
//   let files = dt.files

//   handleFiles(files)
// }

// function handleFiles(files) {
//   files = [...files]
//   initializeProgress(files.length) // <- Add this line
//   files.forEach(uploadFile)
//   files.forEach(previewFile)
// }

// function uploadFile(file, i) { // <- Add `i` parameter
//   var url = 'https://imgrecognitionteam3.pythonanywhere.com/upload/'
//   var xhr = new XMLHttpRequest()
//   var formData = new FormData()
//   xhr.open('POST', url, true)

//   // Add following event listener
//   xhr.upload.addEventListener("progress", function(e) {
//     updateProgress(i, (e.loaded * 100.0 / e.total) || 100)
//   })

//   xhr.addEventListener('readystatechange', function(e) {
//     if (xhr.readyState == 4 && xhr.status == 200) {
//       console.log(xhr)
//       // Done. Inform the user
//     }
//     else if (xhr.readyState == 4 && xhr.status != 200) {
//       // Error. Inform the user
//       console.log(xhr)
//     }
//   })

//   formData.append('file', file)
//   xhr.send(formData)
// }

// function previewFile(file) {
//   let reader = new FileReader()
//   reader.readAsDataURL(file)
//   reader.onloadend = function() {
//     let img = document.createElement('img')
//     img.src = reader.result
//     document.getElementById('gallery').appendChild(img)
//   }
// }

// function initializeProgress(numFiles) {
//   progressBar.value = 0
//   uploadProgress = []

//   for(let i = numFiles; i > 0; i--) {
//     uploadProgress.push(0)
//   }
// }

// function updateProgress(fileNumber, percent) {
//   uploadProgress[fileNumber] = percent
//   let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length
//   progressBar.value = total
// }
