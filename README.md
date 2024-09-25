# 🚀 Proyecto Complejo en Node.js con Autenticación JWT y Frontend Portafolio 📂

Bienvenido a **Mi Proyecto Complejo** desarrollado en **Node.js**, que incluye autenticación mediante **JWT** y una arquitectura avanzada de frontend y backend. Este sistema abarca:

- 🔐 **Autenticación de Usuarios**: Gestión de usuarios con **JSON Web Tokens**.
- 🖥️ **Portafolio Personal**: Un sitio web donde se presentan tus habilidades y experiencia profesional, desarrollado en **HTML5, CSS3 y JavaScript**.
- 🖼️ **Galería Administrativa**: Un sistema interno administrativo desarrollado en **Vue.js**, accesible desde tu portafolio mediante un enlace.

Este proyecto está pensado para ser una plataforma integral que no solo gestiona usuarios, sino que también muestra tus capacidades profesionales y permite la administración interna mediante una interfaz dinámica en Vue. Todo está estructurado para desplegarse en **Vercel** de manera eficiente y escalable.

---

## 🛠️ Estructura del Proyecto

- **Backend:**
  - 🔧 Desarrollado en **Node.js** con **Express**.
  - 🔐 Autenticación mediante **JWT** para la seguridad.
  - 📚 Documentación de la API generada automáticamente con **Swagger**.
  - ✅ Pruebas unitarias y de integración utilizando **Jest** y **Supertest**.

- **Frontend:**
  - 🌐 **Portafolio Personal** en **HTML5/CSS3/JavaScript**: Presenta tus habilidades y experiencia.
  - 📊 **Galería Administrativa** en **Vue.js**: Sistema interno administrativo accesible desde el portafolio.

---

## 🛠️ Herramientas Utilizadas

| **Herramienta** | **Descripción** |
| --- | --- |
| 🟢 **Node.js** | Plataforma backend principal. |
| ⚙️ **Express** | Framework para el servidor. |
| 🔐 **JWT** | Sistema de autenticación seguro. |
| 📚 **Swagger** | Documentación de la API. |
| 🧪 **Jest** | Pruebas unitarias. |
| 🧪 **Supertest** | Pruebas de integración. |
| 🍃 **MongoDB** | Base de datos NoSQL. |
| 🖼️ **Vue.js** | Framework frontend para la galería. |
| 🚀 **Vite** | Herramienta de construcción y servidor de desarrollo. |
| 🌐 **HTML5/CSS3/JS** | Base del portafolio personal. |

---

## 📦 Comandos Principales

### 🖥️ Backend

- Instalar las dependencias del proyecto:
  ```bash
  npm install
  ```

- Iniciar el servidor backend:
  ```bash
  npm start
  ```

- Ejecutar las pruebas unitarias:
  ```bash
  npm test
  ```

### 🌐 Frontend: v-portafolio (Galería en Vue)

- Iniciar el servidor de desarrollo del proyecto Vue:
  ```bash
  npm run start-front
  ```

- Construir el proyecto para producción:
  ```bash
  npm run build-front
  ```

#### 📂 Proyecto HTML5: MiPortafolio

Este proyecto es servido de manera estática a través del servidor **Express**.

### 🔄 Comandos Combinados

- Ejecutar tanto el backend como el frontend al mismo tiempo:
  ```bash
  npm run start
  ```

---

## ⚙️ Configuración de Entorno

El archivo `.env` debe contener las siguientes variables:

```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/tu-base-datos
JWT_SECRET=tu_secreto_jwt
```

---

## 🚀 Despliegue

El proyecto está preparado para su despliegue en **Vercel** con configuraciones generales en el archivo de configuración, que maneja tanto el backend como el frontend.

---

## 📚 Documentación de la API

La documentación de la API es generada automáticamente con **Swagger** y se encuentra disponible en la siguiente URL una vez que la aplicación está en ejecución:

```
http://localhost:3000/api-docs
```

---

## ✅ Pruebas Unitarias

Para ejecutar las pruebas unitarias del backend, usa el siguiente comando:

```bash
npm test
```

Las pruebas están implementadas con **Jest** y **Supertest**.

---

## 🤝 Contribuir

1. Hacer un fork del repositorio.
2. Crear una nueva rama (`git checkout -b feature-nueva`).
3. Realizar los cambios y hacer commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Hacer push a la rama (`git push origin feature-nueva`).
5. Crear un Pull Request.

---

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
```
