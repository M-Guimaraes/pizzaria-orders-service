const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');
const { marshall } = require('@aws-sdk/util-dynamodb');
const { aws } = require('../config');

const client = new DynamoDBClient({ region: 'us-east-1' });

exports.insertItem = async (order) => {
  console.info('repository > insertItem > params', {
    id: order.id,
    status: order.status,
  });

  try {
    const params = {
      TableName: aws.dynamo.tableName,
      Item: marshall({
        pedido: order.id,
        cliente: order.customer,
        status: order.status,
        datetime: new Date().toISOString(),
      }),
    };
    const command = new PutItemCommand(params);

    const response = await client.send(command);
    console.info('repository > insertItem > success', response);
  } catch (error) {
    console.error('repository > insertItem > error', error);
  }
};
