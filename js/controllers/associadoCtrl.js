abaseApp.controller('associadoCtrl', function ($scope, restApi, urlService, checkAuthentication) {

    $scope.logout = function () {
        checkAuthentication.logout();
    };

    $scope.getData = function () {

        checkAuthentication.validateLog(checkAuthentication.getCookies())
            .success(function (data) {
                $scope.user = data;
                console.log($scope.user);
                $scope.setMatricula(data.matriculas[0]);
            })
            .error(function () {
                cosole.log('não foi possivel carregar dados');
            });

    }
    $scope.getData();

    $scope.setMatricula = function (matricula) {
        $scope.matricula = matricula;
    }

    $scope.showModalFaturaAssociado = function (fatura) {
        $scope.getData();
        $scope.faturaAssociado = fatura;
        $('#faturaAssociado').modal();
    }
    
     $scope.showModalMudarSenha = function () {

        $scope.userReset = $scope.user.usuario;
        console.log($scope.userReset);
        $('#mudarSenha').modal();

    }
     
    $scope.mudarSenha = function () {
        var user = {
            "login": $.cookie("id_abase"), 
            "senha": $scope.novaSenha
        }
        alert.show(false, "Aguarde Carregando");
        restApi.novaSenhaUsuario(user)
            .success(function (data) {
                //console.log(data);
                $('#resetUser').modal('hide');
                alert.hide();
                alert.show(false, "Nova Senha: " + data);
                $.cookie("password_abase", data);
            })
            .error(function () {
                alert.hide();
                alert.show(true, "Algo deu Errado", "Tente novamente mais tarde");
            })
    }

//    $scope.mudarSenha = function () {
//        alert.show(false, "Aguarde Carregando");
//        restApi.redefinirSenhaUsuário($scope.userReset)
//            .success(function (data) {
//                //console.log(data);
//                $('#resetUser').modal('hide');
//                alert.hide();
//                alert.show(false, "Nova Senha: " + data);
//            })
//            .error(function () {
//                alert.hide();
//                alert.show(true, "Algo deu Errado", "Tente novamente mais tarde");
//            })
//    }
});