abaseApp.factory('urlService', function(){
    
    function _domain(path){
        path = path || '';
        //var url = "http://mrlucasnogueira.esy.es/";
        var url = "http://localhost/abase/";
//        var url = "http://abaseassociacao.com.br/";
        //var url = "http://bracode.com.br/abase/";
        //var url = "http://abase.bracode.com.br/";
        return url + path + '';
        
    }
    
    function _api(path){
        path = path || '';
        //var linkServer = "http://192.168.0.105:8080/abase/api/";
        var urlApi = "http://45.55.30.8:8080/abase/api/";
        //var urlApi = "http://localhost:8080/abase/api/";
        //var urlApi = "http://abase-bracode.rhcloud.com/api/";
        return urlApi + path + '';
        
    }
    
    return{
        domain : _domain,
        api : _api
    };
});