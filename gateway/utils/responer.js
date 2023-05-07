export const jsonError = (res, message, statusCode = 400) => {
  res.status(statusCode).json({
    status: false,
    errors: message
  });
};

export const jsonOK = (res, payload, message, statusCode = 200) => {
  res.status(statusCode).json({
    status: true,
    payload,
    message,
  });
};
