import { ROOMS } from '../config/rooms';

/**
 * When a user joins the orders room, listen for a 'create-order' event, and when it's received, emit
 * the order to the management orders room, and if the order has tickets for the kitchen or oven, emit
 * those tickets to the kitchen and oven rooms respectively.
 */
export const ordersRoom = ({ io, socket }) => {
  socket.join(ROOMS.ORDERS);

  socket.on('create-order', ({ order, tickets }) => {
    const ticketsOven = tickets.filter(ticket => ticket.sections.includes('HORNO'));
    const ticketsKitchen = tickets.filter(ticket => ticket.sections.includes('COCINA'));

    io.to(ROOMS.MANAGMENT_ORDERS).emit('new-order', order);

    if (ticketsKitchen.length > 0) {
      io.to(ROOMS.KITCHEN).emit('new-order', ticketsKitchen);
    }
    if (ticketsOven.length > 0) {
      io.to(ROOMS.OVEN).emit('new-order', ticketsOven);
    }
  });
};
