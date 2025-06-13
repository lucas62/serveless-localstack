const { sqs, dynamoDB, QUEUE_URL, USERS_TABLE } = require('./aws');
const { v4: uuidv4 } = require('uuid');

// Log das variáveis de ambiente
console.log('🔧 Variáveis de ambiente do worker:', {
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION,
  LOCALSTACK_HOST: process.env.LOCALSTACK_HOST,
  QUEUE_NAME: process.env.QUEUE_NAME,
});

const processMessages = async () => {
  try {
    const data = await sqs.receiveMessage({
      QueueUrl: QUEUE_URL,
      MaxNumberOfMessages: 10,
      WaitTimeSeconds: 5,
    }).promise();

    if (data.Messages) {
      for (const message of data.Messages) {
        const body = JSON.parse(message.Body);
        const user = {
          id: uuidv4(),
          name: body.name,
          email: body.email,
        };

        await dynamoDB.put({
          TableName: USERS_TABLE,
          Item: user,
        }).promise();

        await sqs.deleteMessage({
          QueueUrl: QUEUE_URL,
          ReceiptHandle: message.ReceiptHandle,
        }).promise();

        console.log('✅ Usuário salvo no DynamoDB:', user);
      }
    } else {
      console.log('⌛ Nenhuma mensagem na fila.');
    }
  } catch (err) {
    console.error('❌ Erro ao processar mensagens:', err.message);
  }
};

const startWorker = async () => {
  console.log(`🚀 Worker iniciado. Aguardando mensagens da fila ${QUEUE_URL}`);
  setInterval(processMessages, 5000);
};

startWorker();
