import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb';

const ddbClient = new DynamoDBClient({});
const client = DynamoDBDocumentClient.from(ddbClient);

const TableName = process.env.TABLE_NAME;

export interface MyItem {
  pk: string;
  sk: string;
  name: string;
}

export const deleteItem = (pk: string, sk: string) => {
  const command = new DeleteCommand({ Key: { PK: pk, SK: sk }, TableName });
  return client.send(command);
};

export const getItem = (pk: string, sk: string) => {
  const command = new GetCommand({ Key: { pk, sk }, TableName });
  return client.send(command);
};

export const putItem = (item: MyItem) => {
  const command = new PutCommand({ Item: item, TableName });
  return client.send(command);
};

export const scanTable = () => {
  const command = new ScanCommand({
    TableName,
  });
  return client.send(command);
};
