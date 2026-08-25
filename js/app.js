/* ============================================================
   app.js
   1. Registra el Service Worker (codigo del guion de la practica).
   2. Muestra un aviso cuando el dispositivo pierde la conexion.
   ============================================================ */

(function () {

    if ('serviceWorker' in navigator) {
        location.protocol === 'http:' && navigator.serviceWorker;
        navigator.serviceWorker
            .register('./service-worker.js')
            .then(function () {
                console.log('Service Worker Registered');
            }, function (err) {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err);
            });
    }

})();


/* ------------------------------------------------------------
   Aviso de conexion.
   navigator.onLine indica si el navegador tiene red.
   Los eventos 'online' y 'offline' avisan cuando esto cambia.
   ------------------------------------------------------------ */

(function () {

    function actualizarAviso() {
        var aviso = document.getElementById('avisoOffline');
        if (!aviso) {
            return;
        }
        aviso.style.display = navigator.onLine ? 'none' : 'block';
    }

    window.addEventListener('online', actualizarAviso);
    window.addEventListener('offline', actualizarAviso);
    document.addEventListener('DOMContentLoaded', actualizarAviso);

})();
