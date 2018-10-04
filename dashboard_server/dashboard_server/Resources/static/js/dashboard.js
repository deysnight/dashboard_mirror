var modal = document.getElementById('ServiceModal');

var button = document.getElementById("ServiceButton");

var closebutton = document.getElementsByClassName("CloseServiceModal")[0];

button.onclick = function() {
    modal.style.display = "block";
};

closebutton.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
