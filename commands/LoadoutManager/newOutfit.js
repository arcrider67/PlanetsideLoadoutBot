const fs = require('fs');

module.exports = {
    name: '!newOutfit',
    description: 'Creates a new outfit to hold a set of loadouts',
    execute(msg, args){

        const guildID = msg["guild"]["id"]
        const guildName = msg["guild"]["name"]
        const dir = "Outfits/"
        //the layout to get started
        let basejson = '{"outfitname":"", "loadouts":{}}'
        


        var jsonObj = JSON.parse(basejson);
        
        jsonObj["outfitname"] = guildName;
        
        var jsonContent = JSON.stringify(jsonObj);

        fs.writeFile(dir + guildID +".json", jsonContent, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
         
            console.log("JSON file has been saved.");
        });


    },


};