const { Client, Message, MessageEmbed } = require('discord.js');
const Discord  = require('discord.js')
const moment = require("moment");
let os = require("os");
let cpuStat = require("cpu-stat");
const config = require("../../config/config.json");

module.exports = {
    name: "botinfo",
    aliases: ["info"],
    description: "Sends detailed info about the client",
    usage: "botinfo",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, text, prefix, cmduser) => {
        cpuStat.usagePercent(function (e, percent, seconds) {
            if (e) {
                return console.log(String(e.stack).red);
            }
            const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
            let connectedchannelsamount = 0;
            let guilds = client.guilds.cache.map((guild) => guild);
            for (let i = 0; i < guilds.length; i++) {
                if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
            }
            const botinfo = new MessageEmbed()
                .setAuthor(client.user.username, client.user.displayAvatarURL())
                .setTitle("__**Stats:**__")
                .setColor("RED")
                .addField("⏳ Memory Usage", `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/ ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\``, true)
                .addField("⌚️ Uptime ", `\`${duration}\``, true)
                .addField("\u200b", `\u200b`, true)
                .addField("📁 Users", `\`${client.users.cache.size}\``, true)
                .addField("📁 Servers", `\`${client.guilds.cache.size}\``, true)
                .addField("\u200b", `\u200b`, true)
                .addField("📁 Voice-Channels", `\`${client.channels.cache.filter((ch) => ch.type === "voice").size}\``, true)
                .addField("📁 Connected Channels", `\`${connectedchannelsamount}\``, true)
                .addField("\u200b", `\u200b`, true)
                .addField("👾 Discord.js", `\`v${Discord.version}\``, true)
                .addField("🤖 Node", `\`${process.version}\``, true)
                .addField("\u200b", `\u200b`, true)
                .addField("🤖 CPU", `\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``)
                .addField("🤖 CPU usage", `\`${percent.toFixed(2)}%\``, true)
                .addField("🤖 Arch", `\`${os.arch()}\``, true)
                .addField("\u200b", `\u200b`, true)
                .addField("💻 Platform", `\`\`${os.platform()}\`\``, true)
                .addField("API Latency", `\`${client.ws.ping}ms\``, true)
                .setFooter("RXNationHelper");
            message.channel.send(botinfo);
        });
    }
}