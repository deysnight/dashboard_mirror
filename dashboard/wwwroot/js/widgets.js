var stopmeteo;
var stoptwitch01;
var stoptwitch02;
var stopsteam01;
var stopsteam02;
var stopcrypto;
var stopyoutube01;
var stopyoutube02;
var stopyoutube03;
var stopoverwatch;

function time_twitch01(refresh_interv, url, widg_param, src, widg_na, name){ // fonction pour le timer , prend un temps en minute en param
    refresh_interv = refresh_interv * 1000; // convertit temsp en ms pour la fct setinterv
    stoptwitch01 = setInterval(send_twitch01_request, refresh_interv, url, widg_param, src, widg_na, name);
}

function time_twitch02(refresh_interv, url, widg_param, src, widg_na, name){ // fonction pour le timer , prend un temps en minute en param
    refresh_interv = refresh_interv * 1000; // convertit temsp en ms pour la fct setinterv
    stoptwitch02 = setInterval(send_twitch02_request, refresh_interv, url, widg_param, src, widg_na, name);
}

function time_meteo(refresh_interv, url, widg_param, src, widg_na, name){ // fonction pour le timer , prend un temps en minute en param
    refresh_interv = refresh_interv * 1000; // convertit temsp en ms pour la fct setinterv
    stopmeteo = setInterval(send_meteo_request, refresh_interv, url, widg_param, src, widg_na, name);
}

function time_steam01(refresh_interv, url, widg_param, src, widg_na, name){ // fonction pour le timer , prend un temps en minute en param
    refresh_interv = refresh_interv * 1000; // convertit temsp en ms pour la fct setinterv
    stopsteam01 = setInterval(send_steam01_request, refresh_interv, url, widg_param, src, widg_na, name);
}

function time_steam02(refresh_interv, url, widg_param, src, widg_na, name){ // fonction pour le timer , prend un temps en minute en param
    refresh_interv = refresh_interv * 1000; // convertit temsp en ms pour la fct setinterv
    stopsteam02 = setInterval(send_steam02_request, refresh_interv, url, widg_param, src, widg_na, name);
}

function time_crypto(refresh_interv, fsym, tsym, url, widg_param, src, widg_na, name){ // fonction pour le timer , prend un temps en minute en param
    refresh_interv = refresh_interv * 1000; // convertit temsp en ms pour la fct setinterv
    stopcrypto = setInterval(send_crypto_request, refresh_interv, fsym, tsym, url, widg_param , src, widg_na, name);
}

function time_youtube03(refresh_interv, url, widg_param, src, widg_na, name){ // fonction pour le timer , prend un temps en minute en param
    refresh_interv = refresh_interv * 1000; // convertit temsp en ms pour la fct setinterv
    stopyoutube03 = setInterval(send_youtube03_request, refresh_interv, url, widg_param, src, widg_na, name);
}

function time_youtube01(refresh_interv, url, widg_param, src, widg_na, name){ // fonction pour le timer , prend un temps en minute en param
    refresh_interv = refresh_interv * 1000; // convertit temsp en ms pour la fct setinterv
    stopyoutube01 = setInterval(send_youtube01_request, refresh_interv, url, widg_param, src, widg_na, name);
}

function time_youtube02(refresh_interv, url, widg_param, src, widg_na, name){ // fonction pour le timer , prend un temps en minute en param
    refresh_interv = refresh_interv * 1000; // convertit temsp en ms pour la fct setinterv
    stopyoutube02 = setInterval(send_youtube02_request, refresh_interv, url, widg_param, src, widg_na, name);
}

function time_overwatch(refresh_interv, url, widg_param, src, widg_na, name){ // fonction pour le timer , prend un temps en minute en param
    refresh_interv = refresh_interv * 1000; // convertit temsp en ms pour la fct setinterv
    stopoverwatch = setInterval(send_overwatch_request, refresh_interv, url, widg_param, src, widg_na, name);
}

