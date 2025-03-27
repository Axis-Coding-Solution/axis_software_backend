/**
 * Send response to client
  @param message Message to send to client
  @param data Data to send. default will be null
*/
const successfulResponse = (message: string, data = null) => {
  return {
    success: true,
    message,
    data,
  };
};
/** 
 * Send error response to client
  @param message Message to send to client
  @param data Data to send. default will be null
*/
const invalidResponse = (message: string, data = null) => {
  return {
    success: false,
    message,
    data,
  };
};

export { successfulResponse, invalidResponse };
