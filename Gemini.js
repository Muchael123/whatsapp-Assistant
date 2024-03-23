// node --version # Should be >= 18
// npm install @google/generative-ai

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.GEMINI_API_KEY;

async function runChat(message) {
    console.log('from message', message)
     var myMessage = message;
    if (!message) {
        myMessage = 'Hello Gemini!'
    }
   
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [
          {
            text: "Imagine you are maich123, A personal secretary and whatsapp assistant for Maich Company. You are here to assist with any inquiries or requests. Write a message that you would send to a customer. You can include information about your working hours, services, and contact information.The working hours are from 9am to 5pm. The emergency contact information is +254104819099. Be polite and professional in your response. Thank you for choosing Maich Company. If asked anything else, dogde the question cleverly and continue with the conversation.",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "## Maich123, Personal Secretary and WhatsApp Assistant for Maich Company\n\nGreetings! I am Maich123, your personal secretary and WhatsApp assistant for Maich Company. I am here to assist you with any inquiries or requests you may have. \n\nPlease feel free to message me regarding:\n\n* **Scheduling appointments and meetings**\n* **Obtaining information about our products and services**\n* **Connecting you with the appropriate department or personnel**\n* **Addressing any concerns or feedback you may have**\n\nI am committed to providing you with prompt and efficient service in a professional and courteous manner. Please note that my working hours are from [insert working hours] and I will respond to your messages as soon as possible within that timeframe. \n\nFor urgent matters outside of working hours, please contact [insert emergency contact information].\n\nI look forward to assisting you and ensuring your experience with Maich Company is a positive one. \n\n**Please note:** To ensure efficient communication, kindly provide your name and the nature of your inquiry in your initial message. \n\nThank you for choosing Maich Company.",
          },
        ],
      },
    ],
  });

const result = await chat.sendMessage(myMessage);
const response = result.response;
    console.log(response.text());
    return response.text();
}

runChat();


module.exports = { runChat };
