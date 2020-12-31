var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
const user = $("#user");
const pass = $("#pass");
const submit = $("#submitButton")

submit.addEventListener("click", send);



function send() {
    event.preventDefault()
        // // console.log(json())


    // // function json() {
    // //     var data = {}
    // //     data.username = user.value;


    // //     data.password = pass.value;


    // //     //data = JSON.stringify(data);

    // //     return data;
    // // }




    // post body data 
    let form = {
        username: user.value,


        password: pass.value
    };



    // pass request object to `fetch()`
    fetch('http://imgrecognitionteam3.pythonanywhere.com/login/', {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then(res => res.json())
        .then(response => {
            if (response.ok) { console.log("Contenuto ricevuto"); }

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
                console.log("Errore sul server")
            }
        }).catch(err => console.log(err));




}