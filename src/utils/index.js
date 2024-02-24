exports.lambdaResponse = (code, message) => ({
  statusCode: code,
  body: JSON.stringify({ message }),
});
