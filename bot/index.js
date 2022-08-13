const tmi = require("tmi.js");
const { parseMessage } = require("./messageParser.js")
const opts = {
  identity: {
    username: '111cmPwincess',
    password: '96axqa3g9un7zmrastzbt8cq2e9ysn'
  },
  channels: [
    'happypea'
  ]
};

const client = new tmi.client(opts);
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

client.connect();

const botNames = ['bot', '111']
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  const message = parseMessage({target, context, msg, self});
  message && client.say(target, message);
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
