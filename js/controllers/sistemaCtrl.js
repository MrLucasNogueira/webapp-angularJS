abaseApp.controller('sistemaCtrl', function($scope, urlService, checkAuthentication){ 

    function getLogin() {
        var _login = $('#form-login').val();
        var _password = $('#form-senha').val();

        return {
            login: _login,
            senha: _password
        }

    }
    function redirect(data){
        
        if (data.usuario.tipo == 'ADMIN') {
                window.location.href = urlService.domain("app.html#/sistema/admin");
        } else if (data.usuario.tipo == 'ASSOCIADO') {
            window.location.href = urlService.domain("app.html#/sistema/associado");
        } else if (data.usuario.tipo == 'CONVENIADO') {
            window.location.href = urlService.domain("app.html#/sistema/conveniado");
        }
        
    };
    
    $scope.logar = function(){

        checkAuthentication.validateLog(getLogin())
        .success(function(data){
            checkAuthentication.setCookies(getLogin());
            redirect(data);
        })
        return false;
        
    }
    
    function check(){
    
        checkAuthentication.validateLog(checkAuthentication.getCookies())
        .success(function(data){
            console.log(data);
            redirect(data);
        })
        
    };
 
//    $scope.hideNotification = function(){
//        console.log("call");
//    }

});

//comprovantes de pagamento
//por pra funcionar o pagamento e averbação - ok
//imprimir a capa do associado - ok
//modificar senha admin - ok
//dar a opção de gerar relatórios - ok
