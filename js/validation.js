//var linkSistema = 'http://abaseassociacao.com.br/app.html#/';
var linkSistema = 'http://localhost/abase/app.html#/';
//var linkSistema = "http://abase.bracode.com.br/app.html#/";

//var linkServer = "http://107.170.253.172:8080/abase/api/";
//var linkServer = "http://localhost:8080/abase/api/";
//var linkServer = "http://45.55.30.8:8080/abase/api/";
var urlApi = "http://45.55.30.8:8080/abase-dev/api/";
//var linkServer = "http://192.168.0.105:8080/abase/api/";
//var linkServer = "http://abase-bracode.rhcloud.com/api/";
//console.log(window.location.hostname);

function getCookies() {

    var _id = $.cookie("id_abase");
    var _password = $.cookie("password_abase");

    return {
        login: _id,
        senha: _password
    }
};

function setCookies(authentication) {

    $.cookie("password_abase", authentication.senha);
    $.cookie("teste", "teste");
    $.cookie("id_abase", authentication.login);

};

function getLogin() {
    var _id = $('#id').val();
    var _password = $('#password').val();

    return {
        login: _id,
        senha: _password
    }

}

function validateLog(authentication) {
    //console.log('fazendo requisição');
    //console.log(authentication);
    return $.ajax({
        type: "GET",
        headers: authentication,
        url: urlApi + "logar"
    });

}

function loginValidate() {

    $("#btn-login").click(function (event) {
        event.preventDefault();
    });


    var authentication = getLogin();

    validateLog(authentication)
        .done(function (data) {
            //console.log(data);
            setCookies(authentication);

            if (data.usuario.tipo == 'ADMIN') {
                window.location.href = "app.html#/sistema/admin";
            } else if (data.usuario.tipo == 'ASSOCIADO') {
                window.location.href = "app.html#/sistema/associado";
            } else if (data.usuario.tipo == 'CONVENIADO') {
                window.location.href = "app.html#/sistema/conveniado";
            }

        }).fail(function () {
            $('#notificacao').show();
            setTimeout(function(){ $('#notificacao').hide(); }, 3000);

        });

};