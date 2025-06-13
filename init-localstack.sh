#!/bin/bash

echo "⏳ Aguardando LocalStack estar pronto..."
until curl -s http://localhost:4566/_localstack/health | grep '"sqs": "available"' > /dev/null; do
  sleep 2
done
echo "✅ LocalStack está pronto!"

echo "📦 Criando fila SQS: UserQueue..."
awslocal sqs create-queue --queue-name UserQueue

echo "🗃️ Criando tabela DynamoDB: Users..."
awslocal dynamodb create-table \
  --table-name Users \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST

echo "✅ Recursos criados com sucesso."
