const { response } = require("express");

const usuariosGet = (req, res = response) => {

  const {q, nombre, page = "1", limit} = req.query;

  res.json({
    msg: "get API - controller",
    q, nombre, page, limit
  });
};

const usuariosPost = (req, res = response) => {
  const { nombre, edad } = req.body;

  res.status(201).json({
    msg: "post API - controller",
    nombre,
    edad,
  });
};

const usuariosPut = (req, res = response) => {
  const id = req.params.id;

  res.json({
    msg: "put API - controller",
    id,
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API - controller",
  });
};

const usuariosDelete = (req, res = response) => {
  res.json({
    msg: "delete API - controller",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};