function send_youtube03_request(url, widg_param, widg_na) {
    console.log(url + "com/" + widg_param);
    $.get(
        {
            url: url + "com/" + widg_param,
            dataType: 'json',
            async: true,
            contentType: "application/json; charset=utf-8",
            success: function(response){
                 objso = response;
                 console.log(response);
                     create_youtube03(objso, widg_na);
             }
         })
}

function send_crypto_request(fsym, tsym, url, widg_param, widg_na, name) {
    $.get(
        {
            url: url + widg_param,
            dataType: 'json',
            async: true,
            contentType: "application/json; charset=utf-8",
            success: function(response){
                 objso = response;
                 console.log(response);
                     create_crypto(objso, fsym, tsym, widg_na);
             }
         })
}

function send_youtube01_request(url, widg_param, src, widg_na, name){ 
    $.get(
    {
        url: url + "stat/" + widg_param,
        dataType: 'json',
        async: true,
        contentType: "application/json; charset=utf-8",
        success: function(response){
            objso = response;
            console.log(response);
                create_youtube01(objso, widg_na, widg_param);
        }
    }   
    )   
}

function send_youtube02_request(url, widg_param, src, widg_na, name){ 
    console.log(url + "vod/" + widg_param);
    $.get(
    {
        url: url + "vod/" + widg_param,
        dataType: 'json',
        async: true,
        contentType: "application/json; charset=utf-8",
        success: function(response){
            objso = response;
            console.log(response);
                create_youtube02(objso, widg_na, widg_param);
        }
    }   
    )   
}

function send_steam02_request(url, widg_param, src, widg_na, name){ 
    $.get(
    {
        url: url + "/" + widg_param,
        dataType: 'json',
        async: true,
        contentType: "application/json; charset=utf-8",
        success: function(response){
            objso = response;
            console.log(response);    
            create_steam02(objso, widg_na, widg_param);
        }
    }   
    )   
}

function send_steam01_request(url, widg_param, src, widg_na, name){ 
    $.get(
    {
        url: url + "/" + widg_param,
        dataType: 'json',
        async: true,
        contentType: "application/json; charset=utf-8",
        success: function(response){
            objso = response;
            console.log(response);
                create_steam01(objso, widg_na, widg_param);
        }
    }   
    )   
}

function send_meteo_request(url, widg_param, src, widg_na, name){ 
    $.get(
    {
        url: url + "/" + widg_param,
        dataType: 'json',
        async: true,
        contentType: "application/json; charset=utf-8",
        success: function(response){
            objso = response;
            console.log(response);
                create_meteo(objso, widg_na, widg_param);
        }
    }   
    )   
}

function send_twitch02_request(url, widg_param, src, widg_na, name){ 
    $.get(
    {
        url: url + "/" + widg_param,
        dataType: 'json',
        async: true,
        contentType: "application/json; charset=utf-8",
        success: function(response){
            objso = response;
            console.log(response);
                create_twitch02(objso, widg_na, widg_param);
        }
    }   
    )   
}

function send_twitch01_request(url, widg_param, src, widg_na, name){ 
    $.get(
    {
        url: url + "/" + widg_param,
        dataType: 'json',
        async: true,
        contentType: "application/json; charset=utf-8",
        success: function(response){
            objso = response;
            console.log(response);
                create_twitch01(objso, widg_na, widg_param);
        }
    }   
    )   
}

function send_overwatch_request(url, widg_param, src, widg_na, name){ 
    $.get(
    {
        url: url + "stat/" + widg_param,
        dataType: 'json',
        async: true,
        contentType: "application/json; charset=utf-8",
        success: function(response){
            objso = response;
            console.log(response);
                create_overwatch(objso, widg_na, widg_param, name);
        }
    }   
    )   
}

function stop_twitch01(){
    clearInterval(stoptwitch01);
}

function stop_twitch02(){
    clearInterval(stoptwitch02);
}

function stop_meteo(){
    clearInterval(stopmeteo);
}

function stop_steam01(){
    clearInterval(stopsteam01);
}

