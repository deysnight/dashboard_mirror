//delete_cookie("login");

var Dashboard_Data;

function onload_function()
{
    check_if_cookie();
    ask_data();
    read_json();
    show_widg();
    check_if_something_checked();
    check_if_widget_exist();
}

window.onload = onload_function()

function check_if_widget_exist() {
    if (Dashboard_Data.hasOwnProperty("meteo") == true)
        $("#widget_01_meteo").css("background-color", "rgb(230, 230, 230)");
    if (Dashboard_Data.hasOwnProperty("steam01") == true)
        $("#widget_01_steam").css("background-color", "rgb(230, 230, 230)");
    if (Dashboard_Data.hasOwnProperty("steam02") == true)
        $("#widget_02_steam").css("background-color", "rgb(230, 230, 230)");
    if (Dashboard_Data.hasOwnProperty("twitch01") == true)
        $("#widget_01_twitch").css("background-color", "rgb(230, 230, 230)");
    if (Dashboard_Data.hasOwnProperty("twitch02") == true)
        $("#widget_02_twitch").css("background-color", "rgb(230, 230, 230)");
    if (Dashboard_Data.hasOwnProperty("crypto") == true)
        $("#widget_01_crypto").css("background-color", "rgb(230, 230, 230)");
    if (Dashboard_Data.hasOwnProperty("youtube01") == true)
        $("#widget_01_youtube").css("background-color", "rgb(230, 230, 230)");
    if (Dashboard_Data.hasOwnProperty("youtube02") == true)
        $("#widget_02_youtube").css("background-color", "rgb(230, 230, 230)");
    if (Dashboard_Data.hasOwnProperty("youtube03") == true)
        $("#widget_03_youtube").css("background-color", "rgb(230, 230, 230)");
} 

function send_data()
{
    var my_url_for_ip = Get_Path_For_IP();
    var final_ip = my_url_for_ip + "/?/set_user_config";
    var login = getCookie("login");
    var Json_to_send = JSON.stringify(Dashboard_Data);
    var Data = login + "$" + Json_to_send;
    console.log(Json_to_send);
    $.ajax(
        {
            url: final_ip,
            type: "post",
            async: false,
            data: Data,
            success: function(response) {
                console.log(response);
            }
        }
    )
}

function ask_data()
{
    var my_url_for_ip = Get_Path_For_IP();
    var final_ip = my_url_for_ip + "/?/get_user_config";
    var Data = getCookie("login");
    $.ajax(
        {
            url: final_ip,
            type: "post",
            async: false,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: Data,
            success: function(response) {
                Dashboard_Data = response;
                Dashboard_Data = JSON.parse(Dashboard_Data.config);
                console.log(Dashboard_Data);
            }
        }
    )
}

function read_json()
{
    if (Dashboard_Data.config.ss.s01 == true) {
        $("#meteo_checkbox").attr("checked", "checked");
    }
    else
        $("#meteo_checkbox").removeAttr("checked");
    if (Dashboard_Data.config.ss.s02 == true) {
        $("#steam_checkbox").attr("checked", "checked");
    }
    else
        $("#steam_checkbox").removeAttr("checked");
    if (Dashboard_Data.config.ss.s03 == true) {
        $("#twitch_checkbox").attr("checked", "checked");
    }
    else
        $("#twitch_checkbox").removeAttr("checked");
    if (Dashboard_Data.config.ss.s04 == true) {
        $("#crypto_checkbox").attr("checked", "checked");
    }
    else
        $("#crypto_checkbox").removeAttr("checked");
    if (Dashboard_Data.config.ss.s05 == true) {
        $("#youtube_checkbox").attr("checked", "checked");
    }
    else
        $("#youtube_checkbox").removeAttr("checked");
    // widgets part 
}

$("#checkmark_meteo").click(function () {
    if ($("#meteo_checkbox").prop('checked') == true) {
        Dashboard_Data.config.ss.s01 = false;
    }
    else if ($("#meteo_checkbox").prop('checked') == false) {
        Dashboard_Data.config.ss.s01 = true;
    }
});
$("#checkmark_steam").click(function () {
    if ($("#steam_checkbox").prop('checked') == true) {
        Dashboard_Data.config.ss.s02 = false;
    }
    else if ($("#steam_checkbox").prop('checked') == false) {
        Dashboard_Data.config.ss.s02 = true;
    }
});
$("#checkmark_twitch").click(function () {
    if ($("#twitch_checkbox").prop('checked') == true) {
        Dashboard_Data.config.ss.s03 = false;
    }
    else if ($("#twitch_checkbox").prop('checked') == false) {
        Dashboard_Data.config.ss.s03 = true;
    }
});
$("#checkmark_crypto").click(function () {
    if ($("#crypto_checkbox").prop('checked') == true) {
        Dashboard_Data.config.ss.s04 = false;
    }
    else if ($("#crypto_checkbox").prop('checked') == false) {
        Dashboard_Data.config.ss.s04 = true;
    }
});
$("#checkmark_youtube").click(function () {
    if ($("#youtube_checkbox").prop('checked') == true) {
        Dashboard_Data.config.ss.s05 = false;
    }
    else if ($("#youtube_checkbox").prop('checked') == false) {
        Dashboard_Data.config.ss.s05 = true;
    }
});


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


