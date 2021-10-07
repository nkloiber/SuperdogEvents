//displays a message to the user
function displayMessage() {
    //declare our variable
    let msg = "";

    //pull the value from the input box
    msg = document.getElementById("message").value;

    //alert the user
    alert(msg);
}


function displayMessage2() {

    let msg = "";

    msg = document.getElementById("message").value;

    Swal.fire(msg);
}