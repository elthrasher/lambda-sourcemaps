import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';

import { getItem, putItem } from './db';

export const handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  if (!event.body) {
    throw new Error('Missing Payload!');
  }
  const input = JSON.parse(event.body);
  await putItem(input);
  const result = await getItem(input.pk, input.sk);
  return { body: JSON.stringify(result.Item), statusCode: 200 };
};