function stop_steam02(){
    clearInterval(stopsteam02);
}

function stop_crypto(){
    clearInterval(stopcrypto);
}

function stop_youtube01(){
    clearInterval(stopyoutube01);
}

function stop_youtube02(){
    clearInterval(stopyoutube02);
}

function stop_youtube03(){
    clearInterval(stopyoutube03);
}

function stop_overwatch(){
    clearInterval(stopoverwatch);
}

function create_steam01(resp_jso, widg_n) {
    var game_n = resp_jso.name;
    var nb_player = resp_jso.player;

    var template =
    "<div id=\"steam01_widget\">" +
        "<p class=\"title_widget\"><i class=\"fab fa-steam\"></i><br/>Steam <br/>" + game_n + "</p>" +
        "<div id=\"steam_widget_1_data\">" +
            "<div id=\"steam_widget_1_sub\">" +
                "<p>Compteurs de joueurs actuel: " + nb_player + "</p>" +
            "</div>" +
        "</div>" +
    "</div>";


    document.getElementById("steam01_disp").innerHTML = template;
    var widget_field_template = "<li id=\"field_steam01_template\" onclick=\"Display_Steam01_Widget()\" class=\"ui-state-default\">" + widg_n + "<i onclick=\"display_steam_widget01_reconfig_modal()\" class=\"fas fa-cog\"></i></li>";
    document.getElementById("widg_steam01").innerHTML = widget_field_template;
}

function create_steam02(resp_jso, widg_n) {
    var friends = resp_jso.friends;
    var template =
    "<div id=\"steam02_widget\">" +
        "<p class=\"title_widget\"><i class=\"fab fa-steam\"></i><br/>Steam Liste d'ami</p>" +
        "<div id=\"steam_widget_2_data\">" +
            "<ul id=\"user_list_steam02\">" +
            "</ul>" +
        "</div>" +
    "</div>";

    document.getElementById("steam02_disp").innerHTML = template;
    var i = 0;
    while (friends[i]) {
        $("#user_list_steam02").append("<li>" + friends[i] + "</li>");
        i = i + 1;
    }
    var widget_field_template = "<li id=\"field_steam02_template\" onclick=\"Display_Steam02_Widget()\" class=\"ui-state-default\">" + widg_n + "<i onclick=\"display_steam_widget02_reconfig_modal()\" class=\"fas fa-cog\"></i></li>";
    document.getElementById("widg_steam02").innerHTML = widget_field_template;
}

function create_meteo(resp_jso, widg_n){
   var temp_c = resp_jso.current.temp_c;
   var region = resp_jso.location.region;
   var pays = resp_jso.location.country;
   var nom = resp_jso.location.name;
   var text = resp_jso.current.condition.text;
   var icon = resp_jso.current.condition.icon;
   var template = 
   "<div id=\"meteo_widget\">" +
        "<p class=\"title_widget\"><i class=\"fas fa-sun\"></i><br/>Météo</p>" +
        "<div id=\"meteo_data\">" +
            "<div id=\"region_div\">" +
                "<div id=\"region_data\">" +
                    "<p>Pays: " + pays + "</p>" +
                    "<p>Ville: " + nom + "</p>" +
                    "<p>Région: " + region + "</p>" +
                    "<p>Température: " + temp_c + "°</p>" +
                "</div>" + "</div>" +
                "<div id=\"weather_div\">" +
                    "<div id=\"weather_data\">" +
                        "<p>" + text + "<p>" +
                        "<img src=\"" + icon + "\">" +
                    "</div>" + 
                "</div>" + 
            "</div>" + 
        "</div>" +
    "</div>";

    document.getElementById("meteo_disp").innerHTML = template;
    var widget_field_template = "<li id=\"field_meteo_template\" onclick=\"Display_Meteo_Widget()\" class=\"ui-state-default\">" + widg_n + "<i onclick=\"display_meteo_widget_reconfig_modal()\" class=\"fas fa-cog\"></i></li>";
    document.getElementById("widg_mete").innerHTML = widget_field_template;
} 

