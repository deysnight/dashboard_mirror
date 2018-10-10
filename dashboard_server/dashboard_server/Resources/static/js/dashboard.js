var modal_service = document.getElementById('ServiceModal');

var button_service = document.getElementById("ServiceButton");

var closebutton_service = document.getElementsByClassName("CloseServiceModal")[0];

button_service.onclick = function() {
    modal_service.style.display = "block";
};

closebutton_service.onclick = function() {
    modal_service.style.display = "none";
};



var modal_widget = document.getElementById('WidgetModal');

var button_widget = document.getElementById("WidgetButton");

var closebutton_widget = document.getElementsByClassName("CloseWidgetModal")[0];

button_widget.onclick = function() {
    modal_widget.style.display = "block";
};

closebutton_widget.onclick = function() {
    modal_widget.style.display = "none";
};

function trigger_widget_modal() 
{
    modal_widget.style.display = "block";
}

$('#checkmark_meteo').click(function () {

    var $checks = $('input:checkbox[name=meteo_check]');

     $checks.prop("checked", !$checks.is(":checked"));
});


$('#checkmark_steam').click(function () {

    var $checks = $('input:checkbox[name=steam_check]');

     $checks.prop("checked", !$checks.is(":checked"));
});


$('#checkmark_twitch').click(function () {

    var $checks = $('input:checkbox[name=twitch_check]');

     $checks.prop("checked", !$checks.is(":checked"));
});


$('#checkmark_crypto').click(function () {

    var $checks = $('input:checkbox[name=crypto_check]');

     $checks.prop("checked", !$checks.is(":checked"));
});


$('#checkmark_youtube').click(function () {

    var $checks = $('input:checkbox[name=youtube_check]');

     $checks.prop("checked", !$checks.is(":checked"));
});


$('#checkmark_starcraft').click(function () {

    var $checks = $('input:checkbox[name=starcraft_check]');

     $checks.prop("checked", !$checks.is(":checked"));
});


$('#checkmark_epitech').click(function () {

    var $checks = $('input:checkbox[name=epitech_check]');

     $checks.prop("checked", !$checks.is(":checked"));
});


document.getElementById('meteo_service').onclick = function(event) {
    document.getElementById('meteo_intel').style.display = "block";
    document.getElementById('steam_intel').style.display = "none";
    document.getElementById('twitch_intel').style.display = "none";
    document.getElementById('crypto_intel').style.display = "none";
    document.getElementById('youtube_intel').style.display = "none";
    document.getElementById('starcraft_intel').style.display = "none";
    document.getElementById('epitech_intel').style.display = "none";
}

document.getElementById('steam_service').onclick = function(event) {
    document.getElementById('meteo_intel').style.display = "none";
    document.getElementById('steam_intel').style.display = "block";
    document.getElementById('twitch_intel').style.display = "none";
    document.getElementById('crypto_intel').style.display = "none";
    document.getElementById('youtube_intel').style.display = "none";
    document.getElementById('starcraft_intel').style.display = "none";
    document.getElementById('epitech_intel').style.display = "none";
}

document.getElementById('twitch_service').onclick = function(event) {
    document.getElementById('meteo_intel').style.display = "none";
    document.getElementById('steam_intel').style.display = "none";
    document.getElementById('twitch_intel').style.display = "block";
    document.getElementById('crypto_intel').style.display = "none";
    document.getElementById('youtube_intel').style.display = "none";
    document.getElementById('starcraft_intel').style.display = "none";
    document.getElementById('epitech_intel').style.display = "none";
}

document.getElementById('crypto_service').onclick = function(event) {
    document.getElementById('meteo_intel').style.display = "none";
    document.getElementById('steam_intel').style.display = "none";
    document.getElementById('twitch_intel').style.display = "none";
    document.getElementById('crypto_intel').style.display = "block";
    document.getElementById('youtube_intel').style.display = "none";
    document.getElementById('starcraft_intel').style.display = "none";
    document.getElementById('epitech_intel').style.display = "none";
}

document.getElementById('youtube_service').onclick = function(event) {
    document.getElementById('meteo_intel').style.display = "none";
    document.getElementById('steam_intel').style.display = "none";
    document.getElementById('twitch_intel').style.display = "none";
    document.getElementById('crypto_intel').style.display = "none";
    document.getElementById('youtube_intel').style.display = "block";
    document.getElementById('starcraft_intel').style.display = "none";
    document.getElementById('epitech_intel').style.display = "none";
}

