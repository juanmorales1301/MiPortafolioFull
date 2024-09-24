### **README.md**

Este archivo documenta cómo utilizar la aplicación, los pasos para instalarla, ejecutarla y probarla.

```markdown
# API REST de Usuarios con Autenticación JWT

Se presenta una API REST para la gestión de usuarios, que utiliza autenticación con **JWT (JSON Web Token)** y está desarrollada en **Node.js** utilizando **Express**. La API está documentada con **Swagger** y se utilizan **Jest** para pruebas unitarias.

## Características

- Autenticación de usuarios con JWT.
- CRUD completo para gestionar usuarios.
- Protección de rutas con autenticación JWT.
- Documentación de la API con Swagger.
- Pruebas unitarias con Jest y Supertest.

## Requisitos

- Node.js v12 o superior
- npm o yarn
- MongoDB (local o en la nube, como MongoDB Atlas)

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/juanmorales1301/ProyectoNodeJS.git
```

2. Instalar las dependencias:

```bash
npm install
```

3. Crear el archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/tu-base-datos
JWT_SECRET=tu_secreto_jwt
```

4. Ejecutar la aplicación:

```bash
npm start
```

## Uso de la API

### Autenticación (Login)

```
POST /usuario/autentificar
```

Autentica al usuario y devuelve un token JWT.

#### Request Body:

```json
{
  "correoElectronico": "usuario@ejemplo.com",
  "contrasena": "123456"
}
```

#### Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Obtener todos los usuarios (Protegido)

```
GET /usuario
```

Retorna una lista de todos los usuarios registrados.

#### Headers:

```json
{
  "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Response:

```json
[
  {
    "nombre": "John",
    "apellido": "Doe",
    "correoElectronico": "john@doe.com"
  }
]
```

### Crear un nuevo usuario (Protegido)

```
POST /usuario
```

Crea un nuevo usuario.

#### Request Body:

```json
{
  "nombre": "Nuevo",
  "apellido": "Usuario",
  "correoElectronico": "nuevo@usuario.com",
  "contrasena": "123456",
  "telefono": "123456789",
  "direccion": "Calle Falsa 123"
}
```

#### Response:

```json
{
  "mensaje": "Usuario creado exitosamente"
}
```

## Documentación de la API

La documentación de la API se genera automáticamente con **Swagger** y está disponible en la siguiente URL:

```
http://localhost:6000/api-docs
```

## Pruebas unitarias

Para ejecutar las pruebas unitarias, se debe utilizar el siguiente comando:

```bash
npm test
```

Las pruebas están escritas utilizando **Jest** y **Supertest**.

## Contribuir

1. Hacer un fork del repositorio.
2. Crear una nueva rama (`git checkout -b feature-nueva`).
3. Realizar los cambios y hacer commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Hacer push a la rama (`git push origin feature-nueva`).
5. Crear un Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - consultar el archivo [LICENSE](LICENSE) para más detalles.
```