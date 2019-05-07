const Discord = require("discord.js");
const settings = require("../configs/settings.json");

module.exports.deleteMsgRulesChannel = function deleteMsgRulesChannel(bot, message, args) {

    let rulesChannelMsg = message.guild.channels.find(channel => channel.name === settings.channelRulesName);
    if (rulesChannelMsg && message.member.roles.some(role => role.name === settings.enforceRulesRole) && !message.content.match("!accept")) {

        message.delete(100);
        
    };

};