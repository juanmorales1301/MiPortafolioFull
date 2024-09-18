require('dotenv').config();
const mysql = require('mysql2');
const { Pool } = require('pg');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

// Configuración para MYSQL
const mysqlConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    port: process.env.MYSQL_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: false
    }
};

// Configuración para PostgreSQL
const postgresConfig = {
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    ssl: {
        rejectUnauthorized: false
    }
};

// Configuración para MongoDB (MongoClient)
const mongodbConfig = {
    uri: process.env.MONGODB_URI,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
};

// Configuración para Mongoose
const mongooseUri = process.env.MONGOOSE_URI;

const mysqlPool = mysql.createPool(mysqlConfig).promise();
const postgresPool = new Pool(postgresConfig);
let mongoClient;

// Conexión a MongoDB usando MongoClient
const connectToMongoDB = async () => {
  if (!mongoClient) {
    mongoClient = new MongoClient(mongodbConfig.uri, mongodbConfig.options);
    await mongoClient.connect();
  }
  return mongoClient.db();
};

// Conexión a MongoDB usando Mongoose
const connectToMongoose = async () => {
  try {
    await mongoose.connect(mongooseUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB conectado con Mongoose');
  } catch (error) {
    console.error('Error conectando con MongoDB usando Mongoose:', error);
    throw error;
  }
};

module.exports = {
  mysqlPool,
  postgresPool,
  connectToMongoDB,
  connectToMongoose
};
