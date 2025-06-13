const express = require('express');
const { dynamoDB, sqs, USERS_TABLE, QUEUE_URL } = require('./aws');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  const user = { id: Date.now().toString(), name, email };

  // await dynamoDB.put({
  //   TableName: USERS_TABLE,
  //   Item: user,
  // }).promise();

  await sqs.sendMessage({
    QueueUrl: QUEUE_URL,
    MessageBody: JSON.stringify(user),
  }).promise();

  res.status(201).json(user);
});

app.get('/users', async (req, res) => {
  const result = await dynamoDB.scan({ TableName: USERS_TABLE }).promise();
  res.json(result.Items);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
