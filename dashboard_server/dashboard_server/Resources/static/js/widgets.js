var widg_twitch01;
class Widgets {
    constructor(widg_param, name) { //widg_param = objets avec liste des param du widg, name = nom param
       this.widg_param = widg_param;
       this.name = name;
   }
   send_request() {
       var self = this;
       $.get(
           {
               url: this.widg_param.url,
               data: this.widg_param.src + "=" + this.widg_param.widg_param,
               dataType: 'json',
               async: false,
               contentType: "application/json; charset=utf-8",
               success: function(response){
                    console.log(response);
                    this.objso = response;
                    if (self.name == "meteo")
                       create_meteo(this.objso, self.widg_param.widg_na);
                    else if (self.name == "steam01")
                       create_steam01(this.objso, self.widg_param.widg_na);
                    else if (self.name == "steam02")
                       create_steam02(this.objso, self.widg_param.widg_na);
                    else if (self.name == "twitch01")
                        create_twitch01(this.objso, self.widg_param.widg_na, self.widg_param.widg_param);
                    else if (self.name == "twitch01")
                        create_twitch01(this.objso, self.widg_param.widg_na);
                    else if (self.name == "twitch02")
                        create_twitch02(this.objso, self.widg_param.widg_na);
                    else if (self.name == "crypto")
                        create_crypto(this.objso, self.widg_param.widg_na);
                    else if (self.name == "youtube01")
                        create_youtube01(this.objso, self.widg_param.widg_na);
                    else if (self.name == "youtube02")
                        create_youtube02(this.objso, self.widg_param.widg_na);
                }
            })
        }   
    send_request_crypto(tsym) {
       var self = this;
       $.get(
           {
               url: this.widg_param.url,
               data: this.widg_param.widg_param,
               dataType: 'json',
               async: false,
               contentType: "application/json; charset=utf-8",
               success: function(response){
                    console.log(response);
                    this.objso = response;
                    if (self.name == "crypto")
                        create_crypto(this.objso, tsym);
                }
            })
        }   
   time(refresh_interv, widg){ // fonction pour le timer , prend un temps en minute en param
       this.refresh_interv = refresh_interv * 1000; // convertit temsp en ms pour la fct setinterv
       setInterval(widg.send_request(), this.refresh_interv);
   }
}

function create_steam01(resp_jso, widg_n) {
    var game_n = resp_jso.name;
    var nb_player = resp_jso.player;




    document.getElementById("widget_result").innerHTML = template;
    var widget_field_template = "<li class=\"ui-state-default\">" + widg_n + "<i class=\"fas fa-cog\"></i></li>";
    document.getElementById("widg_steam01").innerHTML = widget_field_template;
}

function create_steam02(resp_jso, widg_n) {
    var friends = resp_jso.friends;



    document.getElementById("widget_result").innerHTML = template;
    var widget_field_template = "<li class=\"ui-state-default\">" + widg_n + "<i class=\"fas fa-cog\"></i></li>";
    document.getElementById("widg_steam02").innerHTML = widget_field_template;
}

function create_meteo(resp_jso, widg_n){
   var temp_c = resp_jso.current.temp_c;
   var region = resp_jso.location.region;
   var pays = resp_jso.location.country;
   var nom = resp_jso.location.name;
   var text = resp_jso.current.condition.text;
   var icon = resp_jso.current.condition.icon;
   alert(icon);
   var template = "<div id=\"meteo_widget\">" +
    "<p class=\"title_widget\"><i class=\"fas fa-sun\"></i><br/>Météo</p>" +
    "<div id=\"meteo_data\">" +
    "<div id=\"region_div\">" +
    "<div id=\"region_data\">" +
    "<p>Ville: " + nom + "</p>" +
    "<p>Région: " + region + "</p>" +
    "<p>Température: " + temp_c + "</p>" +
    "</div>" + "</div>" +
    "<div id=\"weather_div\">" +
    "<div id=\"weather_data\">" +
    "<p>" + text + "<p>" +
    "<img src=\"" + icon + "\">" +
    "</div>" + "</div>" + "<p></p>" + "</div>" + "</div>";
    document.getElementById("widget_result").innerHTML = template;
    var widget_field_template = "<li class=\"ui-state-default\">" + widg_n + "<i class=\"fas fa-cog\"></i></li>";
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
    var template = 
    "<div id=\"twitch_widget\">" +
        "<p class=\"title_widget\"><i class=\"fab fa-twitch\"></i><br/>Twitch<br/>" + stream_n + "</p>" +
        "<div id=\"twitch_widget1_container\">" +
        "<img src=\""+ pic +"\">" +                  
            "<div id=\"data_twitch_channel\">" +
                "<div id=\"data_twitch_channel\">" +
                    "<p id=\"" + stream_n + "\>OgamingSC2</p>\"" +
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
        "</div>" +
    "</div>";
    document.getElementById("widget_result").innerHTML = template;
    var widget_field_template = "<li class=\"ui-state-default\">" + widg_n + "<i class=\"fas fa-cog\"></i></li>";
    document.getElementById("widg_twitch01").innerHTML = widget_field_template;
}

