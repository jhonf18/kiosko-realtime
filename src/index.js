import { createServer } from "http";
import { Server } from "socket.io";
import socketioAuth from "socketio-auth";
import { authenticateSocket } from "./authentication";
import { VARS } from "./config/vars";
import { kitchenRoom } from "./rooms/kitchen";
import { managmentRoom } from "./rooms/managmentOrders";
import { ordersRoom } from "./rooms/orders";
import { ovenRoom } from "./rooms/oven";

const httpServer = createServer(function (req, res) {
  res.writeHead(200);
  res.end("My first server!");
});
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

socketioAuth(io, {
  authenticate: authenticateSocket,
  postAuthenticate: async (socket) => {
    if (socket.user_data.user_role === "ROLE_OVEN_COOK") {
      ovenRoom({ io, socket });
    } else if (socket.user_data.user_role === "ROLE_KITCHEN_COOK") {
      kitchenRoom({ io, socket });
    } else if (socket.user_data.user_role === "ROLE_WAITER") {
      ordersRoom({ io, socket });
    } else if (socket.user_data.user_role === "ROLE_LEADER") {
      managmentRoom({ io, socket });
    }
  },
  disconnect: (socket) => {
    console.log(socket.id + " disconnected");
  },
});

httpServer.listen(VARS.PORT, () => {
  console.log("App running on port " + VARS.PORT);
});
