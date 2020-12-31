Dropzone.options.myawesomedropzone = {
  init: function() {
    
      this.on('addedfile', function(file) {
        
          if(this.files.length > 10) {
              this.removeFile(this.files[10]);
              messageError.style.display = "inline-block";
              messageText.innerHTML = "no more than 10";
          } else {
              messageError.style.display = "none";
          }
       });

       let myDropzone = this;
       document.querySelector("#button").addEventListener("click", function (e){
         console.log(myDropzone.files[0].dataURL)
        });
      },
      
}
alert("hello");