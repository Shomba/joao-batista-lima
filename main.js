const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
console.log(require('discord.js').version)
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
var queue = {}
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	
	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	try {
		await command.execute(interaction,queue[interaction.guildId] );
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'ocorreu um erro durante a execução desse comando', ephemeral: true });
	}
});

client.login(token);