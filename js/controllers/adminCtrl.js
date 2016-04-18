var version = "version 0.3.0";
abaseApp.controller('adminCtrl', function ($scope, restApi, urlService, checkAuthentication) {
    // funções auxiliares
    $scope.cleanModal = function () {
        $scope.associado = {};
        $scope.associadoInfo = {};
        $scope.associado = {};
        $scope.associado.contatos = [];
        $scope.associado.enderecos = [];
        $scope.associado.matriculas = [];

        $scope.conveniado = {};
        $scope.conveniado = {};
        $scope.conveniadoInfo = {};
        $scope.conveniado.contatos = [];
        $scope.conveniado.dadosBancarios = [];
        $scope.conveniado.responsavelByConveniado = {};
        $scope.conveniado.responsavelByConveniado.contatos = [];
        $scope.conveniado.enderecos = [];

        $scope.associado.taxaAssociativa = 25.0;
    };
    $scope.cleanModal();

    $scope.logout = function () { // sai da aplicação
        checkAuthentication.logout();
    };

    $scope.adressCompleteAssociado = function () { // completa o endereço via cep
        //if($scope.associado.enderecos[0].cep){

        var cep = $scope.associado.enderecos[0].cep || '';
        //console.log($scope.associado.enderecos);

        cep = cep.replace('-', '');
        if (cep.length === 8) {
            $.ajax({
                url: 'http://viacep.com.br/ws/' + cep + '/json/',
                type: 'GET'
            }).done(function (data) {
                $scope.associado.enderecos[0].logradouro = data.logradouro;
                $scope.associado.enderecos[0].bairro = data.bairro;
                $scope.associado.enderecos[0].cidade = data.localidade;
                $scope.associado.enderecos[0].uf = data.uf;
                //$('#tel').focus();
                $scope.$apply();
            }).fail(function () {
                console.log('error localizar cep');
            });
        }
        //}
    };

    $scope.adressCompleteConveniado = function () {
        //if($scope.associado.enderecos[0].cep){

        var cep = $scope.conveniado.enderecos[0].cep || '';
        //console.log($scope.associado.enderecos);

        cep = cep.replace('-', '');
        if (cep.length === 8) {
            $.ajax({
                url: 'http://viacep.com.br/ws/' + cep + '/json/',
                type: 'GET'
            }).done(function (data) {
                $scope.conveniado.enderecos[0].logradouro = data.logradouro;
                $scope.conveniado.enderecos[0].bairro = data.bairro;
                $scope.conveniado.enderecos[0].cidade = data.localidade;
                $scope.conveniado.enderecos[0].uf = data.uf;
                //$('#tel').focus();
                $scope.$apply();
            }).fail(function () {
                console.log('error localizar cep');
            });
        }
        //}
    };

    $scope.cadAssociado = function () {
        $scope.cleanModal();
        $('#cadAssociado').modal('show');
    };

    $scope.cadConveniado = function () { //chama modal de cadastro conveniado
        $scope.cleanModal();
        $('#cadConveniado').modal('show');
    };

    $scope.mensage = function (log, key) {
        console.log('Senha: ' + key);
        $('#text').empty();
        $('#text').append('Cadastro Realizado com sucesso.Login:' + log + ' Senha: ' + key)
        $('#confirmation').modal();
    };

    // Averbação
    $scope.checkValue = function () {

        console.log($scope.averbacao);
        $scope.averbacao.tabela = $scope.averbacao.tabela || 0.8;

        $scope.averbacao.valorDisponivel = ($scope.averbacao.valorAverbado - $scope.averbacao.taxaAssociativa) * $scope.averbacao.tabela;
        if ($scope.averbacao.valorDisponivel < 0 || $scope.averbacao.valorDisponivel == NaN) $scope.averbacao.valorDisponivel = 0;
    };

    $scope.showModalAverbacao = function () {

        $('#addAverbacao').modal();
        $scope.faturaAssociado.valorAAverbado = $scope.faturaAssociado.valorTotal;
        //console.log($scope.faturaAssociado);
    };

    $scope.showModalRedefinirSenha = function () {
        $('#redefinirSenha').modal('show');
    }

    $scope.showModalPagarConveniado = function (checkin) {
        $scope.checkinPagamento = checkin;
        console.log(checkin);
        $('#pagarConveniado').modal('show');
        $scope.faturaConveniado.comprovantePagamentoTemp = undefined;
    }

    $scope.saveAverbacao = function () {

        $scope.averbacaoToSend.valor = $scope.associadoAverbacao.valor,
            $scope.averbacaoToSend.faturaId = $scope.associadoAverbacao.id,
            $scope.averbacaoToSend.codMatricula = $scope.associadoAverbacao.codMatricula

        console.log($scope.averbacaoToSend);

        restApi.createAverbacao($scope.averbacaoToSend)
            .success(function (data) {
                $scope.associadosAReceber = data;
                $('#cadConveniado').modal('hide');
                //$scope.getAssociado($scope.associadoInfo);
            })
            .error(function () {
                //console.log('averbação não salva');
            });

    };

    //show modal
    $scope.showModalFaturas = function (fatura) {
        $scope.conveniadoPagamento = conveniado;
        $('#pagamentoConveniado').modal();
    };

    //Pagamento Conveniado
    $scope.pagamentoConveniado = function () {
        //console.log('mandar pro backEnd');
        restApi.payConveniado($scope.conveniadoPagamento)
            .success(function (data) {
                $scope.conveniadosAPagar = data;
            });
        console.log($scope.conveniadoPagamento);
    }

    // Associado Controller
    $scope.getAssociadosPendencias = function () {
        restApi.getAssociadosPendencias()
            .success(function (data) {
                $scope.associadosPendencias = data;
            });
    };

    $scope.getAssociadoPendencia = function (associado) {

        restApi.getAssociado(associado.id)
            .success(function (data) {
                $scope.associado = data;
                $('#cadAssociado').modal('show');

            });

    };

    $scope.checkDate = function () {

        if ($scope.associado.dataNascimento && $scope.associado.dataNascimento.slice(2, 3) !== '/' && $scope.associado.dataNascimento.slice(5) !== '/') {
            $scope.associado.dataNascimento = $scope.associado.dataNascimento.slice(0, 2) + '/' + $scope.associado.dataNascimento.slice(2, 4) + '/' + $scope.associado.dataNascimento.slice(4);
        }
    };

    $scope.createAssociado = function () {

        if ($scope.associado.contatos[0]) $scope.associado.contatos[0].tipo = 'TELEFONE';
        if ($scope.associado.contatos[1]) $scope.associado.contatos[1].tipo = 'EMAIL';

        var index = 0;
        $scope.associado.contatos.forEach(function (contato) {
            if (!contato) {
                $scope.associado.contatos.splice(index, 1);
            } else {
                index++;
            }
        });
        $scope.associado.tabela = $scope.associado.tabela || 0.2;

        alert.show(false, "Aguarde Carregando");
        restApi.createAssociado($scope.associado)
            .success(function (data) {

                alert.hide();
                alert.show(true, "Associado cadastrado com sucesso");
                $('#cadAssociado').modal('hide');
                $scope.cleanModal();
                $scope.getAssociados();

                if (data.usuario) {
                    $('#confirmation').modal('show');
                    $scope.login = data.usuario.login;
                    $scope.senha = data.usuario.senha;
                }
                setTimeout($scope.getAssociados(), 500);

            }).error(function (data) {
                alert.hide();
                alert.show(true, "Algo deu errado", data);
            });
        $scope.getAssociadosPendencias();

    };

    $scope.updateAssociados = function () {
        $scope.showAlert('Aguarde, atualizando dados.', 'warning');
        restApi.getAssociados()
            .success(function (data) {
                $scope.associados = data;
                $scope.showAlert('Dados atualizados com sucesso.', 'success');
            });
    };

    $scope.getAssociados = function () {
        alert.show(false, "Aguarde carregando");
        restApi.getAssociados()
            .success(function (data) {
                alert.hide();
                alert.show(true, "Associados carregados com suceso");
                $scope.associados = data;
            })
            .error(function () {
                alert.hide();
                alert.show(true, "Algo deu errado.", "Tente novamente mais tarde");
            })
    };

    $scope.setMatricula = function (matricula) {
        $scope.matricula = matricula;
    }

    $scope.getAssociado = function (associado) {

        alert.show(false, "Aguarde Carregando");
        restApi.getAssociado(associado.id)
            .success(function (data) {
                $scope.associadoInfo = data;
                $scope.setMatricula(data.matriculas[0]);
                alert.hide();
                alert.show(true, "Dados Carregados com Sucesso");
            })
            .error(function () {
                alert.hide();
                alert.show(true, "Algo deu Errado");
            });

    };

    $scope.createAverbacao = function () {
        if (!$scope.documentoNovaAverbacao) return false;

        var averbacao = {
            associadoId: $scope.associadoInfo.id,
            margem: $scope.margemDisponivel,
            tabela: $scope.tabela,
            taxaAssociativa: $scope.taxaAssociativa,
            valorLiberado: $scope.valorDisponivel,
            matricula: $scope.matricula,
            documento: $scope.documentoNovaAverbacao
        }

        restApi.createAverbacao(averbacao)
            .success(function (data) {
                $('#addAverbacao').modal('hide');
                $scope.getAssociado($scope.associadoInfo);
                console.log('averbação cadastrada com sucesso: ' + data);
            })
    };

    $scope.removeAssociado = function () {
        alert.show(false, "Aguarde Carregando");
        restApi.removeAssociado($scope.associadoInfo.id)
            .success(function (data) {
                $scope.associadoInfo = {};
                setTimeout($scope.getAssociados(), 2000);
                alert.hide();
                alert.show(true, "Associado Removido com Sucesso");
            })
            .error(function () {
                alert.hide();
                alert.show(true, "Algo deu Errado");
            });
    };

    $scope.editAssociado = function (associado) {

        $scope.associado = associado;
        $("#associadoTabela").val($scope.associado.tabela);
        $('#cadAssociado').modal('show');
    };

    $scope.showModalconfirmacao = function (method, parameter) {
        $scope.method = method;
        $scope.parameter = parameter;
        $("#confirmacao").modal('show');
    }

    $scope.execute = function () {
        $scope.method($scope.parameter);
        $("#confirmacao").modal('hide');
    }

    $scope.pagarCheckinFaturaConveniado = function (checkin) {
        alert.show(false, "Aguarde Carregado");
        restApi.pagarCheckinFaturaConveniado(checkin)
            .success(function (data) {
                $scope.faturaConveniado = data;
                alert.hide();
                alert.show(true, "Checkin Pago com Sucesso");
            })
            .error(function () {
                alert.hide();
                alert.show(true, "Algo deu Errado", "Tente novamente mais tarde");
            })
    }

    $scope.adiantarPagamentoCheckinFaturaConveniado = function (checkin) {
        restApi.adiantarPagamentoCheckinFaturaConveniado(checkin)
            .success(function (data) {
                if (data) $scope.faturaConveniado = data;
                alert.hide();
                alert.show(true, "Checkin Pago com Sucesso");
                $('#pagarConveniado').modal('hide');
            })
            .error(function () {
                alert.hide();
                alert.show(true, "Algo deu Errado", "Tente novamente mais tarde");
            })
    }

    $scope.excluirCheckinFaturaConveniado = function (checkin) {
        alert.show(false, "Aguarde, excluindo chekin")
        restApi.excluirCheckinFaturaConveniado(checkin.id)
            .success(function (data) {
                if (data) $scope.faturaConveniado = data;
                alert.hide();
                alert.show(true, "Checkin Excluído com Sucesso");
            })
            .error(function () {
                alert.hide();
                alert.show(true, "Algo deu Errado", "Tente novamente mais tarde");
            })
    }

    $scope.excluirCheckin = function (checkin) {
        alert.show(false, "Aguarde, excluindo chekin")
        restApi.removecheckin(checkin)
            .success(function (data) {
                if (data) $scope.faturaConveniado = data;
                alert.hide();
                $scope.faturaAssociado = data;
                alert.show(true, "Checkin Excluído com Sucesso");
            })
            .error(function () {
                alert.hide();
                alert.show(true, "Algo deu Errado", "Tente novamente mais tarde");
            })
    }

    $scope.removeAuxSaude = function (aux) {
        restApi.removeAuxSaude(aux)
            .success(function (data) {
                $scope.faturaAssociado = data;
                alert.hide();
                alert.show(true, "Auxílio Excluído com Sucesso");
                showModalFaturaAssociado($scope.faturaAssociado);
            })
            .error(function () {
                alert.hide();
                alert.show(true, "Algo deu Errado", "Tente novamente mais tarde");
            })
    }

    $scope.showModalFaturaConveniado = function (fatura) {

        alert.show(false, "Aguarde Carregando");
        restApi.getConveniadosFatura(fatura)
            .success(function (data) {
                //console.log(data);
                $scope.faturaConveniado = data;
                alert.hide();
                alert.show(true, "Fatura Carregada com Sucesso");
                $('#faturaConveniado').modal();
            })
            .error(function () {
                alert.hide();
                alert.show(true, "Algo deu Errado", "Tente novamente mais tarde");
            })


    }

    $scope.averbarFaturaAssociado = function (fatura) {
        //console.log(fatura);
        faturaAssociado.valorAAverbado = faturaAssociado.valorAAverbado.replace(",",".");

        alert.show(false, "Aguarde Carregando");
        restApi.averbarFaturaAssociado(fatura)
            .success(function (data) {
                $scope.faturaConveniado = data;
                alert.hide();
                alert.show(true, "Fatura averbada com sucesso");

                restApi.getAssociadosFaturasAbertas()
                    .success(function (data) {
                        $scope.AssociadoFaturasAbertas = data;
                    })

                restApi.getAssociadosFaturasAverbadas()
                    .success(function (data) {
                        $scope.AssociadoFaturasAverbadas = data;
                    })

                $('#addAverbacao').modal('hide');
                $('#faturaAssociado').modal('hide');
            })
            .error(function () {
                alert.hide();
                alert.show(true, "Algo deu Errado", "Tente novamente mais tarde");
            })


    }

    $scope.showModalFaturaAssociado = function (fatura) {
        //console.log(fatura);
        alert.show(false, "Aguarde Carregando");
        $scope.faturaAssociado = {};
        restApi.getAssociadoFatura(fatura)
            .success(function (data) {
                //console.log(data);
                $scope.faturaAssociado = data;
                alert.hide();
                alert.show(true, "Fatura Carregada com Sucesso");
                $('#faturaAssociado').modal();
            })
            .error(function () {
                alert.hide();
                alert.show(true, "Algo deu Errado", "Tente novamente mais tarde");
            })


    }

    $scope.showModalResetSenha = function (user) {

        if (user) {
            $scope.userReset = user;
        } else {
            var authentication = checkAuthentication.getCookies();
            checkAuthentication.validateLog(authentication)
                .success(function (data) {
                    $scope.userReset = data.usuario;
                    console.log(data);
                })
                .error(function (data) {
                    console.log(data);
                })
        }
        $('#resetUser').modal();

    }

    $scope.redefinirSenha = function () {
        alert.show(false, "Aguarde Carregando");
        restApi.redefinirSenhaUsuário($scope.userReset)
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

    $scope.mudarSenha = function (novaSenha, antigaSenha) {
        $.cookie("password_abase", antigaSenha);
        var user = {
            "login": $.cookie("id_abase"),
            "senha": novaSenha
        }
        console.log(user);
        alert.show(false, "Aguarde Carregando");
        restApi.novaSenhaUsuario(user)
            .success(function (data) {
                //console.log(data);
                $('#resetUser').modal('hide');
                alert.hide();
                alert.show(true, "Senha alterada com sucesso");
                $.cookie("password_abase", data);
            })
            .error(function () {
                alert.hide();
                checkAuthentication.logout();
                //alert.show(true, "Algo deu Errado", "Tente novamente mais tarde");
            })

    }

    $scope.getDadosAssociado = function () {
       
        var win = window.open("http://45.55.30.8:8080/abase-dev/api/associados/"+ $scope.associadoInfo.id +"/dadospessoais/pdf", '_blank');
        win.focus();  
    }

    $scope.atualizarFaturaConveniado = function () {
        console.log($scope.faturaConveniado);
        restApi.atualizarFaturaConveniado($scope.faturaConveniado)
            .success(function (data) {
                if (data && data !== "Fatura atualizada") $scope.faturaConveniado = data;
            })
            .error(function () {
                console.log("Error ao atualizar Fatura Conveniado");
            });

    }

    //files
    $scope.uploadFiles = function (id, list, callback) {

        var file_data = $("#" + id).prop('files')[0];
        var form_data = new FormData();
        form_data.append("file", file_data);

        alert.show(false, "Aguarde Carregando");
        restApi.sendFiles(form_data)
            .success(function (data) {
                if (data) list.push(data);
                callback();
                $scope.$apply();
                alert.hide();
                alert.show(true, "Arquivo salvo com sucesso");
            })
            .error(function (data) {
                alert.hide();
                alert.show(true, "Algo deu errado", data);
            });

    }

    $scope.removeFiles = function (list, file, callback) {

        for (var i = list.length - 1; i >= 0; i--) {
            if (list[i] === file) {
                list.splice(i, 1);
            }
        }

        callback();
    }

    $scope.uploadFile = function (id, file, att) {


        var file_data = $("#" + id).prop('files')[0];
        var form_data = new FormData();
        form_data.append("file", file_data);

        alert.show(false, "Aguarde Carregando");
        restApi.sendFiles(form_data)
            .success(function (data) {
                if (data) file[att] = data;
                $scope.$apply();
                alert.hide();
                alert.show(true, "Arquivo salvo com sucesso");
            })
            .error(function (data) {
                alert.hide();
                alert.show(true, "Algo deu errado", data);
            });

    };

    $scope.removeFile = function (file, att) {
        //console.log(file[att]);
        file[att] = undefined;

        //       alert.show(false, "Aguarde Carregando");
        //        restApi.removeFiles(file.id)
        //            .success(function () {
        //                        
        //                $scope.$apply();
        //                alert.hide();
        //                alert.show(true, "Arquivo removido com sucesso");
        //            })
        //            .error(function () {
        //                alert.hide();
        //                alert.show(true, "Algo deu errado", "Tente novamente mais tarde");
        //            })

    };

    $scope.loadFile = function (id) {
        $(id).click();
    }

    // Conveniado Controller
    $scope.createConveniado = function () {
        if ($scope.conveniado.responsavelByConveniado.contatos[0]) $scope.conveniado.responsavelByConveniado.contatos[0].tipo = 'TELEFONE';
        if ($scope.conveniado.responsavelByConveniado.contatos[1]) $scope.conveniado.responsavelByConveniado.contatos[1].tipo = 'EMAIL';

        alert.show(false, "Aguarde Carregando");
        restApi.createConveniado($scope.conveniado)
            .success(function (data) {
                alert.hide();
                alert.show(true, "Conveniado cadastrado com sucesso");
                $scope.conveniado = {};
                $('#cadConveniado').modal('hide');
                //console.log(data);
                if (data.usuario) {
                    //$scope.mensage(data.usuario.login, data.usuario.senha);
                    $('#confirmation').modal('show');
                    $scope.login = data.usuario.login;
                    $scope.senha = data.usuario.senha;
                }

                setTimeout($scope.getConveniados(), 500);
            })
            .error(function (data) {
                alert.hide();
                alert.show(true, "Algo deu errado", data);
            });
    };

    $scope.cadCheckin = function () {
        $('#cadCheckin').modal('show');
    }

    $scope.cadastrarCheckin = function (chekin) {

        $scope.chekin = {};
        alert.show(false, "Aguarde Carregando");
        restApi.cadastrarChekin(chekin)
            .success(function (data) {
                console.log(data);
                alert.hide();
                alert.show(true, "Checkin cadastrado com sucesso");
                $('#cadCheckin').modal('hide');
            })
            .error(function (data) {
                alert.hide();
                alert.show(true, "Algo deu Errado", data);
            });
    }

    $scope.updateConveniados = function () {
        restApi.getConveniados()
            .success(function (data) {
                $scope.conveniados = data;
            });
    };

    $scope.getConveniados = function () {

        alert.show(false, "Aguarde carregando");
        restApi.getConveniados()
            .success(function (data) {
                alert.hide();
                alert.show(true, "Conveniados carregado com sucesso");
                $scope.conveniados = data;
            })
            .error(function () {
                alert.hide();
                alert.show(true, "Algo deu Errado", "Tente novamente mais tarde");
            })
    };

    $scope.getConveniado = function (conveniado) {

        alert.show(false, "Aguarde Carregando");
        restApi.getConveniado(conveniado.id)
            .success(function (data) {
                //console.log(data);
                $scope.conveniadoInfo = data;
                alert.hide();
                alert.show(true, "Dados Carregados com Sucesso");
            })
            .error(function () {
                alert.hide();
                alert.show(true, "Algo deu Errado", "Tente novamente mais tarde");
            });
    };

    $scope.removeConveniado = function () {
        restApi.removeConveniado($scope.conveniadoInfo.id)
            .success(function (data) {
                $scope.conveniadoInfo = {};
                //$scope.showAlert('Conveniado Removido com Sucesso.', 'success');
                setTimeout($scope.getConveniados(), 2000);
            });
    };

    $scope.editConveniado = function () {
        $scope.conveniado = $scope.conveniadoInfo;
        $('#cadConveniado').modal('show');
    };

    //estatisticas

    $scope.chartsAssociados = function () {

        //console.log(window.location.href);
        //console.log(urlService.domain("app.html#/sistema/admin"));

        if (window.location.href === urlService.domain("app.html#/sistema/admin")) {
            var ctx = document.getElementById("myChart").getContext("2d");
            var data = {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "My First dataset",
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: [65, 59, 80, 81, 56, 55, 40]
                    },
                    {
                        label: "My Second dataset",
                        fillColor: "rgba(151,187,205,0.2)",
                        strokeColor: "rgba(151,187,205,1)",
                        pointColor: "rgba(151,187,205,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(151,187,205,1)",
                        data: [28, 48, 40, 19, 86, 27, 130]
                    }
                ]
            };

            var myLineChart = new Chart(ctx).Line(data, {
                responsive: true
            });
        }
    };

    $scope.getDadosEstatisticos = function () {

        restApi.getDadosEstatisticos()
            .success(function (data) {

                $scope.estatistica = data;

            });

    };

    $scope.chartsAssociados();

    $scope.getAssociadosPendencias();

    $scope.getDadosEstatisticos();

    //Aux Saúde

    $scope.createAuxSaudeModal = function () {
        //$scope.cleanModal();

        $('#liberarAuxSaude').modal('show');
    };

    $scope.createAuxSaude = function (auxilioSaude) {
        
        auxilioSaude.valor = auxilioSaude.valor.replace(",", ".");
        restApi.createAuxSaude(auxilioSaude)
            .success(function (data) {
                alert.hide();
                $('#liberarAuxSaude').modal('hide');
                alert.show(true, "Auxílio cadastrado com sucesso");
                auxilioSaude.valor = "";

            })
            .error(function (data) {
                alert.hide();
                if (data) {
                    alert.show(true, "Algo deu Errado", data);
                } else {
                    alert.show(true, "Algo deu Errado", "Tente novamente mais tarde");
                    console.log(data);
                }
            });

    }

    $scope.getFinanceiro = function () {
        //get financeiro conveniados
        restApi.getConveniadosFaturasComPedidoDeAdiantamento()
            .success(function (data) {
                $scope.FaturaConveniadoAdiantamento = data;
            })

        restApi.getConveniadosFaturasAbertas()
            .success(function (data) {
                $scope.FaturaConveniadoAberta = data;
            })

        restApi.getConveniadosFaturasFechadas()
            .success(function (data) {
                $scope.FaturaConveniadoFechada = data;
            })

        restApi.getConveniadosFaturaspagas()
            .success(function (data) {
                $scope.FaturaConveniadoPagas = data;
            })
        restApi.getConveniadosFaturasEmAlerta()
            .success(function (data) {
                $scope.FaturaConveniadoEmAlerta = data;
            })

        //get financeiro associados
        restApi.getAssociadosFaturasAbertas()
            .success(function (data) {
                $scope.AssociadoFaturasAbertas = data;
            })

        restApi.getAssociadosFaturasAverbadas()
            .success(function (data) {
                $scope.AssociadoFaturasAverbadas = data;
            })

        restApi.getAssociadosFaturasEmAlerta()
            .success(function (data) {
                $scope.AssociadoFaturasEmAlerta = data;
            })
        restApi.getAssociadosFaturasFechadas()
            .success(function (data) {
                $scope.AssociadoFaturasFechadas = data;
            })
        restApi.getAssociadosFaturasPagas()
            .success(function (data) {
                $scope.AssociadoFaturasPagas = data;
            })
    }

    $scope.validateDate = function () {

        var authentication = checkAuthentication.getCookies();
        checkAuthentication.validateLog(authentication)
            .success(function (data) {
                $scope.user = data.usuario;
                //console.log(data);
            })
            .error(function (data) {
                console.log(data);
            })

    }

    //chamadas
    if (window.location.hash === "#/sistema/admin/home") $scope.validateDate();

    if (window.location.hash === "#/sistema/admin/financeiro") $scope.getFinanceiro();

    if (window.location.hash === "#/sistema/admin/associado") $scope.getAssociados();

    if (window.location.hash === "#/sistema/admin/conveniado") $scope.getConveniados();

});