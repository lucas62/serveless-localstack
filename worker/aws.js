const AWS = require('aws-sdk');

const LOCALSTACK_HOST = process.env.LOCALSTACK_HOST || 'localhost';
const USERS_TABLE = 'Users';
const QUEUE_NAME = 'UserQueue';
const QUEUE_URL = `http://${LOCALSTACK_HOST}:4566/000000000000/${QUEUE_NAME}`;

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: 'us-east-1',
  endpoint: `http://${LOCALSTACK_HOST}:4566`,
});

const sqs = new AWS.SQS({
  region: 'us-east-1',
  endpoint: `http://${LOCALSTACK_HOST}:4566`,
});

module.exports = {
  dynamoDB,
  sqs,
  USERS_TABLE,
  QUEUE_NAME,
  QUEUE_URL,
};
