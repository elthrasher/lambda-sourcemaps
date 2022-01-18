import { APIGatewayProxyResultV2 } from 'aws-lambda';

import { scanTable } from './db';

export const handler = async (): Promise<APIGatewayProxyResultV2> => {
  const result = await scanTable();
  return { body: JSON.stringify(result.Items), statusCode: 200 };
};
