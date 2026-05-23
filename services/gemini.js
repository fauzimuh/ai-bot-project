const process = require('process');
require('dotenv').config();

const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

async function generateReply(
  history,
  persona,
  userMessage
) {

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    systemInstruction: persona
  });

  const chat = model.startChat({
    history
  });

  const result = await chat.sendMessage(userMessage);

  return result.response.text();
}

module.exports = {
  generateReply
};