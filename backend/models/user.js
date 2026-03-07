const db = require('../config/config');
const bcrypt = require('bcryptjs');
const User = {};

User.findAll = (result) => {
  const sql = `SELECT documento, nombUsu, password, celular, rol FROM usuarios`;
  db.query(sql, (err, users) => {
    if (err) {
      console.log('Error al listar usuarios: ', err);
      result(err, null);
    } else {
      result(null, users);
    }
  });
};

User.findById = (documento, result) => {
  const sql = `SELECT documento, nombUsu, password, celular, rol FROM usuarios WHERE documento = ?`;
  db.query(sql, [documento], (err, user) => {
    if (err) {
      result(err, null);
    } else {
      result(null, user[0]);
    }
  });
};

User.create = async (user, result) => {
  console.log(`Data received: ${user}`)
  // const validRoles = ['Admin', 'Vendedor'];
  // const rol = validRoles.includes(user.rol) ? user.rol : 'Admin';

  const sql = `INSERT INTO usuarios (documento, nombUsu, password, celular, rol) VALUES (?,?,?,?,?)`;
  
  db.query(sql, [
    user.documento,
    user.nombUsu,
    user.password,
    user.celular,
    user.rol
  ], (err, res) => {
    if (err) {
      console.log('Error al crear al Usuario: ', err);
      res(err, null);
    } else {
      res(null, { documento: user.documento, ...user });
    }
  });
};

User.update = async (user, result) => {
  let fields = [];
  let values = [];

  if (user.nombUsu) {
    fields.push("nombUsu = ?");
    values.push(user.nombUsu);
  }
  if (user.password) {
    fields.push("password = ?");
    values.push(user.password);
  }
  if (user.celular) {
    fields.push("celular = ?");
    values.push(user.celular);
  }

  // We use documento as the identifier for the WHERE clause
  const sql = `UPDATE usuarios SET ${fields.join(", ")} WHERE documento = ?`;
  values.push(user.documento); 

  db.query(sql, values, (err, res) => {
    if (err) {
      console.log('Error al actualizar: ', err);
      result(err, null);
    } else {
      result(null, { documento: user.documento, ...user });
    }
  });
};

User.delete = (documento, result) => {
  const sql = `DELETE FROM usuarios WHERE documento = ?`;
  db.query(sql, [documento], (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = User;