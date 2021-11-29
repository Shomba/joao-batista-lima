const { SlashCommandBuilder } = require('@discordjs/builders');
const ytdl = require("ytdl-core")
module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('toca uma musica')
		.addStringOption(option =>
			option.setName("nome").setDescription("nome da musica").setRequired(true)
		),
	async execute(interaction,serverQueue) {
		const songinfo = await ytdl.getInfo(interaction.options.getString('nome'))
		const canal = interaction.member.voice.channel
		const song = {
			title: songinfo.videoDetails.title,
			url: songinfo.videoDetails.video_url
		}
		voice = await canal.join()

		
		return interaction.reply('Pong!');
	},
};
