import { HttpApi, HttpMethod } from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import {
  App,
  CfnOutput,
  Duration,
  RemovalPolicy,
  Stack,
  StackProps,
} from 'aws-cdk-lib';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Architecture } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';

export class SourceMapsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const table = new Table(this, 'SourcemapTable', {
      billingMode: BillingMode.PAY_PER_REQUEST,
      partitionKey: { name: 'pk', type: AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY,
      sortKey: { name: 'sk', type: AttributeType.STRING },
    });

    const lambdaProps = {
      architecture: Architecture.ARM_64,
      bundling: { minify: true, sourceMap: true },
      environment: {
        NODE_OPTIONS: '--enable-source-maps',
        TABLE_NAME: table.tableName,
      },
      logRetention: RetentionDays.ONE_DAY,
      memorySize: 512,
      timeout: Duration.minutes(1),
    };

    const createFn = new NodejsFunction(this, 'CreateFn', {
      ...lambdaProps,
      entry: `${__dirname}/../fns/create.ts`,
    });

    const deleteFn = new NodejsFunction(this, 'DeleteFn', {
      ...lambdaProps,
      entry: `${__dirname}/../fns/delete.ts`,
    });

    const listFn = new NodejsFunction(this, 'ListFn', {
      ...lambdaProps,
      entry: `${__dirname}/../fns/list.ts`,
    });

    // Wrong permissions are applied here!
    table.grantWriteData(createFn);
    table.grantWriteData(deleteFn);
    table.grantReadData(listFn);

    const api = new HttpApi(this, 'SourcemapsApi');

    const createInt = new HttpLambdaIntegration('CreateInt', createFn);
    const deleteInt = new HttpLambdaIntegration('DeleteInt', deleteFn);
    const listInt = new HttpLambdaIntegration('ListInt', listFn);

    api.addRoutes({
      integration: createInt,
      methods: [HttpMethod.POST],
      path: '/',
    });

    api.addRoutes({
      integration: deleteInt,
      methods: [HttpMethod.DELETE],
      path: '/',
    });

    api.addRoutes({
      integration: listInt,
      methods: [HttpMethod.GET],
      path: '/',
    });

    new CfnOutput(this, 'HttpApiUrl', { value: api.apiEndpoint });
  }
}

const app = new App();

new SourceMapsStack(app, 'SourceMapsStack');
