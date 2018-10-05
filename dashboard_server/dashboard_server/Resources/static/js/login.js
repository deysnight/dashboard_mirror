var button = document.getElementById("login_button");


$("#login_button").click(function () {
    var username = $('#login_username').val();
    var pass1 = $('#login_pass1').val();

  

    var formData = username + ':' + pass1;
    console.log(formData);
    $.post("http://10.18.207.77:8080/?/login", {
        data: formData
    })
});

$("#login_form").submit(function (e) {
    e.preventDefault();
});