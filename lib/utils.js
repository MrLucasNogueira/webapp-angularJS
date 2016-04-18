$(function () {
        var version = 'version 0.1.41 - by bracode.com.br';
        $('[data-toggle="tooltip"]').tooltip();
        $("#datepicker").datepicker({
            dateFormat: 'dd/mm/yy',
            dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
            dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
            monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            nextText: 'Próximo',
            prevText: 'Anterior',
            changeMonth: true,
            changeYear: true,
            yearRange: '-105:-18'
        });
        var enforceModalFocusFn = $.fn.modal.Constructor.prototype.enforceFocus;
        $.fn.modal.Constructor.prototype.enforceFocus = function () {};
        //            $confModal.on('hidden', function() {
        //                $.fn.modal.Constructor.prototype.enforceFocus = enforceModalFocusFn;
        //            });
        //            $confModal.modal({ backdrop : false });

        $("#alertSuccess").hide();
        $('#alertWarning').hide();
    });

    function hide(id) {
        //console.log("esconder alert : " + id);
        $(id).fadeOut('fast');
    };

    function show(id, timeToHide) {
        $(id).show();

        if (timeToHide) {
            setTimeout(function () {
                $(id).fadeOut('fast');
            }, timeToHide);
        }
    };