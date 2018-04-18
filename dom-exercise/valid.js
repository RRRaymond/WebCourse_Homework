window.onload = function () {
    document.getElementById("validate").onclick = valid;
}

function valid() {
    var inputs = document.querySelectorAll("input")
    for(var i=0;i<inputs.length;i++){
        if(inputs[i].value=="") {
            inputs[i].style.background = "red";
        }else{
            inputs[i].style.background = "";
        }
    }
}