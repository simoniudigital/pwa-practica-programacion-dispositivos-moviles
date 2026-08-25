# PWA IUDigital

Aplicación web progresiva desarrollada para la *Práctica PWA básica* del curso
Programación de Dispositivos Móviles — IU Digital de Antioquia.

## Estructura del proyecto

```
pwa/
├── index.html                 Página principal (navegación + contenido)
├── manifest.json              Manifiesto: nombre, colores e iconos de la app
├── service-worker.js          Cachea la app para que funcione sin internet
├── css/
│   ├── bootstrap-material-design.min.css
│   └── css.css                Estilos propios (colores institucionales)
├── js/
│   ├── app.js                 Registra el service worker
│   ├── jquery-3.2.1.slim.min.js
│   ├── popper.js
│   └── bootstrap-material-design.js
└── images/
    ├── iu-digital-logo.png    Logo de la barra de navegación
    └── icons/                 8 iconos (72 a 512 px) para instalar la app
```

## Cómo ejecutarla

Una PWA **no funciona abriendo el archivo con doble clic** (`file://`). El
service worker exige `http://` o `https://`. Desde esta carpeta, ejecuta:

```bash
python -m http.server 8000
```

Y abre en Chrome: <http://localhost:8000>

### Con XAMPP

También funciona. Copia la carpeta `pwa` dentro de `C:\xampp\htdocs`, inicia
**Apache** desde el panel de XAMPP y abre <http://localhost/pwa>.

> **Ojo con esta ruta.** El `service-worker.js` del guion tiene la variable
> `dataUrl = 'http://localhost/pwa'`. Cuando la app se sirve justamente en esa
> dirección, *todas* las peticiones caen en la rama de "primero la red", que en
> el código original no tiene respaldo. Resultado: al desconectar internet la
> aplicación no cargaba nada. Por eso se le agregó un `.catch()` que responde
> desde la caché. Sin ese arreglo, la demostración offline falla solo en XAMPP.

## Cómo compartirla con otras personas

| Forma | ¿Funciona la PWA? |
|---|---|
| Enviar la carpeta y que abran `index.html` con doble clic | Se ve el diseño, pero **no** hay service worker, ni modo offline, ni instalación. El navegador bloquea los service workers en `file://`. |
| Enviar la carpeta y que la abran con un servidor local (XAMPP, `python -m http.server`, o la extensión *Live Server* de VS Code) | Sí, completa. |
| Publicarla en internet (GitHub Pages, Netlify) | Sí, completa, y además se puede abrir e instalar desde el celular. |

Para el celular hace falta `https://`, así que la opción de publicarla es la
única que permite instalarla como app en un teléfono. Con GitHub Pages: sube
esta carpeta a un repositorio, entra en *Settings → Pages*, elige la rama
`main` y te queda una dirección `https://usuario.github.io/repositorio/`.

## Pasos para las capturas de pantalla del entregable

1. **La aplicación funcionando**
   Abre <http://localhost:8000>. Captura la página completa en el navegador.

2. **La navegación responsive**
   Presiona `F12`, luego el icono de móvil (`Ctrl + Shift + M`). Elige un
   dispositivo, por ejemplo *iPhone SE*. Captura el menú de hamburguesa
   cerrado y luego abierto.

3. **El service worker registrado**
   Con `F12` abierto, ve a la pestaña **Application** → **Service Workers**.
   Debe aparecer `service-worker.js` con el estado **activated and is running**.
   Captura esa pantalla.

4. **Los archivos en caché**
   En la misma pestaña **Application**, abre **Cache Storage** → `iudigital`.
   Verás los 18 archivos guardados. Captura la lista.

5. **La aplicación sin internet**
   En **Application** → **Service Workers**, marca la casilla **Offline**
   (o en la pestaña **Network**, cambia *No throttling* por *Offline*).
   Recarga con `F5`: la aplicación sigue cargando y aparece la franja roja
   *"Sin conexión a internet"*. Captura ese momento.

6. **La app instalable**
   En **Application** → **Manifest** aparecen el nombre, los colores y los
   8 iconos. En la barra de direcciones de Chrome se muestra el icono de
   instalar. Captura ambos.

## Nota al modificar el código

El service worker guarda los archivos en caché y los sirve desde ahí, así que
los cambios no se ven al recargar. Para verlos:

**Application** → **Storage** → botón **Clear site data**, y recarga.

Usa siempre ese botón. Borrar la caché "a mano" desde la consola no basta: el
service worker sigue registrado mientras la pestaña esté abierta, así que
quedarías con la app controlada por el worker pero sin archivos guardados, y el
modo offline fallaría sin motivo aparente.

## Créditos de las librerías

- [Bootstrap Material Design 4.1.1](https://fezvrasta.github.io/bootstrap-material-design/)
- [jQuery 3.2.1 slim](https://jquery.com/)
- [Popper.js 1.12.9](https://popper.js.org/)
