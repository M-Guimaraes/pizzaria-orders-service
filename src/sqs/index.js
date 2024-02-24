const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs');

const sqsClient = new SQSClient({ region: 'us-east-1' });

exports.sendMessageToSQS = async (messageBody, queueUrl) => {
  try {
    const params = {
      QueueUrl: queueUrl,
      MessageBody: JSON.stringify(messageBody),
    };

    const command = new SendMessageCommand(params);
    const response = await sqsClient.send(command);

    console.info('queue > sendMessageToSQS > success', response);
  } catch (error) {
    console.error('queue > sendMessageToSQS > error', error);
  }
};
