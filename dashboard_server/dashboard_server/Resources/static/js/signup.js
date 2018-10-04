var button = document.getElementById("signup_button");
var cpt_user_len = 0;
var cpt_pass_len = 0;
var cpt_pass_same = 0;


$("#signup_button").click(function () {
    var username = $('#signup_username').val();
    var email = $('#signup_email').val();
    var pass1 = $('#signup_pass1').val();
    var pass2 = $('#signup_pass2').val();

    if (pass1.length < 8 || pass1 != pass2 || username.length < 6) {
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

    var formData = username + ':' + email + ':' + pass1;
    console.log(formData);
    $.post("http://10.18.207.77:8080/?/signup", {
        data: formData
    })
});

$("#signup_form").submit(function (e) {
    e.preventDefault();
});