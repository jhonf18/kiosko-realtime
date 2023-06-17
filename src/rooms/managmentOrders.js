import { ROOMS } from '../config/rooms';

/**
 * When a socket joins the managment room, it listens for the delete-order and close-order events, and
 * when it receives them, it emits the same event to the orders room and the kitchen room.
 */
export const managmentRoom = ({ io, socket }) => {
  socket.join(ROOMS.MANAGMENT_ORDERS);

  socket.on('delete-order', ({ order }) => {
    // Send order data and get tickets, will send order to managment orders room
    // and send tickets to sections
    io.to(ROOMS.ORDERS).emit('delete-order', { order });
    io.to(ROOMS.KITCHEN).emit('delete-order', { order });
    io.to(ROOMS.OVEN).emit('delete-order', { order });
  });

  socket.on('close-order', ({order }) => {
    io.to(ROOMS.ORDERS).emit('closed-order', {order } );
  });
};
