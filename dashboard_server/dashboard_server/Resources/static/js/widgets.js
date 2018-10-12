window.onload = function() {obj_meteo()};

 class Widgets {
     constructor(widg_param, name) { //widg_param = objets avec liste des param du widg, name = nom param
        this.widg_param = widg_param;
        this.name = name;
    }
    send_request() {
        $.get(
            {
                url: this.widg_param.url,
                data: this.widg_param.src + "=" + this.widg_param.widg_param,
                dataType: 'json',
                success: function(response){
                    alert("couille");
                    if (response) {
                     this.objso = JSON.parse(reponse);
                     if (this.name == "meteo"){
                        create_meteo(this.objso);
                     }
                     else if (this.name == "steam") {
                        create_steam(this.objso);
                     }
                     else if (this.name == "twitch") {
                        create_twitch(this.objso);
                     }
                     else if (this.name == "blizzard"){
                        create_blizzard(this.objson);
                     }
                     else if(this.name == "crypto"){
                        create_crypto(this.objson); 
                     }
                    }   
                    else {
                        alert("ca pue du cul");
                    }
                }
            }
        )
    }
    time(refresh_interv){ // fonction pour le timer , prend un temps en minute en param
        this.refresh_interv = refresh_interv / 60000; // convertit temsp en ms pour la fct setinterv
        setInterval(send_request(), this.refresh_interv);
    }
}

function create_meteo(resp_jso){
    var temp_c = resp_jso.current.temp_c;
    var region = resp_jso.location.region;
    var pays = resp_jso.location.country;
    var nom = resp_jso.location.name;
    var text = resp_jso.current.condition.text;
    var icon = resp_jso.current.condition.icon;
}

function obj_meteo(){
    var city = "Nancy";
    var meteo_url = "https://10.18.207.243:8080/API/meteo/";
    var source = "town";
    widg_meteo = new Widgets({url: meteo_url, widg_param: city, src: source}, "meteo");
    widg_meteo.send_request();
}