document.getElementById('meteo_service').onclick = function(event) {
    document.getElementById('meteo_intel').style.display = "block";
    document.getElementById('steam_intel').style.display = "none";
    document.getElementById('twitch_intel').style.display = "none";
    document.getElementById('crypto_intel').style.display = "none";
    document.getElementById('youtube_intel').style.display = "none";
}

document.getElementById('steam_service').onclick = function(event) {
    document.getElementById('meteo_intel').style.display = "none";
    document.getElementById('steam_intel').style.display = "block";
    document.getElementById('twitch_intel').style.display = "none";
    document.getElementById('crypto_intel').style.display = "none";
    document.getElementById('youtube_intel').style.display = "none";
}

document.getElementById('twitch_service').onclick = function(event) {
    document.getElementById('meteo_intel').style.display = "none";
    document.getElementById('steam_intel').style.display = "none";
    document.getElementById('twitch_intel').style.display = "block";
    document.getElementById('crypto_intel').style.display = "none";
    document.getElementById('youtube_intel').style.display = "none";
}

document.getElementById('crypto_service').onclick = function(event) {
    document.getElementById('meteo_intel').style.display = "none";
    document.getElementById('steam_intel').style.display = "none";
    document.getElementById('twitch_intel').style.display = "none";
    document.getElementById('crypto_intel').style.display = "block";
    document.getElementById('youtube_intel').style.display = "none";
}

