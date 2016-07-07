var fs = require("fs");
var prompt = require("prompt");
var colors = require("colors/safe");

prompt.start();

console.log("Welcome to the BeamAlerts setup tool.");
console.log("");

var stringtable = fs.readFileSync('./defaults/strings.json', { encoding: "utf-8" });
var aliastable = fs.readFileSync('./defaults/alias.json', {encoding: "utf-8" });

try {
    var stats = fs.lstatSync('./user');

    if (stats.isDirectory()) {
        console.log("You already have a user folder. If you would like to reconfigure BeamAlerts then delete your current user folder and run this script again.")
    }
} catch (e) {
    prompt.get({
          properties: {
                username: {
                    description: colors.magenta("Please enter the username you would like to use to connect to Beam.pro.")
                },
                password: {
                    description: colors.magenta("Password?")
                },
                bot_name: {
                    description: colors.magenta("and finally the name of your bot!")
                }
          }
    }, function (err, result) {
        contents = `{ "username":"${result.username}", "password":"${result.password}", "bot_name":"${result.bot_name}", "player":"none" }`;
        fs.mkdir("./user");
        fs.writeFile('./user/settings.json', contents, function (err) {
            if (err) return console.log(err);
            console.log("Settings created! You can now run the bot.");
        fs.writeFile('./user/metusers.txt', `${result.username}`, function (err) {
            if (err) return console.log(err);
        })
        });
        fs.writeFile('./user/strings.json',stringtable, function (err) {
            if (err) return console.log(err);
        })
        fs.writeFile('./user/alias.json',aliastable, function (err) {
            if (err) return console.log(err);
        })
    });
};
