abaseApp.controller('appCtrl', function($scope, urlService, checkAuthentication){

    function getLogin(){
        var _id = $('#id').val();
        var _password = $('#password').val();

        return {
            login : _id,
            senha : _password
        }

    }

    $scope.loginValidate =  function(){
        
//        $("#alertDanger").hide();
//        $('#alertWarning').show();
        
        var authentication = getLogin();

        checkAuthentication.validateLog(authentication)
        .done(function(data){
            console.log(data);
            checkAuthentication.setCookies(authentication);
            
//            if(data.usuario.tipo == 'ADMIN'){
//                window.location.href = urlService.domain("app.html#/admin");
//            }else if(data.usuario.tipo == 'ASSOCIADO'){
//                window.location.href = urlService.domain("app.html#/associado");
//            }else if(data.usuario.tipo == 'CONVENIADO'){
//                window.location.href = urlService.domain("app.html#/conveniado");
//            }
        }).fail(function (){
            console.log('fail');
//            $('#alertWarning').hide();
//            $("#alertDanger").show();
        });
        return false;
    };
    
});