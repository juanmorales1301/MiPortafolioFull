const request = require('supertest');
const express = require('express');
const usuarioRoutes = require('../src/routes/modules/administracion/usuario.route');  // Ajusta la ruta según tu estructura
const UsControl = require('../src/controller/modules/administracion/usuario.control');  // Controlador de usuario
const authMid = require('../src/routes/middlewares/auth');  // Importa el middleware de autenticación

// Crear una instancia de la aplicación de Express para las pruebas
const app = express();
app.use(express.json());  // Soporte para JSON
app.use('/usuario', usuarioRoutes);  // Montar las rutas de usuario en /usuario

// Mock del middleware de autenticación
jest.mock('../src/routes/middlewares/auth', () => jest.fn((req, res, next) => next()));

// Mocks para el controlador y otras dependencias
jest.mock('../src/controller/modules/administracion/usuario.control');

describe('Pruebas para el módulo de Usuario', () => {

  // Prueba unitaria para la autenticación del usuario
  it('Debe autenticar al usuario y devolver un token', async () => {
    // Mock de la respuesta del controlador para autenticar usuario
    UsControl.autenticarUsuario.mockImplementation((req, res) => {
      res.status(200).json({ token: 'mockToken' });
    });

    const response = await request(app)
      .post('/usuario/autentificar')
      .send({
        correoElectronico: 'prueba@correo.com',
        contrasena: '123456'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body.token).toBe('mockToken');
  });

  // Prueba unitaria para obtener usuarios (requiere autenticación)
  it('Debe obtener la lista de usuarios con un token válido', async () => {
    // Mock de la respuesta del controlador para obtener usuarios
    UsControl.getUsuarios.mockImplementation((req, res) => {
      res.status(200).json([{ nombre: 'Usuario de prueba' }]);
    });

    const response = await request(app)
      .get('/usuario')
      .set('x-auth-token', 'validToken');  // Enviando token en la cabecera

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('nombre', 'Usuario de prueba');
  });

  // Prueba para crear un nuevo usuario
  it('Debe crear un nuevo usuario', async () => {
    UsControl.crearUsuario.mockImplementation((req, res) => {
      res.status(201).json({ mensaje: 'Usuario creado exitosamente' });
    });

    const response = await request(app)
      .post('/usuario')
      .set('x-auth-token', 'validToken')
      .send({
        nombre: 'Nuevo',
        apellido: 'Usuario',
        correoElectronico: 'nuevo@usuario.com',
        contrasena: '123456',
        telefono: '1234567890',
        direccion: 'Dirección de prueba'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('mensaje', 'Usuario creado exitosamente');
  });

  // Prueba para el error de autenticación
  it('Debe retornar un error 401 si las credenciales son incorrectas', async () => {
    UsControl.autenticarUsuario.mockImplementation((req, res) => {
      res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    });

    const response = await request(app)
      .post('/usuario/autentificar')
      .send({
        correoElectronico: 'incorrecto@correo.com',
        contrasena: 'contraseñaIncorrecta'
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('mensaje', 'Credenciales incorrectas');
  });
});
