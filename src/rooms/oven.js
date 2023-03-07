import { ROOMS } from '../config/rooms';

/**
 * It's a function that takes an object with two properties, io and socket, and returns a function that
 * takes no arguments.
 *
 * The function that is returned is an event handler for the 'connection' event. It joins the socket to
 * the 'oven' room, and sets up event handlers for the 'oven:accept-order' and 'oven:finish-order'
 * events.
 *
 * The event handlers for those events emit events to the 'management_orders' and 'orders' rooms.
 */
export const ovenRoom = ({ io, socket }) => {
  socket.join(ROOMS.OVEN);

  socket.on('oven:accept-order', order => {
    // Update state of order
    io.to(ROOMS.MANAGMENT_ORDERS).emit('oven:accepted-order', order);
    io.to(ROOMS.ORDERS).emit('oven:accepted-order', order);
  });

  socket.on('oven:finish-order', order => {
    io.to(ROOMS.MANAGMENT_ORDERS).emit('oven:finished-order', order);
    io.to(ROOMS.ORDERS).emit('oven:finished-order', order);
  });
};
