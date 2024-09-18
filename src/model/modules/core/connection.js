const { mysqlPool, postgresPool, connectToMongoDB, connectToMongoose } = require('./config');
require('dotenv').config();
const dbType = process.env.DB_TYPE;

const convertQuestionMarksToDollarSigns = (sql) => {
  let index = 0;
  return sql.replace(/\?/g, () => `$${++index}`);
};

const queryWrapper = async (client, sql, params) => {
  if (dbType === 'postgres') {
    sql = convertQuestionMarksToDollarSigns(sql);
  }
  const result = await client.query(sql, params);
  return result.rows ? result.rows : result[0];
};

const getConnection = async () => {
  if (dbType === 'mysql') {
    const connection = await mysqlPool.getConnection();
    return {
      query: (sql, params) => queryWrapper(connection, sql, params),
      release: () => connection.release(),
      format: (sql, params) => connection.format(sql, params)
    };
  } else if (dbType === 'postgres') {
    const client = await postgresPool.connect();
    return {
      query: (sql, params) => queryWrapper(client, sql, params),
      release: () => client.release(),
      format: (sql, params) => {
        return sql.replace(/\?/g, (_, i) => `$${params[i - 1]}`); 
      }
    };
  } else if (dbType === 'mongodb') {
    const db = await connectToMongoDB();
    return {
      query: async (collectionName, query, options) => {
        const collection = db.collection(collectionName);
        return await collection.find(query, options).toArray();
      },
      insertOne: async (collectionName, data) => {
        const collection = db.collection(collectionName);
        return await collection.insertOne(data);
      },
      updateOne: async (collectionName, filter, update) => {
        const collection = db.collection(collectionName);
        return await collection.updateOne(filter, { $set: update });
      },
      deleteOne: async (collectionName, filter) => {
        const collection = db.collection(collectionName);
        return await collection.deleteOne(filter);
      },
      release: () => mongoClient.close()
    };
  } else if (dbType === 'mongoose') {
    const mongooseConnection = await connectToMongoose();
    return {
      connection: mongooseConnection,  // Devuelve la conexión pura de Mongoose para usar modelos
      close: () => mongooseConnection.connection.close()  // Método para cerrar la conexión de Mongoose
    };
  } else {
    throw new Error('Tipo de base de datos no soportada');
  }
};

const getOrCreate = async (connection, table, data, uniqueField) => {
  try {
    if (dbType === 'mongodb') {
      // Comprobar si el documento ya existe en MongoDB
      const existingDocument = await connection.query(table, { [uniqueField]: data[uniqueField] });
      if (existingDocument.length > 0) {
        return existingDocument[0];
      }

      // Insertar el documento si no existe
      const result = await connection.insertOne(table, data);
      data.id = result.insertedId;

      // Recuperar el documento insertado
      const newDocument = await connection.query(table, { [uniqueField]: data[uniqueField] });
      if (newDocument.length > 0) {
        return { ...data, ...newDocument[0] };
      }

      return data;
    } else if (dbType === 'mongoose') {
      const Model = connection.connection.model(table);  // Usar el modelo de Mongoose
      const existingDocument = await Model.findOne({ [uniqueField]: data[uniqueField] });
      if (existingDocument) {
        return existingDocument;
      }

      // Insertar el documento si no existe
      const newDocument = new Model(data);
      await newDocument.save();
      return newDocument;
    } else {
      // Lógica para MySQL y PostgreSQL
      const selectQuery = connection.format(`SELECT * FROM ${table} WHERE ${uniqueField} = ?`, [data[uniqueField]]);
      const rows = await connection.query(selectQuery);
      if (rows.length > 0) {
        return rows[0];
      }

      const insertQuery = connection.format(`INSERT INTO ${table} SET ?`, data);
      const result = await connection.query(insertQuery);
      data.id = result.insertId || result[0]?.id;

      const selectQuery2 = connection.format(`SELECT * FROM ${table} WHERE ${uniqueField} = ?`, [data[uniqueField]]);
      const rows2 = await connection.query(selectQuery2);
      if (rows2.length > 0) {
        return { ...data, ...rows2[0] };
      }

      return data;
    }
  } catch (error) {
    console.error(`Error en getOrCreate para la tabla ${table} con el campo ${uniqueField}:`, error);
    throw error;
  }
};

module.exports = {
  getConnection,
  getOrCreate
};
