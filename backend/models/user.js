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
  const validRoles = ['Admin', 'Vendedor'];
  const rol = validRoles.includes(user.rol) ? user.rol : 'Admin';

  const sql = `INSERT INTO usuarios (documento, nombUsu, password, celular, rol) VALUES (?,?,?,?,?)`;
  
  db.query(sql, [
    user.documento,
    user.nombUsu,
    user.password,
    user.celular,
    rol
  ], (err, res) => {
    if (err) {
      console.log('Error al crear al Usuario: ', err);
      result(err, null);
    } else {
      result(null, { id: user.documento, ...user });
    }
  });
};

User.update = async (user, result) => {
  let fields = [];
  let values = [];

  if (user.password) {
    const hash = await bcrypt.hash(user.password, 10);
    fields.push("password = ?");
    values.push(hash);
  }
  if (user.nombUsu) {
    fields.push("nombUsu = ?");
    values.push(user.nombUsu);
  }
  if (user.celular) {
    fields.push("celular = ?");
    values.push(user.celular);
  }
  if (user.rol) {
    fields.push("rol = ?");
    values.push(user.rol);
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
}; // Added closing brace here!

User.delete = (id, result) => {
  const sql = `DELETE FROM usuarios WHERE documento = ?`;
  db.query(sql, [id], (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = User;