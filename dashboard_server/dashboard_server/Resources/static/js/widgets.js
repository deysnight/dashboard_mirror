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
                       create_meteo(this.objso);
                    else if (self.name == "steam01")
                       create_steam01(this.objso);
                    else if (self.name == "steam02")
                       create_steam02(this.objso);
                    else if (self.name == "twitch01")
                        create_twitch01(this.objso);
                    else if (self.name == "twitch01")
                        create_twitch01(this.objso);
                    else if (self.name == "twitch02")
                        create_twitch02(this.objso);
                    else if (self.name == "crypto")
                        create_crypto(this.objso);
                    else if (self.name == "youtube01")
                        create_youtube01(this.objso);
                    else if (self.name == "youtube02")
                        create_youtube02(this.objso);
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
   time(refresh_interv){ // fonction pour le timer , prend un temps en minute en param
       this.refresh_interv = refresh_interv / 60000; // convertit temsp en ms pour la fct setinterv
       setInterval(send_request(), this.refresh_interv);
   }
}

function create_steam01(resp_jso) {
    var game_n = resp_jso.name;
    var nb_player = resp_jso.player;
}

function create_steam02(resp_jso) {
    var friends = resp_jso.friends;
}

function create_meteo(resp_jso){
   var temp_c = resp_jso.current.temp_c;
   var region = resp_jso.location.region;
   var pays = resp_jso.location.country;
   var nom = resp_jso.location.name;
   var text = resp_jso.current.condition.text;
   var icon = resp_jso.current.condition.icon;
}

function create_twitch01(resp_jso) {
   var game = resp_jso.game;
   var followers = resp_jso.followers;
   var pic = resp_jso.pic;
   var onStream = resp_jso.onStream;
   var status = resp_jso.status;
   var views = resp_jso.views;
   var viewers = resp_jso.viewers;
   var url = resp_jso.url;
}

function create_twitch02(resp_jso) {
    var channels = resp_jso.channels;
    var vierwers = resp_jso.viewers;
 }

 function create_crypto(resp_jso, tsym) {
    var price = resp_jso[tsym];
 }

 function create_youtube01(resp_jso) {
    var sub = resp_jso.subscriberCount;
    var nb_video = resp_jso.videoCount;
    var nb_view = resp_jso.viewCount;
    var pic = resp_jso.url;
 }

 function create_youtube02(resp_jso) {
     var title = resp_jso.title;
     var desc = resp_jso.description;
     var views = resp_jso.viewCount;
     var like = resp_jso.likeCount;
     var dislike = resp_jso.dislikeCount;
     var nb_com = resp_jso.commentCount;
     var thumb = resp_jso.url;
 }

function obj_meteo(ville_name, timer, widg_n){
    var my_url_for_ip = Get_Path_For_IP();
    var final_ip = my_url_for_ip + "/API/meteo";
    var city = ville_name;
    var meteo_url = final_ip;
    var source = "town";
    var widg_name = widg_n;
    var interval = timer;
    widg_meteo = new Widgets({url: meteo_url, widg_param: city, src: source}, "meteo");
    widg_meteo.send_request();
}

function obj_steam01(steam_id, widg_n, timer){
    var my_url_for_ip = Get_Path_For_IP();
    var final_ip = my_url_for_ip + "/API/steam/game";
    var source = "game";
    widg_steam01 = new Widgets({url: final_ip, widg_param: steam_id, src: source}, "steam01")
    widg_steam01.send_request();
}

function obj_steam02(steam_id, widg_n, timer){
    var my_url_for_ip = Get_Path_For_IP();
    var final_ip = my_url_for_ip + "/API/steam/user";
    var source = "user";
    widg_steam02 = new Widgets({url: final_ip, widg_param: steam_id, src: source}, "steam02")
    widg_steam02.send_request();
}

function obj_twitch01(widg_n, twitch_streamer, timer){
    var my_url_for_ip = Get_Path_For_IP();
    var final_ip = my_url_for_ip + "/API/twitch/streamer";
    var source = "streamer";
    widg_twitch01 = new Widgets({url: final_ip, widg_param: twitch_streamer, src: source}, "twitch01")
    widg_twitch01.send_request();
}

function obj_twitch02(widg_n, twitch_game, timer){
    var my_url_for_ip = Get_Path_For_IP();
    var final_ip = my_url_for_ip + "/API/twitch/game";
    var source = "game";
    widg_twitch02 = new Widgets({url: final_ip, widg_param: twitch_game, src: source}, "twitch02")
    widg_twitch02.send_request();
}

function obj_crypto(widg_n, fsym, tsym, timer){
    var my_url_for_ip = Get_Path_For_IP();
    var final_ip = my_url_for_ip + "/API/crypto";
    my_param = "&Cfrom=" + fsym + "&Cto=" + tsym;
    widg_crypto = new Widgets({url: final_ip, widg_param: my_param}, "crypto")
    widg_crypto.send_request_crypto(tsym);
}

function obj_youtube01(widg_n, ytb_channel, timer){
    var my_url_for_ip = Get_Path_For_IP();
    var final_ip = my_url_for_ip + "/API/YTB/channel";
    var source = "channel";
    widg_youtube01 = new Widgets({url: final_ip, widg_param: ytb_channel, src: source}, "youtube01")
    widg_youtube01.send_request();
}

function obj_youtube02(widg_n, ytb_video, timer){
    var my_url_for_ip = Get_Path_For_IP();
    var final_ip = my_url_for_ip + "/API/YTB/vod";
    var source = "vod";
    widg_youtube02 = new Widgets({url: final_ip, widg_param: ytb_video, src: source}, "youtube02")
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