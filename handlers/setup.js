const config = require("../config/config.json")
const { MessageEmbed } = require('discord.js')


module.exports = (client) => {

    client.on("guildCreate", guild => {
        getAll(client, guild)
    })

    function getAll(client, guild) {
        const embed = new MessageEmbed()
            .setColor(config.colors.yes)
            .setTitle('Help Menu - THANK U FOR INVITING ME!!! :DD')
            .addField('Prefix Information', `Prefix: \`${prefix}\`\nYou can also mention ${client.user} to get prefix info.`, false)
            .addField("• Developer", `\`\`\`yml\nName: RXNationGaming#0001
[725260858028195892]\nName Ξ RXNationGaming
[725260858028195892]\`\`\``)
            .addField("• Important Links", `**[Invite Link](https://discord.com/api/oauth2/authorize?client_id=815781171908706304&permissions=8&scope=bot)\`|\`[Support Server](https://discord.gg/g37DAPMnPQ)\`|\`[Youtube](https://www.youtube.com/c/RXNationGaming)\`**`)
            .setFooter(`To see command descriptions and usage type   ${config.prefix}help [CMD Name]`, client.user.displayAvatarURL())

        const commands = (category) => {
            return client.commands
                .filter(cmd => cmd.category === category)
                .map(cmd => `\`${cmd.name}\``)
                .join(", ");
        }

        const info = client.categories
            .map(cat => stripIndents`**__${cat[0].toUpperCase() + cat.slice(1)}__** \n> ${commands(cat)}`)
            .reduce((string, category) => string + "\n\n" + category);
        const channel = guild.channels.cache.find(
            channel =>
                channel.type === "text" &&
                channel.permissionsFor(guild.me).has("SEND_MESSAGES")
        );
        return channel.send(embed.setDescription(`*use the Prefix **\`${config.prefix}\`** infront of EACH command, to use it correctly!*\n` + info));
    }
}