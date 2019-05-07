const settings = require("../configs/settings.json");

module.exports.run = async (bot, message, args) => {

    let guild = bot.guilds.get(settings.enforRulesServerID);
    let roleName = settings.enforceRulesRole;
    let role = guild.roles.find(role => role.name === roleName);

    if (guild && settings.enforRulesServerID.length == 18) {
        guild.members.get(message.author.id).removeRole(role);
    };

    message.delete(500);
};

module.exports.help = {
    name: "accept"
};
