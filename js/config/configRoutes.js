abaseApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider

    .when('/sistema/admin', {
        controller: 'adminCtrl',
        templateUrl: 'view/admin/home.html',
        resolve: {
            validation: function ($location, urlService) {
                var promise = $.ajax({
                        method: "GET",
                        async: false,
                        headers: {
                            login: $.cookie("id_abase"),
                            senha: $.cookie("password_abase")
                        },
                        url: urlService.api('logar')
                    })
                    .success(function (data) {
                        //console.log(data);
                        if (data.usuario.tipo === 'ADMIN') {
                            return data;
                        } else {
                            $location.path('/');
                        }
                    })
                    .error(function () {
                        $location.path('/');
                    })

            }
        }
    })
    
    .when('/sistema/admin/home', {
        controller: 'adminCtrl',
        templateUrl: 'view/admin/home.html',
        resolve: {
            validation: function ($location, urlService) {
                var promise = $.ajax({
                        method: "GET",
                        async: false,
                        headers: {
                            login: $.cookie("id_abase"),
                            senha: $.cookie("password_abase")
                        },
                        url: urlService.api('logar')
                    })
                    .success(function (data) {
                        //console.log(data);
                        if (data.usuario.tipo === 'ADMIN') {
                            return data;
                        } else {
                            $location.path('/');
                        }
                    })
                    .error(function () {
                        $location.path('/');
                    })

            }
        }
    })
    
    .when('/sistema/admin/financeiro', {
        controller: 'adminCtrl',
        templateUrl: 'view/admin/financeiro.html',
        resolve: {
            validation: function ($location, urlService) {
                var promise = $.ajax({
                        method: "GET",
                        async: false,
                        headers: {
                            login: $.cookie("id_abase"),
                            senha: $.cookie("password_abase")
                        },
                        url: urlService.api('logar')
                    })
                    .success(function (data) {
                        //console.log(data);
                        if (data.usuario.tipo === 'ADMIN') {
                            return data;
                        } else {
                            $location.path('/');
                        }
                    })
                    .error(function () {
                        $location.path('/');
                    })

            }
        }
    })

    .when('/sistema/admin/associado', {
        controller: 'adminCtrl',
        templateUrl: 'view/admin/associado.html',
        resolve: {
            validation: function ($location, urlService) {
                var promise = $.ajax({
                        method: "GET",
                        async: false,
                        headers: {
                            login: $.cookie("id_abase"),
                            senha: $.cookie("password_abase")
                        },
                        url: urlService.api('logar')
                    })
                    .success(function (data) {
                        //console.log(data);
                        if (data.usuario.tipo === 'ADMIN') {
                            return data;
                        } else {
                            $location.path('/');
                        }
                    })
                    .error(function () {
                        $location.path('/');
                    })
            }
        }
    })
    
    .when('/sistema/admin/conveniado', {
        controller: 'adminCtrl',
        templateUrl: 'view/admin/conveniado.html',
        resolve: {
            validation: function ($location, urlService) {
                var promise = $.ajax({
                        method: "GET",
                        async: false,
                        headers: {
                            login: $.cookie("id_abase"),
                            senha: $.cookie("password_abase")
                        },
                        url: urlService.api('logar')
                    })
                    .success(function (data) {
                        //console.log(data);
                        if (data.usuario.tipo === 'ADMIN') {
                            return data;
                        } else {
                            console.log('sem autorização');
                           // $location.path('/');
                        }
                    })
                    .error(function () {
                        console.log('sem resposta');
                        //$location.path('/');
                    })
            }
        }
    })
    
    .when('/sistema/conveniado', {
        controller: 'conveniadoCtrl',
        templateUrl: 'view/conveniado/home.html',
        resolve: {
            validation: function ($location, urlService) {
                var promise = $.ajax({
                        method: "GET",
                        async: false,
                        headers: {
                            login: $.cookie("id_abase"),
                            senha: $.cookie("password_abase")
                        },
                        url: urlService.api('logar')
                    })
                    .success(function (data) {
                        //console.log(data);
                        if (data.usuario.tipo === 'CONVENIADO') {
                            return data;
                        } else {
                            $location.path('/');
                        }
                    })
                    .error(function () {
                        $location.path('/');
                    })
            }
        }
    })

    .when('/sistema/associado', {
        controller: 'associadoCtrl',
        templateUrl: 'view/associado/home.html',
        resolve: {
            validation: function ($location, urlService) {
                var promise = $.ajax({
                        method: "GET",
                        async: false,
                        headers: {
                            login: $.cookie("id_abase"),
                            senha: $.cookie("password_abase")
                        },
                        url: urlService.api('logar')
                    })
                    .success(function (data) {
                        //console.log(data);
                        if (data.usuario.tipo === 'ASSOCIADO') {
                            return data;
                        } else {
                            $location.path('/');
                        }
                    })
                    .error(function () {
                        $location.path('/');
                    })
            }
        }
    })
    
    .when('/sistema',{
        templateUrl: 'view/sistema.html',
        controller: 'sistemaCtrl'
    })
    
    .otherwise({
        redirectTo: '/sistema'
    });
    
}]);