function create_twitch01(resp_jso, widg_n, stream_n) {
    var game = resp_jso.game;
    var followers = resp_jso.followers;
    var pic = resp_jso.pic;
    var onStream = resp_jso.onStream;
    var status = resp_jso.status;
    var views = resp_jso.views;
    var viewers = resp_jso.viewers;
    var url = resp_jso.url;
    if (onStream == false)
    var template = 
    "<div id=\"twitch01_widget\">" +
        "<p class=\"title_widget\"><i class=\"fab fa-twitch\"></i><br/>Twitch " + stream_n + "</p>" +
        "<div id=\"twitch_widget1_container\">" +
            "<div id=\"data_twitch_channel\">" +
            "<p>Streamer actuellement hors-ligne</p>" +
            "</div>" +
        "</div>" +
    "</div>";
    else if (onStream == true) {
    var template = 
    "<div id=\"twitch01_widget\">" +
        "<p class=\"title_widget\"><i class=\"fab fa-twitch\"></i><br/>Twitch " + stream_n + "</p>" +
        "<div id=\"twitch_widget1_container\">" +
            "<div id=\"data_twitch_channel\">" +
                "<p>Title: " + status +"</p>" +
                "<hr>" +
                "<p>Game: " + game + "</p>" +
                "<hr>" +
                "<p>Viewers: " + viewers + "</p>" +
                "<hr>" +
                "<p>Total views: " + views + "</p>" +
                "<hr>" +
                "<p>Followers: " + followers + "</p>" +
                "<hr>" +
                "<a class=\"Twitch_link\" target=\"_blank\" href=\" " + url +"\">Twitch" +
            "</div>" +
        "</div>" +
    "</div>";
    }
    document.getElementById("twitch01_data").innerHTML = template;
    var widget_field_template = "<li id=\"field_twitch01_template\" onclick=\"Display_Twitch01_Widget()\" class=\"ui-state-default\">" + widg_n + "<i onclick=\"display_twitch_widget01_reconfig_modal()\" class=\"fas fa-cog\"></i></li>";
    document.getElementById("widg_twitch01").innerHTML = widget_field_template;
}

