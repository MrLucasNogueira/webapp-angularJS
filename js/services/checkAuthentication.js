abaseApp.factory('checkAuthentication', function(urlService, $location, $http){
    
    function _getCookies(){

        var _id = $.cookie("id_abase");
        var _password = $.cookie("password_abase");

        return {
            login : _id,
            senha : _password
        }
    };
    
    function _setCookies(authentication){
    
        $.cookie("password_abase", authentication.senha);
       // $.cookie("teste", "teste");
        $.cookie("id_abase", authentication.login);

    };

    function _validateLog(authentication){
        
        return $http({
            type: "GET",
            headers: authentication,
            url: urlService.api('logar')
        });
        
    }

    function _check(tipo){

        var authentication = _getCookies();
        _validateLog(authentication)
        .success(function(data){
            
            if(data.usuario.tipo === tipo){
                console.log('autenticado');
                return true;
            }else {
                console.log('não autenticado');
                return false;
            };
            
        })
        .error(function(){
            console.log('não tem resposta');
            return false;
        })

    };
    
    function _logout(){
        $.removeCookie('id_abase');
        $.removeCookie('password_abase');
        window.location.href = window.location.origin;
    }

 
    return{
        check : _check,
        logout : _logout,
        getCookies : _getCookies,
        setCookies : _setCookies,
        validateLog : _validateLog
    };
});