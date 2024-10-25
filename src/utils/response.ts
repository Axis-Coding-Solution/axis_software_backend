const successfulResponse = (message: string, data = null) => {
  return {
    success: true,
    message,
    data,
  };
};

const invalidResponse = (message: string) => {
  return {
    success: false,
    message,
  };
};

export { successfulResponse, invalidResponse };
