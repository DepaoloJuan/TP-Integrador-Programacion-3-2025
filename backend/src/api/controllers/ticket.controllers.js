import TicketModel from "../models/ticket.models.js";

/* ===================================================
   POST /api/tickets
   Crea un nuevo ticket y sus relaciones con productos
   Espera en req.body:
   - nombreUsuario: string
   - precioTotal: number
   - productos: array de IDs de productos
====================================================*/
export const createTicket = async (req, res) => {
  try {
    const { nombreUsuario, precioTotal, productos } = req.body;

    // Validaciones basicas
    if (
      !nombreUsuario ||
      !precioTotal ||
      !Array.isArray(productos) ||
      productos.length === 0
    ) {
      return res.status(400).json({
        message:
          "Datos inválidos. Debes enviar nombreUsuario, precioTotal y un array de productos",
      });
    }

    // 1) Insertamos el ticket principal
    const [ticketResult] = await TicketModel.insertTicket(
      nombreUsuario,
      precioTotal
    );

    const ticketId = ticketResult.insertId;

    // 2) Insertamos cada relacion producto-ticket
    for (let idProducto of productos) {
      await TicketModel.insertProductTicket(idProducto, ticketId);
    }

    return res.status(201).json({
      message: "Ticket registrado correctamente",
      ticketId,
    });
  } catch (error) {
    console.error("Error al crear ticket:", error.message);
    res.status(500).json({
      message: "Error al crear ticket",
    });
  }
};
