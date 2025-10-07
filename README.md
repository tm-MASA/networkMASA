# Masa — Página informativa sobre la capa de ozono

Proyecto estático creado para replicar visualmente una página de estilo tipo National Geographic, usando colores negro/blanco/lila. Incluye footer editable, diseño responsive y contenido sobre la capa de ozono.

Archivos:
- `index.html` — página principal
- `styles.css` — estilos
- `script.js` — pequeñas interacciones (footer editable)
- `assets/ozone-placeholder.jpg` — imagen placeholder

Cómo ver:
1. Abrir `index.html` en tu navegador (doble clic o abrir con tu editor).

Notas:
- Tipografía: se usa Google Fonts `Roboto` como alternativa cercana.
- Puedes reemplazar `assets/ozone-placeholder.jpg` por cualquier imagen real.

GitHub Pages
---------------
Este repositorio está listo para publicar con GitHub Pages. Si activas Pages en la rama `main` (root), el sitio se servirá en una URL pública como:

	https://tm-MASA.github.io/networkMASA/

He configurado el repositorio y activado Pages automáticamente desde esta máquina. Si quieres usar un dominio personalizado, añade un archivo `CNAME` en la raíz con tu dominio.

Créditos de imágenes
-------------------
Las imágenes usadas en este proyecto son ejemplos descargados desde Unsplash (uso permitido). Si deseas usar imágenes con créditos específicos, reemplázalas en la carpeta `assets/` y actualiza los pies de foto en `articles/`.

Sitemap
-------
Se añadió un `sitemap.xml` en la raíz para ayudar a indexar las páginas del sitio.

Formularios (Formspree)
-----------------------
El formulario de contacto está configurado para enviar a Formspree. La URL actual configurada es `https://formspree.io/f/xnngbdge`. Las respuestas llegarán a la cuenta asociada a ese endpoint.

Probar el formulario
--------------------
Para probar el envío desde tu máquina (sin usar la UI), puedes ejecutar una petición POST de prueba desde PowerShell:

	Invoke-RestMethod -Uri 'https://formspree.io/f/xnngbdge' -Method Post -Body @{ name='Test'; email='test@example.com'; message='Mensaje de prueba' }

Si todo funciona verás una respuesta exitosa (código 200/201) y el formulario en la UI mostrará el mensaje de confirmación.

Información de la empresa
------------------------
La página `who.html` contiene información estática sobre el proyecto y cómo colaboramos. Antes existía una pequeña interfaz para guardar información localmente, pero ahora la sección es estática. Para añadir información permanente, edita `who.html` directamente o implementa un backend.
