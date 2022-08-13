import { NextApiRequest, NextApiResponse } from 'next'

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

let alive = false;

const client = new tmi.client(opts);
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

client.connect();


const botNames = ['bot', '111']
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot
  const response = parseMessage({target, context, msg, self});

  if(response) {
    client.say(target, response);
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
  alive = true
}


const handler = (req, res) => {
  try {
    if (alive) {
      res.status(200).json({ message: 'alive' })
    } else {
      res.status(200).json({ message: 'connecting' })
    }
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler

