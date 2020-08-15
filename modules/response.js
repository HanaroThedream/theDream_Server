module.exports = {
  success: (res, status, message, data) => {
    res.status(status).json({
      status: status,
      success: true,
      message: message,
      data: data,
    });
  },

  fail: (res, status, message) => {
    res.status(status).json({
      status: status,
      succecss: false,
      message: message,
    });
  },
};
