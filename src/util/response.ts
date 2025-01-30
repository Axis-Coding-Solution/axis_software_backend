const successfulResponse = (message: string, data = null) => {
  return {
    success: true,
    message,
    data,
  };
};

const invalidResponse = (message: string, data = null) => {
  return {
    success: false,
    message,
    data,
  };
};

export { successfulResponse, invalidResponse };