function create_twitch02(resp_jso, widg_n, game_name) {
    var channels = resp_jso.channels;
    var viewers = resp_jso.viewers;
    var template = 
    "<div id=\"twitch02_widget\">" +
        "<p class=\"title_widget\"><i class=\"fab fa-twitch\"></i><br/>Twitch " + game_name + "</p>" +
        "<div id=\"twitch_widget2_container\">" +
                "<div id=\"data_twitch_channel_02\">" +
                    "<p id=\"title_twitch\">" + game_name + "</p>" +
                    "<hr>" + "<p>Viewers: " + viewers + "</p>" +
                    "<hr>" + "<p>Channels: " + channels + "</p>" +
                "</div>" +
        "</div>" + 
    "</div>";
    document.getElementById("twitch02_disp").innerHTML = template;
    var widget_field_template = "<li id=\"field_twitch02_template\" onclick=\"Display_Twitch02_Widget()\" class=\"ui-state-default\">" + widg_n + "<i onclick=\"display_twitch_widget02_reconfig_modal()\" class=\"fas fa-cog\"></i></li>";
    document.getElementById("widg_twitch02").innerHTML = widget_field_template;
 }

 function create_crypto(resp_jso, fsym, tsym, widg_n) {
    if (resp_jso.hasOwnProperty("Message") == true)
    var template =
    "<div id=\"crypto_widget\">" +
        "<p class=\"title_widget\"><i class=\"fab fa-bitcoin\"></i><br/>Crypto</p>" +
        "<div id=\"crypto_data\">" +
            "<p>Une des monnaies renseignées n'existe pas</p>" +
            "<p><a target=\"_blank\" href=\"https://coinmarketcap.com/fr/all/views/all/\">Liste des crypto</a></p>" +
        "</div>" +
    "</div>";
    else {
    var price = resp_jso[tsym];
    var template =
    "<div id=\"crypto_widget\">" +
        "<p class=\"title_widget\"><i class=\"fab fa-bitcoin\"></i><br/>Crypto</p>" +
        "<div id=\"crypto_data\">" +
            "<p>Un " + fsym + " vaut " + price + " " + tsym + "</p>" +
        "</div>" +
    "</div>";
    }

    document.getElementById("crypto_disp").innerHTML = template;
    var widget_field_template = "<li id=\"field_crypto_template\" onclick=\"Display_Crypto_Widget()\" class=\"ui-state-default\">" + widg_n + "<i onclick=\"display_crypto_widget_reconfig_modal()\" class=\"fas fa-cog\"></i></li>";
    document.getElementById("widg_crypto").innerHTML = widget_field_template;
 }

 function create_youtube01(resp_jso, widg_n, channel_name) {
    var sub = resp_jso.subscriberCount;
    var nb_video = resp_jso.videoCount;
    var nb_view = resp_jso.viewCount;
    var pic = resp_jso.url;
    var template =
    "<div id=\"youtube_widget01\">" +
        "<p class=\"title_widget\"><i class=\"fab fa-youtube\"></i><br/>Youtube <br/>" + channel_name + "</p>" +
        "<div id=\"youtube_widget_1_data\">" +
            "<div id=\"youtube_widget_1_thumb\">" +
                "<img src="+ pic +">" +
            "</div>" +
                "<div id=\"youtube_widget_1_sub\">" +
                    "<p>Abonnés: " + sub + "</p>" +
                    "<p>Compteurs de vues: " + nb_view + "</p>" +
                    "<p>Nombres de vidéo: " + nb_video + "</p>" +
               "</div>" +
           "</div>" +
    "</div>";

    document.getElementById("youtube01_disp").innerHTML = template;
    var widget_field_template = "<li id=\"field_youtube01_template\" onclick=\"Display_Youtube01_Widget()\" class=\"ui-state-default\">" + widg_n + "<i onclick=\"display_youtube01_reconfig_modal()\" class=\"fas fa-cog\"></i></li>";
    document.getElementById("widg_youtube01").innerHTML = widget_field_template;
 }

 function create_youtube02(resp_jso, widg_n) {
     var title = resp_jso.title;
     var views = resp_jso.viewCount;
     var like = resp_jso.likeCount;
     var dislike = resp_jso.dislikeCount;
     var nb_com = resp_jso.commentCount;
     var thumb = resp_jso.url;

     var template = 
     "<div id=\"youtube_widget02\">" +
        "<p class=\"title_widget\"><i class=\"fab fa-youtube\"></i><br/>Youtube <br/>" + title + "</p>" +
        "<div id=\"youtube_widget_2_data\">" +
            "<div id=\"youtube_widget_2_thumb\">" +
                "<img src=" + thumb + ">" +
            "</div>" +
            "<div id=\"youtube_widget_2_sub\">" +
                "<p>Compteurs de vues: " + views + "</p>" +
                "<p>Nombres de likes: " + like + "</p>" +
                "<p>Nombres de dislikes: " + dislike + "</p>" +
                "<p>Nombres de commentaires: " + nb_com + "</p>" +
            "</div>" +
        "</div>" +
    "</div>";


    document.getElementById("youtube02_disp").innerHTML = template;
    var widget_field_template = "<li id=\"field_youtube02_template\" onclick=\"Display_Youtube02_Widget()\" class=\"ui-state-default\">" + widg_n + "<i onclick=\"display_youtube02_reconfig_modal()\" class=\"fas fa-cog\"></i></li>";
    document.getElementById("widg_youtube02").innerHTML = widget_field_template;
 }

