const AWS = require('aws-sdk');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

AWS.config.update({
  region: process.env.AWS_REGION || 'ap-northeast-1',
  endpoint: 'http://localhost:8000',
});
const docClient = new AWS.DynamoDB.DocumentClient();

const user = {
  /**
   * Return user data from username
   * @param {String} username
   */
  async getByUsername(username) {
    const params = {
      TableName: 'Users',
      Key: {
        username,
      },
    };

    const data = await docClient.get(params).promise();
    if (Object.keys(data).length === 0) {
      return null;
    }

    return data.Item;
  },

  /**
   * Remove a user from username
   * @param {String} username
   */
  async removeByUsername(username) {
    const params = {
      TableName: 'Users',
      Key: {
        username,
      },
    };

    const data = await docClient.delete(params).promise();
    return data;
  },

  /**
   * Check if username is available and create user
   * @param {Object} userData
   */
  async register(userData) {
    const userTemp = await this.getByUsername(userData.username);
    if (userTemp) {
      throw new Error('Username is already taken');
    }

    const { username, password } = userData;
    const saltRounds = 10;

    const hash = bcrypt.hashSync(password, saltRounds);
    const params = {
      TableName: 'Users',
      Item: {
        password: hash,
        username,
      },
    };

    const data = await docClient.put(params).promise();
    return data;
  },

  /**
   * Check if user exist and create token
   * @param {Object} userData
   */
  async login(userData) {
    const userDB = await this.getByUsername(userData.username);
    if (!userDB) {
      throw new Error('Username does not exist');
    }

    const match = await bcrypt.compare(userData.password, userDB.password);

    if (match) {
      const payload = {
        username: userDB.username,
      };

      const token = jwt.sign(
        payload,
        process.env.TOKEN_SECRET || 'secretKey',
        { expiresIn: parseInt(process.env.TOKEN_EXPIRATION, 10) || 3600 },
      );

      return token;
    }
    throw new Error('Incorrect password');
  },

  /**
   * Get list of all users
   * @param {Object} userData
   */
  async getAll() {
    const params = {
      TableName: 'Users',
      ProjectionExpression: '#username, #password',
      ExpressionAttributeNames: {
        '#username': 'username',
        '#password': 'password',
      },
    };

    const data = await docClient.scan(params).promise();

    return data.Items;
  },
};

module.exports = user;
