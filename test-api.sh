#!/bin/bash

API_URL="http://localhost:3000"
NAME="Lucas"
EMAIL="lucas@example.com"

echo "🔁 Enviando usuário para a API..."
RESPONSE=$(curl -s -X POST "$API_URL/users" \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"$NAME\", \"email\": \"$EMAIL\"}")

echo "📤 Resposta da API (POST /users):"
echo "$RESPONSE"
echo

echo "⏳ Aguardando o worker processar a fila..."
sleep 5
echo

echo "📥 Buscando todos os usuários (GET /users)..."
USERS=$(curl -s "$API_URL/users")
echo

echo "📄 Lista de usuários no DynamoDB:"
echo "$USERS"
