const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../../utils/models/welcome')

module.exports = {
    name: 'set-welcome',
    description: '',
    usage: '',
    aliases: ['swelcome'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        if (!message.member.permissions.has('MANAGE_MESSAGES')) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor("RED")
                    .setAuthor(message.author.tag)
                    .setDescription("**You Dont Have The Permissions To Warn Users! - [MANAGE_MESSAGES]**")
                    .setFooter("RXNationHelper")
            ).then((msg => {
                msg.delete({ timeout: 10000 })
            }))
        }

        const channel = message.mentions.channels.first() || message.channel
        if (!channel) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor("RED")
                    .setAuthor(message.author.tag)
                    .setDescription("**Please Mention a Channel **")
                    .setFooter("RXNationHelper")
            ).then((msg => {
                msg.delete({ timeout: 10000 })
            }))
        }

        Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
            if (data) {
                data.Channel = channel.id
                data.save();
            } else {
                new Schema({
                    Guild: message.guild.id,
                    Channel: channel.id
                }).save()
            }
            // db.set(`welcomeChannel_${message.guild.id}`, channel.id)

            const welcome = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Welcome Channel')
                .setDescription(`${channel} has been set as a Welcome Channel`)
                .setThumbnail('https://i.imgur.com/ZDgirZI.jpg')
                .setFooter("RXNationHelper")
 message.channel.send(welcome)
        })
    }

}