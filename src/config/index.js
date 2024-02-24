const { QUEUE_BASE_URL, ORDES_TABLE_NAME } = process.env;

const aws = {
  sqs: {
    queueBaseUrl: QUEUE_BASE_URL,
  },
  dynamo: {
    tableName: ORDES_TABLE_NAME,
  },
};

module.exports = {
  aws,
};
