const fs = require('fs');

module.exports = {
    name: '!newLoadout',
    description: 'adds a new loadout to the outfit that is calling the command',
    execute(msg, args){

        const guildID = msg["guild"]["id"]
        const guildName = msg["guild"]["name"]
        const dir = "Outfits/"


        fs.readFile(dir+guildID+".json", 'utf8', function read(err, data){
            //read in the entire database for the guild

            if(err){
                throw err;
            }
            const content = data;

            processFile(content);

        });





    },


};

function processFile(content){
    console.log(content)
}