function create_youtube03(resp_jso, widg_n) {
    var comment = resp_jso.comments;
    var template = 
    "<div id=\"youtube_widget03\">" +
        "<p class=\"title_widget\"><i class=\"fab fa-youtube\"></i><br/>Youtube<br/>Commentaires</p>" +
        "<div id=\"youtube_widget_3_data\">" +
            "<ul id=\"user_list\">" +
            "</ul>" +
        "</div>" +
    "</div>";


    document.getElementById("youtube03_disp").innerHTML = template;
    var i = 0;
    while (comment[i]) {
        $("#user_list").append("<li> <img class=\"youtube3_img\" src=\"" + comment[i].authorProfileImageUrl + "\">" + comment[i].authorDisplayName + ": " + comment[i].textDisplay + "</li>");
        i = i + 1;
    }

    var widget_field_template = "<li id=\"field_youtube03_template\" onclick=\"Display_Youtube03_Widget()\" class=\"ui-state-default\">" + widg_n + "<i onclick=\"display_youtube03_reconfig_modal()\" class=\"fas fa-cog\"></i></li>";
    document.getElementById("widg_youtube03").innerHTML = widget_field_template;
}

function create_overwatch(resp_jso, widg_n, name) {

    if (resp_jso.hasOwnProperty("error") == true) {
        var template = 
        "<div id=\"overwatch_widget\">" +
        "<p class=\"title_widget\"><i class=\"fab fa-games\"></i><br/>Overwatch <br/>" + name + "</p>" +
        "<div id=\"youtube_widget_1_data\">" +
            "<p>Ce BattleTag est introuvable</p>" +
           "</div>" +
        "</div>";
        document.getElementById("overwatch_disp").innerHTML = template;
        var widget_field_template = "<li id=\"field_overwatch_template\" onclick=\"Display_Overwatch_Widget()\" class=\"ui-state-default\">" + widg_n + "<i onclick=\"display_overwatch_widget_reconfig_modal()\" class=\"fas fa-cog\"></i></li>";
        document.getElementById("widg_overwatch").innerHTML = widget_field_template;
        return false;
    }
    var name1 = resp_jso.name;
    var name2 = name;
    var pic = resp_jso.icon;
    var level = resp_jso.level;
    var prestige = resp_jso.prestige;
    var damageDoneAvg = resp_jso.quickPlayStats.damageDoneAvg;
    var deathsAvg = resp_jso.quickPlayStats.deathsAvg;
    var eliminationsAvg = resp_jso.quickPlayStats.eliminationsAvg;

    var template = 
    "<div id=\"overwatch_widget\">" +
        "<p class=\"title_widget\"><i class=\"fab fa-games\"></i><br/>Overwatch <br/>" + name2 + "</p>" +
        "<div id=\"youtube_widget_1_data\">" +
            "<div id=\"youtube_widget_1_thumb\">" +
            "<p id=\"tg\">" + name1 + "</p>" +

                "<img src="+ pic +">" +
            "</div>" +
                "<div id=\"youtube_widget_1_sub\">" +
                    "<p>Level: " + level + "</p>" +
                    "<p>Prestige: " + prestige + "</p>" +
                    "<p>Dégâts: " + damageDoneAvg + "</p>" +
                    "<p>Nombre de morts: " + deathsAvg + "</p>" +
                    "<p>Eliminations: " + eliminationsAvg + "</p>" +
               "</div>" +
           "</div>" +
    "</div>";



   document.getElementById("overwatch_disp").innerHTML = template;
   var widget_field_template = "<li id=\"field_overwatch_template\" onclick=\"Display_Overwatch_Widget()\" class=\"ui-state-default\">" + widg_n + "<i onclick=\"display_overwatch_widget_reconfig_modal()\" class=\"fas fa-cog\"></i></li>";
   document.getElementById("widg_overwatch").innerHTML = widget_field_template;
}

function obj_meteo(ville_name, timer, widg_n){
    var my_url_for_ip = Get_Path_For_IP();
    var final_ip = my_url_for_ip + "/API/meteo";
    var source = "town";
    send_meteo_request(final_ip, ville_name, source, widg_n, "meteo");
    time_meteo(timer, final_ip, ville_name, source, widg_n, "meteo");
}

