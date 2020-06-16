require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.DISCORD_TOKEN);

client.on('message', msg => {

    console.log(msg.author.id);

    if (msg.content === 'ping') {
        msg.reply('pong');
    
        //check if the command is valid and it was not sent from this bot
    } else if (msg.content.includes("!check") && msg.author.id != process.env.CLIENT_ID){
        msg.reply("check what?");
    }

  });