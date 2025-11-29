import connection from "../database/db.js";

/* ===================================================
   INSERTAR TICKET
   Inserta un nuevo ticket en la tabla "tikets"
   Recibe: nombreUsuario, precioTotal
   La fechaEmision se guarda con la fecha actual
====================================================*/
const insertTicket = (nombreUsuario, precioTotal) => {
  const sql = `
    INSERT INTO tikets (nombreUsuario, precioTotal, fechaEmision)
    VALUES (?, ?, CURDATE())
  `;

  // Devolvemos la promesa de la consulta
  return connection.query(sql, [nombreUsuario, precioTotal]);
};

/* ===================================================
   INSERTAR PRODUCTO-TICKET
   Inserta la relacion entre un producto y un ticket
   en la tabla "productos_tickets"
   Recibe: idProducto, idTicket
====================================================*/
const insertProductTicket = (idProducto, idTicket) => {
  const sql = `
    INSERT INTO productos_tickets (idProducto, idTicket)
    VALUES (?, ?)
  `;

  return connection.query(sql, [idProducto, idTicket]);
};

export default {
  insertTicket,
  insertProductTicket,
};
