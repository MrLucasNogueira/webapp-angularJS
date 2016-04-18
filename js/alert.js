var alert = (function () {
    var isVisible = false;
    var timeOut;

    function _show(autoClose, title, message, time) {
        time = time | 3000;
        if (!title) title = "Sucesso";
        if (!message) message = "";
        if(autoClose === undefined) autoClose = true;

        if (!isVisible) {
            $("#notification-title").text(title);
            $("#notification-content").text(message);
            $("#alert").show();
            if (autoClose) {
                timeOut = setTimeout(function () {
                    _hide();
                }, time);
            }
            isVisible = true;
        }

    };

    function _hide() {
        clearTimeout(timeOut);
        if (isVisible) {
            $("#alert").hide();
            isVisible = false;
        }
    }

    return {
        show: _show,
        hide: _hide
    }
})();