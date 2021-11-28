//#region setup inicial
const Discord = require("discord.js");
const { REST } = require('@discordjs/rest');
const routs = require("discord-api-types/v9")
const cfg = require("./config.json");
const auth = require("./auth.json");
const ytdl = require("ytdl-core");
const colors = require('colors');
const bot = new Discord.Client();
const fs = require("fs");
const print= console.log;

var commands = []
//#endregion

//#region açoes
bot.once("ready",()=>{
    print('ready!'.green)
    bot.user.setPresence({
        status:"online",
        activity:{
            type:"LISTENING",
            name:"oque os otros me obrigarem",
            url:"https://youtu.be/dQw4w9WgXcQ"
        }
    })
})
bot.on("message",(msg)=>{
    if(msg.content.startsWith(cfg.prefix)){
        if(msg.content == msg.prefix+"ping"){
            msg.channel.send("pong");
        }
    }
})
//#endregion
//login
bot.login(auth.token);


//#region comandos
var commandfiles = fs.readdirSync('./comands').filter(file => file.endsWith(".js"))
for (const file of commandfiles){
    const comand = require(`./comands/${file}`);
    commands.push(comand.data.toJSON())
}
const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(bot.user.id),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

//#endregion