function obj_steam01(steam_id, widg_n, timer){
    var my_url_for_ip = Get_Path_For_IP();
    var final_ip = my_url_for_ip + "/API/steam/game";
    var source = "game";
    send_steam01_request(final_ip, steam_id, source, widg_n, "steam01");
    time_steam01(timer, final_ip, steam_id, source, widg_n, "steam01");
}

function obj_steam02(steam_id, widg_n, timer){
    var my_url_for_ip = Get_Path_For_IP();
    var final_ip = my_url_for_ip + "/API/steam/user";
    var source = "user";
    send_steam02_request(final_ip, steam_id, source, widg_n, "steam02");
    time_steam02(timer, final_ip, steam_id, source, widg_n, "steam02");
}

function obj_twitch01(widg_n, twitch_streamer, timer){
    var my_url_for_ip = Get_Path_For_IP();
    var final_ip = my_url_for_ip + "/API/twitch/stream";
    var source = "streamer";
    send_twitch01_request(final_ip, twitch_streamer, source, widg_n, "twitch01");
    time_twitch01(timer, final_ip, twitch_streamer, source, widg_n, "twitch01");
}

function obj_twitch02(widg_n, twitch_game, timer){
    var my_url_for_ip = Get_Path_For_IP();
    var final_ip = my_url_for_ip + "/API/twitch/game";
    var source = "game";
    send_twitch02_request(final_ip, twitch_game, source, widg_n, "twitch02");
    time_twitch02(timer, final_ip, twitch_game, source, widg_n, "twitch02");
}

function obj_crypto(widg_n, fsym, tsym, timer){
    var my_url_for_ip = Get_Path_For_IP();
    var final_ip = my_url_for_ip + "/API/crypto";
    my_param = "/Cfrom=" + fsym + "&Cto=" + tsym;
    send_crypto_request(fsym, tsym, final_ip, my_param, widg_n, "crypto");
    time_crypto(timer, fsym, tsym, final_ip, my_param, widg_n, "crypto");
}

function obj_youtube01(widg_n, ytb_channel, timer){
    var my_url_for_ip = Get_Path_For_IP();
    var final_ip = my_url_for_ip + "/API/YTB/";
    var source = "channel";
    send_youtube01_request(final_ip, ytb_channel, source, widg_n, "youtube01");
    time_youtube01(timer, final_ip, ytb_channel, source, widg_n, "youtube01");
}

function obj_youtube02(widg_n, ytb_video, timer){
    var my_url_for_ip = Get_Path_For_IP();
    var final_ip = my_url_for_ip + "/API/YTB/";
    var source = "vod";
    send_youtube02_request(final_ip, ytb_video, source, widg_n, "youtube02");
    time_youtube02(timer, final_ip, ytb_video, source, widg_n, "youtube02");
}

function obj_youtube03(widg_n, ytb_video, max_comment, timer) {
    var my_url_for_ip = Get_Path_For_IP();
    var final_ip = my_url_for_ip + "/API/YTB/";
    var my_param = "max=" + max_comment + "&vod=" + ytb_video;
    send_youtube03_request(final_ip,  my_param, widg_n, "youtube03");
    time_youtube03(timer, final_ip, my_param, widg_n, "youtube03");
}

function obj_overwatch(widg_n, battletag, timer){
    var my_url_for_ip = Get_Path_For_IP();
    var final_ip = my_url_for_ip + "/API/ow/";
    var source = "stat";
    send_overwatch_request(final_ip, battletag, source, widg_n, "overwatch");
    time_overwatch(timer, final_ip, battletag, source, widg_n, "overwatch");
    
}

function Get_Path_For_IP() 
{
    var my_current_url = window.location.href;

    var words = my_current_url.split(':');
    var words_final = words[1].split('/');

    var final_ip = "http://" + words_final[2] + ":8080";
    return final_ip;
}