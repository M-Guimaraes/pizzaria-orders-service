const { sendMessageToSQS } = require('../sqs');
const { lambdaResponse } = require('../utils');
const { aws } = require('../config');


exports.handler = async (event) => {
  try {
    const [{ s3 }] = event.Records;
    const regex = /^([^\/]+)\/(\d+)-(\w+)$/;
    const match = s3.object.key.match(regex);

    const status = match[1];
    const messageBody = {
      id: match[2],
      customer: match[3],
      status,
    };

    await sendMessageToSQS(
      messageBody,
      `${aws.sqs.queueBaseUrl}/${status}-pizzaria`
    );

    return lambdaResponse(200, messageBody);
  } catch (error) {
    console.error('router > handler > error ', { error });
    return lambdaResponse(500, error.message);
  }
};
