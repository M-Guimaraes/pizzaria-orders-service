const { insertItem } = require('../repository');
const { lambdaResponse } = require('../utils');

exports.handler = async (event) => {
    try {
        const [{ body }] = event.Records;
        const order = JSON.parse(body);
    
        await insertItem(order);
    
        return lambdaResponse(200, order);
      } catch (error) {
        console.error('ready > handler > error ', { error });
        return lambdaResponse(500, error.message);
      }
}