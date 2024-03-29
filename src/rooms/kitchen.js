import { ROOMS } from '../config/rooms';

/**
 * When a socket joins the kitchen room, listen for the kitchen:accept-order and kitchen:finish-order
 * events and emit the kitchen:accepted-order and kitchen:finished-order events to the managment-orders
 * and orders rooms.
 */
export const kitchenRoom = ({ io, socket }) => {
  socket.join(ROOMS.KITCHEN);

  socket.on('kitchen:accept-order', ({ order, ticket }) => {
    // Update state of order
    io.to(ROOMS.MANAGMENT_ORDERS).emit('kitchen:accepted-order', { order, ticket });
    io.to(ROOMS.ORDERS).emit('kitchen:accepted-order', { order, ticket });
  });

  socket.on('kitchen:finish-order', ({order, ticket}) => {
    io.to(ROOMS.MANAGMENT_ORDERS).emit('kitchen:finished-order', { order, ticket });
    io.to(ROOMS.ORDERS).emit('kitchen:finished-order', { order, ticket });
  });
};
