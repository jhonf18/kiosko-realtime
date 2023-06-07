import { isValidToken } from "./utils/verifyToken";

/**
 * It takes a socket, a data object, and a callback. It then checks if the data object has a token
 * property. If it doesn't, it emits an error. If it does, it validates the token and if it's valid, it
 * sets the user_data property of the socket to the data returned from the token validation
 * @param socket - The socket object
 * @param data - { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYzY5YzY0ZjYxZjYwM
 * @param callback - A function that takes two parameters: error and success.
 * @returns The callback function is being returned.
 */
export const authenticateSocket = async (socket, data, callback) => {
  const { token } = data;
  
  if (!token) {
    // Emit error
    console.log(`Socket ${socket.id} unauthorized.`);
    return callback({ message: "INVALID TOKEN" });
  }

  try {
    const tokenValidationResult = await isValidToken(token);

    if (!tokenValidationResult.isValid) {
      console.log("Error to validated");
      console.log(`Socket ${socket.id} unauthorized.`);
      return callback({ message: "UNAUTHORIZED" });
    }

    socket.user_data = (await tokenValidationResult.dataPromise).data[0];

    return callback(null, true);
  } catch (err) {
    console.log("There a error: ", err);
    console.log(`Socket ${socket.id} unauthorized.`);
    return callback({ message: "UNAUTHORIZED" });
  }
};
