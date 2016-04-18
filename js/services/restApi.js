abaseApp.factory('restApi', function ($http, urlService) {

    function getCookies() {

        var _id = $.cookie("id_abase");
        var _password = $.cookie("password_abase");

        return {
            'login': _id,
            'senha': _password
        }

    };

    //associados
    var _getAssociados = function () {
        return $http({
            url: urlService.api('associados'),
            headers: getCookies(),
            method: "GET"
        })
    };
    var _getAssociado = function (id) {
        return $http({
            url: urlService.api('associados/') + id,
            headers: getCookies(),
            contentType: "application/json",
            method: "GET"
        })
    };
    var _createAssociado = function (associado) {

        return $http({
            url: urlService.api('associados'),
            contentType: "application/json",
            headers: getCookies(),
            method: "PUT",
            data: associado
        })
    };
    var _removeAssociado = function (id) {
        return $http({
            method: "DELETE",
            url: urlService.api('associados/') + id,
            contentType: "application/json",
            headers: getCookies()
        })
    };

    //Conveniados
    var _getConveniados = function () {
        return $http({
            url: urlService.api('conveniados'),
            headers: getCookies(),
            method: "GET"
        })
    };
    var _getConveniado = function (id) {
        return $http({
            url: urlService.api('conveniados/') + id,
            headers: getCookies(),
            contentType: "application/json",
            method: "GET"
        })
    };
    var _createConveniado = function (conveniado) {

        return $http({
            url: urlService.api('conveniados'),
            contentType: "application/json",
            headers: getCookies(),
            method: "PUT",
            data: conveniado
        })
    };
    var _removeConveniado = function (id) {
        return $http({
            method: "DELETE",
            url: urlService.api('conveniados/') + id,
            contentType: "application/json",
            headers: getCookies()
        })
    };

    var _sendFiles = function (formData) {

        return $.ajax({
            url: urlService.api('arquivos'),
            type: 'POST',
            data: formData,
            headers: getCookies(),
            cache: false,
            contentType: false,
            processData: false,
        })

    }

    var _getFiles = function (id) {
        return $http({
            method: "GET",
            url: urlService.api('associados/documentos/') + id,
            contentType: "application/json",
            headers: getCookies()
        })
    };
    var _removeFiles = function (id) {
        return $http({
            method: "DELETE",
            url: urlService.api('associados/documentos/') + id,
            contentType: "application/json",
            headers: getCookies()
        })
    };

    var _removeAuxSaude = function (data) {
        return $http({
            method: "DELETE",
            url: urlService.api('associado/auxiliosaude/') + data.id,
            contentType: "application/json",
            headers: getCookies()
        })
    };

    var _removecheckin = function (data) {
        return $http({
            method: "DELETE",
            url: urlService.api('associado/checkin/') + data.id,
            contentType: "application/json",
            headers: getCookies()
        })
    };

    var _cadastrarChekin = function (chekin) {
        return $http({
            method: "PUT",
            url: urlService.api('associados/checkin'),
            contentType: "application/json",
            data: chekin,
            headers: getCookies()
        })
    }


    //averbação
    var _createAverbacao = function (averbacao) {
        return $http({
            method: "PUT",
            url: urlService.api('associados/averbacoes'),
            contentType: "application/json",
            data: averbacao,
            headers: getCookies()
        })
    }

    //estatisticas
    var _getAssociadosPendencias = function () {
        return $http({
            method: "GET",
            url: urlService.api('associados/compendencias'),
            contentType: "application/json",
            headers: getCookies()
        })
    };

    var _getDadosEstatisticos = function () {
        return $http({
            method: "GET",
            crossDomain: true,
            url: urlService.api('estatistica'),
            contentType: "application/json",
            headers: getCookies()
        })
    };

    //descontar checkin
    var _createCheckin = function (checkin) {
        return $http({
            method: "PUT",
            url: urlService.api('conveniados/checkin'),
            contentType: "application/json",
            data: checkin,
            headers: getCookies()
        })
    }

    //aux saude
    var _createAuxSaude = function (auxSaude) {
        return $http({
            method: "POST",
            url: urlService.api('associado/auxiliosaude'),
            contentType: "application/json",
            data: auxSaude,
            headers: getCookies()
        })
    }

    //Financeiro
    var _getFinanciasConveniado = function () {
        return $http({
            method: "GET",
            url: urlService.api('financias/conveniados'),
            contentType: "application/json",
            headers: getCookies()
        })
    };
    var _getFinanciasAssociado = function () {
        return $http({
            method: "GET",
            url: urlService.api('financias/associados'),
            contentType: "application/json",
            headers: getCookies()
        })
    };


    //Pagamento Conveniado
    var _payConveniado = function (auxSaude) {
        return $http({
            method: "POST",
            url: urlService.api('conveniados/pagamento'),
            contentType: "application/json",
            data: auxSaude,
            headers: getCookies()
        })
    }

    var _getDadosAssociado = function (id) {
        return $http({
            method: "GET",
            url: urlService.api('associados/' + id + '/dadospessoais/pdf '),
            contentType: "application/json",
            headers: getCookies()
        })
    };

    var _getConveniadosFaturasAbertas = function () {
        return $http({
            method: "GET",
            url: urlService.api('financeiro/conveniados/faturasabertas'),
            contentType: "application/json",
            headers: getCookies()
        })
    };

    var _getConveniadosFaturasFechadas = function () {
        return $http({
            method: "GET",
            url: urlService.api('financeiro/conveniados/faturasfechadas'),
            contentType: "application/json",
            headers: getCookies()
        })
    };
    
    var _getConveniadosFaturasComPedidoDeAdiantamento = function () {
        return $http({
            method: "GET",
            url: urlService.api('financeiro/conveniados/faturascompedidodeadiantamento'),
            contentType: "application/json",
            headers: getCookies()
        })
    };
    
    var _getConveniadosFaturaspagas = function () {
        return $http({
            method: "GET",
            url: urlService.api('financeiro/conveniados/faturaspagas'),
            contentType: "application/json",
            headers: getCookies()
        })
    };

    var _getAssociadosFaturasAbertas = function () {
        return $http({
            method: "GET",
            url: urlService.api('financeiro/matriculas/faturasabertas'),
            contentType: "application/json",
            headers: getCookies()
        })
    };
    
    var _getAssociadosFaturasEmAlerta = function () {
        return $http({
            method: "GET",
            url: urlService.api('financeiro/matriculas/faturasemalerta'),
            contentType: "application/json",
            headers: getCookies()
        })
    };
    
    var _getAssociadosFaturasAverbadas = function () {
        return $http({
            method: "GET",
            url: urlService.api('financeiro/matriculas/faturasaverbadas'),
            contentType: "application/json",
            headers: getCookies()
        })
    };
    
    var _getAssociadosFaturasFechadas = function () {
        return $http({
            method: "GET",
            url: urlService.api('financeiro/matriculas/faturasfechadas'),
            contentType: "application/json",
            headers: getCookies()
        })
    };
    
    var _getAssociadosFaturasPagas = function () {
        return $http({
            method: "GET",
            url: urlService.api('financeiro/matriculas/faturaspagas'),
            contentType: "application/json",
            headers: getCookies()
        })
    };

    var _getConveniadosFaturasEmAlerta = function () {
        return $http({
            method: "GET",
            url: urlService.api('financeiro/conveniados/faturasemalerta'),
            contentType: "application/json",
            headers: getCookies()
        })
    };

    var _getConveniadosFatura = function (data) {
        return $http({
            method: "GET",
            url: urlService.api('financeiro/conveniados/fatura/') + data.id,
            contentType: "application/json",
            headers: getCookies()
        })
    };

    var _getAssociadoFatura = function (data) {
        return $http({
            method: "GET",
            url: urlService.api('financeiro/matriculas/fatura/') + data.id,
            contentType: "application/json",
            headers: getCookies()
        })
    };

    var _pagarCheckinFaturaConveniado = function (data) {
        return $http({
            method: "PUT",
            url: urlService.api('financeiro/conveniados/pagamento/checkin/valortotal/') + data.id,
            contentType: "application/json",
            headers: getCookies()
        })
    };

    var _adiantarPagamentoCheckinFaturaConveniado = function (data) {
        return $http({
            method: "PUT",
            url: urlService.api('financeiro/conveniados/pagamento/checkin/valoradiantamento/') + data.id,
            contentType: "application/json",
            headers: getCookies()
        })
    };

    var _excluirCheckinFaturaConveniado = function (id) {
        return $http({
            method: "DELETE",
            url: urlService.api('financeiro/conveniados/faturas/removercheckin/') + id,
            contentType: "application/json",
            headers: getCookies()
        })
    };

    var _solicitarAdiantamentoPagamentoCheckin = function (data) {
        return $http({
            method: "PUT",
            url: urlService.api('conveniados/adiantamentocheckin/solicitar/') + data.id,
            contentType: "application/json",
            headers: getCookies()
        })
    };

    var _averbarFaturaAssociado = function (data) {
        return $http({
            method: "PUT",
            url: urlService.api('financeiro/matriculafatura'),
            data: data,
            contentType: "application/json",
            headers: getCookies()
        })
    };

    var _redefinirSenhaUsuário = function (data) {
        return $http({
            method: "PUT",
            url: urlService.api('admin/usuario/resetarsenha'),
            data: data,
            contentType: "application/json",
            headers: getCookies()
        })
    };


    var _atualizarFaturaConveniado = function (data) {
        return $http({
            method: "PUT",
            url: urlService.api('financeiro/conveniados/faturas'),
            data: data,
            contentType: "application/json",
            headers: getCookies()
        })
    }

    var _novaSenhaUsuario = function (data) {
        return $http({
            method: "PUT",
            url: urlService.api('usuario/novasenha'),
            data: data,
            contentType: "application/json",
            headers: getCookies()
        })
    }

    return {
        removecheckin: _removecheckin,
        removeAuxSaude: _removeAuxSaude,
        novaSenhaUsuario: _novaSenhaUsuario,

        atualizarFaturaConveniado: _atualizarFaturaConveniado,

        redefinirSenhaUsuário: _redefinirSenhaUsuário,
        averbarFaturaAssociado: _averbarFaturaAssociado,
        pagarCheckinFaturaConveniado: _pagarCheckinFaturaConveniado,
        adiantarPagamentoCheckinFaturaConveniado: _adiantarPagamentoCheckinFaturaConveniado,
        excluirCheckinFaturaConveniado: _excluirCheckinFaturaConveniado,

        getAssociados: _getAssociados,
        getAssociado: _getAssociado,
        removeAssociado: _removeAssociado,
        createAssociado: _createAssociado,
        sendFiles: _sendFiles,
        getFiles: _getFiles,
        removeFiles: _removeFiles,

        createAverbacao: _createAverbacao,

        getAssociadosPendencias: _getAssociadosPendencias,
        getDadosEstatisticos: _getDadosEstatisticos,

        getConveniados: _getConveniados,
        getConveniado: _getConveniado,
        removeConveniado: _removeConveniado,
        createConveniado: _createConveniado,

        createCheckin: _createCheckin,
        createAuxSaude: _createAuxSaude,

        getFinanciasConveniado: _getFinanciasConveniado,
        getFinanciasAssociado: _getFinanciasAssociado,

        payConveniado: _payConveniado,
        cadastrarChekin: _cadastrarChekin,

        getConveniadosFaturasAbertas: _getConveniadosFaturasAbertas,
        getConveniadosFaturasFechadas: _getConveniadosFaturasFechadas,
        getConveniadosFaturasComPedidoDeAdiantamento: _getConveniadosFaturasComPedidoDeAdiantamento,
        getConveniadosFaturaspagas: _getConveniadosFaturaspagas,
        getConveniadosFaturasEmAlerta: _getConveniadosFaturasEmAlerta,

        getAssociadosFaturasAbertas: _getAssociadosFaturasAbertas,
        getAssociadosFaturasEmAlerta: _getAssociadosFaturasEmAlerta,
        getAssociadosFaturasAverbadas: _getAssociadosFaturasAverbadas,
        getAssociadosFaturasFechadas: _getAssociadosFaturasFechadas,
        getAssociadosFaturasPagas: _getAssociadosFaturasPagas,

        getAssociadoFatura: _getAssociadoFatura,
        getConveniadosFatura: _getConveniadosFatura,

        solicitarAdiantamentoPagamentoCheckin: _solicitarAdiantamentoPagamentoCheckin,
        getDadosAssociado: _getDadosAssociado
    };

});