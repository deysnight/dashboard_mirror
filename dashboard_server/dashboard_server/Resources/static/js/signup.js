var button = document.getElementById("signup_button");
var cpt_field = 0;
var cpt_user_len = 0;
var cpt_pass_len = 0;
var cpt_pass_same = 0;

var error_signup_login = 0;
var error_signup_mail = 0;


$("#signup_button").click(function () {
    var username = $('#signup_username').val();
    var email = $('#signup_email').val();
    var pass1 = $('#signup_pass1').val();
    var pass2 = $('#signup_pass2').val();

    if (pass1.length < 8 || pass1 != pass2 || username.length < 6) {
        if (username == "" || email == "" || pass1 == "" || pass2 == "") {
            if (cpt_field < 1) {
                input = $('<p class="error_fade" id="error_field">Tout les champs doivent être remplis.</p>');
                input.insertAfter('.pass2_div');
                input.hide();
                input.fadeIn(1000);
                cpt_field++;
            }
            $("#error_text_same").remove();
            $("#error_text_len").remove();
            $("#error_user_len").remove();
            $("#error_signup_login").remove();
            $("#error_signup_mail").remove();
            cpt_user_len = 0;
            cpt_pass_len = 0;
            cpt_pass_same = 0;
            error_signup_login = 0;
            error_signup_mail = 0;
            return false;
        }
        else {
            $("#error_field").remove();
            cpt_field = 0
        }
        if (username.length < 6) {
            if (cpt_user_len < 1) {
                input = $('<p class="error_fade" id="error_user_len">Votre nom de compte est trop court (6 lettres minimum).</p>');
                input.insertAfter('.pass2_div');
                input.hide();
                input.fadeIn(1000);
                cpt_user_len++;
            }
        }
        else {
            $("#error_user_len").remove();
            cpt_user_len = 0
        }
        if (pass1.length < 8) {
            if (cpt_pass_len < 1) {
                input = $('<p class="error_fade" id="error_text_len">Votre mot de passe est trop court (8 lettres minimum).</p>');
                $(input).insertAfter('.pass2_div');
                input.hide();
                input.fadeIn(1000);
                cpt_pass_len++;
            }
        }
        else {
            $("#error_text_len").remove();
            cpt_pass_len = 0;
        }
        if (pass1 != pass2) {
            if (cpt_pass_same < 1) {
                input = $('<p class="error_fade" id="error_text_same">Les mots de passes ne correspondent pas.</p>');
                $(input).insertAfter('.pass2_div');
                input.hide();
                input.fadeIn(1000);
                cpt_pass_same++;
            }
        }
        else {
            $("#error_text_same").remove();
            cpt_pass_same = 0
        }
        return false;
    }
    else {
        $("#error_text_same").remove();
        $("#error_text_len").remove();
        $("#error_user_len").remove();
        $("#error_field").remove();
    }

    var hash = EncryptPass(pass1);

    var formData = username + ':' + email + ':' + hash;

   $.ajax(
    {
        url: "http://localhost:8080/?/signup",
        type: "post",
        async: false,
        data: formData,
        success: function(response){
            if (response == "OK USER REGISTER") {
                // create cookie
                $("#error_signup_login").remove();
                error_signup_login = 0;
                $("#error_signup_mail").remove();
                error_signup_mail = 0;
                location.href = "http://localhost:8080/dashboard"
            }
            else {
                if (response == "KO LOGIN") {
                    if (error_signup_login < 1) {
                       input = $('<p class="error_fade" id="error_signup_login">Ce nom de compte est déjà utilisé.</p>');
                       input.insertAfter('.pass2_div');
                       input.hide();
                       input.fadeIn(1000);
                       error_signup_login++;
                    }
                }
                else {
                    $("#error_signup_login").remove();
                    error_signup_login = 0
                }    
                if (response == "KO MAIL") {
                    if (error_signup_mail < 1) {
                        input = $('<p class="error_fade" id="error_signup_mail">Cette adresse email est déjà utilisée.</p>');
                        input.insertAfter('.pass2_div');
                        input.hide();
                        input.fadeIn(1000);
                        error_signup_mail++;
                    }
                }
                else {
                    $("#error_signup_mail").remove();
                    error_signup_mail = 0
                }      
            }
        }
    })
});

$("#signup_form").submit(function(e) {
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
