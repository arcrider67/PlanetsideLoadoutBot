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

//list gathered commands in client
console.log(client.commands);



client.on('message', msg => {

    if(msg.author.id == process.env.CLIENT_ID) return;

    const args = msg.content.split(/ +/);
    const command = args.shift().toLowerCase();
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

/*
//when message detected in bot's channel
client.on('message', msg => {

    if (msg.content === 'ping') {
        msg.reply('pong');
    
        //check if the command is valid and it was not sent from this bot
    } else if (msg.content.includes("!check") && msg.author.id != process.env.CLIENT_ID){
        //msg.reply("check what?");
        var url = PS2endpoint + CharIDSearch;
    
        fetch(url) // Call the fetch function passing the url of the API as a parameter
        .then((resp) => resp.json())
    
        .then(function(data) {
            // Your code for handling the data you get from the API
            console.log(data);
            var charID = data["character_list"][0]["character_id"];
            console.log(charID);
            url =   
        })
        .catch(function(error) {
        // This is where you run code if the server returns any errors
        });
    
    
    }

    /*
    */