function create_twitch02(resp_jso, widg_n) {
    var channels = resp_jso.channels;
    var vierwers = resp_jso.viewers;



    document.getElementById("widget_result").innerHTML = template;
    var widget_field_template = "<li class=\"ui-state-default\">" + widg_n + "<i class=\"fas fa-cog\"></i></li>";
    document.getElementById("twitch02").innerHTML = widget_field_template;
 }

 function create_crypto(resp_jso, tsym, widg_n) {
    var price = resp_jso[tsym];

    document.getElementById("widget_result").innerHTML = template;
    var widget_field_template = "<li class=\"ui-state-default\">" + widg_n + "<i class=\"fas fa-cog\"></i></li>";
    document.getElementById("widg_crypto").innerHTML = widget_field_template;
 }

 function create_youtube01(resp_jso, widg_n) {
    var sub = resp_jso.subscriberCount;
    var nb_video = resp_jso.videoCount;
    var nb_view = resp_jso.viewCount;
    var pic = resp_jso.url;

    document.getElementById("widget_result").innerHTML = template;
    var widget_field_template = "<li class=\"ui-state-default\">" + widg_n + "<i class=\"fas fa-cog\"></i></li>";
    document.getElementById("widg_youtube01").innerHTML = widget_field_template;
 }

 function create_youtube02(resp_jso, widg_n) {
     var title = resp_jso.title;
     var desc = resp_jso.description;
     var views = resp_jso.viewCount;
     var like = resp_jso.likeCount;
     var dislike = resp_jso.dislikeCount;
     var nb_com = resp_jso.commentCount;
     var thumb = resp_jso.url;



     document.getElementById("widget_result").innerHTML = template;
    var widget_field_template = "<li class=\"ui-state-default\">" + widg_n + "<i class=\"fas fa-cog\"></i></li>";
    document.getElementById("widg_youtube02").innerHTML = widget_field_template;
 }

function obj_meteo(ville_name, timer, widg_n){
    var my_url_for_ip = Get_Path_For_IP();
    var final_ip = my_url_for_ip + "/API/meteo";
    var city = ville_name;
    var meteo_url = final_ip;
    var source = "town";
    var widg_name = widg_n;
    var interval = timer;
    widg_meteo = new Widgets({url: meteo_url, widg_param: city, src: source, widg_na: widg_name}, "meteo");
    widg_meteo.send_request();
}

function obj_steam01(steam_id, widg_n, timer){
    var my_url_for_ip = Get_Path_For_IP();
    var final_ip = my_url_for_ip + "/API/steam/game";
    var source = "game";
    widg_steam01 = new Widgets({url: final_ip, widg_param: steam_id, src: source, widg_na:  widg_n}, "steam01")
    widg_steam01.send_request();
}

function obj_steam02(steam_id, widg_n, timer){
    var my_url_for_ip = Get_Path_For_IP();
    var final_ip = my_url_for_ip + "/API/steam/user";
    var source = "user";
    widg_steam02 = new Widgets({url: final_ip, widg_param: steam_id, src: source, widg_na:  widg_n}, "steam02")
    widg_steam02.send_request();
}

function obj_twitch01(widg_n, twitch_streamer, timer){
    var my_url_for_ip = Get_Path_For_IP();
    var final_ip = my_url_for_ip + "/API/twitch/streamer";
    var source = "streamer";
    widg_twitch01 = new Widgets({url: final_ip, widg_param: twitch_streamer, src: source, widg_na:  widg_n}, "twitch01")    
    widg_twitch01.time(timer, widg_twitch01);
}

function obj_twitch02(widg_n, twitch_game, timer){
    var my_url_for_ip = Get_Path_For_IP();
    var final_ip = my_url_for_ip + "/API/twitch/game";
    var source = "game";
    widg_twitch02 = new Widgets({url: final_ip, widg_param: twitch_game, src: source, widg_na:  widg_n}, "twitch02")
    widg_twitch02.send_request();
}

function obj_crypto(widg_n, fsym, tsym, timer){
    var my_url_for_ip = Get_Path_For_IP();
    var final_ip = my_url_for_ip + "/API/crypto";
    my_param = "&Cfrom=" + fsym + "&Cto=" + tsym;
    widg_crypto = new Widgets({url: final_ip, widg_param: my_param, widg_na:  widg_n}, "crypto")
    widg_crypto.send_request_crypto(tsym);
}

function obj_youtube01(widg_n, ytb_channel, timer){
    var my_url_for_ip = Get_Path_For_IP();
    var final_ip = my_url_for_ip + "/API/YTB/channel";
    var source = "channel";
    widg_youtube01 = new Widgets({url: final_ip, widg_param: ytb_channel, src: source, widg_na:  widg_n}, "youtube01")
    widg_youtube01.send_request();
}

function obj_youtube02(widg_n, ytb_video, timer){
    var my_url_for_ip = Get_Path_For_IP();
    var final_ip = my_url_for_ip + "/API/YTB/vod";
    var source = "vod";
    widg_youtube02 = new Widgets({url: final_ip, widg_param: ytb_video, src: source, widg_na:  widg_n}, "youtube02")
    widg_youtube02.send_request();
}

function Get_Path_For_IP() 
{
    var my_current_url = window.location.href;

    var words = my_current_url.split(':');
    var words_final = words[1].split('/');

    var final_ip = "http://" + words_final[2] + ":8080";
    return final_ip;
}