document.getElementById('youtube_service').onclick = function(event) {
    document.getElementById('meteo_intel').style.display = "none";
    document.getElementById('steam_intel').style.display = "none";
    document.getElementById('twitch_intel').style.display = "none";
    document.getElementById('crypto_intel').style.display = "none";
    document.getElementById('youtube_intel').style.display = "block";
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
        input = $(
        '<div id="widget_modal_meteo_data">' +
            '<p class="widget_modal_title">Widget Météo</p>' +
            '<div class="widget_in_modal">' +
                '<p class="widget_modal" id="widget_01_meteo" onclick="display_meteo_widget_modal()">Informations météo d\'une ville</p>' +
            '</div>' +
        '</div>')
    $("#meteo_widget_modal").html(input);
    }
    var checkbox = document.getElementById("steam_checkbox");
    if (checkbox.checked == true) {
        input = $(
            '<div id="widget_modal_steam_data">' +
                '<p class="widget_modal_title">Widget Steam</p>' +
                '<div class="widget_in_modal">' +
                    '<p class="widget_modal" id="widget_01_steam" onclick="display_steam_widget01_modal()">Joueurs sur un jeu Steam</p>' +
                '</div>' +
                '<div class="widget_in_modal">' +
                    '<p class="widget_modal" id="widget_02_steam" onclick="display_steam_widget02_modal()">Liste d\'ami d\'un utilisateur Steam</p>' +
                '</div>' +
            '</div>');
        $("#steam_widget_modal").html(input);
    }
    var checkbox = document.getElementById("twitch_checkbox");
    if (checkbox.checked == true) {
        input = $(
            '<div id="widget_modal_twitch_data">' +
                '<p class="widget_modal_title">Widget Twitch</p>' +
                '<div class="widget_in_modal">' +
                    '<p class="widget_modal" id="widget_01_twitch" onclick="display_twitch01_modal()">Informations sur une chaîne Twitch</p>' +
                '</div>' +
                '<div class="widget_in_modal">' +
                    '<p class="widget_modal" id="widget_02_twitch" onclick="display_twitch02_modal()">Informations sur un jeu diffusé sur Twitch</p>' +
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
                    '<p class="widget_modal" id="widget_01_crypto" onclick="display_crypto_modal()">Cours d\'une monnaie</p>' +
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
                    '<p class="widget_modal" id="widget_01_youtube" onclick="display_youtube01_modal()">Informations sur une chaîne Youtube</p>' +
                '</div>' +
                '<div class="widget_in_modal">' +
                    '<p class="widget_modal" id="widget_02_youtube" onclick="display_youtube02_modal()">Informations sur une vidéo Youtube</p>' +
                '</div>' +
                '<div class="widget_in_modal">' +
                    '<p class="widget_modal" id="widget_03_youtube" onclick="display_youtube03_modal()">Commentaires sur une vidéos Youtube</p>' +
                '</div>' +
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

var myCookie = getCookie("login");
input = $('<ul><a class="pseudo">' + myCookie + '</a></ul>' +
'<ul><a class="header_text_menu" href="#" onclick="delete_cookie(\'login\')">Se déconnecter</a></ul>');
$("#header_list").html(input);

function display_meteo() {
    var Checkbox = document.getElementById('meteo_checkbox')
    if (Checkbox.checked == false) {
        input = $(
            '<div id="widget_modal_meteo_data">' +
                '<p class="widget_modal_title">Widget Météo</p>' +
                '<div class="widget_in_modal">' +
                    '<p class="widget_modal" id="widget_01_meteo" onclick="display_meteo_widget_modal()">Météo par ville</p>' +
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
        input = $(
            '<div id="widget_modal_steam_data">' +
                '<p class="widget_modal_title">Widget Steam</p>' +
                '<div class="widget_in_modal">' +
                    '<p class="widget_modal" id="widget_01_steam" onclick="display_steam_widget01_modal()">Joueurs sur un jeu Steam</p>' +
                '</div>' +
                '<div class="widget_in_modal">' +
                    '<p class="widget_modal" id="widget_02_steam" onclick="display_steam_widget02_modal()">Liste d\'ami d\'un utilisateur Steam</p>' +
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
        input = $(
            '<div id="widget_modal_twitch_data">' +
                '<p class="widget_modal_title">Widget Twitch</p>' +
                '<div class="widget_in_modal">' +
                    '<p class="widget_modal" id="widget_01_twitch" onclick="display_twitch01_modal()">Informations sur une chaîne Twitch</p>' +
                '</div>' +
                '<div class="widget_in_modal">' +
                    '<p class="widget_modal" id="widget_02_twitch" onclick="display_twitch02_modal()">Informations sur un jeu diffusé sur Twitch</p>' +
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
                    '<p class="widget_modal" id="widget_01_crypto" onclick="display_crypto_modal()">Cours d\'une monnaie</p>' +
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
                    '<p class="widget_modal" id="widget_01_youtube" onclick="display_youtube01_modal()">Informations sur une chaîne Youtube</p>' +
                '</div>' +
                '<div class="widget_in_modal">' +
                    '<p class="widget_modal" id="widget_02_youtube" onclick="display_youtube02_modal()">Informationss sur une vidéo Youtube</p>' +
                '</div>' +
                '<div class="widget_in_modal">' +
                    '<p class="widget_modal" id="widget_03_youtube" onclick="display_youtube03_modal()">Commentaires sur une vidéos Youtube</p>' +
                '</div>' +
            '</div>'
        );
        $("#youtube_widget_modal").html(input);
    }
    else {
        $("#widget_modal_youtube_data").empty();
    }
};

$('#ServiceButtonValide').click(function() {
    var val = $("input:checked").length;
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
    if ($("#meteo_checkbox").prop('checked') == false) {
        delete Dashboard_Data['meteo'];
        $("#meteo_widget").empty();
        $("#field_meteo_template").empty();
    }
    if ($("#steam_checkbox").prop('checked') == false) {
        delete Dashboard_Data['steam01'];
        delete Dashboard_Data['steam02'];
    }
    if ($("#twitch_checkbox").prop('checked') == false) {
        delete Dashboard_Data['twitch01'];
        delete Dashboard_Data['twitch02'];
    }
    if ($("#crypto_checkbox").prop('checked') == false) {
        delete Dashboard_Data['crytp'];
    }
    if ($("#youtube_checkbox").prop('checked') == false) {
        delete Dashboard_Data['youtube01'];
        delete Dashboard_Data['youtube02'];
        delete Dashboard_Data['youtube03'];
    }
    console.log(Dashboard_Data);
    send_data();
});


function display_meteo_widget_modal()
{
    if (Dashboard_Data.hasOwnProperty("meteo") == true) {
        return false;
    }

    modal_widget.style.display = "none";
    document.getElementById("ConfigMeteo").style.display = "block";
}

$('.CloseConfigMeteoModalCancel').click(function() {
    $("#name_meteo").val("");
    $("#ville_meteo").val("");
    $("#timer_meteo").val("");
    document.getElementById("ConfigMeteo").style.display = "none";
});

$('.CloseConfigMeteoModalValidate').click(function() {
    $("#widget_01_meteo").css("background-color", "rgb(230, 230, 230)");
    if ($("#name_meteo").val() == "" || $("#ville_meteo").val() == "" || $("#timer_meteo").val() == "")
        return false;
    if ($.isNumeric($("#timer_meteo").val()) == false)
        return false;
    var widg_n = $("#name_meteo").val();
    var ville_n = $("#ville_meteo").val();
    var timer = $("#timer_meteo").val();
    obj_meteo(ville_n, timer, widg_n);
    var newdata = {};
    newdata['meteo'] = {"name": widg_n, "town": ville_n, "timer": timer};
    $.extend(true, Dashboard_Data, newdata);
    send_data();
    $("#name_meteo").val("");
    $("#ville_meteo").val("");
    $("#timer_meteo").val("");
    document.getElementById("ConfigMeteo").style.display = "none";
});

function display_steam_widget01_modal()
{
    if (Dashboard_Data.hasOwnProperty("steam01") == true) {
        return false;
    }

    modal_widget.style.display = "none";
    document.getElementById("ConfigSteam01").style.display = "block";
}

$('.CloseConfigSteam01Cancel').click(function() {
    $("#name_steam01").val("");
    $("#steam_id01").val("");
    $("#timer_steam01").val("");
    document.getElementById("ConfigSteam01").style.display = "none";
});

$('.CloseConfigSteam01Validate').click(function() {
    $("#widget_01_steam").css("background-color", "rgb(230, 230, 230)");
    if ($("#steam_id01").val() == "" || $("#name_steam01").val() == "" || $("#timer_steam01").val() == "")
        return false;
    if ($.isNumeric($("#timer_steam01").val()) == false)
        return false;
    var steam_id = $("#steam_id01").val();
    var widg_n = $("#name_steam01").val();
    var timer = $("#timer_steam01").val();
    obj_steam01(steam_id, widg_n, timer)
    var newdata = {};
    newdata['steam01'] = {"name": widg_n, "steam_id": steam_id, "timer": timer};
    $.extend(true, Dashboard_Data, newdata);
    console.log(Dashboard_Data);
    send_data();
    $("#name_steam01").val("");
    $("#steam_id01").val("");
    $("#timer_steam01").val("");
    document.getElementById("ConfigSteam01").style.display = "none";
});



function display_steam_widget02_modal()
{
    if (Dashboard_Data.hasOwnProperty("steam02") == true) {
        return false;
    }

    modal_widget.style.display = "none";
    document.getElementById("ConfigSteam02").style.display = "block";
}

$('.CloseConfigSteam02Cancel').click(function() {
    $("#name_steam02").val("");
    $("#steam_id02").val("");
    $("#timer_steam02").val("");
    document.getElementById("ConfigSteam02").style.display = "none";
});

$('.CloseConfigSteam02Validate').click(function() {
    $("#widget_02_steam").css("background-color", "rgb(230, 230, 230)");
    if ($("#steam_id02").val() == "" || $("#name_steam02").val() == "" || $("#timer_steam02").val() == "")
        return false;
    if ($.isNumeric($("#timer_steam02").val()) == false)
        return false;
    var steam_id = $("#steam_id02").val();
    var widg_n = $("#name_steam02").val();
    var timer = $("#timer_steam02").val();
    obj_steam02(steam_id, widg_n, timer)
    var newdata = {};
    newdata['steam02'] = {"name": widg_n, "steam_id": steam_id, "timer": timer};
    $.extend(true, Dashboard_Data, newdata);
    console.log(Dashboard_Data);
    send_data();
    $("#name_steam02").val("");
    $("#steam_id02").val("");
    $("#timer_steam02").val("");
    document.getElementById("ConfigSteam02").style.display = "none";
});



function display_twitch01_modal()
{
    if (Dashboard_Data.hasOwnProperty("twitch01") == true) {
        return false;
    }

    modal_widget.style.display = "none";
    document.getElementById("ConfigTwitch01").style.display = "block";
}

$('.CloseConfigTwitch01Cancel').click(function() {
    $("#name_twitch01").val("");
    $("#twitch_streamer").val("");
    $("#timer_twitch01").val("");
    document.getElementById("ConfigTwitch01").style.display = "none";
});

$('.CloseConfigTwitch01Validate').click(function() {
    $("#widget_01_twitch").css("background-color", "rgb(230, 230, 230)");
    if ($("#name_twitch01").val() == "" || $("#twitch_streamer").val() == "" || $("#timer_twitch01").val() == "")
        return false;
    if ($.isNumeric($("#timer_twitch01").val()) == false)
        return false;
    var widg_n = $("#name_twitch01").val();
    var twitch_streamer = $("#twitch_streamer").val();
    var timer = $("#timer_twitch01").val();
    obj_twitch01(widg_n, twitch_streamer, timer);
    var newdata = {};
    newdata['twitch01'] = {"name": widg_n, "twitch_streamer": twitch_streamer, "timer": timer};
    $.extend(true, Dashboard_Data, newdata);
    console.log(Dashboard_Data);
    send_data();
    $("#name_twitch01").val("");
    $("#twitch_streamer").val("");
    $("#timer_twitch01").val("");
    document.getElementById("ConfigTwitch01").style.display = "none";
});

function display_twitch02_modal()
{
    if (Dashboard_Data.hasOwnProperty("twitch02") == true) {
        return false;
    }

    modal_widget.style.display = "none";
    document.getElementById("ConfigTwitch02").style.display = "block";
}

$('.CloseConfigTwitch02Cancel').click(function() {
    $("#name_twitch02").val("");
    $("#twitch_game").val("");
    $("#timer_twitch02").val("");
    document.getElementById("ConfigTwitch02").style.display = "none";
});

$('.CloseConfigTwitch02Validate').click(function() {
    $("#widget_02_twitch").css("background-color", "rgb(230, 230, 230)");
    if ($("#name_twitch02").val() == "" || $("#twitch_game").val() == "" || $("#timer_twitch02").val() == "")
        return false;
    if ($.isNumeric($("#timer_twitch02").val()) == false)
        return false;
    var widg_n = $("#name_twitch02").val();
    var twitch_game = $("#twitch_game").val();
    var timer = $("#timer_twitch02").val();
    obj_twitch02(widg_n, twitch_game, timer)
    var newdata = {};
    newdata['twitch02'] = {"name": widg_n, "twitch_game": twitch_game, "timer": timer};
    $.extend(true, Dashboard_Data, newdata);
    console.log(Dashboard_Data);
    send_data();
    $("#name_twitch02").val("");
    $("#twitch_game").val("");
    $("#timer_twitch02").val("");
    document.getElementById("ConfigTwitch02").style.display = "none";
});

function display_crypto_modal()
{
    if (Dashboard_Data.hasOwnProperty("crypto") == true) {
        return false;
    }

    modal_widget.style.display = "none";
    document.getElementById("ConfigCrypto").style.display = "block";
}

$('.CloseConfigCryptoCancel').click(function() {
    $("#name_crypto").val("");
    $("#crypto_initial").val("");
    $("#crypto_final").val("");
    $("#timer_crypto").val("");
    document.getElementById("ConfigCrypto").style.display = "none";
});

$('.CloseConfigCryptoValidate').click(function() {
    $("#widget_01_crypto").css("background-color", "rgb(230, 230, 230)");
    if ($("#name_crypto").val() == "" || $("#crypto_initial").val() == "" || $("#crypto_final").val() == "" || $("#timer_crypto").val() == "")
        return false;
    if ($.isNumeric($("#timer_crypto").val()) == false)
        return false;
    var widg_n = $("#name_crypto").val();
    var fsym = $("#crypto_initial").val().toUpperCase();
    var tsym = $("#crypto_final").val().toUpperCase();
    var timer = $("#timer_crypto").val();
    obj_crypto(widg_n, fsym, tsym, timer)
    var newdata = {};
    newdata['crypto'] = {"name": widg_n, "fsym": fsym, "tsym": tsym, "timer": timer};
    $.extend(true, Dashboard_Data, newdata);
    console.log(Dashboard_Data);
    send_data();
    $("#name_crypto").val("");
    $("#crypto_initial").val("");
    $("#crypto_final").val("");
    $("#timer_crypto").val("");
    document.getElementById("ConfigCrypto").style.display = "none";
});

function display_youtube01_modal()
{
    if (Dashboard_Data.hasOwnProperty("youtube01") == true) {
        return false;
    }

    modal_widget.style.display = "none";
    document.getElementById("ConfigYoutube01").style.display = "block";
}

$('.CloseConfigYoutubeCancel01').click(function() {
    $("#name_youtube01").val("");
    $("#youtuber").val("");
    $("#timer_youtube01").val("");
    document.getElementById("ConfigYoutube01").style.display = "none";
});

$('.CloseConfigYoutubeValidate01').click(function() {
    $("#widget_01_youtube").css("background-color", "rgb(230, 230, 230)");
    if ($("#name_youtube01").val() == "" || $("#youtuber").val() == "" || $("#timer_youtube01").val() == "")
        return false;
    if ($.isNumeric($("#timer_youtube01").val()) == false)
        return false;
    var widg_n = $("#name_youtube01").val();
    var ytb_channel = $("#youtuber").val();
    var timer = $("#timer_youtube01").val();
    obj_youtube01(widg_n, ytb_channel, timer)
    var newdata = {};
    newdata['youtube01'] = {"name": widg_n, "ytb_channel": ytb_channel, "timer": timer};
    $.extend(true, Dashboard_Data, newdata);
    console.log(Dashboard_Data);
    send_data();
    $("#name_youtube01").val("");
    $("#youtuber").val("");
    $("#timer_youtube01").val("");
    document.getElementById("ConfigYoutube01").style.display = "none";
});

function display_youtube02_modal()
{
    if (Dashboard_Data.hasOwnProperty("youtube02") == true) {
        return false;
    }

    modal_widget.style.display = "none";
    document.getElementById("ConfigYoutube02").style.display = "block";
}

$('.CloseConfigYoutubeCancel02').click(function() {
    $("#name_youtube02").val("");
    $("#youtube_video").val("");
    $("#timer_youtube02").val("");
    document.getElementById("ConfigYoutube02").style.display = "none";
});

$('.CloseConfigYoutubeValidate02').click(function() {
    $("#widget_02_youtube").css("background-color", "rgb(230, 230, 230)");
    if ($("#name_youtube02").val() == "" || $("#youtube_video").val() == "" || $("#timer_youtube02").val() == "")
        return false;
    if ($.isNumeric($("#timer_youtube02").val()) == false)
        return false;
    var widg_n = $("#name_youtube02").val();
    var ytb_video = $("#youtube_video").val();
    var timer = $("#timer_youtube02").val();
    obj_youtube02(widg_n, ytb_video, timer)
    var newdata = {};
    newdata['youtube02'] = {"name": widg_n, "ytb_video": ytb_video, "timer": timer};
    $.extend(true, Dashboard_Data, newdata);
    console.log(Dashboard_Data);
    send_data();
    $("#name_youtube02").val("");
    $("#youtube_video").val("");
    $("#timer_youtube02").val("");
    document.getElementById("ConfigYoutube02").style.display = "none";
});

function display_youtube03_modal() {
    if (Dashboard_Data.hasOwnProperty("youtube03") == true) {
        return false;
    }

    modal_widget.style.display = "none";
    document.getElementById("ConfigYoutube03").style.display = "block";
}

$('.CloseConfigYoutubeCancel03').click(function () {
    $("#name_youtube03").val("");
    $("#youtube_video_03").val("");
    $("#nb_comment").val("");
    $("#timer_youtube03").val("");
    document.getElementById("ConfigYoutube03").style.display = "none";
});

$('.CloseConfigYoutubeValidate03').click(function () {
    $("#widget_03_youtube").css("background-color", "rgb(230, 230, 230)");
    if ($("#name_youtube03").val() == "" || $("#youtube_video_03").val() == "" || $("#nb_comment").val() == "" || $("#timer_youtube03").val() == "")
        return false;
    if ($.isNumeric($("#timer_youtube03").val()) == false || $.isNumeric($("#nb_comment").val()) == false)
        return false;
    var widg_n = $("#name_youtube03").val();
    var ytb_video = $("#youtube_video_03").val();
    var max_comment = $("#nb_comment").val();
    var timer = $("#timer_youtube03").val();
    obj_youtube03(widg_n, ytb_video, max_comment, timer)
    var newdata = {};
    newdata['youtube03'] = { "name": widg_n, "ytb_video": ytb_video, "max_comment": max_comment, "timer": timer };
    $.extend(true, Dashboard_Data, newdata);
    console.log(Dashboard_Data);
    send_data();
    $("#name_youtube03").val("");
    $("#youtube_video_03").val("");
    $("#nb_comment").val("");
    $("#timer_youtube03").val("");
    document.getElementById("ConfigYoutube03").style.display = "none";
});


function Get_Path_For_IP()
{
    var my_current_url = window.location.href;

    var words = my_current_url.split(':');
    var words_final = words[1].split('/');

    var final_ip = "http://" + words_final[2] + ":8080";
    return final_ip;
}


function display_meteo_widget_reconfig_modal()
{
    document.getElementById("reconfig_meteo").style.display = "block";
}

$('.CloseReconfigMeteoModalCancel').click(function() {
    $("#reconfig_name_meteo").val("");
    $("#reconfig_ville_meteo").val("");
    $("#reconfig_timer_meteo").val("");
    document.getElementById("reconfig_meteo").style.display = "none";
});

$('.CloseReconfigMeteoModalValidate').click(function() {
    if ($("#reconfig_name_meteo").val() == "" || $("#reconfig_ville_meteo").val() == "" || $("#reconfig_timer_meteo").val() == "")
        return false;
    if ($.isNumeric($("#reconfig_timer_meteo").val()) == false)
        return false;
    var widg_n = $("#reconfig_name_meteo").val();
    var ville_n = $("#reconfig_ville_meteo").val();
    var timer = $("#reconfig_timer_meteo").val();
    obj_meteo(ville_n, timer, widg_n);
    var newdata = {};
    newdata['meteo'] = {"name": widg_n, "town": ville_n, "timer": timer};
    $.extend(true, Dashboard_Data, newdata);
    send_data();
    $("#reconfig_name_meteo").val("");
    $("#reconfig_ville_meteo").val("");
    $("#reconfig_timer_meteo").val("");
    document.getElementById("reconfig_meteo").style.display = "none";
});

$('.CloseReconfigMeteoModalDelete').click(function() {
    // remove l'objet de la page + du json
    $("#reconfig_name_meteo").val("");
    $("#reconfig_ville_meteo").val("");
    $("#reconfig_timer_meteo").val("");
    document.getElementById("reconfig_meteo").style.display = "none";
});

function display_steam_widget01_reconfig_modal()
{
    document.getElementById("reconfig_steam01").style.display = "block";
}

$('.CloseReconfigSteam01Cancel').click(function() {
    $("#reconfig_name_steam01").val("");
    $("#reconfig_steam_id01").val("");
    $("#reconfig_timer_steam01").val("");
    document.getElementById("reconfig_steam01").style.display = "none";
});

$('.CloseReconfigSteam01Validate').click(function() {
    if ($("#reconfig_steam_id01").val() == "" || $("#reconfig_name_steam01").val() == "" || $("#reconfig_timer_steam01").val() == "")
        return false;
    if ($.isNumeric($("#reconfig_timer_steam01").val()) == false)
        return false;
    var steam_id = $("#reconfig_steam_id01").val();
    var widg_n = $("#reconfig_name_steam01").val();
    var timer = $("#reconfig_timer_steam01").val();
    obj_steam01(steam_id, widg_n, timer)
    var newdata = {};
    newdata['steam01'] = {"name": widg_n, "steam_id": steam_id, "timer": timer};
    $.extend(true, Dashboard_Data, newdata);
    console.log(Dashboard_Data);
    send_data();
    $("#reconfig_name_steam01").val("");
    $("#reconfig_steam_id01").val("");
    $("#reconfig_timer_steam01").val("");
    document.getElementById("reconfig_steam01").style.display = "none";
});

$('.CloseReconfigSteam01Delete').click(function() {
    // remove l'objet de la page + du json
    $("#reconfig_name_meteo").val("");
    $("#reconfig_ville_meteo").val("");
    $("#reconfig_timer_meteo").val("");
    document.getElementById("reconfig_meteo").style.display = "none";
});



function display_steam_widget02_reconfig_modal()
{
    document.getElementById("reconfig_steam02").style.display = "block";
}

$('.CloseReconfigSteam02Cancel').click(function() {
    $("#reconfig_name_steam02").val("");
    $("#reconfig_steam_id02").val("");
    $("#reconfig_timer_steam02").val("");
    document.getElementById("reconfig_steam02").style.display = "none";
});

$('.CloseReconfigSteam02Validate').click(function() {
    if ($("#reconfig_steam_id02").val() == "" || $("#reconfig_name_steam02").val() == "" || $("#reconfig_timer_steam02").val() == "")
        return false;
    if ($.isNumeric($("#reconfig_timer_steam02").val()) == false)
        return false;
    var steam_id = $("#reconfig_steam_id02").val();
    var widg_n = $("#reconfig_name_steam02").val();
    var timer = $("#reconfig_timer_steam02").val();
    obj_steam01(steam_id, widg_n, timer)
    var newdata = {};
    newdata['steam02'] = {"name": widg_n, "steam_id": steam_id, "timer": timer};
    $.extend(true, Dashboard_Data, newdata);
    console.log(Dashboard_Data);
    send_data();
    $("#reconfig_name_steam02").val("");
    $("#reconfig_steam_id02").val("");
    $("#reconfig_timer_steam02").val("");
    document.getElementById("reconfig_steam02").style.display = "none";
});

$('.CloseReconfigSteam02Delete').click(function() {
    // remove l'objet de la page + du json
    $("#reconfig_steam_id02").val("");
    $("#reconfig_name_steam02").val("");
    $("#reconfig_timer_steam02").val("");
    document.getElementById("reconfig_steam02").style.display = "none";
});


function display_twitch_widget01_reconfig_modal()
{
    document.getElementById("reconfig_twitch01").style.display = "block";
}

$('.CloseReconfigTwitch01Cancel ').click(function() {
    $("#reconfig_name_twitch01").val("");
    $("#reconfig_twitch_streamer").val("");
    $("#reconfig_timer_twitch01").val("");
    document.getElementById("reconfig_twitch01").style.display = "none";
});

$('.CloseReconfigTwitch01Validate ').click(function() {
    if ($("#reconfig_name_twitch01").val() == "" || $("#reconfig_twitch_streamer").val() == "" || $("#reconfig_timer_twitch01").val() == "")
        return false;
    if ($.isNumeric($("#reconfig_timer_twitch01").val()) == false)
        return false;
    var widg_n = $("#reconfig_name_twitch01").val();
    var twitch_streamer = $("#reconfig_twitch_streamer").val();
    var timer = $("#reconfig_timer_twitch01").val();
    obj_twitch01(widg_n, twitch_streamer, timer);
    var newdata = {};
    newdata['twitch01'] = {"name": widg_n, "reconfig_twitch_streamer": twitch_streamer, "timer": timer};
    $.extend(true, Dashboard_Data, newdata);
    console.log(Dashboard_Data);
    send_data();
    $("#reconfig_name_twitch01").val("");
    $("#reconfig_twitch_streamer").val("");
    $("#reconfig_timer_twitch01").val("");
    document.getElementById("reconfig_twitch01").style.display = "none";
});

$('.CloseReconfigTwitch01Delete').click(function() {
    // remove l'objet de la page + du json
    $("#reconfig_name_twitch01").val("");
    $("#reconfig_twitch_streamer").val("");
    $("#reconfig_timer_twitch01").val("");
    document.getElementById("reconfig_twitch01").style.display = "none";
});

function display_twitch_widget02_reconfig_modal()
{
    document.getElementById("reconfig_twitch02").style.display = "block";
}

$('.CloseConfigTwitch02Cancel').click(function() {
    $("#reconfig_name_twitch02").val("");
    $("#reconfig_twitch_game").val("");
    $("#reconfig_timer_twitch02").val("");
    document.getElementById("reconfig_twitch02").style.display = "none";
});

$('.CloseConfigTwitch02Validate').click(function() {
    if ($("#reconfig_name_twitch02").val() == "" || $("#reconfig_twitch_game").val() == "" || $("#reconfig_timer_twitch02").val() == "")
        return false;
    if ($.isNumeric($("#reconfig_timer_twitch02").val()) == false)
        return false;
    var widg_n = $("#reconfig_name_twitch02").val();
    var twitch_game = $("#reconfig_twitch_game").val();
    var timer = $("#reconfig_timer_twitch02").val();
    obj_twitch02(widg_n, twitch_game, timer)
    var newdata = {};
    newdata['twitch02'] = {"name": widg_n, "reconfig_twitch_game": twitch_game, "timer": timer};
    $.extend(true, Dashboard_Data, newdata);
    console.log(Dashboard_Data);
    send_data();
    $("#reconfig_name_twitch02").val("");
    $("#reconfig_twitch_game").val("");
    $("#reconfig_timer_twitch02").val("");
    document.getElementById("reconfig_twitch02").style.display = "none";
});

$('.CloseReconfigTwitch02Delete').click(function() {
    // remove l'objet de la page + du json
    $("#reconfig_name_twitch02").val("");
    $("#reconfig_twitch_game").val("");
    $("#reconfig_timer_twitch02").val("");
    document.getElementById("reconfig_twitch02").style.display = "none";
});

function display_crypto_widget_reconfig_modal()
{
    document.getElementById("reconfig_crypto").style.display = "block";
}

$('.CloseReconfigCryptoCancel').click(function() {
    $("#reconfig_name_crypto").val("");
    $("#crypto_initial").val("");
    $("#crypto_final").val("");
    $("#timer_crypto").val("");
    document.getElementById("reconfig_crypto").style.display = "none";
});

$('.CloseReconfigCryptoValidate').click(function() {
    if ($("#reconfig_name_crypto").val() == "" || $("#reconfig_crypto_initial").val() == "" || $("#reconfig_crypto_final").val() == "" || $("#reconfig_timer_crypto").val() == "")
        return false;
    if ($.isNumeric($("#reconfig_timer_crypto").val()) == false)
        return false;
    var widg_n = $("#reconfig_name_crypto").val();
    var fsym = $("#reconfig_crypto_initial").val().toUpperCase();
    var tsym = $("#reconfig_crypto_final").val().toUpperCase();
    var timer = $("#reconfig_timer_crypto").val();
    obj_crypto(widg_n, fsym, tsym, timer)
    var newdata = {};
    newdata['crypto'] = {"name": widg_n, "fsym": fsym, "tsym": tsym, "timer": timer};
    $.extend(true, Dashboard_Data, newdata);
    console.log(Dashboard_Data);
    send_data();
    $("#reconfig_name_crypto").val("");
    $("#reconfig_crypto_initial").val("");
    $("#reconfig_crypto_final").val("");
    $("#reconfig_timer_crypto").val("");
    document.getElementById("reconfig_crypto").style.display = "none";
});

$('.CloseReconfigCryptoDelete').click(function() {
    // remove l'objet de la page + du json
    $("#reconfig_name_crypto").val("");
    $("#crypto_initial").val("");
    $("#crypto_final").val("");
    $("#timer_crypto").val("");
    document.getElementById("reconfig_crypto").style.display = "none";
});

function display_youtube01_reconfig_modal()
{
    document.getElementById("reconfig_youtube01").style.display = "block";
}

$('.CloseReconfigYoutubeCancel01').click(function() {
    $("#reconfig_name_youtube01").val("");
    $("#reconfig_youtuber").val("");
    $("#reconfig_timer_youtube01").val("");
    document.getElementById("reconfig_youtube01").style.display = "none";
});

$('.CloseReconfigYoutubeValidate01').click(function() {
    if ($("#reconfig_name_youtube01").val() == "" || $("#reconfig_youtuber").val() == "" || $("#reconfig_timer_youtube01").val() == "")
        return false;
    if ($.isNumeric($("#reconfig_timer_youtube01").val()) == false)
        return false;
    var widg_n = $("#reconfig_name_youtube01").val();
    var ytb_channel = $("#reconfig_youtuber").val();
    var timer = $("#reconfig_timer_youtube01").val();
    obj_youtube01(widg_n, ytb_channel, timer)
    var newdata = {};
    newdata['youtube01'] = {"name": widg_n, "ytb_channel": ytb_channel, "timer": timer};
    $.extend(true, Dashboard_Data, newdata);
    console.log(Dashboard_Data);
    send_data();
    $("#reconfig_name_youtube01").val("");
    $("#reconfig_youtuber").val("");
    $("#reconfig_timer_youtube01").val("");
    document.getElementById("reconfig_youtube01").style.display = "none";
});

$('.CloseReconfigYoutubeDelete01').click(function() {
    // remove l'objet de la page + du json
    $("#reconfig_name_youtube01").val("");
    $("#reconfig_youtuber").val("");
    $("#reconfig_timer_youtube01").val("");
    document.getElementById("reconfig_youtube01").style.display = "none";
});

function display_youtube02_reconfig_modal()
{
    document.getElementById("reconfig_youtube02").style.display = "block";
}

$('.CloseReconfigYoutubeCancel02').click(function() {
    $("#reconfig_name_youtube02").val("");
    $("#reconfig_youtube_video").val("");
    $("#reconfig_timer_youtube02").val("");
    document.getElementById("reconfig_youtube02").style.display = "none";
});

$('.CloseReconfigYoutubeValidate02').click(function() {
    if ($("#reconfig_name_youtube02").val() == "" || $("#reconfig_youtube_video").val() == "" || $("#reconfig_timer_youtube02").val() == "")
        return false;
    if ($.isNumeric($("#reconfig_timer_youtube02").val()) == false)
        return false;
    var widg_n = $("#reconfig_name_youtube02").val();
    var ytb_video = $("#reconfig_youtube_video").val();
    var timer = $("#reconfig_timer_youtube02").val();
    obj_youtube02(widg_n, ytb_video, timer)
    var newdata = {};
    newdata['youtube02'] = {"name": widg_n, "ytb_video": ytb_video, "timer": timer};
    $.extend(true, Dashboard_Data, newdata);
    console.log(Dashboard_Data);
    send_data();
    $("#reconfig_name_youtube02").val("");
    $("#reconfig_youtube_video").val("");
    $("#reconfig_timer_youtube02").val("");
    document.getElementById("reconfig_youtube02").style.display = "none";
});

$('.CloseReconfigYoutubeDelete02').click(function() {
    // remove l'objet de la page + du json
    $("#reconfig_name_youtube02").val("");
    $("#reconfig_youtube_video").val("");
    $("#reconfig_timer_youtube02").val("");
    document.getElementById("reconfig_youtube02").style.display = "none";
});

function display_youtube03_reconfig_modal() {
    document.getElementById("reconfig_youtube03").style.display = "block";
}

$('.CloseReconfigYoutubeCancel03').click(function () {
    $("#reconfig_name_youtube03").val("");
    $("#reconfig_youtube_video_03").val("");
    $("#reconfig_nb_comment").val("");
    $("#reconfig_timer_youtube03").val("");
    document.getElementById("reconfig_youtube03").style.display = "none";
});

$('.CloseReconfigYoutubeValidate03').click(function () {
    if ($("#reconfig_name_youtube03").val() == "" || $("#reconfig_youtube_video_03").val() == "" || $("#reconfig_nb_comment").val() == "" || $("#reconfig_timer_youtube03").val() == "")
        return false;
    if ($.isNumeric($("#reconfig_timer_youtube03").val()) == false || $.isNumeric($("#nb_comment").val()) == false)
        return false;
    var widg_n = $("#reconfig_name_youtube03").val();
    var ytb_video = $("#reconfig_youtube_video_03").val();
    var max_comment = $("#reconfig_nb_comment").val();
    var timer = $("#reconfig_timer_youtube03").val();
    obj_youtube03(widg_n, ytb_video, max_comment, timer)
    var newdata = {};
    newdata['youtube03'] = { "name": widg_n, "ytb_video": ytb_video, "max_comment": max_comment, "timer": timer };
    $.extend(true, Dashboard_Data, newdata);
    console.log(Dashboard_Data);
    send_data();
    $("#reconfig_name_youtube03").val("");
    $("#reconfig_youtube_video_03").val("");
    $("#reconfig_nb_comment").val("");
    $("#reconfig_timer_youtube03").val("");
    document.getElementById("reconfig_youtube03").style.display = "none";
});

$('.CloseReconfigYoutubeDelete02').click(function() {
    // remove l'objet de la page + du json
    $("#reconfig_name_youtube03").val("");
    $("#reconfig_youtube_video_03").val("");
    $("#reconfig_nb_comment").val("");
    $("#reconfig_timer_youtube03").val("");
    document.getElementById("reconfig_youtube03").style.display = "none";
});