document.getElementById('starcraft_service').onclick = function(event) {
    document.getElementById('meteo_intel').style.display = "none";
    document.getElementById('steam_intel').style.display = "none";
    document.getElementById('twitch_intel').style.display = "none";
    document.getElementById('crypto_intel').style.display = "none";
    document.getElementById('youtube_intel').style.display = "none";
    document.getElementById('starcraft_intel').style.display = "block";
    document.getElementById('epitech_intel').style.display = "none";
}

document.getElementById('epitech_service').onclick = function(event) {
    document.getElementById('meteo_intel').style.display = "none";
    document.getElementById('steam_intel').style.display = "none";
    document.getElementById('twitch_intel').style.display = "none";
    document.getElementById('crypto_intel').style.display = "none";
    document.getElementById('youtube_intel').style.display = "none";
    document.getElementById('starcraft_intel').style.display = "none";
    document.getElementById('epitech_intel').style.display = "block";
}

$(function() {
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
  });

function delete_cookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    location.reload(true);
}

function getCookie(name) {
    var cookie = document.cookie;
    var prefix = name + "=";
    var begin = cookie.indexOf("; " + prefix);
    if (begin == -1) {
        begin = cookie.indexOf(prefix);
        if (begin != 0) return null;
    } else {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = cookie.length;
        }
    }
    return unescape(cookie.substring(begin + prefix.length, end));
  } 

function check_if_cookie()
{
  var myCookie = getCookie("login");
  if (myCookie == null) {
    location.href = "/login";
  }
}

function show_widg (){
    var checkbox = document.getElementById("meteo_checkbox");
    if (checkbox.checked == true) {
        input = $('<div id="widget_modal_meteo_data">' +
        '<p class="widget_modal_title">Widget Météo</p>' +
        '<div class="widget_in_modal">' +
        '<p class="widget_modal" id="widget_01_meteo">Météo par ville</p>' +
        '</div>' +
        '</div>')
    $("#meteo_widget_modal").html(input);
    }
    var checkbox = document.getElementById("steam_checkbox");
    if (checkbox.checked == true) {
        input = $('<div id="widget_modal_steam_data">' +
            '<p class="widget_modal_title">Widget Steam</p>' +
            '<div class="widget_in_modal">' +
            '<p class="widget_modal" id="widget_01_steam">Joueurs sur un jeu</p>' +
            '</div>' +
            '<div class="widget_in_modal">' +
            '<p class="widget_modal" id="widget_02_steam">Liste d\'ami d\'un utilisateur</p>' +
            '</div>' +
            '</div>');
        $("#steam_widget_modal").html(input);
    }
    var checkbox = document.getElementById("twitch_checkbox");
    if (checkbox.checked == true) {
        input = $('<div id="widget_modal_twitch_data">' +
            '<p class="widget_modal_title">Widget Twitch</p>' +
            '<div class="widget_in_modal">' +
            '<p class="widget_modal" id="widget_01_twitch">Info sur une chaîne</p>' +
            '</div>' +
            '<div class="widget_in_modal">' +
            '<p class="widget_modal" id="widget_02_twitch">Info sur un jeu</p>' +
            '</div>' +
            '</div>'
        );
        $("#twitch_widget_modal").html(input);
    }
    var checkbox = document.getElementById("crypto_checkbox");
    if (checkbox.checked == true) {
        input = $(
            '<div id="widget_modal_crypto_data">' +
            '<p class="widget_modal_title">Widget Crypto</p>' +
            '<div class="widget_in_modal">' +
            '<p class="widget_modal" id="widget_01_crypto">Cours d\'une monnaie</p>' +
            '</div>' +
            '</div>'
        );
        $("#crypto_widget_modal").html(input);
    }
    var checkbox = document.getElementById("youtube_checkbox");
    if (checkbox.checked == true) {
        input = $(
            '<div id="widget_modal_youtube_data">' +
            '<p class="widget_modal_title">Widget Youtube</p>' +
            '<div class="widget_in_modal">' +
            '<p class="widget_modal" id="widget_01_youtube">Infos d\'un Youtuber</p>' +
            '</div>' +
            '<div class="widget_in_modal">' +
            '<p class="widget_modal" id="widget_02_youtube">Infos sur une vidéo</p>' +
            '</div>'
        );
        $("#youtube_widget_modal").html(input);
    }
}

function check_if_something_checked()
{
    var val= $("input:checked").length
    if (val > 0) {
        $("#WidgetButton").css("background-color", "#EA3D3D");
        $("#WidgetButton").css("border-color", "#EA3D3D");
        $("#WidgetButton").css("cursor", "pointer");
        $("#WidgetButton").attr("onclick", "trigger_widget_modal()");
    }
    if (val == 0) {
        $("#WidgetButton").css("background-color", "grey");
        $("#WidgetButton").css("border-color", "grey");
        $("#WidgetButton").css("cursor", "default");
        $("#WidgetButton").attr("onclick", "return false;");
    }  
}

