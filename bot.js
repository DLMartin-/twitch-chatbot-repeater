
const tmi = require('tmi.js');
const env = require('dotenv').config();

//Define config options
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.BOT_OAUTH_TOKEN 
  },
  channels: [
    process.env.BOT_CHANNELS
  ]
};

//Create a client with our options
const client = new tmi.client(opts);


//Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
//
//Connect to Twitch
client.connect();

//Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
  if(self) return;

  //Remove whitespace
  const commandName = msg.trim();

  //If the command is known, execute it
  if(commandName === '!dice') {
    const num = rollDice();
    client.say(target, `You rolled a ${num}`);
    console.log(`Executed the command ${commandName}`);
  } else {
    console.log(`Unknown command ${commandName}`);
  }
}

function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
  spammer();
}

function spammer() {
  setTimeout(() => {
    client.say('ashinyacorn', 'Welcome to the watering hole. Come to wet your whistle?');
    spammer();
  }, 30 * 1000);
}

function rollDice() {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}
