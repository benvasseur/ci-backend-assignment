const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
  region: process.env.AWS_REGION || 'ap-northeast-1',
  endpoint: 'http://localhost:8000',
});

const dynamodb = new AWS.DynamoDB();

const params = {
  TableName: 'Users',
  KeySchema: [
    {
      AttributeName: 'username',
      KeyType: 'HASH',
    }, // Partition key
  ],
  AttributeDefinitions: [
    {
      AttributeName: 'username',
      AttributeType: 'S',
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
};

dynamodb.createTable(params, (err) => {
  if (err) {
    console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2));
  } else {
    console.log('User table created');
  }
});