function onload_function()
{
    check_if_cookie();
    show_widg();
    check_if_something_checked();
}

window.onload = onload_function()

var myCookie = getCookie("login");
input = $('<ul><a class="pseudo">' + myCookie + '</a></ul>' +
'<ul><a class="header_text_menu" href="#" onclick="delete_cookie(\'login\')">Se déconnecter</a></ul>');
$("#header_list").html(input);

function display_meteo() {
    var Checkbox = document.getElementById('meteo_checkbox')
    if (Checkbox.checked == false) {
        input = $('<div id="widget_modal_meteo_data">' +
            '<p class="widget_modal_title">Widget Météo</p>' +
            '<div class="widget_in_modal">' +
            '<p class="widget_modal" id="widget_01_meteo">Météo par ville</p>' +
            '</div>' +
            '</div>')
        $("#meteo_widget_modal").html(input);
    }
    else {
        $("#widget_modal_meteo_data").empty();
    }
};

function display_steam() {
    var Checkbox = document.getElementById('steam_checkbox')
    if (Checkbox.checked == false) {
        input = $('<div id="widget_modal_steam_data">' +
            '<p class="widget_modal_title">Widget Steam</p>' +
            '<div class="widget_in_modal">' +
            '<p class="widget_modal" id="widget_01_steam">Joueurs sur un jeu</p>' +
            '</div>' +
            '<div class="widget_in_modal">' +
            '<p class="widget_modal" id="widget_02_steam">Liste d\'ami d\'un utilisateur</p>' +
            '</div>' +
            '</div>');
        $("#steam_widget_modal").html(input);
    }
    else {
        $("#widget_modal_steam_data").empty();
    }
};

function display_twitch() {
    var Checkbox = document.getElementById('twitch_checkbox')
    if (Checkbox.checked == false) {
        input = $('<div id="widget_modal_twitch_data">' +
            '<p class="widget_modal_title">Widget Twitch</p>' +
            '<div class="widget_in_modal">' +
            '<p class="widget_modal" id="widget_01_twitch">Info sur une chaîne</p>' +
            '</div>' +
            '<div class="widget_in_modal">' +
            '<p class="widget_modal" id="widget_02_twitch">Info sur un jeu</p>' +
            '</div>' +
            '</div>'
        );
        $("#twitch_widget_modal").html(input);
    }
    else {
        $("#widget_modal_twitch_data").empty();
    }
};

function display_crypto() {
    var Checkbox = document.getElementById('crypto_checkbox')
    if (Checkbox.checked == false) {
        input = $(
            '<div id="widget_modal_crypto_data">' +
            '<p class="widget_modal_title">Widget Crypto</p>' +
            '<div class="widget_in_modal">' +
            '<p class="widget_modal" id="widget_01_crypto">Cours d\'une monnaie</p>' +
            '</div>' +
            '</div>'
        );
        $("#crypto_widget_modal").html(input);
    }
    else {
        $("#widget_modal_crypto_data").empty();
    }
};

function display_youtube() {
    var Checkbox = document.getElementById('youtube_checkbox')
    if (Checkbox.checked == false) {
        input = $(
            '<div id="widget_modal_youtube_data">' +
            '<p class="widget_modal_title">Widget Youtube</p>' +
            '<div class="widget_in_modal">' +
            '<p class="widget_modal" id="widget_01_youtube">Infos d\'un Youtuber</p>' +
            '</div>' +
            '<div class="widget_in_modal">' +
            '<p class="widget_modal" id="widget_02_youtube">Infos sur une vidéo</p>' +
            '</div>'
        );
        $("#youtube_widget_modal").html(input);
    }
    else {
        $("#widget_modal_youtube_data").empty();
    }
};

$('#ServiceButtonValide').click(function () {
    var val= $("input:checked").length
    if (val > 0) {
        $("#WidgetButton").css("background-color", "#EA3D3D");
        $("#WidgetButton").css("border-color", "#EA3D3D");
        $("#WidgetButton").css("cursor", "pointer");
        $("#WidgetButton").attr("onclick", "trigger_widget_modal()");
    }
    if (val == 0) {
        $("#WidgetButton").css("background-color", "grey");
        $("#WidgetButton").css("border-color", "grey");
        $("#WidgetButton").css("cursor", "default");
        $("#WidgetButton").attr("onclick", "return false;");
}});