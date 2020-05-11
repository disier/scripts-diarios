function enableContextMenu(aggressive = true) {
    void (document.ondragstart = null);
    void (document.onselectstart = null);
    void (document.onclick = null);
    void (document.onmousedown = null);
    void (document.onmouseup = null);
    void (document.body.oncontextmenu = null);
    enableRightClickLight(document);
    if (aggressive) {
        enableRightClick(document);
        removeContextMenuOnAll('body');
        removeContextMenuOnAll('img');
        removeContextMenuOnAll('td');
    }
}

function removeContextMenuOnAll(tagName) {
    var elements = document.getElementsByTagName(tagName);
    for (var i = 0; i < elements.length; i++) {
        enableRightClick(elements[i]);
        enablePointerEvents(elements[i]);
    }
}

function enableRightClickLight(el) {
    el || (el = document);
    el.addEventListener('contextmenu', bringBackDefault, true);
}

function enableRightClick(el) {
    el || (el = document);
    el.addEventListener('contextmenu', bringBackDefault, true);
    el.addEventListener('dragstart', bringBackDefault, true);
    el.addEventListener('selectstart', bringBackDefault, true);
    el.addEventListener('click', bringBackDefault, true);
    el.addEventListener('mousedown', bringBackDefault, true);
    el.addEventListener('mouseup', bringBackDefault, true);
}

function restoreRightClick(el) {
    el || (el = document);
    el.removeEventListener('contextmenu', bringBackDefault, true);
    el.removeEventListener('dragstart', bringBackDefault, true);
    el.removeEventListener('selectstart', bringBackDefault, true);
    el.removeEventListener('click', bringBackDefault, true);
    el.removeEventListener('mousedown', bringBackDefault, true);
    el.removeEventListener('mouseup', bringBackDefault, true);
}

function bringBackDefault(event) {
    event.returnValue = true;
    (typeof event.stopPropagation === 'function') && event.stopPropagation();
    (typeof event.cancelBubble === 'function') && event.cancelBubble();
}

function enablePointerEvents(el) {
    if (!el) return;
    el.style.pointerEvents = 'auto';
    el.style.webkitTouchCallout = 'default';
    el.style.webkitUserSelect = 'auto';
    el.style.MozUserSelect = 'auto';
    el.style.msUserSelect = 'auto';
    el.style.userSelect = 'auto';
    enablePointerEvents(el.parentElement);
}

enableContextMenu();


function buscarlosTodos(){
    $('.ui-pg-selbox').val('150').change();

    setTimeout(function(){
        $('.iptDescripcion').val('Por favor');
        $('button[title=Buscar]').click();

        setTimeout(function(){
            noAplicaNinguno();
        }, 400);

    }, 500);
}

function noAplicaNinguno() {
    console.log('Quedan ' + $("td:contains('Por favor, evalÃºa')").length + ' evaluaciones');

    $($("td:contains('Por favor, evalÃºa')")[0]).click();

    setTimeout( function() {
        $("button[title='Abrir tarea']").click();

        setTimeout(function () {
            $("button[title='No Aplica']").click();

            setTimeout( function () {
                $('.popupObservacionesNoAplica ').find('textarea').val('Rellenado mediante script');
                $("span:contains('Aceptar')").click();

                setTimeout(function(){
                    $("span:contains('Aceptar')").click();

                    setTimeout(function(){
                        noAplicaNinguno();
                    }, 500);

                }, 100)

            }, 400)
        }, 400);
    }, 400);
}

//buscarlosTodos();


