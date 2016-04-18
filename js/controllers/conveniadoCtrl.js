abaseApp.controller('conveniadoCtrl', function ($scope, checkAuthentication, restApi) {

    $scope.getData = function () {

        checkAuthentication.validateLog(checkAuthentication.getCookies())
            .success(function (data) {
                $scope.user = data;
                //console.log($scope.user);
            })
            .error(function () {
                cosole.log('não foi possivel carregar dados');
            });

    }
    $scope.getData();

    $scope.cleanModal = function () {

    }

    $scope.descontarCheckinModal = function () {
        $scope.cleanModal();
        $('#descontarCheckin').modal('show');
    };

    $scope.logout = function () {
        checkAuthentication.logout();
    };

    $scope.createCheckin = function (checkin) {

        alert.show(false, "Aguarde...");
        restApi.createCheckin(checkin)
            .success(function () {
                alert.hide();
                alert.show(true, "Checkin Descontado com sucesso");
                $('#descontarCheckin').modal('hide');
                $scope.getData();
            })
            .error(function (data) {
                alert.hide();
                alert.show(true, "Error", data);
            });

    }

    $scope.setFatura = function (fatura) {
        $scope.fatura = fatura;
    }

    $scope.showModalFaturaConveniado = function (fatura) {
        
        $scope.getData();
        console.log(fatura);
        $scope.faturaConveniado = fatura;
        $('#faturaConveniado').modal();

    }

    $scope.adiantarPagamento = function (checkin) {
        alert.show(false, "Aguarde...");
        restApi.solicitarAdiantamentoPagamentoCheckin(checkin)
            .success(function () {
                alert.hide();
                alert.show(true, "Solicitação enviada com sucesso");
                $('#descontarCheckin').modal('hide');
            })
            .error(function (data) {
                alert.hide();
                alert.show(false, "algo deu errado", data);
            })
    }

    $scope.showModalMudarSenha = function () {
        $('#mudarSenha').modal('show');
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


});