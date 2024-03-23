const qrcode = require("qrcode-terminal");
const { Client } = require("whatsapp-web.js");
const { runChat } = require("./Gemini.js");
const client = new Client();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});
client.on("ready", () => {
  console.log("Client is ready!");
});
client.on("message", async (message) => {
  if (message.from !== "status@broadcast") {
    const response = await runChat(message.body);
    await message.reply(response);
  }
});

client.initialize();

