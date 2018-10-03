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

$('#meteo_service').click(function () {

    var $checks = $(this).find('input:checkbox[name=meteo_check]');

     $checks.prop("checked", !$checks.is(":checked"));
});

$('#steam_service').click(function () {

    var $checks = $(this).find('input:checkbox[name=steam_check]');

     $checks.prop("checked", !$checks.is(":checked"));
});

$('#twitch_service').click(function () {

    var $checks = $(this).find('input:checkbox[name=twitch_check]');

     $checks.prop("checked", !$checks.is(":checked"));
});

$('#crypto_service').click(function () {

    var $checks = $(this).find('input:checkbox[name=crypto_check]');

     $checks.prop("checked", !$checks.is(":checked"));

});

$('#youtube_service').click(function () {

    var $checks = $(this).find('input:checkbox[name=youtube_check]');

     $checks.prop("checked", !$checks.is(":checked"));
});

$('#epitech_service').click(function () {

    var $checks = $(this).find('input:checkbox[name=epitech_check]');

     $checks.prop("checked", !$checks.is(":checked"));
});

$('input[type=checkbox]').click(function (e) {
     e.stopPropagation();
 });