module.exports = {
    name: '!check',
    description: 'Use to check a players owned items for a given player. Usage: !check playername class/specialization',
    execute(msg, args) {

        const fetch = require("node-fetch");

        const PS2endpoint ="http://census.daybreakgames.com/get/ps2:v2/"
        const CharIDSearch = "/character/?name.first="
        const ItemGet = "characters_item?character_id="
        const ItemGetParams = "&c:limit=2000"

        //msg.reply("check what?");
        var url = PS2endpoint + CharIDSearch + args[1];
        
        fetch(url) // Call the fetch function passing the url of the API as a parameter
        .then((resp) => resp.json())
    
        .then(function(data) {
            // Your code for handling the data you get from the API
            var charID = data["character_list"][0]["character_id"];
            console.log(charID);
            url = PS2endpoint + ItemGet + charID + ItemGetParams;
            console.log(url);
            fetch(url)
            .then((resp) => resp.json())
            .then(function(data){
                console.log(data);
            })

            //have the command return the item list
            //break this function down further, not into commands but functions

        })
        .catch(function(error) {
        // This is where you run code if the server returns any errors
        });
        console.log("Command Complete");
    },

};