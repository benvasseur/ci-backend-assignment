const AWS = require('aws-sdk');

AWS.config.update({
  region: process.env.AWS_REGION || 'ap-northeast-1',
  endpoint: 'http://localhost:8000',
});

const dynamodb = new AWS.DynamoDB();

const params = {
  TableName: 'Users',
};

dynamodb.deleteTable(params, (err) => {
  if (err) {
    console.error('Unable to delete table. Error JSON:', JSON.stringify(err, null, 2));
  } else {
    console.log('User table deleted');
  }
});
