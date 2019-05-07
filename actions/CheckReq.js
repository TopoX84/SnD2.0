const Discord = require("discord.js");
const settings = require("../configs/settings.json");

module.exports.checkBotRequirements = function checkBotRequirements(bot) {


    if (settings.ServerRequirementsCheck.length == 18) {

        let guild = bot.guilds.get(settings.ServerRequirementsCheck);
        let sendMessage = guild.members.get(settings.botOwnerUserID);
        let checkRole = guild.roles.find(role => role.name === settings.enforceRulesRole);
       

        if (guild.channels.find(channel => channel.name === "reports") || guild.me.hasPermission("SEND_MESSAGES")) {
            sendMessage = guild.channels.find(channel => channel.name === "reports");
        };

        let setAuthor = bot.user.username;
        let SetAuthorAvatar = bot.user.avatarURL;
        let reqColor = "#76A9D9";
        let DescAccessYes = "Bot has Access";
        let DescAccessNo = "Bot has no Access";

        let reportRequirements = new Discord.RichEmbed()

        reportRequirements.setAuthor(setAuthor, SetAuthorAvatar);
        reportRequirements.setThumbnail(SetAuthorAvatar);
        reportRequirements.setTitle("Requirements Check List");
        reportRequirements.setColor(`${reqColor}`);

        // kick members, ban memebers, read text channels, send Messages, manage messages, manager roles, manage channels
        if (!guild.channels.find(channel => channel.name === "reports")) reportRequirements.addField(`Channel for reporting`, `🔴 - **reports** channel doesn't exists`, false);

        if (guild.channels.find(channel => channel.name === settings.channelRulesName)) {
            reportRequirements.addField(`Channel for Rules`, `✅ - **${settings.channelRulesName}** channel exists`, false);
        } else if (!guild.channels.find(channel => channel.name === settings.channelRulesName)) {
            reportRequirements.addField(`Channel for Rules`, `🔴 - **${settings.channelRulesName}** channel doesn't exists`, false);
        } else { };

        if (guild.me.hasPermission("KICK_MEMBERS")) {
            reportRequirements.addField(`KICK MEMBERS`, `✅ - ${DescAccessYes}`, true);
        } else if (!guild.me.hasPermission("KICK MEMBERS")) {
            reportRequirements.addField(`KICK MEMBERS`, `🔴 - ${DescAccessNo}`, true);
        } else { };

        if (guild.me.hasPermission("BAN_MEMBERS")) {
            reportRequirements.addField(`BAN MEMBERS`, `✅ - ${DescAccessYes}`, true);
        } else if (!guild.me.hasPermission("BAN_MEMBERS")) {
            reportRequirements.addField(`BAN MEMBERS`, `🔴 - ${DescAccessNo}`, true);
        } else { };

        if (guild.me.hasPermission("READ_MESSAGE_HISTORY")) {
            reportRequirements.addField(`READ MESSAGES`, `✅ - ${DescAccessYes}`, true);
        } else if (!guild.me.hasPermission("READ_MESSAGE_HISTORY")) {
            reportRequirements.addField(`READ MESSAGES`, `🔴 - ${DescAccessNo}`, true);
        } else { };

        if (guild.me.hasPermission("SEND_MESSAGES")) {
            reportRequirements.addField(`SEND MESSAGES`, `✅ - ${DescAccessYes}`, true);
        } else if (!guild.me.hasPermission("SEND_MESSAGES")) {
            reportRequirements.addField(`SEND MESSAGES`, `🔴 - ${DescAccessNo}`, true);
        } else { };

        if (guild.me.hasPermission("MANAGE_MESSAGES")) {
            reportRequirements.addField(`MANAGE MESSAGES`, `✅ - ${DescAccessYes}`, true);
        } else if (!guild.me.hasPermission("MANAGE_MESSAGES")) {
            reportRequirements.addField(`MANAGE MESSAGES`, `🔴 - ${DescAccessNo}`, true);
        } else { };

        if (guild.me.hasPermission("MANAGE_ROLES") && (settings.enforceRules == "yes" || settings.enforceRules == "Yes" || settings.enforceRules == "YES")) {
            reportRequirements.addField(`MANAGE ROLES`, `✅ - ${DescAccessYes}`, true);
        } else if (!guild.me.hasPermission("MANAGE_ROLES")) {
            reportRequirements.addField(`MANAGE ROLES`, `🔴 - ${DescAccessNo}`, true);
        } else { };


        if (guild.me.hasPermission("MANAGE_CHANNELS") && (settings.enforceRules == "yes" || settings.enforceRules == "Yes" || settings.enforceRules == "YES")) {
            reportRequirements.addField(`MANAGE CHANNELS`, `✅ - ${DescAccessYes}`, true);
        } else if (!guild.me.hasPermission("MANAGE_CHANNELS")) {
            reportRequirements.addField(`MANAGE CHANNELS`, `🔴 - ${DescAccessNo}`, true);
        } else { };

        if (!checkRole && (settings.enforceRules == "yes" || settings.enforceRules == "Yes" || settings.enforceRules == "YES")) {
            reportRequirements.addField(`enforceRulesRole`, `🔴 - The role for rules does not exists`, true);
        }

        if (settings.enforRulesServerID.length != 18 && (settings.enforceRules == "yes" || settings.enforceRules == "Yes" || settings.enforceRules == "YES")) {
            reportRequirements.addField(`enforRulesServerID`, `🔴 - The server ID is not correct`, true);
        };
        
        sendMessage.send(reportRequirements);

    } else {

        bot.guilds.forEach((guild) => {

            guild.members.get(settings.botOwnerUserID).send("In Order to be able to check for requirements you need to fill **ServerRequirementsCheck** in the **settings.js** with the 18 digit server ID");
        });
    };
};
