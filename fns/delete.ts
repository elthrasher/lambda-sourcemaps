import { APIGatewayProxyResultV2 } from 'aws-lambda';

import { deleteItem } from './db';

export const handler = async (): Promise<APIGatewayProxyResultV2> => {
  const result = await deleteItem('1', '1');
  return { body: JSON.stringify(result), statusCode: 200 };
};
