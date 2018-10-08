var button = document.getElementById("login_button");
var cpt_field = 0;
var cpt_login_error = 0;


$("#login_button").click(function () {
    var username = $('#login_username').val();
    var pass1 = $('#login_pass1').val();

    
    if (username == "" ||  pass1 == "") {
        if (cpt_field < 1) {
            input = $('<p class="error_fade" id="error_field">Tout les champs doivent être remplis.</p>');
            input.insertAfter('.pass1_div');
            input.hide();
            input.fadeIn(1000);
            cpt_field++;
        }
        return false;
    }
    else {
        $("#error_field").remove();
        cpt_field = 0
    }

    var hash = EncryptPass(pass1);
    var my_url_for_ip = Get_Path_For_IP();
    var final_ip_redirect = my_url_for_ip + "/dashboard"
    var final_ip_login = my_url_for_ip + "/?/login"

    var formData = username + ':' + hash;
    $.ajax(
        {
            url: final_ip_login,
            type: "post",
            async: false,
            data: formData,
            success: function(response){
                if (response == "OK LOGIN") {
                    createCookie("login", username, 1000);
                    $("#error_login").remove();
                    cpt_login_error = 0;
                    location.href = final_ip_redirect
                }
                else {
                    if (cpt_login_error < 1) {
                        input = $('<p class="error_fade" id="error_login">Vos données de connexion sont incorrectes.</p>');
                        input.insertAfter('.pass1_div');
                        input.hide();
                        input.fadeIn(1000);
                        cpt_login_error++;
                    }
                }
            }
        })
    });

$("#login_form").submit(function(e) {
    e.preventDefault();
});

function EncryptPass(pass1) {
    var hash = 0, i, chr;
    for (i = 0; i < pass1.length; i++) {
        chr = pass1.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0;
    }
    return hash;
}

function Get_Path_For_IP() 
{
    var my_current_url = window.location.href;

    var words = my_current_url.split(':');
    var words_final = words[1].split('/');

    var final_ip = "http://" + words_final[2] + ":8080";
    return final_ip;
}

function createCookie(name, value, minutes)
{
    if (minutes) {
        var date = new Date();
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else 
        var expires = ";"
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

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
    if (myCookie != null)
        location.href = "/dashboard";
  }
  
  window.onload = check_if_cookie();