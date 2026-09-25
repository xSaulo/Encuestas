# Encuesta de Servicio al Cliente

Encuesta de 5 preguntas hecha con React + TypeScript + Tailwind CSS (Vite). Las respuestas se envían por correo a **scalvo2910@gmail.com** mediante [FormSubmit](https://formsubmit.co), sin necesidad de backend, por lo que funciona en GitHub Pages.

## Desarrollo

```bash
npm install
npm run dev
```

## Activar el envío de correos (solo una vez)

1. Ejecuta la app y envía una encuesta de prueba.
2. FormSubmit enviará un correo de **activación** a `scalvo2910@gmail.com`. Haz clic en "Activate Form".
3. A partir de ahí, cada respuesta llegará al correo.

> Opcional: tras activar, FormSubmit te envía un alias aleatorio (p. ej. `a1b2c3...`). Puedes reemplazar el correo en `src/config.ts` por ese alias para no exponer la dirección en el código.

## Publicar en GitHub Pages

1. Sube el repositorio a GitHub (rama `main`).
2. En el repositorio: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Cada `push` a `main` compila y publica automáticamente (`.github/workflows/deploy.yml`).

La URL será `https://<usuario>.github.io/<repositorio>/`.

## Personalizar

- Preguntas: `src/questions.ts`
- Correo destino: `src/config.ts`
