require('dotenv').config();
const fetch = require("node-fetch");

const Discord = require('discord.js');
const client = new Discord.Client();

const PS2endpoint ="http://census.daybreakgames.com/get/ps2:v2/"
const CharIDSearch = "/character/?name.first="
const ItemGet = "characters_item?character_id="
const ItemGetParams = "&c:limit=2000"



//startup 

//log in as this process
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.login(process.env.DISCORD_TOKEN);

//gather available commands
client.commands = new Discord.Collection();
const botCommands = require('./commands');

Object.keys(botCommands).map(key => {
  client.commands.set(botCommands[key].name, botCommands[key]);
});

//gather LoadoutManager commands
const loadCommands = require('./commands/LoadoutManager');

Object.keys(loadCommands).map(key => {
  client.commands.set(loadCommands[key].name, loadCommands[key]);
});


//list gathered commands in client
console.log(client.commands);



client.on('message', msg => {

    if(msg.author.id == process.env.CLIENT_ID) return;

    const args = msg.content.split(/ +/);
    const command = args.shift();
    console.info(`Called command: ${command}`);
  
    if (!client.commands.has(command)){
        msg.reply('Unknown Command please use !commandname or !help to list commands');
        return;
    } 
  
    try {
        client.commands.get(command).execute(msg, args);
        
    } catch (error) {
      console.error(error);
      msg.reply('there was an error trying to execute that command!');
    }

});
