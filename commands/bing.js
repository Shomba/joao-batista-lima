const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder().setName("bing").setDescription('responde com bong'),
    async execute(interaction){
        await interaction.reply("bong")
    }
}